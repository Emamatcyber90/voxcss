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

	createEventFunction(){

		var args= {
			"options": this.options,
			"scope": this.scope, 
			"observable": this.observable
		}



		var scopeObserver= this.scope.observer, self= this
		var Exe= function(){
			if(args.options.repeat){


				args.domObjects=[]
				args.options.onpush= function(ev){


					var scope2

					// Mirar si se tiene que borrar los option y select-wrapper
					self.Body.find(".input-field .select-wrapper,.input-field select option").remove()
					var b= self.Body.clone(true)

					var dq= $("<div>")
					dq.append(b)
					dq.find(DomParser.q).removeAttr("voxs-ya")

					scope2= args.scope.clone()
					args.scope.append(scope2)
					scope2.add(ev.observable, args.options.vname)
					
					self.DomParser.paso2(dq, scope2)
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


					ev.observable.on("remove", function(){
						b.remove()
					})
					ev.observable.on("change", function(){
						self.DomParser.paso2(self.DOM, scope2)
					})

				}

				args.options.onremoveall= function(){
					self.DOM.html("")
				}
				args.options.array= true

				if(!self.Body){
					self.Body= self.DOM.find(">*")
					self.Body.remove()
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
					if(ok)
						self.DOM.show()
					else
						self.DOM.hide()


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
			}
			else if(true){


				args.options.onchange= function(ev){

					var value= ev.value
					var isUndefined= value===undefined || value===null


					if(self.noTrigger){
						self.noTrigger= false
						return 
					}

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


					if(args.options.format){
						// Convertir el contenido ...
						if(args.options.text)
							value= args.scope.observer.format(args.options.format, true)
						else
							value= args.scope.observer.format(args.options.format)

					}


					value= value ? value.toString() : null
					if(args.options.html)
						self.DOM.html(value)
					else if(args.options.text){
						//self.DOM.text(value)
						//var valo= core.dynvox.EscapeHtml(value)
						//valo= valo.replace(/\r?\n|\r/ig, "<br/>")
						self.DOM.html(value)
					}
					else if(args.options.attr=="value"){
						if(self.DOM.is("input[type=checkbox]"))
							self.DOM.get(0).checked= !!value
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
				if(self.DOM.is("input,textarea,select") && args.options.attr=="value"){
					self.DOM.on("change input", function(){
						self.noTrigger= true
						if($(this).is("input[type=checkbox]"))
							args.options.value= this.checked
						else 
							args.options.value= this.value

						//console.info("CHANGING", args)
						scopeObserver.assignValue(args.options)
					})
				}
				scopeObserver.observe(args.options)

			}

		}
		Exe()


		/***

		console.info(args)
		var Exe= ()=>{
			var Observable= args.observable
			var Fn, self= this
			var id= Observable.id + DomEvents.optionsToString(args.options)
			if(args.options.repeat){

				if(!this.events[id]){

					var procesar, observable2, observable1

					var getObservable= function(Observable){
						let v= Observable.value, l, saved
						//console.info("PROPS: ", self.options.prop)
						try{
							if(args.options.prop){
								l= args.options.prop.length
								for(var i=0;i<l;i++){
									v= v[args.options.prop[i]]
								}
							}	
						}
						catch(e){
							console.error(e)
						}			

						if(! (v instanceof ObservableList)){
							saved= v
							v= new ObservableList()

							if(saved instanceof Array){
								for(var i=0;i<saved.length;i++){
									v.push(saved[i])
								}
							}
							//console.info("V: ", v, saved)

							if(args.options.prop){
								saved= Observable.value
								l= args.options.prop.length-1
								for(var i=0;i<l;i++){
									if(saved)
										saved= saved[args.options.prop[i]]
								}
								if(saved){
									saved[args.options.prop[args.options.prop.length-1]]= v
									Observable= v
								}
							}
							else{
								Observable= Observable.value = v
							}
						}
						else{
							Observable= v
						}

						//console.info(Observable)
						return Observable
					}

					
					

					Observable.on("change", function(){
						if(observable2 instanceof ObservableList)
							observable2.removeAll()

						if(observable2!=Observable)
								procesar()

					})

					procesar= function(){

						
						
						observable2= getObservable(Observable)
						id= observable2.id + DomEvents.optionsToString(args.options)
						if(self.events[id])
							return 
						//console.info("HERE ----", observable2)
						if(!self.Body){
							self.Body= self.DOM.find(">*")
							self.Body.remove()
						}
						
						Fn= function(ev){

							//console.warn("PUSHED", ev)
							var scope2, b= self.Body.clone(true)
							var dq= $("<div>")
							dq.append(b)
							//self.DOM.append(b)
							dq.find(DomParser.q).removeAttr("voxs-ya")

							scope2= args.scope.clone()
							args.scope.append(scope2)
							scope2.add(ev.observable, args.options.vname)
							
							self.DomParser.paso2(dq, scope2)
							self.DOM.append(b)
							ev.observable.on("remove", function(){
								b.remove()
							})
							ev.observable.on("change", function(){
								self.DomParser.paso2(self.DOM, scope2)
							})
						}
						observable2.on("push", Fn)
						for(var i=0;i<observable2.length;i++){
							Fn({
								observable: observable2.getObservable(i)
							})
						}

						id= observable2.id + DomEvents.optionsToString(args.options)
						self.events[id]= Fn

					}
					procesar()
				}


			}
			else if(args.options.ifcondition){

				if(!this.events[id]){
					Fn= function(ev){

						let v= Observable.value, l
						if(args.options.prop){
							l= args.options.prop.length
							for(var i=0;i<l;i++){
								if(v)
									v= v[args.options.prop[i]]
							}
						}

						v= !v
						if(!args.options.negate)
							v= !v

						if(v)
							self.DOM.show()
						else
							self.DOM.hide()
					}
					Fn()
					Observable.on("change", Fn)
					if(self.DOM.is("input[type=check]")){
						self.DOM.on("change", function(){
							self.noTrigger= true;
							if(args.options.prop){
								let v= Observable.value, l
								l= args.options.prop.length-1
								for(var i=0;i<l;i++){
									v= v[args.options.prop[i]]
								}
								v[l]= this.checked
								Observable.value= Observable.value
							}
							else{
								Observable.value= this.checked
							}
						})
					}
					this.events[id]= Fn
				}


			}
			else{


				if(!this.events[id]){


					Fn= function(ev){

						if(self.noTrigger)
							return self.noTrigger= false

						let v= Observable.value, l
						if(args.options.prop){
							l= args.options.prop.length
							for(var i=0;i<l;i++){
								if(v)
									v= v[args.options.prop[i]]
							}
						}

						if(args.options.event){

							if(!args.options.fnEvent){
								args.options.fnEvent= function(){
									if(args.options.fnEvent1)
										args.options.fnEvent1.apply(this,arguments)
								}

								self.DOM.on(args.options.event, args.options.fnEvent)
							}

							args.options.fnEvent1= v

						}
						else if(args.options.html)
							self.DOM.html(v)
						else if(args.options.text)
							self.DOM.text(v)
						else if(args.options.attr=="value")
							self.DOM.val(v)
						else
							self.DOM.attr(args.options.attr, v)
					}
					Fn()
					Observable.on("change", Fn)
					if(self.DOM.is("input,textarea,select")){
						self.DOM.on("change input", function(){
							self.noTrigger= true
							if(args.options.prop){
								let v= Observable.value, l
								l= args.options.prop.length-1
								for(var i=0;i<l;i++){
									if(v)
										v= v[args.options.prop[i]]
								}
								v[args.options.prop[l]]= this.value
								Observable.value= Observable.value
							}
							else{
								Observable.value= this.value
							}
						})
					}
					this.events[id]= Fn
				}

			}

			if(!this.events[id]){
				if(args.options.remove){
					Observable.on("remove", function(ev){
						self.DOM.remove()
					})
				}

				if(args.options.hide){
					Observable.on("remove", function(ev){
						self.DOM.hide()
					})
				}
			}
		}

		Exe()

		**/ 
	}
}
DomEvents.dq= $("<div>")
export default DomEvents
