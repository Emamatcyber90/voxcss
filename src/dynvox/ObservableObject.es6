
import Observable from './Observable'
import ObservableValue from './ObservableValue'

class ObservableObject extends Observable{


	constructor(value){
		super()
		var v
		for(var id in value){
			v= new ObservableValue(id, value[id])
			this.add(v)
		}
	}


}

export default ObservableObject
