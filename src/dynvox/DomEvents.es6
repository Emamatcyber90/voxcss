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
		var Observable= this.observable
		var Fn, self= this
		var id= Observable.id + DomEvents.optionsToString(self.options)
		if(this.options.repeat){

			if(!this.events[id]){

				var procesar, observable2, observable1

				var getObservable= function(Observable){
					let v= Observable.value, l, saved
					//console.info("PROPS: ", self.options.prop)
					try{
						if(self.options.prop){
							l= self.options.prop.length
							for(var i=0;i<l;i++){
								v= v[self.options.prop[i]]
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

						if(self.options.prop){
							saved= Observable.value
							l= self.options.prop.length-1
							for(var i=0;i<l;i++){
								if(saved)
									saved= saved[self.options.prop[i]]
							}
							if(saved){
								saved[self.options.prop[self.options.prop.length-1]]= v
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
					id= observable2.id + DomEvents.optionsToString(self.options)
					if(self.events[id])
						return 
					//console.info("HERE ----", observable2)
					if(!self.Body){
						self.Body= self.DOM.find(">*")
						self.Body.remove()
					}
					
					Fn= function(ev){

						console.warn("PUSHED", ev)
						var scope2, b= self.Body.clone(true)
						var dq= $("<div>")
						dq.append(b)
						//self.DOM.append(b)
						dq.find(DomParser.q).removeAttr("voxs-ya")

						scope2= self.scope.clone()
						self.scope.append(scope2)
						scope2.add(ev.observable, self.options.vname)
						
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

					id= observable2.id + DomEvents.optionsToString(self.options)
					self.events[id]= Fn

				}
				procesar()
			}


		}
		else if(this.options.ifcondition){

			if(!this.events[id]){
				Fn= function(ev){

					let v= Observable.value, l
					if(self.options.prop){
						l= self.options.prop.length
						for(var i=0;i<l;i++){
							v= v[self.options.prop[i]]
						}
					}

					v= !v
					if(!self.options.negate)
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
						if(self.options.prop){
							let v= Observable.value, l
							l= self.options.prop.length-1
							for(var i=0;i<l;i++){
								v= v[self.options.prop[i]]
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
					if(self.options.prop){
						l= self.options.prop.length
						for(var i=0;i<l;i++){
							if(v)
								v= v[self.options.prop[i]]
						}
					}

					if(self.options.html)
						self.DOM.html(v)
					else if(self.options.text)
						self.DOM.text(v)
					else if(self.options.attr=="value")
						self.DOM.val(v)
					else
						self.DOM.attr(self.options.attr, v)
				}
				Fn()
				Observable.on("change", Fn)
				if(self.DOM.is("input,textarea,select")){
					self.DOM.on("change input", function(){
						self.noTrigger= true
						if(self.options.prop){
							let v= Observable.value, l
							l= self.options.prop.length-1
							for(var i=0;i<l;i++){
								v= v[self.options.prop[i]]
							}
							v[l]= this.value
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
			if(this.options.remove){
				Observable.on("remove", function(ev){
					self.DOM.remove()
				})
			}

			if(this.options.hide){
				Observable.on("remove", function(ev){
					self.DOM.hide()
				})
			}
		}
	}
}
DomEvents.dq= $("<div>")
export default DomEvents
