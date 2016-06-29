
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




	get name(){
		return this.m.name
	}

	get parent(){
		return this.m.parent
	}

	set parent(parent){
		this.m.parent= parent
	}


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
		//this.length= this.length|0
		var v1= new ObservableValue(this.length.toString())
		v1.value= value
		v1.parent= this
		this.add(v1)
	 	Array.prototype.push.call(this, value)
		this.emit("push", {
			object: this,
			observable: v1
		})
	}

	/*
	get(index){
		return this[index].value
	}

	set(value, index){
		this[index].value= value
	}*/


	pop(){
		var o= this.v[this.length-1]
		if(o&& o.remove){
			o.remove()
		}
		Array.prototype.pop.call(this)
	}


	shift(){
		var o= this[0]
		if(o&& o.remove){
			o.remove()
		}

		Array.prototype.shift.call(this)
	}

	/*
	filter(Fn){
		var Fn2= function(){
			arguments[0]= arguments[0].value
			return Fn.apply(this, arguments)
		}
	}
	*/

	removeIndex(index){
		if(this.v[index] && this.v[index].remove)
			this.v[index].remove()

		this.v[index]= null
		for(var i=index;i<this.length;i++){
			this.v[i]= this[i+1]
		}
		Array.prototype.pop.call(this)
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
		this.emit('removeall', ev)
	}


}

for(var id in Array.prototype){
	if(!ObservableList.prototype[id])
		ObservableList.prototype[id]= Array.prototype[id]
}

export default ObservableList
