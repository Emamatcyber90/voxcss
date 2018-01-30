/*global sc, $*/
var yid=0
class DomParser {



	parse(jobject, scope) {
		if (!jobject)
			jobject = $("html")

		var objects = jobject.find(">*"),
			obj, l = [],
			sc
		for (var i = 0; i < objects.length; i++) {
			obj = objects.eq(i)
			l.push(obj)
		}

		var scopeP = scope
		for (var i = 0; i < l.length; i++) {
			obj = l[i]
			sc = obj.attr("voxs-scope")
			scope = sc ? core.dynvox.v2.Scope.get(sc) : (scopeP || core.dynvox.v2.Scope.get("default"))

			if (scope) {
				if (obj.attr("voxs") !== undefined || obj.attr("dynamic")!==undefined) {
					this.parseOne(obj, scope)
					this.parse(obj, scope)
				}
				else {
					this.parse(obj, scope)
				}
			}
			delete l[i]
		}
		l = null
	}
	
	
	parseOne(jobject, scope){
		
		// Los atributos ...
		if(jobject.attr("voxs-ya")!==undefined)
			return 
		
		var atxr= jobject.get(0).attributes
		var attrs= [], attr
		for(var z=0;z<atxr.length;z++){
			attrs.push(atxr[z])
		}
		
		
		if(jobject.attr("dynvox-savecode")!==undefined){
			scope[jobject.attr("dynvox-savecode")]= jobject.html()
		}
		
		for(var i=0;i<attrs.length;i++){
			attr= attrs[i]
			if(attr.name=="event-all"){
				// ATTACH ALL EVENTS ...
				this.attachEventAll(scope, jobject, attr.value)
			}
			else if(attr.name.startsWith("event-")){
				this.attachEvent(scope, jobject, attr.name.substring(6), attr.value)
			}
			else if(attr.name=="voxs-if" || attr.name=="dynamic-if" || attr.name=="dynamic-nif"){
				this.attachObserverIf(scope, jobject, attr)
			}
			else{
				if(attr.name=="dynamic-repeat" || attr.name=="voxs-repeat"){
					this.attachObserverArray(scope, jobject, attr)
				}
				else if(attr.value.indexOf("#{")>=0){
					// El atributo será dinámico 
					this.attachObserverAttr(scope, jobject, attr)		
				}
			}
		}
		
		
		if(jobject.find("*").length==0){
			var texto= jobject.text()
			if(texto.indexOf("#{")>=0){
				this.attachObserverText(scope, jobject, texto)	
			}
		}
		
		jobject.attr("voxs-ya", true)
		
	}
	
	
	
	
	attachObserverArray(scope, jobject, attr){
		var varname= jobject.attr("dynamic-foreach") || jobject.attr("voxs-var")
		var arrname= jobject.attr("dynamic-in") || jobject.attr("voxs-name")
		
		var uniqueId= jobject.attr("voxs-uniqueid")
		var funiqueid= uniqueId
		if(!uniqueId){
			uniqueId= Date.now().toString(32) + (yid++)
			jobject.attr("voxs-uniqueid",uniqueId)
			funiqueid= uniqueId
		}
		
		
		var dom= $(jobject.html()), newdom,child, childs={}, funcs={}, self= this, items={}
		jobject.html("")
		window.DEBUG && console.info("DOM:",dom)
		
	
		var adding= function(ev, index){
			var current= true, temporal, g
			if(index==undefined)
				index= ev.value.index
			
			newdom=items[index]
			child= childs[index]
			
			if(!newdom){
				newdom= dom.clone()
				current=false
				temporal=$("<div>")
				temporal.append(newdom)
			}
			items[index]= newdom
			if(!child){
				child= scope.createChild()
				childs[index]= child
				newdom.attr("dynamic-child-scope", true)
				newdom.each(function(){
					this["dynamic_scope"]=child
				})
				
			}
			
			
			if(current ){
				child[varname]= ev.value
			}
			else{
				//console.info("NEW SCOPE:",child)
				child[varname]= ev.value[0]
				child.$index= index
				g= funcs[index]= function(ev){
					
					if(g.finished)
						return 
						
					window.DEBUG && console.info("CAMBIANDO ...", ev, index)
					adding(ev, index)
				}
				g.event= arrname + "." + child.$index
				//scope.onchange(arrname + "." + child.$index, g, null/*, uniqueId + ">" + arrname*/)
				
				scope.attach({
					event: "change", 
					name: arrname + "." + child.$index, 
					func: g,
					dom: newdom
				})
				
				// parse with new scope
				self.parse(temporal, child)
			}
			
			if(!current)
				jobject.append(newdom)
		}
		
		var removing= function(ev){
			
			
			var keys=Object.keys(items)
			if(ev.value< keys.length){
				for(var i=ev.value;i<keys.length;i++){
					// remove object ...
					try{
						items[i].remove()
						funcs[i].finished= true
						scope.removechange(funcs[i].event, funcs[i])
						
						delete items[i]
						delete childs[i]
					}catch(e){
						console.error("ERROR REMOVING:", e)
					}
				}
			}
		}
		
		
		scope.attach({
			event: "push", 
			name: arrname,
			func: adding,
			dom: jobject
		})
		scope.attach({
			event: "change", 
			name: arrname + ".length", 
			func: removing,
			dom: jobject
		})
		
		
		
		// COPIAR ACTUALES ...
		var j= function(){
			
			
			var keys=Object.keys(items)
			if(keys.length>0){
				for(var i=0;i<keys.length;i++){
					// remove object ...
					try{
						items[i].remove()
						funcs[i].finished= true
						delete items[i]
						delete childs[i]
					}catch(e){
						console.error("ERROR REMOVING:", e)
					}
				}
			}
			
			var parts= arrname.split(".")
			var o= scope
			for(var i=0;i<parts.length;i++){
				o= o[parts[i]]
				if(!o)
					break 
			}
			
			if(o && o.length){
				// push the array ...
				for(var i=0;i<o.length;i++){
					adding({
						value:{
							"0": o[i],
							"index": i
						}
					})
				}
				
			}
		}
		
		j()
		
		
		scope.attach({
			event: "change", 
			func: function(ev){
				var t= ev.name+"."
				if(arrname.startsWith(t) || arrname==ev.name){
					j()
				}
			},
			dom: jobject
		})
		
		
		
	}
	
	
	attachObserverAttr(scope, jobject, attr){
		return this.attachObserver(scope,jobject, {
			attr, 
			text: attr.value
		})	
	}
	
