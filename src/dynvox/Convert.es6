import Observable from './Observable'
import ObservableValue from './ObservableValue'
import ObservableList from './ObservableList'

class Convert{
	static toObservable(value){
		var v1
		if(value instanceof Observable){
			return value
		}
		else if(value instanceof Array){
			return new ObservableList('', value)
		}
		else{
			v1= new ObservableValue('')
			v1.value= value
			return v1
		}
	}
}

export default Convert
