var Path= require("path");

/*
var styleloader= require.resolve("vox-webcompiler/node_modules/style-loader")
var cssloader= require.resolve("vox-webcompiler/node_modules/css-loader")
var lessloader= require.resolve("vox-webcompiler/node_modules/less-loader")
*/
var fileloader= require.resolve("vox-webcompiler/node_modules/file-loader")
var ExtractTextPlugin = require("vox-webcompiler/node_modules/extract-text-webpack-plugin");
var minimal= core.VW.Web.Compiler.minimal


var htmlExtract= new ExtractTextPlugin("example-result");
module.exports = {
	name: "default",
	module: {
	    loaders: [
	        {
	        	test: /\.html$/,
	        	loader: htmlExtract.extract(fileloader + "?name=" + (true? "[name].[ext]": "[name].min.[ext]"))
	        },
	        { test: /.*\.(gif|jpeg|jpg|png)$/, loader: fileloader+"?hash=sha512&digest=ext&size=16&name=images/[name].[ext]" },
	        { test: /.*\.(eot|woff|eot|woff2|ttf|svg.*)/, loader: fileloader+"?hash=sha512&digest=ext&size=16&name=fonts/[name].[ext]" }
	    ]
	},
    entry:  Path.normalize(__dirname + "/src/core-webelements/example.html"),
    output: {
        path:  __dirname + "/dist",
        filename: "temp.js"
    },
    plugins: [
        htmlExtract
    ]
}
