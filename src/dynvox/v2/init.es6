
class DynvoxV2{

	static get Observable(){
		return require("./Observable").default
	}



	static get Scope(){
		return require("./Scope").default
	}
	
	static get DomParser(){
		return require("./DomParser").default
	}



	
	
}

exports= module.exports= DynvoxV2
core.dynvox.v2= DynvoxV2
//VoxScope.DomParser.init()
