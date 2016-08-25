var Path= require("path");

var styleloader= require.resolve("vox-webcompiler/node_modules/style-loader")
var cssloader= require.resolve("vox-webcompiler/node_modules/css-loader")
var lessloader= require.resolve("vox-webcompiler/node_modules/less-loader")
var fileloader= require.resolve("vox-webcompiler/node_modules/file-loader")
var ExtractTextPlugin = require("vox-webcompiler/node_modules/extract-text-webpack-plugin");
var minimal= core.VW.Web.Compiler.minimal
if(typeof Promise ==="undefined"){
	global.Promise= require("bluebird")
}

var cssExtract= new ExtractTextPlugin(minimal? "css/vox.min.css": "css/vox.css");
module.exports = {
	
	name: "default",
	module: {
	    loaders: [
	        {
	        	test: /\.less$/,
	        	loader: cssExtract.extract(styleloader, cssloader+"!"+lessloader)
	        },
	        { test: /.*\.(gif|jpeg|jpg|png)$/, loader: fileloader+"?hash=sha512&digest=ext&size=16&name=images/[name].[ext]" },
	        { test: /.*\.(eot|woff|eot|woff2|ttf|svg.*)/, loader: fileloader+"?hash=sha512&digest=ext&size=16&name=fonts/[name].[ext]" }

	    ]
	},
    entry:  Path.normalize(__dirname + "/src/core-style/less/all.less"),
    output: {
        path:  __dirname + "/dist",
        "publicPath": "../",
        filename: "style.js",
        chunkFilename: "[id].js"
    },
    plugins: [
        cssExtract
    ]
}
