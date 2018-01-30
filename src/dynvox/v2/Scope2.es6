/*global core*/
var Observable= core.dynvox.v2.Observable
import e from './_extensions'

var id=0
class Scope extends Observable{
	
	static get(name){
		var sc=  Scope.v[name]|| Scope.create(name)
		sc.makeScope()
		//this.id= id++
		var proxy= sc.getProxy()
		//sc.m.createVariable= sc.createVariable.bind(sc)
		//sc.m.on= sc.on.bind(sc)
		//sc.m.once= sc.once.bind(sc)
		return proxy
	}
	

	get $$isscope(){
		return true
	}
	
	makeScope(){
		this.m.id= this.id
		this.m.$$isscope= true
		this.m.onchange= this.onchange.bind(this)
		this.m.removechange= this.removechange.bind(this)
		this.m.emit= this.emit.bind(this)
		this.m.on= this.on.bind(this)
		this.m.removeListener= this.removeListener.bind(this)
		this.m.removeEventsByPrefix= this.removeEventsByPrefix.bind(this)
		//this.m.removeEventsByIdentifierPrefix= this.removeEventsByIdentifierPrefix.bind(this)
		this.m.removeEvent= this.removeEvent.bind(this)
		this.m.once= this.once.bind(this)
		this.m.createChild= this.createChild.bind(this)
		this.m.global= global
		this.m.clone= this.clone.bind(this)
		this.m.createVariable= this.createVariable.bind(this)
		this.m.getProxy= this.getProxy.bind(this)
	}
	
	onchange(name, func, event, identifier){
		event= event||"change"
		if(typeof func != "function")
			return 
			
			
		this.$$$onc= this.$$$onc||{}
		Scope.$$$all= Scope.$$$all||{}
		this.$$$all= this.$$$all||{}
		this.$$$atached=this.$$$atached||{}
		
		if(!identifier){
			this.$$$onc[event + "." + name]=  this.$$$onc[event + "." + name]||[]
		}
		else{
			Scope.$$$all[identifier]=  Scope.$$$all[identifier]||[]
		}
		
		if(!this.$$$atached[event]){
			
			this.on(event, (ev)=>{
				var j, toremove=[]
				if(ev.name){
					if(j=this.$$$onc[event + "." + ev.name]){
						j.forEach(function(a){
							a(ev)
						})
						//this.emit(event +"." + ev.name, ev)
					}
					
					
					for(var id in this.$$$all){
						
						j=Scope.$$$all[id]
						if(j){
							j.forEach(function(a){
								if(a.filtername){
									if(ev.name!=a.filtername)
										return 
								}
								a(ev)
							})
						}else{
							toremove.push(id)
						}
					}
					
					for(var i=0;i<toremove.length;i++){
						delete j[toremove[i]]
					}
				}
			})
			this.$$$atached[event]= true
		}
		
		
		if(!identifier){
			this.$$$onc[event + "." + name].push(func)
		}
		else{
			if(name){
				func.filtername= name
			}
			Scope.$$$all[identifier].push(func)
			this.$$$all[identifier]= true
		}
		
	}
	
	
	
	
	removeEventsByPrefix(prefix,event){
		var j
		event= event || "change"
		prefix= event +"." + prefix
		
		if(this.$$$onc){
			for(var id in this.$$$onc){
				if(id.startsWith(prefix)){
					j=this.$$$onc[id]
					console.info("REMOVED LISTENERS: ", j.length)
					j.splice(0, j.length)
					
				}
			}
		}
	}
	
	static removeEventsByIdentifierPrefix(prefix){
		var j
		
		if(Scope.$$$all){
			for(var id in Scope.$$$all){
				if(id.startsWith(prefix)){
					j=Scope.$$$all[id]
					console.info("REMOVED LISTENERS: ", j.length)
					j.splice(0, j.length)
					delete Scope.$$$all[id]
				}
			}
		}
	}
	
	
	
	
	removeEvent(prefix, event){
		var j
		event= event || "change"
		prefix= event +"." + prefix
		
		if(this.$$$onc){
			j=this.$$$onc[prefix]
			console.info("REMOVED LISTENERS: ", j.length)
			j.splice(0, j.length)
		}
	}
	
	
	
	removechange(name, func, event){
		event= event||"change"
		this.removeListener(event + "." + name, func)
	}
	
	set(obj,prop,value){
		if(prop.startsWith("$$$")){
			obj[prop]= value
			return true
		}
		
		Observable.prototype.set.call(this, obj,prop,value)
		return true
	}
	
	
	get(obj, prop){
		if(prop in obj)
			return obj[prop]
		
		if(prop.startsWith("$$$"))
			return 
		
		// Find in parent Scopes 
		if(this._parents){
			for(var id in this._parents){
				if(prop in this._parents[id].m)
					return this._parents[id].m[prop]
			}
		}
		
		return undefined
	}
	
	
	createChild(){
		var scope= new Scope()
		scope.makeScope()
		scope.setParent("",this)
		return scope.getProxy()
	}
	
	get global(){
		return global
	}
	

	
	static create(name){
		return Scope.v[name]= new Scope()
	}
	
	clone(){
		throw new core.System.NotImplementedException()
	}
	
	createVariable(name,value){
		this.getProxy()[name]= value
	}
	
}
Scope.v={}
export default Scope
