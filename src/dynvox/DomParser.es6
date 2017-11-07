



import Scope from './Scope'
import ObservableClass from './Observable'
import DomEvents from './DomEvents'

// $ es jQuery
if(typeof $ === "undefined")
	throw new core.System.ArgumentException("Debe añadir jQuery")


var zzz=0
class DomParser{


	init(obj){
			this.parse(obj ||$("html"), null)
	}


  parse(jobject, scope){
    if(!jobject)
      jobject= $("html")

    var objects= jobject.find(">*"),obj, l=[], sc
    for(var i=0;i<objects.length;i++){
      obj= objects.eq(i)
      l.push(obj)
    }

		var scopeP= scope
		//console.info("Procesing:",l)
    for(var i=0;i<l.length;i++){
      obj=l[i]
      sc= obj.attr("voxs-scope")
      scope= sc?core.dynvox.Scope.get(sc):(scopeP||core.dynvox.Scope.get("default"))

      if(scope){
        if(obj.attr("voxs")!==undefined){
          this.parseOne(obj, scope)
        }
        else{
          this.parse(obj, scope)
        }
      }
	  delete l[i]
    }

	l=null

  }


  ifScope(scope, obj){
		var negate=false, prop, varname
		prop= obj.attr("voxs-if").split(">")
		varname= prop[0].split(".")
		if(prop.length>1)
			prop=prop[1].split(".")
		else
			prop=undefined


		if(varname[0].startsWith("!")){
			negate= true
			varname[0]= varname[0].substring(1)
		}

		var options={
			ifcondition: true,
			varname,
			negate,
			prop,
			name: obj.attr("voxs-if")
		}
		this.analize(scope,obj, options)
	}

	uniqueIdDOM2(dom){
		if(zzz>2000000)
			zzz=0
		dom[0].__id= dom[0].__id || Date.now() + (zzz++).toString()
	}
	uniqueIdDOM(dom){
		if(zzz>2000000)
			zzz=0
		dom.__id= dom.__id || Date.now() + (zzz++).toString()
	}

	setScope(dom,scope){
		this.uniqueIdDOM(dom)
		DomParser.vScopes= DomParser.vScopes||{}
		DomParser.vScopes[dom.__id]= scope
	}

  parseOne(jObject, scope){
    var attrs, atxr,attr,val, val2, i, y, html, varname, event, special, names
		//jObject.get(0)._voxscope= scope

		this.setScope(jObject[0],scope)


		if(!jObject.attr("voxs-i2r")){
			if(jObject.attr("voxs-repeat")!==undefined){
				special= true
				this.withScopeList(scope, jObject)
			}
			if(jObject.attr("voxs-if")!==undefined){
				special= true
				this.ifScope(scope, jObject)
			}
			if(jObject.attr("voxs")!==undefined){
				atxr= jObject.get(0).attributes
				attrs= []
				for(var z=0;z<atxr.length;z++){
					attrs.push(atxr[z])
				}
				for(var z=0;z<attrs.length;z++){
					event=undefined
					attr= attrs[z]
					if(attr.name.substring(0, 5)=="event"){
						event= attr.name.split("-").slice(1).join("-")
					}
					if(event){
						jObject.get(0).oi=jObject.get(0).oi||DomParser.id++
						//console.info("EVENT: ", event, attr.value,jObject.get(0).oi)
						this.attachEvent(scope, jObject, event, attr.value)
					}
					else{


						if(jObject.attr("voxs-compiled")!=undefined){

							val= attr.value
							i= val.indexOf("#{")
							if(i>=0){
								names= scope.observer.extractVars(val)
								for(var name of names){
									this.withScopeVar2(scope, jObject, {
										name,
										attr: attr.name,
										format: val
									})
								}
							}

						}
						else{
							val= attr.value
							val2= val
							i= val.indexOf("#{")
							if(i>=0){
								html= val[i-1]=="#"
								val= val.substring(i+2)
								y= val.indexOf("}")
								if(y>=0){
									varname= val.substring(0, y)
									val= val.substring(y+1)
								}

								//console.info("ATTR NAME:",attr.name, "VALUE: ",attr.value, ".", varname,val2)
								attr.value= attr.value.substring(0, i) + val
								this.withScopeVar2(scope, jObject, {
									name: varname,
									attr: attr.name,
									format: val2
								})
							}

						}

					}
				}

				val= jObject.html()

				if(jObject.attr("voxs-compiled")!==undefined){
					//val= attr.value
					i= val.indexOf("#{")
					html= val.indexOf("##{")>=0
					if(i>=0){
						names= scope.observer.extractVars(val)
						for(var name of names){
							this.withScopeVar2(scope, jObject, {
								name,
								format: val,
								text: !html,
								html
							})
						}
					}
				}
				else{
					if(val.indexOf("<")<0){
						val= jObject.text()
						val2= val
						i= val.indexOf("#{")
						if(i>=0){
							html= val[i-1]=="#"
							val= val.substring(i+2)
							y= val.indexOf("}")
							if(y>=0){
								varname= val.substring(0, y)
								val= val.substring(y+1)
							}
							jObject.html(jObject.html().substring(0, i-(html?1:0))  + val)
							this.withScopeVar2(scope, jObject, {
								name: varname,
								format: val2,
								html,
								text: !html
							})
						}
					}
				}

			}
			else{
				this.withScopeVar(scope, jObject)
			}


			if(jObject.attr("dynvox-savecode")!==undefined)
				this.saveCode(jObject)
		}

		jObject.data("voxs-i2r",1)
    if(!special)
      this.parse(jObject, scope)

	 jObject=null


  }


