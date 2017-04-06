import Observable from './Observable'
import ObservableValue from './ObservableValue'
import ScopeObserver from './ScopeObserver'

class Scope extends Observable{
	static get(name){
		return Scope.v[name]|| Scope.create(name)
	}
	static create(name){
		return Scope.v[name]= new Scope()
	}

	append(scope){
		this.scopes.push(scope)
		scope.parent= this
	}

	get observer(){
		if(!this.$observer)
			this.$observer= new core.dynvox.ScopeBestObserver2(this)

		return this.$observer
	}

	static reset(){
		delete this.v
		this.v= {}
	}


	reset(){
		if(this.scopes){
			for(var i=0;i<this.scopes.length;i++){
				this.scopes[i].reset()
			}
		}
		delete this.$observer
		super.reset()
	}



	createVariable(name, value){
		this.add(new ObservableValue(name))
		this[name]= value
	}

	remove(nameOrObj){
		if(typeof nameOrObj==="string")
			nameOrObj= this.v[nameOrObj]

		nameOrObj.remove()
	}

	clone(){
		var n= Object.getPrototypeOf(this)
		var no= new n.constructor()
		for(var id in this.v){
			no.add(this.v[id], id)
		}

		return no
	}

	constructor(){
		super()
		this.scopes=[]
	}

}
Scope.v={}
export default Scope
