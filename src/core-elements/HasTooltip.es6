

/**
* @author James Suárez
* HasTooltip.js 
* 15-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox
var w={}
if(typeof window !== "undefined")
    w=window


function init(window){
    class Tooltip extends Element{

    	static createTooltip(/* Node */ obj){
    		var s= $("<div class='tooltip'></div>")
	        if(obj.data("class"))
	            s.addClass(obj.data("class"))
	        else
	            s.addClass("default")
	        
	        $("body").append(s)
	        return s
    	}


    	static register(){
    		$.fn.voxhastooltip= function(){
		        var dp=[]
		        this.each(function(){
		            var o= $(this)
		            var t=undefined
		            if(!(t=o.data("vox-hastooltip"))){
		                t=new HasTooltip(o)
		                o.data("vox-hastooltip", t)
		            }
		            dp.push(t)
		        })
		        return dp
		    }

		    vox.mutation.watchAppend($("body"), function(ev){
	            ev.jTarget.voxhastooltip()
	        }, "[data-hover=tooltip]")
	        $("[data-hover=tooltip]").voxhastooltip()
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
    		var s= f.obj.attr("vox-selector")
	        if(s)
	            f.tip= $(s)
	        else
	            f.tip= HasTooltip.createTooltip(f.obj)
	        
	        f.tip= f.tip.voxtooltip()[0]
    	}

    	init(){
            var f= this.$
            f.obj.removeClass("toast")
            toast.container.append(f.obj)
            f.obj.addClass("toast")
    		this.events()
    	}

    	get tooltip(){
    		return this.$.tip
    	}

    	activate(){
    		var f= this.$
            if(f.obj.data("html"))
                f.tip.html=f.obj.data("tooltip")
            else
            	f.tip.text=f.obj.data("tooltip")
            
            f.tip.activate(f.obj)
    	}

    	events(){
    		var f= this.$
    		f.obj.hover((ev)=>{
                if(ev.type=="mouseenter")
                    this.activate()
                else if(ev.type="mouseleave")
                    f.tip.activateClose()
            })
    	}

    }
    return Tooltip
}

export default init(w)