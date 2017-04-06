
var id=0
var cons= 0
import {EventEmitter} from 'events'

var NullValue= function(){}

NullValue.valueOf= function(){
	return null
}
NullValue.toString= function(){
	return ""
}


class ScopeBestObserver extends EventEmitter{

	constructor(scope){
		super()
		this.scope= scope
		this.events={}
		this.assign={}
		this.gets={}
		this.setMaxListeners(10000)
		this.propEvents= {}
		this.id= Date.now().toString(32) + (cons++).toString()
	}

	observe(args){
		var str= this._getStr(args.name)
		this._observe(args, str)
	}


	assignValue(args){
		var ev= {
			value: args.value
		}

		var parts= this._getparts(args), current= this.scope, y=0, obj2
		for(var i=0;i<parts.length;i++){
			obj2= current.getObservable? current.getObservable(parts[i]):null
			//console.info(parts[i])
			y=i
			if(!obj2)
				break

			current= obj2
		}

		if(obj2){
			current.value= args.value
			return
		}


		if(!obj2){
			current= this.scope
			for(var i=0;i<parts.length;i++){

				if(i==parts.length-1){
					//console.info("setting val", parts, args.value)
					current[parts[i]]= args.value
					break
				}
				else{
					current= current[parts[i]]
				}

				if(!current){
					console.error("Error al asignar el valor: ", args)
					break
				}
			}
		}



		var str= parts.join("->")
		this._set(str, ev)

		var procesarObjeto= (obj, str)=>{
			if(obj){
				ev.value= NullValue
				for(var id in obj){
					if(str=="tiposervicioActual")
						console.info("ID Debug: ",id)
					if(id!="_F" && id!="_G" && id!="_Array"){
						//console.warn("Changing: ", str + "->" + id)
						this._set(str+"->" + id, ev, obj[id])

						if(typeof obj[id] == "object")
							procesarObjeto(obj[id], str+"->" + id)
					}
				}
			}
		}


		var obj= this.propEventsObject, str2= str
		if(str=="tiposervicioActual")
			console.info("ID Debug: ",obj["tiposervicioActual"])

		for(var i=0;i<parts.length;i++){
			obj= obj[parts[i]]
			if(!obj)
				break

		}
		if(obj)
			procesarObjeto(obj, str)




	}


