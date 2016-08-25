

/**
* @author James Suárez
* SideNav.js 
* 15-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox
var w={}
if(typeof window !=="undefined")
	w=window

function init(window){
	class SideNav extends Element{
		
		static init(){
			if(!SideNav.overlay){
	            SideNav.overlay= $("#sidenav-overlay")
	            if(SideNav.overlay.length==0)
	                SideNav.overlay=undefined
	            
	        }
	        if(!SideNav.overlay){
	            SideNav.overlay = $("<div>")
	            SideNav.overlay.addClass("transitioned")
	            SideNav.overlay.attr("id", "sidenav-overlay")
	            SideNav.overlay.css("opacity", 0)
	            SideNav.overlay.hide()
	            $("body").append(SideNav.overlay)
	            
	            SideNav.overlay.click(function(){
	                if(SideNav.current)
	                    SideNav.current.close()
	            });
	        }
		}

		static register(){
			$.fn.voxsidenav= function(){
		        var dp=[]
		        this.each(function(){
		            var o= $(this)
		            var t=undefined
		            if(!(t=o.data("vox-sidenav"))){
		                t=new SideNav(o)
		                o.data("vox-sidenav", t)
		            }
		            dp.push(t)
		        });
		        return dp
		    }
		    
		    $(function(){
		        vox.mutation.watchAppend($("body"), function(ev){
		            ev.jTarget.voxsidenav()
		        }, ".side-nav")
		        $(".side-nav").voxsidenav()
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
			var main= f.obj.data("main")
	        f.main= $(main)
		}

		init(){
			this.events()
			setTimeout(()=>this.$r(), 300)
		}

		isOpened(){
			return this.$.obj.hasClass("opened")
		}

		open(event){
			var f=this.$
			SideNav.overlay.show()
            SideNav.overlay.css("opacity", 1)
            f.obj.addClass("opened")
            SideNav.current= this
            var ev= this.createEvent("open",event)
            ev.sidenav= this
            this.emit(ev)
		}

		close(event){
			var f= this.$
			SideNav.overlay.css("opacity", 0);
            setTimeout(function(){
                SideNav.overlay.hide()
            }, 800)
            f.obj.removeClass("opened")
            SideNav.current= undefined
            var ev= this.createEvent("close",event);
            ev.sidenav= this
            this.emit(ev)
            setTimeout(()=>{
            	this.G()
            }, 500)
            
		}

		toggle(){
			if(this.isOpened())
				this.close()
			else
				this.open()
		}

		$r(){
			if(SideNav.overlay.is(":visible"))
				return

			var f= this.$
			var po= f.obj.position()
	        var v=true
	        
	        if(po.left<= -(f.obj.width()) || po.left>=$(window).width())
	            v= false
	        
	        
	        if(v)
	            f.main.css("padding-left", f.obj.outerWidth())
	        
	        else
	            f.main.css("padding-left", 0)
	        
		}

		
		events(){
			var f= this.$
			if(f.button){
	            f.button.click(()=>{
	                this.toggle()
	            })  
	        }

	        var g= this.G= ()=>{
	            if(f.i){
	                clearTimeout(f.i)
	                f.i= undefined
	            }
	            this.$r()
	            f.i= setTimeout(()=>this.$r(), 600)
	        }
	        f.g= g
	        $(window).resize(g)
		}
	}
	SideNav.init()
	return SideNav
}
export default init(w)
