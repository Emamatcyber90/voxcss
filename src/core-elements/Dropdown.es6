

/**
* @author James Suárez
* Card.js 
* 14-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox

function init(document){

	class Dropdown extends Element{


		static register(){
			$.fn.voxdropdown= function(){
		        var dp=[]
		        this.each(function(){
		            var o= $(this)
		            var t=undefined
		            if(!(t=o.data("vox-dropdown"))){
		                t=new Dropdown(o)
		                o.data("vox-dropdown", t)
		            }
		            dp.push(t);
		        })
		        return dp
		    }
		    
		    $(function(){
		        vox.mutation.watchAppend($("body"), function(ev){
		            ev.jTarget.voxdropdown()
		        }, ".dropdown")
		        $(".dropdown").voxdropdown()
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


		init(){
			this.events()
		}

		obtainProps(){
			var f=this.$;
			if(f.obj.data("menu-selector")!==undefined)
	           f.menu= $(f.obj.data("menu-selector"))
	        
	        else
	            f.menu= f.obj.find(".dropdown-menu")
	        
		}

		


		isOpened(){
			return this.$.menu.hasClass("opened")
		}

		$pEvents(/*jquery element*/ a){
			var self=this
			a.click(function(){
                var a0= $(this)
                var ev= self.createEvent("beforeselect")
                ev.dropdown= self
                ev.jTarget= a0
                
                self.emit(ev)
                if(ev.defaultPrevented)
                    return
                
                var ev= vox.platform.createEvent("select")
                ev.dropdown= self
                ev.jTarget= a0
                ev.value= a0.data("value")
                
                self.trigger("select", ev)
                if(ev.defaultPrevented){
                    return
                }
                self.close()
            })
		}

		open(event){
			var ev= this.createEvent("beforeopen",event)
            ev.dropdown= self
            this.emit(ev)
            if(ev.defaultPrevented)
                return
            
            
            
            var self= this
            f.lEvent= event?event.type:""
            f.menu.addClass("opened")            
            f.menu.voxanimate(f.menu.data("ineffect")|| "fadeIn short", null, function(){
                
                f.captureKeyboard= true
                var ev= self.createEvent("open",event)
                ev.dropdown= self
                this.emit(ev)

            })
            
		}




		close(){

            var ev= vox.platform.createEvent("beforeclose")
            ev.dropdown= self
            this.emit(ev)
            if(ev.defaultPrevented)
                return
            
            
            var self=this
            f.lEvent= undefined
            f.menu.removeClass("opened")
            f.menu.voxanimate(f.menu.data("outeffect")|| "fadeOut short", null, function(){
                f.captureKeyboard= false
                var ev= vox.platform.createEvent("close")
                ev.dropdown= self
                self.emit(ev)
            })
            
		}

		toggle(){
			if(f.menu.hasClass("opened"))
                this.close()
            
            else
                this.open()
            
		}

		events(){
			var f= this.$
			vox.mutation.watchAppend(f.menu, (ev)=>{
	                this.$pEvents(ev.jTarget.find(">a"));
	        }, "li");

			var self=this
	        $(document).keyup(function(ev){
                if(f.captureKeyboard){
                    ev.preventDefault()
                    ev.dropdown= self
                    self.emit("keyup", ev)
                    if(ev.defaultPrevented){
                        return;
                    }
                    
                    if(ev.keyCode==39){
                        
                    }
                    return false
                }
            })
            
	        $(document).click(function(ev){
                if(!self.isOpened()){
                    return 
                }
                var e= $(ev.target)
                if((ev.target!= f.obj.get(0)) && (f.obj.find(e).length==0)){
                    
                    var ev2= self.createEvent("outerclick")
                    ev2.dropdown= self
                    ev2.target= ev.target
                    ev2.clickEvent= ev
                    self.emit(rb)
                    if(ev.defaultPrevented)
                        return
                    
                    self.close()
                }
                
            })

            f.btn=f.obj.find("a,.button").eq(0)
            f.btn.click(function(){
                if(f.lEvent=="mouseenter")
                    return self.open()
                
                self.toggle()
            });
            
            
            var j= function(ev){
                if(f.obj.data("hover-activate")){
                    if(ev.type=="mouseenter"){
                        if(f.closing){
                            clearTimeout(f.closing)
                            f.closing= undefined
                            return
                        }
                        if(self.isOpened()){
                            return
                        }
                        self.open(ev)
                    }
                    else if(ev.type=="mouseleave"){
                        
                        if(f.lEvent!="mouseenter")
                            return
                        
                        
                        
                        f.closing= setTimeout(function(){
                            self.close()
                            f.closing=undefined
                        }, 100)
                    }
                }
            }
            f.btn.hover(j)
            f.menu.hover(j)
            

		}
	}

	return Dropdown
}

var doc={}
if(typeof document === "object")
	doc=document

export default init(doc)