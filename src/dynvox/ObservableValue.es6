import Observable from './Observable'
import {EventEmitter} from 'events'
class ObservableValue extends Observable{

	constructor(name, value){
		super()
		this.m.name= name
		this.value= value
	}

	get name(){
		return this.m.name
	}





	toJSON(){
		return this.value
	}

	valueOf(){
		return this.value
	}


	set value(value){
		if(this.m.value instanceof core.dynvox.ObservableList && value instanceof Array)
			return this.m.value.value= value

		this.m.value= value
		var ev= {
			value: value,
			object: this
		}
		this.emit("change", ev)
	}


	get value(){
		return this.m.value
	}
}

export default ObservableValue
