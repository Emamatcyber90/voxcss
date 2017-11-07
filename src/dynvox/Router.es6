

// Add this:
var _wr = function(type) {
    var orig = history[type];
    return function() {
        var rv = orig.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    };
};
history.pushState = _wr('pushState')
//history.popState = _wr('popState')
history.replaceState = _wr('replaceState')

class Router{

	constructor(){
		this.$={}
		this.$.routes= []

	}



	attachEvents(){
		if(this.attached)
			return


		var hashChange= this.start.bind(this)
		if(window.addEventListener) {
			//if(this.pushstate)
				window.addEventListener('pushState', hashChange, false)
				window.addEventListener('popstate', hashChange, false)
			//else
		    	window.addEventListener("hashchange", hashChange, false)
		}
		else if (window.attachEvent) {
			//if(this.pushstate)
				window.attachEvent("onpushState", hashchange)
				window.attachEvent("onpopstate", hashchange)
			//else
		    	window.attachEvent("onhashchange", hashchange);//SEE HERE...
		    //missed the on. Fixed thanks to @Robs answer.
		}

		this.attached= true
	}



	get location(){
		return this.$.location
	}

	get params(){
		return this.$.params
	}



	start(index, Uri){


		if(this.noprocesar)
			return

		this.attachEvents()
		if(Uri){
			this.noprocesar= true
			if(this.pushstate)
				history.pushState({},"",Uri)
			else
				location= Uri
			this.noprocesar= false
		}


		var href= this.pushstate? location.pathname + location.hash : location.hash.substring(1)
		var url, search, hash

		var z= href.indexOf("?")
		if(z >=0)
			search= href.substring(z)

		var z2= href.indexOf("#")
		if(z2 >=0)
			hash= href.substring(z2)

		if(z2<0)
			z2= href.length

		if(z<0)
			z= href.length


		z= Math.min(z,z2)
		url= href.substring(0,z)


		// Significa que es la misma url
		var ret= (this.$.location && this.$.location.pathname==url)


		this.$.location= {
			pathname: url,
			href,
			search,
			hash
		}

		if(ret)
			return

		var parts= url.split("/"), part1, part2, correcto, params={}
		index= index |0
		//console.info(parts)
		for(var i=index;i<this.$.routes.length;i++){
			var routeA= this.$.routes[i]
			var route= routeA.def
			//console.info("route: ",route)
			if(route==-1)
				correcto= true
			else if(route.length== parts.length){
				correcto= true
				for(var y=0;y<route.length;y++){
					part1= route[y]
					part2= decodeURIComponent(parts[y])
					if(!part1.param){
						if(part1.name!=part2){
							correcto= false
							break
						}
					}
					else{
						params[part1.name]= part2
					}
				}



			}

			if(correcto){
				return this._execute(i, params, routeA)
			}
		}
	}

	redirect(url){

		if(this.pushstate)
			history.pushState({},"",url)
		else
			location= url

	}


	_execute(index, params, route){
		var continuar= ()=>{
			return this.start(index+1)
		}
		var req= {
			params: params,
			location: this.location,
			continue: continuar
		}
		this.$.params= params
		return route.func(req)
	}


	route(uri, func){

		var parts= uri.split("/")
		var urldefinition= []
		for(var i=0;i<parts.length;i++){

			var part= parts[i]
			if(part[0]==":"){
				urldefinition.push({
					"param": true,
					"name": part.substring(1)
				})
			}
			else{
				urldefinition.push({
					"name": part
				})
			}

		}

		this.$.routes.push({
			def: urldefinition,
			func: func
		})
	}


	use(func){
		this.$.routes.push({
			def: -1,
			func: func
		})
	}


}
export default Router