	format(format, escape){
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
						if(escape && val){
							val= core.dynvox.EscapeHtml(val)
							val= val.replace(/\r?\n|\r/ig, "<br/>")
						}

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


	revisarArray(str, value){
		var ev
		if(value ){
			value._G= value._G ||{}
			if(value instanceof core.dynvox.ObservableList && !value._G[this.id]){

				value.on("push", (ev)=>{
					this._push(str, ev)
				})

				value.on("remove", (ev)=>{
					this._remove(str, ev)
				})

				value.on("removeall", (ev)=>{
					this._removeall(str, ev)
				})

			}



			if(value instanceof Array || value instanceof core.dynvox.ObservableList){


				if(value.length>0 && !(value instanceof core.dynvox.ObservableList))
					this._removeall(str,ev)

				for(var i=0;i<value.length;i++){
					ev= {
						value:value[i],
						"observable": value&&value.getObservable? value.getObservable(i): null
					}

					if(!ev.observable){
						ev.observable= new core.dynvox.ObservableValue()
						ev.observable.value= ev.value
					}
					this._push(str, ev)
				}


			}
			value._F= true
			if(value._G)
				value._G[this.id]= true

		}
	}



	revisar(observable, partOut){
		var parts= [].concat(partOut)
		var str= parts.join("->")
		this.observableEvents= this.observableEvents || {}
		if(this.observableEvents[str])
			return



		var observableListChanges= ()=>{
			this.revisarArray(str, observable.value)
		}


		observable.on("change", (ev)=>{

			// Marcar el cambio
			this._set(str, ev)


			var procesarObjeto= (obj, str)=>{
				if(obj){
					ev.value= NullValue
					for(var id in obj){
						if(id!="_F" && id!="_Array"){

							this._set(str+"->" + id, ev, obj[id])
							if(typeof obj[id] == "object")
								procesarObjeto(obj[id], str+"->" + id)
						}

					}
				}
			}


			//console.warn("Changing: ", str, parts)
			var obj= this.propEventsObject
			if(str=="tiposervicioActual")
				console.info("ID Debug: ",obj["tiposervicioActual"])


			for(var i=0;i<parts.length;i++){
				obj= obj[parts[i]]
				if(!obj)
					break

			}
			if(obj)
				procesarObjeto(obj, str)

			/*
			for(var i=0;i<parts.length;i++){
				obj= obj[parts[i]]
				if(!obj)
					break
			}

			if(obj){
				ev.value= NullValue
				for(var id in obj){
					this._set(str+"->" + id, ev)
				}
			}*/


			observableListChanges()

		})
		observableListChanges()


	}


	onValueChanged(name, func){


		var str= this._getStr(name)
		var args={
			name,
			onchange: func
		}
		this._observe(args, str)

	}

	getValue(args){
		var name= args.name
		var str= this._getStr(name)
		return this.__getValue(str)
	}


	__getValue(str){
		var current=this.scope
		var parts= str.split("->")
		for(var i=0;i<parts.length;i++){
			current= current[parts[i]]
			if(!current)
				break
		}

		return current
	}


	_set(str, ev, args){

		if(ev.value==NullValue){
			ev.value= this.__getValue(str)
		}


		if(args && args._Array && !ev.value)
			this._removeall(str,ev)


		var events= this.propEvents[str]
		if(!events)
			return //console.warn("No se pudo obtener el evento change de: ", str)


		//console.warn("Changing: ", str + "->" + id)
		if(events.onchange && events.onchange.length){

			if(this._onlyLast){
				this._onlyLast.onchange&&this._onlyLast.onchange(ev)
			}
			else{
				for(var i=0;i<events.onchange.length;i++){
					if(events.onchange[i]){
						try{
							events.onchange[i](ev)
						}
						catch(e){
							console.error("Error en change event: ", str, e)
						}

					}
				}
			}
		}

		this.revisarArray(str, ev.value)
	}


	_push(str, ev){
		var events= this.propEvents[str]
		if(events && events.onpush && events.onpush.length){

			if(this._onlyLast){
				this._onlyLast.onpush && this._onlyLast.onpush(ev)
			}
			else{
				for(var i= 0;i<events.onpush.length;i++){
					if(events.onpush[i]){
						try{
							events.onpush[i](ev)
						}
						catch(e){
							console.error("Error en push event: ", str, e)
						}
					}
				}
			}
		}

		// Los scopes heredan los observables, así que se hace
		// aquí la respectiva asignación:


	}

	_remove(str, ev){
		var events= this.propEvents[str]
		if(events && events.onremove && events.onremove.length){
			for(var i=0;i<events.onremove.length;i++){
				if(events.onremove[i]){
					try{
						events.onremove[i](ev)
					}
					catch(e){
						console.error("Error en remove event: ", str, e)
					}

				}
			}
		}
	}


	_removeall(str, ev){
		var events= this.propEvents[str]
		if(events && events.onremoveall && events.onremoveall.length){
			if(this._onlyLast){
				this._onlyLast.onremoveall&& this._onlyLast.onremoveall(ev)
			}else{
				for(var i=0;i<events.onremoveall.length;i++){
					if(events.onremoveall[i]){
						try{
							events.onremoveall[i](ev)
						}
						catch(e){
							console.error("Error en removeall event: ", str, e)
						}

					}
				}
			}
		}
	}



	_observe(args, str){

		var parts= str.split("->"), obs, v, partOut=[], current, st, obj
		obj= this.propEventsObject= this.propEventsObject||{}
		for(var i=0;i<parts.length;i++){
			obj= obj[parts[i]]= obj[parts[i]]||{}
		}

		this.propEvents=this.propEvents||{}

		//console.info("STR: ", str)

		obj2= this.propEvents[str]= this.propEvents[str]||{}
		//obj2.$$events= obj2.$$events || {}
		obj2.onchange=obj2.onchange||[]
		obj2.onchange.push(args.onchange)
		if(args.array){
			obj2.onpush=obj2.onpush||[]
			obj2.onpush.push(args.onpush)

			obj2.onremove=obj2.onremove||[]
			obj2.onremove.push(args.onremove)

			obj2.onremoveall=obj2.onremoveall||[]
			obj2.onremoveall.push(args.onremoveall)
		}


		this._onlyLast= args
		this._set(str, {
			value: NullValue
		})
		this._onlyLast= false


		//  Se modifica porque se detectó problemas de repetición
		//  de datos. Hay que verificar que todo siga funcionando
		/*
		var ev, value= this.__getValue(str)
		args.onchange && args.onchange({value})
		if(args.array){
			if(value && value.length){

				for(var i=0;i<value.length;i++){
					ev= {
						value:value[i],
						"observable": value&&value.getObservable? value.getObservable(i): null
					}

					if(!ev.observable){
						ev.observable= new core.dynvox.ObservableValue()
						ev.observable.value= ev.value
					}
					//this._push(str, ev)
					args.onpush && args.onpush(ev)
				}

			}
		}*/


		/*
		if(args.array){

			var ev, value= this.__getValue(str)

			console.info("Value from initial: ", value, str)
			if(value && value instanceof Array){


				for(var i=0;i<value.length;i++){
					ev= {
						value:value[i],
						"observable": value&&value.getObservable? value.getObservable(i): null
					}

					if(!ev.observable){
						ev.observable= new core.dynvox.ObservableValue()
						ev.observable.value= ev.value
					}
					this._push(str, ev)
				}
			}

		}*/


		if(obj._F)
			return

		obj._Array= args.array
		obj._F= true
		//if(parts.length==1){
			// Crear el observable si es necesario ...
			obs= this.scope.getObservable(parts[0])
			if(!obs){
				console.info("SCOPE",parts[0], this.scope)
				this.scope.createVariable(parts[0], this.scope[parts[0]])
				obs= this.scope.getObservable(parts[0])
			}

			if(parts.length==1 && args.array && !(obs.value instanceof core.dynvox.ObservableList)){
				v= obs.value
				obs.value= new core.dynvox.ObservableList(parts[0])
				if(v)
					obs.value.value= v
			}
		//}

		current= this.scope
		for(var i=0;i<parts.length;i++){
			st= parts[i]
			obs= current.getObservable(st)
			partOut.push(st)
			if(obs){
				this.revisar(obs, partOut)
			}
			else{
				break
			}
			current= obs
		}


	}



	_getStr(name){

		var e= this._getparts({
			name
		})
		return e.join("->")
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

}


export default ScopeBestObserver
