var _id=0
import ObservableList from './ObservableList'
import ObservableClass from './Observable'
import DomParser from './DomParser'
class DomEvents{


	constructor(DOM, domParser){
		this.DOM= DOM
		this.id= _id++
		this.events= {}
		this.DomParser= domParser
	}

	setArguments(scope, observable, options){
		this.options= options
		this.scope= scope
		this.observable= observable
	}


	static optionsToString(options){
		return options.name + "#" + (options.attr||"") + "#" + (options.text?"text":"")
	}

	destroy(){
		/*
		if(this.DOM && this.DOM[0])
			delete this.DOM[0].VoxSEvents
			*/
		for(var id in this){
			delete this[id]
		}
	}




	createEventFunction(){
	
		//var scope= this.DOM.voxscope()
		var args= {
			"options": this.options,
			"scope": this.scope,
			"observable": this.observable
		}

	
		
		var scopeObserver= this.scope.observer
		var self= this, parser
		var Exe= function(){
			if(args.options.repeat){


				args.domObjects=[]
				args.options.onpush= function(ev){


					var scope2

					// Mirar si se tiene que borrar los option y select-wrapper
					//self.Body.find(".input-field .select-wrapper,.input-field select option").remove()
					var b= self.Body //.clone(false)

					var dq= $("<div>")
					//dq.append(b)
					dq.html(b)
					b= dq.find(">*")
					//console.info(b.html())
					//dq.html(dq.html())
					//dq.find(DomParser.q).removeAttr("voxs-ya")

					//console.info("Cloned objet", b.html())

					scope2= args.scope.clone()
					scope2.add(ev.observable, args.options.vname)
					scope2.createVariable("$index", ev.index)
					ev.observable.on("indexchange", function(ev){
						scope2.$index= ev.value
					})
					args.scope.append(scope2)

					console.info("SCOPE:",scope2)
					self.DomParser.parse(dq, scope2)
					if(self.DOM.attr("voxs-reverse")!==undefined){
						var temp=self.DOM.find(">*:eq(0)")
						if(temp.length==0)
							self.DOM.append(b)
						else
							b.insertBefore(temp)
					}
					else{
						self.DOM.append(b)
					}


					b.each(function(){
						//this._voxscope= scope2
						self.DomParser.setScope(this, scope2)
					})

					b.
					temp=null
					ev.observable.on("remove", function(){
						b.remove()
					})
					ev.observable.on("change", function(){
						//self.DomParser.parse(self.DOM, scope2)
					})

				}

				args.options.onremoveall= function(){
					console.info("REMOVE ALL", args.options)
					self.DOM.html("")
				}
				args.options.array= true
				if(!self.Body){
					self.Body= self.DOM.html() //find(">*")
					self.DOM.find(">*").remove()
					//self.Body.remove()
				}
				scopeObserver.observe(args.options)
			}

			else if(args.options.ifcondition){

				//console.info(args.options)
				var equal= args.options.name.split("==")
				var verifExpression= undefined, verificarExp= false
				if(equal.length>1){
					verifExpression= JSON.parse(equal[1])
					verificarExp= true
				}

				equal=equal[0]
				args.options.name= equal
				if(args.options.negate){
					args.options.name= args.options.name.substring(1)
				}

				args.options.onchange= function(ev){
					//console.info("VALUE::: ", ev.value)
					var value= ev.value
					var ok
					if(!verificarExp)
						ok= !!value
					else
						ok= value==verifExpression

					if(args.options.negate)
						ok=!ok



					//console.info("VALUE FINAL:: ", ok)
					if(ok){
						self.DOM.show()
						if(!self.DOM.data("voxs-i0r")){
							//console.info("Placing here")
							self.DOM.data("voxs-i0r",1)
							try{
								self.DomParser.parse(self.DOM, args.scope /*self.DOM.voxscope()*/ )
							}catch(e){
								console.error("Error in if-condition: ",e)
							}
						}
					}
					else{
						self.DOM.hide()
					}

				}

				/*
				if(self.DOM.is("input[type=check]")){
					self.DOM.on("change", function(){
						self.noTrigger= true
						args.options.value= this.checked
						scopeObserver.assignValue(args.options)
					})
				}
				*/
	
				scopeObserver.observe(args.options)
				//self.DOM.voxscope().observer.observe(args.options)
			}
			else if(true){


				args.options.onchange= function(ev){

					var value= ev.value
					var isUndefined= value===undefined || value===null
					//args.options.attr=="name"&&console.info("CHANGE: ", args, ev)


					if(self.noTrigger){
						self.noTrigger= false
						return
					}


					/*
					if(args.options.event){
						if(!args.options.fnEvent){
							args.options.fnEvent= function(){
								if(args.options.fnEvent1)
									args.options.fnEvent1.apply(this,arguments)
							}
							self.DOM.on(args.options.event, args.options.fnEvent)
						}
						args.options.fnEvent1= value
					}
					*/


					if(args.options.format && self.DOM.attr("voxs-compiled")===undefined){
						// Convertir el contenido ...
						if(args.options.text)
							value= args.scope.observer.format(args.options.format, true)
						else
							value= args.scope.observer.format(args.options.format)

					}
					else{


						if(!args.options.compiled && args.options.format){
							args.options.compiled= scopeObserver.compileFormat(args.options.format)
						}
						if(args.options.format){

							try{
								value= args.options.compiled(scopeObserver)
							}catch(e){
								console.error("Error en función compilada: ", e)
							}
							
							/*
							if(!args.options.text){
								value= core.dynvox.EscapeHtml(value)
								value= value.replace(/\r?\n|\r/ig, "<br/>")
							}*/
						}
					}


					value= value ? value.toString() : value
					if(value===undefined)
						value=null
					if(args.options.html){

						self.DOM.html(value)
						if(self.DOM.attr("dynvox-code")!==undefined){
							console.info("HAHAHAH---")
							//self.DomParser.parse(self.DOM, self.DOM.voxscope())
						}

					}
					else if(args.options.text){
						//self.DOM.text(value)
						//var valo= core.dynvox.EscapeHtml(value)
						//valo= valo.replace(/\r?\n|\r/ig, "<br/>")
						self.DOM.html(value)
					}
					else if(args.options.attr=="value"){
						if(self.DOM.is("input[type=checkbox]"))
							self.DOM.get(0).checked= value==1 || value=="true"
						else
							self.DOM.val(value)
					}
					else if(args.options.attr=="bind"){
						if(self.DOM.is("input[type=radio]"))
							self.DOM.get(0).checked= value==1 || value=="true"
						else
							self.DOM.val(value)
					}
					else if(args.options.attr){
						//console.info("Arg: ", args.options.attr,  "Value: ", value,  isUndefined, value===undefined || value===null, value==="")
						if(!value && isUndefined)
							self.DOM.removeAttr(args.options.attr)
						else
							self.DOM.attr(args.options.attr, value)
					}


				}
				if(self.DOM.is("input,textarea,select") && (args.options.attr=="value"||args.options.attr=="bind")){
					self.DOM.on("change input", function(){
						self.noTrigger= true
						if($(this).is("input[type=checkbox]"))
							args.options.value= this.checked
						else
							args.options.value= this.value

						//console.info("CHANGING", args)
						$(this).voxscope().observer.assignValue(args.options)
					})
				}
				//console.info("OPTIONS:", args.options, args.scope, self.DOM.voxscope())
				//console.info("                 --")
				//self.DOM.voxscope().observer.observe(args.options)
				scopeObserver.observe(args.options)
			}
		}
		Exe()
		
		
		if(args.options.name.indexOf("input._array")>=0)
			console.info("SCOPE 1 ------:", this.scope)

	}
}
DomEvents.dq= $("<div>")
export default DomEvents
