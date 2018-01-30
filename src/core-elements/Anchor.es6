

/**
* @author James Suárez
* Card.js 
* 14-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox

class Anchor extends Element{


	static register(){
		if(this.registered)
			return 
		$.fn.voxanchor= function(){
	        var dp=[]
	        this.each(function(){
	            var o= $(this);
	            var t=undefined;
	            
	            /*
	            if(!(t=o.data("anchor"))){
	                t=new Anchor(o);
	                o.data("anchor", t);
	            }*/
	            
	            this.voxcss_element= this.voxcss_element||{}
	            t= this.voxcss_element["anchor"]
	            if(!t){
	            	t=new Anchor(o)
	            	this.voxcss_element["anchor"]= t
	            }
	            dp.push(t);
	    	});
	        return dp;
	    }

	    $(function(){
	        vox.mutation.watchAppend($("body"), function(ev){
	            ev.jTarget.voxanchor();
	        }, "[hash-effect]");
	        $("[hash-effect]").voxanchor();
	    })
	    this.registered= true
	}


	constructor(/* Node */obj){
		super()
		obj= $(obj)
		var f= this.$={}
		f.obj=obj
		
		this.obtainProps()
		this.init()
	}


	init(){
		this.events()
	}

	obtainProps(){
		var f=this.$;
		f.isHash= f.obj.attr("hash-effect")!==undefined

	}

	
	async hashEffect(){

		if(this.it1)
			clearTimeout(this.it1)
		var f= this.$
		var hash= f.obj.attr("href")
		if(!hash)
			hash= f.obj.data("href")
		else
			f.obj.data("href", hash)


		f.obj.removeAttr("href")
		var obj= $(hash)
		


		var pad=f.obj.attr("hash-padding")
		pad=pad|0
		var offset= obj.offset()
		var top= offset.top-pad
		var w= $(window)
		var current= w.scrollTop()

		var dif= top-current
		var time= f.obj.attr("hash-time")
		time= parseInt(time)
		if(isNaN(time))
			time= 500

		var intervals= time/10
		var dif1= dif/intervals
		
		var i=0
		while(i<intervals){
			current+= dif1
		
			w.scrollTop(current)
			await core.VW.Task.sleep(10)
			i++
		}
		w.scrollTop(top)


		this.it1= setTimeout(()=>{
			f.obj.attr("href",hash)
			this.it1= undefined
		}, 100)
	}


	events(){
		var f= this.$;
		f.obj.click((ev)=>{
			//ev.preventDefault()
			this.hashEffect()
			//return false
		})

	}
}

export default Anchor