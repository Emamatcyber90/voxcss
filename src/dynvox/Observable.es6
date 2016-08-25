import {EventEmitter} from 'events'

var _id=0
class Observable extends EventEmitter{

	constructor(){
		this.id= _id++
		super()
		//this.m={}
		Object.defineProperty(this, "m", {
			enumerable: false,
			writable:true,
			value: {}
		})
		this.v={}


	}




	getObservable(index){
		return this.v[index]
	}


	get parent(){
		return this.m.parent
	}

	set parent(parent){
		this.m.parent= parent
	}



	add(/*ObservableValue*/ obj, name){
		if(!name)
			name= obj.name
		this.v[name]= obj
		obj.parent= this
		this.__defineSetter__(name, function(val){
			this.v[name].value = val
		})

		this.__defineGetter__(name, function(val){
			return this.v[name].value
		})

		this.emit("add", {
			object: this
		})
	}

	remove(){
		var ev= {
			object: this
		}
		this.emit("remove", ev)
	}




	initEvents(){
		this.m.inited= true
	}

	stopEvents(){
		this.m.inited= false
	}

	/*
	emit(arg1, ev){
		//if(!this.m.inited)
		//	return

		super.emit(arg1,ev)
		/*
		if(this.m.parent)
			this.m.parent.emit(arg1, ev)

	}*/


}

export default Observable
