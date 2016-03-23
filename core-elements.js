var Path= require("path");
var path= Path.normalize(__dirname + "/src/core-elements");
var minimal= core.VW.Web.Compiler.minimal
var fs= require("fs");


// Este módulo depende de gvw para convertir los archivos es6 a js
var files= fs.readdirSync(path);
var ecmaParser= new core.VW.Ecma2015.Parser()
for(var i=0;i<files.length;i++){
	var newfile,file= files[i];
	if(file.substring(file.length-4, file.length)==".es6"){
		file= Path.join(path, file);
		newfile= file.substring(0,file.length-4) +".js";
		fs.writeFileSync( newfile, ecmaParser.parse(fs.readFileSync(file,'utf8')).code);
	}
}



var data = {
	node: {
	    "fs": "empty"
	},
	module: {
	    loaders: [
	        { test: /\.json$/, loader: "json-loader" }
	       ]
	   },
	"resolve":{
		"alias":{
			"jquery": Path.join(path,"jquery-replace")
		}
	},
    entry:  path,
    output: {
        path:  __dirname + "/dist",
        filename: minimal?"js/vox-elements.min.js":"js/vox-elements.js",
        libraryTarget: "umd"
    }
}

module.exports= data