  attachEvent(scope, DOM, event, name){
		if(name=="arrayAñadir")
			console.info("------------------- Attach event", scope, DOM,event,name)

		if(DOM.data("voxs-i1r"+event))
			return
		DOM.on(event,function(){
			var args= arguments
			var value= scope.observer.getValue({
				name
			})
			if(value){
				if(typeof value!="function")
					return console.error(value, "No es una función")
				return value.apply(this, args)
			}
		})
		DOM.data("voxs-i1r"+event,1)
		DOM=null
	}


	destroy(){

		if(this.vEvents){
			for(var id in this.vEvents){
				v= this.vEvents[id]
				v&&v.destroy&&v.destroy()
				delete this.vEvents[id]
			}
		}

		for(var id in this){
			delete this[id]
		}
	}


  withScopeVar(scope, obj){
		var attr= obj.attr("voxs-attr")||"value"
		var html= obj.attr("voxs-html")!==undefined
		var text= obj.attr("voxs-text")!==undefined
		var options={
			attr,
			html,
			text,
			name: obj.attr("voxs-name")
		}
		return this.withScopeVar2(scope, obj, options)
	}


  withScopeVar2(scope, obj, options){
		var prop, varname, name= options.name
		if(name){
			prop= name.split(">")
			varname= prop[0].split(".")

			if(prop.length>1)
				prop=prop[1].split(".")
			else
				prop=undefined
			options.prop= prop
			options.varname= varname
			//console.info(options.prop, options.varname)
		}
		else{
			throw new core.System.Exception("Se esperaba el nombre de variable")
		}
		this.analize(scope, obj, options)
	}




  withScopeList(scope, DOM){
		var vname= DOM.attr("voxs-var")
		var prop= DOM.attr("voxs-name").split(">")
		var varname= prop[0].split(".")

		if(prop.length>1)
			prop=prop[1].split(".")
		else
			prop=undefined

		var options= {
			vname,
			varname,
			repeat: true,
			prop,
			name: DOM.attr("voxs-name")
		}
		DOM.find(DomParser.q).attr("voxs-ya", "voxs-ya")
		this.analize(scope, DOM, options)
	}

	saveCode(obj){
		var scope= obj.voxscope()
		if(obj.attr("voxs-ya")===undefined){
			var saveCode= obj.attr("dynvox-savecode")
			if(saveCode!==undefined){
				if(!scope.getObservable(saveCode))
					scope.createVariable(saveCode)

				scope[saveCode]= obj.html()
			}
		}
	}


  analize(scope, obj, options){


		obj.attr("voxs-ya", "voxs-ya")
		var Observable= scope, vr, last
		var varname= options.varname
		this.createEventFunction(scope, obj, Observable, options)
		scope=null
		obj=null
		Observable=null
		options=null
		return true

	}

  	createEventFunction(scope, DOM, Observable, options){
		var dom= DOM.get(0),v
		//dom.VoxSEvents= new DomEvents(DOM, this)
		//v= dom.VoxSEvents

		v= new DomEvents(DOM, this)
		dom.__id= Date.now() + (zzz++).toString()
		this.vEvents=this.vEvents||{}
		this.vEvents[dom.__id]= v


		v.setArguments(scope, Observable, options)
		v.createEventFunction()
		dom=null
		DOM=null
		scope=null
		Observable=null
		options=null
	}



	static free(){
		if(this.vScopes){
			for(var id in this.vScopes){

				delete this.vScopes[id]
			}
		}
	}
}


$.fn.voxscope= function(){
	var e= this.get(0)
	var scname, sc=DomParser.vScopes?DomParser.vScopes[e.__id]:null, p
	if(!sc){
		p= this.parent()
		if(p.length>0){
			return p.voxscope()
		}
		else{
			scname= this.parents("[voxs-scope]").attr("voxs-scope")||"default"
			sc= core.dynvox.Scope.get(scname)
		}
	}

	return sc
}
export default DomParser
