



var padd= function(arr,config){
	if(config instanceof Array){
		for(var i=0;i<config.length;i++){
			arr.push(config[i])
		}
		return 
	}
	arr.push(config)
}

var arr= module.exports=[]
// Core-basic 
//padd(arr, core.VW.Web.Compiler.Compiler.coreBasic.config)
// Core
//padd(arr, core.VW.Web.Compiler.Compiler.core.config)

//arr.push(require("./core-elements.js"))
arr.push(require("./core-style.js"))