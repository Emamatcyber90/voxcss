
var id=0
import {EventEmitter} from 'events'
class ScopeObserver extends EventEmitter{

	constructor(scope){
		super()
		this.scope= scope
		this.events={}
		this.assign={}
		this.gets={}
	}


	observe(args){
		var name= args.name
		var props= this._getparts({
			"name": args.name
		})
		var propStr= props.join("->")

		var ev= this.events[propStr]
		if(!ev){
			ev= this.events[propStr]= {}
			ev.name= name
			ev.emitters= []
			ev.emitters.push(args)
			ev.id= "Observer" + id
			id++
			this._observe(ev, args)
		}
		else{
			ev.emitters.push(args)
			ev.getValue(args)
		}
	}

	assignValue(args){
		var name= args.name
		var value= args.value
		var setter= this.assign[name]
		if(!setter){
			setter= this.assign[name]= {}
			setter.name= name
			this._setter(setter)
		}

		setter.set(value)
	}


	getValue(args){
		var name= args.name
		var getter= this.gets[name]
		if(!getter){
			getter= this.gets[name]= {}
			getter.name= name
			this._getter(getter)
		}

		return getter.get()
	}


	_getter(getter){

		var props= this._getparts(getter)
		var scope= this.scope
		getter.get= function(){

			var value= scope
			for(var i=0;i<props.length;i++){
				if(value)
					value=value[props[i]]
			}		
			return value	

		}

	}


	onValueChanged(prop, func){
		var props= this._getparts({
			"name":prop
		})
		var propStr= props.join("->")
		return this.on("change", (e)=>{
			if(e.prop == propStr){
				if(func)
					return func(e)
			}
		})
	}


	format(format){
		var cached= {}
		var cached2= {}
		var z, i, y, value, str, name,procesar, val

		str=''
		while(format){	
			procesar=true
			i= format.indexOf("#")
			if(i>=0){
				z=i
				procesar= false
				if(format[i+1]=="#")
					i++

				if(format[i+1]=="{"){
					y= format.indexOf("}", i+1)
					if(y>=0){
						str+= format.substring(0, z)
						name= format.substring(i+2, y)

						if(!cached2[name]){
							cached[name]= this.getValue({
								name:name
							})
							cached2[name]= true
						}
						val= cached[name]
						if(val)
							str+=val.toString()

						format= format.substring(y+1)
					}
				}
				else{
					str+=format.substring(0, i+1)
					format= format.substring(i+1)
				}
			}
			if(procesar){
				str+= format
				format=undefined
			}
		}

		return str


	}


	_setter(setter){
		var props= this._getparts(setter)
		var propStr= props.join("->")
		var scope= this.scope
		setter.set= (Val)=>{
			var lastObservable, value= scope, z, first, brek
			for(var i=0;i<props.length;i++){
				z=i
				if(!value){
					// No se puede asignar el valor 
					console.error("dynvox error: No se puede asignar el valor para " + setter.name)
					return 
				}

				value= value.getObservable? value.getObservable(props[i]): null
				if(!value && i==0){
					scope.createVariable(props[i], scope[props[i]])
					value= scope.getObservable(props[i])
				}
					
				if(value){
					lastObservable= value
					value= value.value
				}
				else{
					brek= true
					break
				}
			}

			if(z==props.length-1 && !brek){
				lastObservable.value= Val
				return 
			}

			value= lastObservable.value
			for(var i=z;i<props.length;i++){
				if(!value){
					// No se puede asignar el valor 
					console.error("dynvox error: No se puede asignar el valor para " + setter.name)
					return 
				}

				if(i<props.length-1)
					value= value[props[i]]
				else
					value[props[i]]= Val
			}

			//lastObservable.value=lastObservable.value
			console.info("EMITTING CHANGE", propStr)
			this.emit("change", {
				"observable": lastObservable, 
				"prop": propStr,
				"value": Val
			})


		}
	}

	_getparts(ev){
		var props= [], prop, name
		name= ev.name
		var fixedSection= ev.name.split(">")
		if(fixedSection.length>1){
			props.push(fixedSection[0])
			name= fixedSection[1]
		}

		var eprops= name.split("."), y, z, xp
		for(var i=0;i<eprops.length;i++){
			prop= eprops[i]
			while(true){
				y= prop.indexOf("[")
				if(y>=0){
					xp= prop.substring(0, y)
					if(xp)
						props.push(xp)

					prop= prop.substring(y+1)
					y= prop.indexOf("]")
					if(y>=0){
						xp= JSON.parse(prop.substring(0, y))
						prop= prop.substring(y+1)
						if(xp!==undefined && xp.toString())
							props.push(xp)
					}
				}
				else{
					break;
				}
			}

			if(prop)
				props.push(prop)
		}

		return props
	}


