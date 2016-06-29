
class VoxScope{

	static get Observable(){
		return require("./Observable").default
	}

	static get ObservableList(){
		return require("./ObservableList").default
	}

	static get ObservableValue(){
		return require("./ObservableValue").default
	}

	static get ObservableObject(){
		return require("./ObservableObject").default
	}

	static get Scope(){
		return require("./Scope").default
	}

	static get Convert(){
		return require("./Convert").default
	}

	static get DomParser(){
		return require("./DomParser").default
	}

	static get DomEvents(){
		return require("./DomEvents").default
	}

}

exports= module.exports= VoxScope
core.dynvox= VoxScope
//VoxScope.DomParser.init()