	attachObserverIf(scope, jobject, attr){
		var negate= attr.name=="dynamic-nif"
		if(!negate){
			if(attr.value.startsWith("!")){
				attr.value= attr.value.slice(1)
				negate= true
			}
		}
		return this.attachObserver(scope,jobject, {
			attr, 
			ifcondition: true,
			negate,
			text: "#{"+attr.value+"}"
		})	
	}
	
	attachObserverText(scope, jobject, text){
		return this.attachObserver(scope,jobject, {
			contentmode:true, 
			text
		})	
	}
	
	
	
	attachObserver(scope, jobject, options){
		
		var attr=options.attr
		var compilation= this.getVars(scope, options.text), var1, l, code2, put, u, disable, g
		var uniqueId= jobject.attr("voxs-uniqueid")
		var funiqueid= uniqueId
		if(!uniqueId){
			uniqueId= Date.now().toString(32) + (yid++)
			jobject.attr("voxs-uniqueid",uniqueId)
			funiqueid= uniqueId
		}
		
		var parse= ()=>{
			this.parse(jobject, scope)
		}
		
		if(attr){
			uniqueId+= ">" + attr.name 
		}
		else if(options.contentmode){
			uniqueId+= ">$text"
		}
		
		if(options.ifcondition)
			uniqueId+= options.negate?"$nif":"$if"
		
		if(compilation.vars){
			
			g= function(){
				if(disable){
					return disable=false
				}
				l=DomParser.pending.filter(function(a){
					if(a.uniqueId==uniqueId)
						return true
				})
				if(l && l.length){
					return 
				}
				DomParser.pending.push({
					uniqueId,
					jobject,
					parse,
					attr,
					scope,
					ifcondition: options.ifcondition,
					negate:options.negate,
					contentmode:options.contentmode,
					compilation
				})
				
				DomParser.enablePaint(attr && !options.ifcondition ? 0: null)
			}
			
			/*
			for(var i=0;i<compilation.vars.length;i++){
				var1= compilation.vars[i]
				scope.onchange(var1.name, g)
			}*/
			
			
			scope.attach({
				event: "change",  
				func: function(ev){
					var t= ev.name+".",var1
					for(var i=0;i<compilation.vars.length;i++){
						var1= compilation.vars[i]
						if(var1.name.startsWith(t) || var1.name==ev.name){
							g()
						}
					}
				},
				dom: jobject
			})
			
			/*
			scope.onchange(null, function(ev){
				var t= ev.name+".",var1
				for(var i=0;i<compilation.vars.length;i++){
					var1= compilation.vars[i]
					if(var1.name.startsWith(t) || var1.name==ev.name){
						g()
					}
				}
			}, "change", uniqueId+ ">" +compilation.vars[0].name)
			*/
			
			
			
			// Añadir para ajustar el valor la primera vez ...
			DomParser.pending.push({
				uniqueId,
				jobject,
				attr,
				parse,
				scope,
				negate: options.negate,
				ifcondition:options.ifcondition,
				contentmode:options.contentmode,
				compilation
			})
			DomParser.enablePaint(0)
			
			
			if(options.ifcondition){
				
				// DELAYED CREATION OF DOM ...
				if(jobject.find(">*").length>0){
					var ihtml= jobject.html()
					jobject.html("")
					jobject.data("delayed-dom", ihtml)
				}
				
			}
			else{
				if(jobject.is("input,textarea,select")  && compilation.vars.length==1){
					code2= `proxy.${compilation.vars[0].real}= arguments[0]` 
					put= this.compile(scope, code2)
					if(jobject.is("input[type=check]")){
						jobject.on("change", function(){
							disable= true
							clearTimeout(u)
							u=setTimeout(put.bind(put, jobject[0].checked),1)
						})
					}
					else{
						jobject.on(jobject.is("select")?"change":"keyup", function(){
							disable= true
							clearTimeout(u)
							u=setTimeout(put.bind(put, jobject.val()),1)
						})
					}
				}
			}
			
			
		}
	}
	
