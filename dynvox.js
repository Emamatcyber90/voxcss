var Path= require("path");


// Convert ..
var fs= require("fs")
if(!fs.existsSync(__dirname + "/out"))
	fs.mkdirSync(__dirname + "/out")
core.VW.Transpile(__dirname + "/src/dynvox", __dirname + "/out/dynvox")




var ExtractTextPlugin = require("vox-webcompiler/node_modules/extract-text-webpack-plugin");
var minimal= core.VW.Web.Compiler.minimal
if(typeof Promise ==="undefined"){
	global.Promise= require("bluebird")
}


// var htmlExtract= new ExtractTextPlugin("webelements-result");

module.exports = {
	name: "default",
	module: {
	    loaders: [
	    ]
	},
    entry:  Path.normalize(__dirname + "/out/dynvox/init.js"),
    output: {
        path:  __dirname + "/dist",
        filename: minimal?"js/dynvox.min.js":"js/dynvox.js"
    }
}
