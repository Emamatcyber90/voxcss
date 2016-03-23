
/**
* @author James Suárez
* 15-03-2016
*/

var events= require("events").EventEmitter
var vox= core.VW.Web.Vox

class Element extends events{
	constructor(){
		super()
	}

	createEvent(eventName, originalEvent){
		var ev= vox.platform.createEvent(eventName)
		if(originalEvent)
			ev.originalEvent= originalEvent

		return ev
	}
	
	emit(ev){
		var name;
		if(arguments.length>1)
			name= ev.type
		else
			name=arguments[0]
		super.emit(name, arguments[1])
	}

}

export default Element