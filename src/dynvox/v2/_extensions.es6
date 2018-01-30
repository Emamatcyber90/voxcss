
var Methods={}
//Methods.slice= Array.prototype.slice

Methods.splice= Array.prototype.splice
Methods.push= Array.prototype.push
Methods.filter= Array.prototype.filter


Array.prototype.splice= function(index,length){
	var result
	
	
	result= Methods.splice.apply(this, arguments)
	if(this.$$observable){
		this.$$observable.emitToScope(null, arguments, "splice")
	}
	return result
}
Array.prototype.push= function(){
	var result, index
	index= this.length
	result= Methods.push.apply(this, arguments)
	if(this.$$observable){
		this.$$observable.emitToScope(null, {
			"0": this[index],
			index
		}, "push")
	}
	return result
}


/* Métodos puestos por compatibilidad con versión 1 */
Array.prototype.toArray= function(){
	return [].concat(this)
}

Array.prototype.removeAll= function(){
	var result= this.splice(0, this.length)
	this.length=0
	return result 
}
Array.prototype.removeValue= function(value){
	var index=this.indexOf(value)
	if(index<0)
		return 
	this.splice(index,1)
}