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
	    this.scope= scope
	    this.events=[]
	    ScopeBestObserver.id++
	    this.id= ScopeBestObserver.id
    }
    
    
   

}
ScopeBestObserver.id=0
export default ScopeBestObserver
