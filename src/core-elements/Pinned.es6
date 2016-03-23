

/**
* @author James Suárez
* Pinned.js 
* 15-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox

class Pinned extends Element{
	
	static register(){
		$.fn.voxpinned= function(){
	        var dp=[]
	        this.each(function(){
	            var o= $(this)
	            var t=undefined
	            if(!(t=o.data("vox-pinned"))){
	                t=new Pinned(o)
	                o.data("vox-pinned", t)
	            }
	            dp.push(t)
	        })
	        return dp
	    }
	    
	    $(function(){
	        vox.mutation.watchAppend($("body"), function(ev){
	            ev.jTarget.voxpinned()
	        }, ".pinned")
	        $(".pinned").voxpinned()
	    })
	}

	constructor(/* Node */obj){
		super()
		obj= $(obj)
		var f= this.$={}
		f.obj=obj
		this.obtainProps()
		this.init()
	}

	obtainProps(){
		var f= this.$
		f.parent=f.obj.parent()
		f.scrollfire= f.parent.voxscrollfire()[0]
	}

	init(){
		this.events()
	}

	$scroll(ev){
		var f= this.$,j= f.obj, j2= f.parent, h=j.outerHeight(),
			h2=j2.outerHeight()

        if(h>$(window).height()){
            if(ev.offset>=h){
                if(ev.offset>h2){
                    ev.offset= h2
                }
                let a= ev.offset-h
                j.css("margin-top",a+"px")
            }
            else{
                j.css("margin-top","0")
            }    
        }
        else{
            if(ev.offset>$(window).height()){
                let a=ev.offset-$(window).height()
                if(a+h>= h2){
                    a= h2-h
                }
                j.css("margin-top",a+"px")
                
            }
            else{
                j.css("margin-top","0")
            }
        }
	}

	events(){
		var f= this.$
		f.scrollfire.on("scroll", (ev)=>this.$scroll(ev))
	}
}
export default Pinned
