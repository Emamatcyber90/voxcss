

/**
* @author James Suárez
* Card.js 
* 14-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox

class Card extends Element{


	static register(){
		if(this.registered)
			return 
		$.fn.voxcard= function(){
	        var dp=[]
	        this.each(function(){
	            var o= $(this);
	            var t=undefined;
	            
	            
	            this.voxcss_element= this.voxcss_element||{}
	            t= this.voxcss_element["vox-card"]
	            if(!t){
	            	t=new Card(o)
	            	this.voxcss_element["vox-card"]= t
	            }
	            dp.push(t);
	    	});
	        return dp;
	    }

	    $(function(){
	        vox.mutation.watchAppend($("body"), function(ev){
	            ev.jTarget.voxcard();
	        }, ".card");
	        $(".card").voxcard();
	    })
	    this.registered=true
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
		f.reveal= f.obj.find(".card-reveal")
		f.revealClose= f.obj.find(".card-reveal .card-title")
        f.activator= f.obj.find(".activator")
	}

	

	reveal(event){
		var f=this.$, ev= this.createEvent("beforereveal",event)
		ev.card= this
		this.emit(ev)
		if(ev.defaultPrevented)
			return


		f.reveal.show()
		f.reveal.css("top", 0)
		ev= this.createEvent("reveal")
		ev.card= this
		this.emit(ev)
	}


	closeReveal(event){
		var f=this.$, ev= this.createEvent("beforeclosereveal",event)
		ev.card=this
		this.emit(ev)
		if(ev.defaultPrevented)
			return		

		f.reveal.css("top", "100%")
		ev=this.createEvent("closereveal")
		ev.card=this
		this.emit(ev)

	}


	events(){
		var f= this.$;
		f.activator.click(()=>{
			ev.preventDefault()
			this.reveal()
			return false
		})

		f.revealClose.click(()=>{
			ev.preventDefault()
			this.closeReveal()
			return false
		})
	}
}

export default Card