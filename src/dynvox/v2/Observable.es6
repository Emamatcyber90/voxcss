import {EventEmitter} from 'events'
var _id=0
class Observable extends EventEmitter{

	constructor(m){
		this.id= _id++
		this.m= m || {}
		//this.m.$$observable= this
		
		Object.defineProperty(this.m, "$$observable", {
		    enumerable: false,
		    writable: true,
		    readable:true,
		    value: this
		})
		

		EventEmitter.call(this)
		super()
		this.setMaxListeners(100)
	}
	
	
	

	
	set _name(value){
		this._iname= value
	}
	get _name(){
		return this._iname
	}
	
	
	setParent(name, object){
		this._parents=this._parents||{}
		this._parents[name+"$"+object.id]= object
	}
	
	removeParent(name,object){
		this._parents=this._parents||{}
		delete this._parents[name+"$"+object.id]
	}
	
	
	getProxy(){
		if(this.$proxy)
			return this.$proxy
		
		this.$proxy= new Proxy(this.m, this)
		return this.$proxy
	}
	
	
	
	
	isProxyable(value){
		
		if(typeof value=="object"){
			if(value && !(value instanceof Date) && !(value instanceof global.Element))
				return true
		}
		
	}
	
	
	getObservableAndObject(prop, value, parent){
		
		var obs
		if(this.isProxyable(value)){
			if(value.$$isobservable){
				obs= value.$$observable
			}
			else{
				obs= value.$$observable
				if(!obs)
					obs= new Observable(value)
				obs._name= prop
				value= obs.getProxy()
			}
		}
		if(!parent)
			parent= this
		
			
		return {
			obs, 
			value
		}
		
	}
	
	get $$observable(){
		return this
	}
	
	get $$isobservable(){
		return true
	}
	
	
	get(m, prop){
		if(prop=="$$isobservable")
			return true 
		
		return m[prop]
	}
	
	
	set(m, prop,value){
		
		if(prop=="$$observable"){
			throw new core.System.Exception("Denied Exception")
		}
		
		var obs= null
		var obs2=null
		var result
		
		
		result= this.getObservableAndObject(prop, value)
		obs=result.obs
		if(obs)
			value=result.value
		
		
		if(obs && obs.$$observable){
			window.DEBUG && console.info("SETTING PARENT", prop, this)
			obs.setParent(prop, this)
		}
		
		
		var current= m[prop], keys
		if(current!=value){
			if(typeof current=="object" && current){
				if(current.$$observable){
					obs2= current.$$observable
				}
			}
			if(obs2){
				if(current && value && current.$$observable && value.$$observable && current.$$observable==value.$$observable){
					//console.info("PARENT NOT CHANGED")
				}
				else{
					
					//console.info("REMOVING:", prop, current,value, obs2)
					obs2.removeParent(prop, this)
				}
			}
			m[prop]= value
			var safeObject=[]
			
			if(value && value.$$isobservable){
				// Ajustar todas las propiedades 
				if(value instanceof Array){
					for(var i=0;i<value.length;i++){
						if(value[i] && !value[i].$$isobservable)
							value[i]= value[i]
					}
				}
				else{
					var keys=Object.keys(value), key
					for(var i=0;i<keys.length;i++){
						key=keys[i]
						if(value[key] && !value[key].$$isobservable)
							value[key]= value[key]
					}
				}
			}
			
			this.emitToScope(prop, value)
			//emitProps(value, prop)
			safeObject=null
			
		}
		return true
	}
	
	
	emitToScope(name,value, event, num=0){
		var p, emitted, rname,i, uname
		
		if(this.$$isscope){
			this.emit(event || "change", {
				origin: this, 
				name,
				value
			})
			//console.info(id, this, event||"change", "NAME CHANGED: ", name,  "VALUE: ", value)
			return 
		}
		
		
		if(this._parents){
			for(var id in this._parents){
				p= this._parents[id]
				
				
				i= id.indexOf("$")
				rname=id.substring(0, i)
				uname= name ? (rname?rname + ".":"") + name : rname
				//console.info("PARENT:",p)
				if(p.$$isscope){
					p.emit(event || "change", {
						origin: this, 
						name:uname,
						value
					})
					//console.info(id, p, event||"change", "NAME CHANGED: ", uname,  "VALUE: ", value)
				}
				else {
					if(p==this)
						return console.error("CIRCULAR EMIT DETECTED")
					if(num> 20)
						throw new core.System.Exception("Maximum nested level reached")
					
					p.emitToScope(uname,value, event, num++)
				}
				emitted= true
			}
		}
		else{
			uname= name ? (this._iname?this._iname + ".":"") + name : this._iname
		}
		if(!emitted){
			this.emit(event || "change", {
				origin: this, 
				name:uname,
				value
			})
			//console.info(event, "NAME CHANGED: ", uname,  "VALUE: ", value)	
		}
	}
	

}

export default Observable
