

/**
* @author James Suárez
* Parallax.js 
* 15-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox
var w={};
if(typeof window !=="undefined")
	w=window

function init(window){
	
	procesar= (Parallax)=>{
		Parallax.objects=[]
	}

	class Parallax extends Element{
		static get uid(){
			Parallax.id=Parallax.id|0
			return Parallax.id++
		}

		static register(){
			$.fn.voxparallax= function(){
		        var dp=[]
		        this.each(function(){
		            var o= $(this)
		            var t=undefined
		            if(!(t=o.data("vox-parallax"))){
		                t=new Parallax(o)
		                o.data("vox-parallax", t)
		            }
		            dp.push(t)
		        })
		        return dp
		    }
		    
		    $(function(){
		        vox.mutation.watchAppend($("body"), function(ev){
		            ev.jTarget.voxparallax()
		        }, ".parallax");
		        $(".parallax").voxparallax()
		        
		    })
		}

		constructor(/* Node */obj){
			super()
			Parallax.objects.push(this)
			obj= $(obj)
			var f= this.$={}
			f.obj=obj
			this.obtainProps()
			this.init()
		}

		obtainProps(){
			var f= this.$
			this.id= Parallax.uid
			f.img= f.obj.find(".img")
			f.scrollfire= f.obj.voxscrollfire()[0]
		}

		init(){
			this.events()
		}

		$scroll(ev){
			var f= this.$
			var h= $(window).height()
            var hi= f.obj.outerHeight()
            var maxRange= h+hi
            var off= ev.offset
            
            f.img.css("top", - ((f.img.height() * 80/100)) + "px")
            var percent= (off*100) / maxRange
            
            var translate= 80* percent/ 100
            translate= (f.img.height()* translate)/100
            var factor= parseFloat(f.obj.data("factor"))
            if(!factor || isNaN(factor))
                factor= 1.24
            
            translate*=  factor
            f.img.css("transform", "translate3d(0, " + translate.toString()+ "px, 0)")
		}

		events(){
			var f= this.$
			f.scrollfire.on("scroll", (ev)=>this.$scroll(ev));    
	        f.scrollfire.refresh()
	        $(window).resize()
		}

	}
	procesar(Parallax)
	return Parallax
}
export default init(w)