	nullfunc(){
		return 1
	}
	compile(scope, text){
		//return this.nullfunc()
		var proxy= scope.getProxy()
		var code=`(function(){
			return ${text}
		})`
		return eval(code)
	}
	
	
	getVars(scope, value){
		var i, offset=-1, y, con, con2, html, uoptions=[], newvar, vars=[], func
		
		
		while(true){
			con=undefined
			con2=undefined
			i= value.indexOf("#{",offset)
			y=-1
			html= false
			newvar= null
			if(i>=0){
				
				if(value[i-1]=="#"){
					html= true
				}
				y= value.indexOf("}",i+2)	
				if(y>=0){
					newvar= value.substring(i+2,y)
					con2= value.substring(y+1)
				}
				con=value.substring(0, i - (html?1:0))
			}
			else{
				con= value
			}
			
			if(con){
				uoptions.push({
					type: 'text', 
					value: con
				})
			}
			
			if(newvar){
				
				// TRY SPLIT POSSIBLE OPTIONS 
				// BASIC OPERATIONS + - * / @ , 
				//newvar=newvar.replace(/\;/ig, " ")
				
				newvar=" "+newvar.replace(/[\S|\!]+([\w|\$|\-]+\.?\w?)*/ig, function(e){
					var parts, real, part, important, ename, nor, ade=''
					
					
					if(e.trim().startsWith("!")){
						ade='!'
						e= e.trim().substring(1)
					}
					
					if(e && !/\d/.test(e[0]) && /[\w|\$]/.test(e[0])){
						parts= e.trim().split(".")
						real=''
						ename=''
						important=''
						nor= 0
						
						for(var i=0;i<parts.length;i++){
							part= parts[i]
							if(part.indexOf("(")>=0){
								if(part.endsWith("@")){
									part= part.substring(0,part.length-1)
									nor = -1
								}
								else{
									nor++
								}
							}
							if(/\d/.test(part[0])){
								if(!nor){
									real+= "[" + part + "]"
								}
								important+= "[" + part + "]"
							}
							else if(part.indexOf("-")>=0){
								if(!nor){
									real+= "[" + JSON.stringify(part) + "]"
								}
								important+= "[" + JSON.stringify(part) + "]"
							}
							else{
								if(!nor){
									real+= real ? "." : ""
									real+= part
								}
								
								important+= i>0 ? "." : ""
								important+= part
							}
							
							if(!nor){
								ename+= ename ? "." : ""
								ename+= part
							}
							if(nor==-1)
								nor=1
						}
						vars.push({
							real,
							name: ename
						})
						return ade+" proxy"+ (important[0]=="["?"":".") + important
					}
					return ade+e
				})
				
				func= this.compile(scope, newvar)
				uoptions.push({
					type: 'dynamic', 
					value: func,
					html
				})
				
				
			}
			
			if(y<0)
				break 
				
			value= con2
		}
		
		
		if(con2){
			uoptions.push({
				type: 'text', 
				value: con2
			})
		}
		
		return {
			script: uoptions, 
			vars
		}
	}
	
	
	attachEvent(scope, jobject, name, value){
		var compilation= this.getVars(scope, "#{"+value+"}")
		if(!compilation || !compilation.script.length)
			return 
		var getfunc= compilation.script[0].value
		jobject.on(name, function(){
			var func= getfunc()
			if(typeof func=="function"){
				return func.apply(this, arguments)
			}
		})
		
	}
	
