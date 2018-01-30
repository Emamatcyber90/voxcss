
/**
* @author James Suárez
* 15-03-2016
*/
/*global core*/
var events= require("events").EventEmitter
var vox= core.VW.Web.Vox

class Element extends events{
	constructor(){
		super()
	}
	
	attachEvent(obj, event, func){
    	this.func= this.func||[]
    	this.func.push({
    		obj,
    		event,
    		func
    	})
    	obj.on(event, func)
    }
    
    
    dynamicDispose(){
    	var ev
    	if(this.func){
    		for(var i=0;i<this.func.length;i++){
    			ev= this.func[i]
	    		ev.obj.removeListener?ev.obj.removeListener(ev.event, ev.func): ev.obj.off(ev.event, ev.func)
	    		this.func[i]=undefined
    		}
    		delete this.func
    	}
    }
    
	createEvent(eventName, originalEvent){
		var ev= vox.platform.createEvent(eventName)
		if(originalEvent)
			ev.originalEvent= originalEvent

		return ev
	}
	
	emit(ev){
		var name;
		if(arguments.length<2)
			name= ev.type
		else{
			name=arguments[0]
			ev= arguments[1]
		}
		super.emit(name, ev)
	}

}

export default Element