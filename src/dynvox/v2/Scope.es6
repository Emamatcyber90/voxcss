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
		this.m.attach= this.attach.bind(this)
		this.m.createEvent= this.createEvent.bind(this)
		this.m.createFilter= this.createFilter.bind(this)
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
	
	
	attach(options){
		var dom= options.dom[0]
		/*if(!dom.dynamic_scope){
			dom.dynamic_scope= this
		}*/
		
		
		var event= options.event || "change"
		//dom.dynamic_events=dom.dynamic_events||{}
		options.scope=this
		dom.dynamic_events=dom.dynamic_events||[]
		dom.dynamic_events.push(options)
		
	
		
		/*
		this.$$$dom=this.$$$dom||[]
		this.$$$dom.push(dom)
		this.$$$events=this.$$$events||{}
		if(!this.$$$events[event]){
			this.on(event,this.createEvent(event))
			this.$$$events[event]=true
		}*/
		
		
		
		if(options.name){
			options.func= this.createFilter(options.func,options.name)
		}
		this.on(event, options.func)
		
		
		//dom.dynamic_events[event]= dom.dynamic_events[event]||[]
		//dom.dynamic_events[event].push(options)
	}
	
	createFilter(func,name){
		return function(ev){
			if(ev.name==name)
				return func(ev)
		}
	}
	
	createEvent(event){
		var self= this
		return function(ev){
			var dom, event1, remove
			for(var i=0;i<self.$$$dom.length;i++){
				dom= self.$$$dom[i]
				if(!dom.dynamic_scope){
					self.$$$dom[i]= null
					remove= true
				}
					
				if(dom && dom.dynamic_events && dom.dynamic_events[event]){
					for(var y=0;y<dom.dynamic_events[event].length;y++){
						event1= dom.dynamic_events[event][y]
						if(event1){
							if((!event1.event && event=="change") || event1.event==event){
								if(!event1.name || event1.name==ev.name){
									try{
										event1.func(ev)
									}catch(e){
										console.error("> Executing error: ", event, e)
									}
								}
							}
						}
					}
				}
			}
			if(remove){
				self.$$$dom= self.$$$dom.filter((a)=> !!a)
			}
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
	
	_get(prop,ex){
		if(prop in this.m){
			ex.exists= true
			return this.m[prop]
		}
		
		var v
		if(this._parents){
			for(var id in this._parents){
				v= this._parents[id]._get(prop, ex)
				if(ex.exists)
					return v
			}
		}
		
		return undefined
		
	}
	
	get(obj, prop){
		
		if(prop=="$$isobservable")
			return true 
			
		if(prop=="$$observable")
			return obj[prop]
			
		if(prop in obj)
			return obj[prop]
		
		if(typeof prop=="string" && prop.startsWith("$$$"))
			return 
			
		var ex={}
		var v=this._get(prop, ex)
		if(ex.exists)
			return v 
			
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