	getAllEvents(element) {
	    var result = [];
	    for (var key in element) {
	        if (key.indexOf('on') === 0) {
	            result.push(key.slice(2));
	        }
	    }
	    return result.join(' ')
	}

	
	attachEventAll(scope, jobject,  value){
		var name= this.getAllEvents(jobject[0])
		var compilation= this.getVars(scope, "#{"+value+"}")
		if(!compilation || !compilation.script.length)
			return 
		var getfunc= compilation.script[0].value
		
		jobject.on(name, function(e){
			if(!e) return 
			
			var events= getfunc()
			if(!events)
				return 
			var func= events[e.type]
			if(typeof func=="function"){
				return func.apply(this, arguments)
			}
		})
	}
	
	static enablePaint(time){
		if(DomParser.paintTimeout){
			clearTimeout(DomParser.paintTimeout)
		}
		
		DomParser.paintTimeout=setTimeout(DomParser.executePaint, time===undefined? 2: 0)
	}
	
	static executePaint(){
		DomParser.paintTimeout=null 
		var pending= DomParser.pending
		DomParser.pending=[]
		var item,script, content='', str, expr, textcontent
		for(var i=0;i<pending.length;i++){
			item= pending[i]
			content=''
			textcontent=false
			expr=null
			try{
				for(var y=0;y<item.compilation.script.length;y++){
					script= item.compilation.script[y]
					if(script.type=='text'){
						textcontent= true
						content+= script.value
					}
					else if(script.type=="dynamic"){
						expr= script.value()
						str= expr===null || expr===undefined?"": expr.toString()
						if(!script.html){
							str=core.dynvox.EscapeHtml(str)
						}
						content+= str
					}
				}
			}
			catch(e){
				global.DEBUG&&console.error("> Dyvox error: ", e)
			}
			
			var domParser
			
			// Ajustar el contenido 
			if(item.attr){
				
				if(item.ifcondition){
					
					// SHOW OR NOT SHOW ...
					if(!!expr== !item.negate){
						item.jobject.show()
						// verificar si fue borrado el DOM 
						
						if(item.jobject.data("delayed-dom")!==undefined){
							item.jobject.html(item.jobject.data("delayed-dom"))
							item.jobject.removeData("delayed-dom")
							domParser= new DomParser()
							domParser.parse(item.jobject, item.scope)
						}
					}
					else {
						item.jobject.hide()	
					}
					
					
				}
				else{
					if(item.attr.name=="value"){
						item.jobject.val(content)
						if(item.jobject.is("input[type=check]")){
							item.jobject.each(function(){
								this.checked= !!expr
							})
						}
					}
					else if(item.attr.name.startsWith("data-")){
						item.jobject.attr(item.attr.name, content)
						item.jobject.data(item.attr.name.substring(5), textcontent?content:expr)
					}
					else{
						if(textcontent){
							item.jobject.attr(item.attr.name, content)
						}
						else{
							if(expr===undefined)
								item.jobject.removeAttr(item.attr.name)
							else 
								item.jobject.attr(item.attr.name, content)
						}
					}
				}
			}
			else if(item.contentmode){
				item.jobject.html(content)
				if(item.jobject.attr("dynvox-code")!==undefined){
					item.parse()
				}
			}
			
		}
	}
}