	_observe(ev, args){

		var self= this
		var FnChange= function(e){
			// when chage ...
			var o
			//console.info(ev.emitters)
			for(var i=0;i<ev.emitters.length;i++){
				o= ev.emitters[i]

				if(o.onchange){
					try{
						o.onchange(e)
					}
					catch(e){
						console.error("dynvox error: ", e)
					}
				}
			}		
		}


		var FnPush= function(e){
			// when chage ...
			var o
			//console.info("AQUI ENTRÓ")
			for(var i=0;i<ev.emitters.length;i++){
				o= ev.emitters[i]
				if(o.onpush){
					try{
						o.onpush(e)
					}
					catch(e){
						console.error("dynvox error: ", e)
					}
				}
			}		
		}



		var FnRemove= function(e){
			// when chage ...
			var o
			for(var i=0;i<ev.emitters.length;i++){
				o= ev.emitters[i]
				if(o.onremove){
					try{
						o.onremove(e)
					}
					catch(e){
						console.error("dynvox error: ", e)
					}
				}
			}		
		}

		var FnRemoveAll= function(e){
			// when chage ...
			var o
			for(var i=0;i<ev.emitters.length;i++){
				o= ev.emitters[i]
				if(o.onremoveall){
					try{
						o.onremoveall(e)
					}
					catch(e){
						console.error("dynvox error: ", e)
					}
				}
			}		
		}


		var current= this.scope
		var props= this._getparts(ev)


		//console.info("PROPS: ", props)
		var createChangeFN= function(obs, y, props){
				
			return function(){

				var obj, current=obs, v
				for(var i=y;i<props.length;i++){

					if(current){
						obj= current.getObservable(props[i])
						if(!obj && i==0){
							current.createVariable(props[i], current[props[i]])
							obj= current.getObservable(props[i])
						}

						if(obj && i==props.length-1){

							if(args.array && !(obj.value instanceof core.dynvox.ObservableList)){
								v= obj.value
								obj.value= new core.dynvox.ObservableList(props[i])
								if(v)
									obj.value.value= v
							}
						}
						current=obj
					}

					if(current){

						if(!current.___observableChange)
							current.___observableChange={}

						if(i==props.length-1){
							if(!current.___observableChange[ev.id]){
								current.___observableChange[ev.id]= FnChange
								current.on("change", FnChange)

								// Eventos de array ...
								//console.info("FNPUSH .... ASIGN", current)
								if(args.array){
									current.value.on("push", FnPush)
									current.value.on("remove", FnRemove)
									current.value.on("removeall", FnRemoveAll)
								}
							}
							
						}
						else{

							if(!current.___observableChange[ev.id]){
								current.___observableChange[ev.id]= createChangeFN(current, i+1, props)
								current.on("change", current.___observableChange[ev.id])
							}

						}
					}
				}


				// Tratar de obtener el valor ....
				ev.getValue()



			}
		}


		ev.getValue= function(Funcs){

			var value, l, e
			l= props.length
			value= self.scope
			for(var i=0;i<l;i++){
				if(value)
					value= value[props[i]]
			}
			// EMITCHANGE ...
			if(args.array){
				e= {
					"object": current
				}
				if(Funcs)
					Funcs.onremoveall&&Funcs.onremoveall(e)
				else
					FnRemoveAll(e)


				if(!value){
					console.error("Error al iterar array ", props)
				}
				else{
					for(var i=0;i<value.length;i++){

						if(!value.getObservable){
							ev.observable= new core.dynvox.ObservableValue()
							ev.observable.value= value[i]
						}


						var e= {
							"object": current,
							"observable": value.getObservable?value.getObservable(i.toString()):ev.observable
						}

						if(Funcs)
							Funcs.onpush&&Funcs.onpush(e)
						else
							FnPush(e)
					}
				}
			}
			else{
				e={
					"object": current, 
					"value": value
				}

				if(Funcs)
					Funcs.onchange&& Funcs.onchange(e)
				else
					FnChange(e)
			}
		}

		ev.FnChange= FnChange
		ev.FnPush= FnPush
		ev.FnRemove= FnRemove
		ev.FnRemoveAll= FnRemoveAll

		this.on("change", function(e){
			if(e.prop == props.join("->"))
				FnChange(e)
		})

		//console.info("Procesando: ", props)
		var func= createChangeFN(current, 0, props)
		func()

	}

	
}
export default ScopeObserver