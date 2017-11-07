
import {EventEmitter} from 'events'
import Observable from './Observable'
import ObservableValue from './ObservableValue'
import Convert from './Convert'

class ObservableList extends Observable{

	constructor(name, value){
		super()
		Array.call(this)
		this.m.name= name
		this.length= this.length|0
		if(value)
			this.value= value
	}

	toArray(){
		return Array.prototype.slice.call(this, 0, this.length)
	}


	get name(){
		return this.m.name
	}


	/*

	get parent(){
		return this.m.parent
	}

	set parent(parent){
		this.m.parent= parent
	}
	*/


	set value(value){
		if(!value instanceof Array){
			throw new core.System.ArgumentException("Se esperaba un argumento que fuera del tipo Array")
		}

		this.removeAll()
		for(var i=0;i<value.length;i++){
			this.push(value[i])
		}
	}


	get value(){
		return this
	}

	toJSON(){
		return Array.prototype.slice.call(this, 0, this.length)
	}

	push(value){
		var v1= new ObservableValue(this.length.toString())
		v1.value= value
		v1.$index= this.length
		this.add(v1)
	 	Array.prototype.push.call(this, value)
		this.emit("push", {
			object: this,
			observable: v1,
			index: v1.$index
		})
	}



	pop(){
		if(this.length>0)
			this.removeIndex(this.length-1)
	}


	shift(){
		if(this.length>0)
			this.removeIndex(0)
	}

	/*
	filter(Fn){
		var Fn2= function(){
			arguments[0]= arguments[0].value
			return Fn.apply(this, arguments)
		}
	}*/



	sort(){
		Array.prototype.sort.apply(this, arguments)
		return this
	}




	removeIndex(index){
		var current= this.v[index]
		if(current && current.remove)
			current._triggerRemove()
		this._removeIndex(index)
	}






	_removeIndex(index){
		for(var i=index;i<this.length;i++){
			this.v[i]= this.v[i+1]
			if(this.v[i]){
				this.v[i].$index--
				this.v[i]._triggerIndexChanged()
			}
		}
		Array.prototype.pop.call(this)
	}

	_removeValue(value){
		for(var i=0;i<this.length;i++){
			if(this.v[i]== value)
				return this._removeIndex(i)
		}
	}


	removeValue(value){
		for(var i=0;i<this.length;i++){
			if(this[i]== value)
				return this.removeIndex(i)
		}
	}


	removeAll(){
		var ev
		ev= {
			object:this
		}
		for(var i=0;i<this.length;i++){
			this.v[i].remove()
		}

		Array.prototype.splice.call(0, this.length)
		this.length=0
		this.emit('removeall', ev)

	}


}

for(var id in Array.prototype){
	if(!ObservableList.prototype[id])
		ObservableList.prototype[id]= Array.prototype[id]
}

export default ObservableList