var removeFn= $.fn.remove
var emptyFn= $.fn.empty
var htmlFn= $.fn.html

var jqueryCleanData= jQuery.cleanData


$.fn.originalRemove=removeFn



var _clean= function(self){
	var ev, eves
	
	if(self.dynamic_events){
		
		/*for(var id in self.dynamic_events){
			console.info("REMOVING LISTENERS:",self.dynamic_events[id].length)
			delete self.dynamic_events[id]
		}*/
		
		window.DEBUG && console.info("REMOVING LISTENERS:",self.dynamic_events.length)
		for(var i=0;i<self.dynamic_events.length;i++){
			ev= self.dynamic_events[i]
			if(ev.scope)
				ev.scope.removeListener(ev.event, ev.func)
			
			ev.scope=undefined
		}
		delete self.dynamic_events
	}
	
	if(self.dynamic_scope){
		delete self.dynamic_scope
	}
	$(self).attr("dynamic-removed",true)
}

jQuery.cleanData= function(elems){
//	setTimeout(function(){
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			_clean(elem)
		}	
//	},100)
	return jqueryCleanData.apply(this, arguments)
}


$.fn.removex= function(){
	var g= function(self){
		var ev, eves
		
		if(self.dynamic_events){
			//console.info("> Removing events from object:", this.dynamic_events.length)
			//this.dynamic_events.removeAll()
			for(var id in self.dynamic_events){
				console.info("REMOVING LISTENERS:",self.dynamic_events[id].length)
				delete self.dynamic_events[id]
			}
			delete self.dynamic_events
		}
		
		if(self.dynamic_scope){
			delete self.dynamic_scope
		}
		$(self).attr("dynamic-removed",true)
	}
	
	
	this.each(function(){
		g(this)
		var all=$(this).find(":not([dynamic-removed])")
		if(all && all.length){
			for(var i=0;i<all.length;i++){
				g(all[i])
			}
		}
	})
	return removeFn.apply(this, arguments)
}




$.fn.voxscope= function(){
	var e= $(this), final
	if(e.attr("dynamic-child-scope")!==undefined){
		final= e
	}
	else{
		final= e.parents("[dynamic-child-scope]").eq(0)
	}
	if(final && final.length){
		return final[0]["dynamic_scope"]
	}
	
	var sc="default"
	if(e.attr("voxs-scope")!==undefined){
		sc= e.attr("voxs-scope")
	}
	else{
		final= e.parents("[voxs-scope]").eq(0)
		if(final.length){
			sc= final.attr("voxs-scope")
		}
	}
	
	return core.dynvox.v2.Scope.get(sc)
}

DomParser.pending=[]
export default DomParser
