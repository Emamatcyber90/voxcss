



var padd= function(arr,config){
	if(config instanceof Array){
		for(var i=0;i<config.length;i++){
			config[i].output.path= __dirname+"/dist"
			arr.push(config[i])
		}
		return
	}
	config.output.path= __dirname+"/dist"
	arr.push(config)
}

var arr= module.exports=[]
// Core-basic
padd(arr, core.VW.Web.Compiler.Compiler.coreBasic.config)
// Core
padd(arr, core.VW.Web.Compiler.Compiler.core.config)

arr.push(require("./example.js"))
arr.push(require("./core-webelements.js"))
arr.push(require("./core-elements.js"))
arr.push(require("./core-style.js"))
arr.push(require("./dynvox.js"))
