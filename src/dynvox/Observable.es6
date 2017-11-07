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
		this.m.parents=[]
		this.v={}
		this.setMaxListeners(100)
	}


	reset(){

		if(this.v){
			for(var id in this.v){
				Object.defineProperty(this.v, id, {
					set:undefined,
					get:undefined
				})
			}
		}

		delete this.m.parents
		delete this.v
		this.m.parents=[]
		this.v={}
	}


	static reset(){
		_id=0
	}


	_triggerChange(){
		var ev= {
			value: this.value,
			object: this
		}
		this.emit("change", ev)
	}


	getObservable(index){
		return this.v[index]
	}

	/*

	get parent(){
		return this.m.parent
	}

	set parent(parent){
		this.m.parent= parent
	}

	*/

	set parent(parent){
		this.m.parents= this.m.parents||[]
		this.m.parents.push(parent)
	}

	get parent(){
		return this.m.parents[0]
	}


	getListParents(){
		var parent, ps=[]
		for(var i=0;i<this.m.parents.length;i++){
			parent= this.m.parents[i]
			if(parent instanceof core.dynvox.ObservableList)
				ps.push(parent)
		}

		return ps
	}



	add(/*ObservableValue*/ obj, name){
		if(!name)
			name= obj.name

		this.v[name]= obj
		obj.parent= this
		//console.info("PARENT: ", obj.parent)
		this.__defineSetter__(name, function(val){
			if(!this.v[name])
				this.v[name]= new core.dynvox.ObservableValue(name)
			this.v[name].value = val
		})
		this.__defineGetter__(name, function(val){
			var o= this.v[name]
			return o?o.value:undefined
		})
		this.emit("add", {
			object: this
		})
	}

	remove(){

		var parents=this.getListParents()
		if(parents.length>0){
			for(var i=0;i<parents.length;i++){
				parents[i]._removeValue(this)
			}
		}
		this._triggerRemove()
	}


	_triggerRemove(){
		var ev= {
			object: this,
			observable:this
		}
		this.emit("remove", ev)
	}


	_triggerIndexChanged(){	
		// En caso sea array ..
		var ev= {
			observable:this,
			value: this.$index
		}
		this.emit("indexchange", ev)
	}


	_triggerHide(){
		if(this._hide)
			return

		var ev= {
			object: this,
			observable:this
		}
		this.emit("hide", ev)
		this._hide= true
	}

	_triggerShow(){
		if(this._show)
			return 

		var ev= {
			object: this,
			observable:this
		}
		this.emit("show", ev)
		this._show= true
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
