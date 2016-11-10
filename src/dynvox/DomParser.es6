
/*
Clase encargada de parsear el DOM y asignar los scopes y variables automáticamente...

- withScopeVar
<input type='text' voxs-name='variable1'/>
<img type='text' voxs-name='variableimagen' voxs-attr='src'/>
<div voxs-name='html1' voxs-html></div>
<div voxs-name='text1' voxs-text></div>


- withScopeList
<ul voxs-name='libros' voxs-repeat voxs-var='libro'>
	<li voxs-name='libro.nombre' vox-text></li>
</ul>

- ifScopex
<div class='xxx' voxs-if='boolean1'>
	<span>Contenido</span>
</div>



*/


import Scope from './Scope'
import ObservableClass from './Observable'
import DomEvents from './DomEvents'

// $ es jQuery
if(typeof $ === "undefined")
	throw new core.System.ArgumentException("Debe añadir jQuery")


class DomParser{


	createEventFunction(scope, DOM, Observable, options){

		var dom= DOM.get(0),v
		//if(!dom.VoxSEvents){
			dom.VoxSEvents= new DomEvents(DOM, this)
		//}
		v= dom.VoxSEvents
		v.setArguments(scope, Observable, options)
		v.createEventFunction()

	}

	createObservableFindEvent(scope, DOM, Observable, options){
		var self= this
		var Fn= function(){
			if(self.analize(scope, DOM, options))
				Fn=null
		}

		var Fn2= function(){
			if(Fn)
				Fn()
		}
		Observable.on("change", Fn2)
		Observable.on("add", Fn2)
	}


	withScopeVar(scope, obj){
		var attr= obj.attr("voxs-attr")||"value"
		var html= obj.attr("voxs-html")!==undefined
		var text= obj.attr("voxs-text")!==undefined
		/*var prop= obj.attr("voxs-name").split(">")
		var varname= prop[0].split(".")

		if(prop.length>1)
			prop=prop[1].split(".")
		else
			prop=undefined
		*/
		var options={
			attr,
			html,
			text,/*
			varname,
			prop,*/
			name: obj.attr("voxs-name")
		}
		//this.analize(scope,obj, options)
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
		}
		else{
			throw new core.System.Exception("Se esperaba el nombre de variable")
		}
		this.analize(scope, obj, options)
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
		//obj.hide()
		this.analize(scope,obj, options)
	}

	analize(scope, obj, options){
		obj.attr("voxs-ya", "voxs-ya")
		var Observable= scope, vr, last
		var varname= options.varname

		/*
		if(varname.length==1){
			if(!scope.getObservable(varname[0])){
				scope.createVariable(varname[0], scope[varname[0]])
			}
		}

		for(var i=0;i<options.varname.length;i++){
			options.index=i
			vr=options.varname[i].trim()
			last= Observable
			if(i>0)
				last= last.value
			Observable= last.getObservable? last.getObservable(vr): null
			if(!Observable || !( Observable instanceof ObservableClass)){
				Observable=null
				if(i>0)
					this.createObservableFindEvent(scope, obj, last, options)
				break;
			}
		}
		if(Observable){
			/*
			if(options.repeat){
				if(! (Observable.value instanceof ObservableList))
					Observable= Observable.value= new ObservableList()
			}
			*/
			
			this.createEventFunction(scope, obj, Observable, options)
			return true
		//}

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



	paso3(jObject, scope){
		var attrs,attr,val, val2, i, y, html, varname, event
		jObject.get(0)._voxscope= scope
		if(jObject.attr("voxs-repeat")!==undefined){
			this.withScopeList(scope, jObject)
		}
		if(jObject.attr("voxs-if")!==undefined){
			this.ifScope(scope, jObject)
		}
		if(jObject.attr("voxs")!==undefined){
			attrs= jObject.get(0).attributes
			for(var z=0;z<attrs.length;z++){
				event=undefined
				attr= attrs[z]

				if(attr.name.substring(0, 5)=="event"){
					event= attr.name.split("-").slice(1).join("-")
				}

				if(event){

					this.withScopeVar2(scope, jObject, {
						name:  attr.value,
						event: event
					})


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

						//console.info(varname)
						attr.value= attr.value.substring(0, i) + val
						this.withScopeVar2(scope, jObject, {
							name: varname, 
							attr: attr.name,
							format: val2
						})
					}
				}
			}


			val= jObject.html()
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
					/*console.info({
						name: varname,
						format: val2,
						html,
						text: !html
					})*/
					this.withScopeVar2(scope, jObject, {
						name: varname,
						format: val2,
						html,
						text: !html
					})
				}
			}
		}
		else{
			this.withScopeVar(scope, jObject)
		}
	}

	paso1(Window){
		var k,j=Window.find("[voxs-scope]"), s
		for(var i=j.length-1;i>=0;i--){
			k= j.eq(i)
			s= k.attr("voxs-scope")
			if(s){
				this.paso2(k, Scope.get(s))
			}
		}
	}

	init(){
		//$(()=>{
			this.paso1($("html"))
		//})
	}
	


	paso2(Window, scope){
		var k, j= Window.find(DomParser.q)
		for(var i=0;i<j.length;i++){
			k= j.eq(i)
			if(k.attr("voxs-ya")===undefined){
				this.paso3(k, scope)
			}
		}
	}

}
DomParser.q= "[voxs-name], [voxs-if], [voxs]"

$.fn.voxscope= function(){
	var e= this.get(0)
	var scname, sc=e._voxscope
	if(!sc){
		scname= this.parents("[voxs-scope]")||"default"
		sc= core.dynvox.Scope.get(scname)
	}
	return sc
}
export default DomParser
