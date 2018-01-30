

/**
* @author James Suárez
* Card.js 
* 14-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox

//function init(document){

	class Dropdown extends Element{


		static register(){
			if(this.registered)
				return 
			$.fn.voxdropdown= function(){
		        var dp=[]
		        this.each(function(){
		            var o= $(this)
		            var t=undefined
		            
		            /*
		            if(!(t=o.data("vox-dropdown"))){
		                t=new Dropdown(o)
		                o.data("vox-dropdown", t)
		            }*/
		            
		            this.voxcss_element= this.voxcss_element||{}
		            t= this.voxcss_element["vox-dropdown"]
		            if(!t){
		            	t=new Dropdown(o)
		            	this.voxcss_element["vox-dropdown"]= t
		            }
		            dp.push(t);
		        })
		        return dp
		    }
		    
		    Dropdown.registerWatch()
		    this.registered=true
		}


		static registerWatch(){
			$(function(){
		        vox.mutation.watchAppend($("body"), function(ev){
		           ev.jTarget.voxdropdown()
		        }, ".dropdown")
		        $(".dropdown").voxdropdown()
		    })
		}

		constructor(/* Node */obj){
            super()
			this.func=[]
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
			var y= function(){
                var a0= $(this)
                var ev= self.createEvent("beforeselect")
                ev.dropdown= self
                ev.jTarget= a0
                
                self.emit(ev)
                if(ev.defaultPrevented)
                    return
                
                var ev= self.createEvent("select")
                ev.dropdown= self
                ev.jTarget= a0
                ev.value= a0.data("value")
                
                self.emit(ev)
                if(ev.defaultPrevented){
                    return
                }
                self.close()
            }
            
			this.attachEvent(a,"click",y)
		}
		
		
		

		open(event){
            var f= this.$
			var ev= this.createEvent("beforeopen",event)
            ev.dropdown= self
            this.emit(ev)
            if(ev.defaultPrevented)
                return
            
            
            
            var self= this
            f.lEvent= event?event.type:""
            f.menu.addClass("opened")            
            f.menu.voxanimate(f.menu.data("ineffect")|| "fadeIn short", null, ()=>{
                
                f.captureKeyboard= true
                var ev= self.createEvent("open",event)
                ev.dropdown= self
                self.emit(ev)

            })
            
		}




		close(){
            var f= this.$
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
            var f= this.$
			if(f.menu.hasClass("opened"))
                this.close()
            
            else
                this.open()
            
		}
		
		dynamicDispose(){
			if(this.watchRemoveListener){
				this.watchRemoveListener()
			}
			this.watchRemoveListener=null 
			Element.prototype.dynamicDispose.call(this)
		}

		events(){
			var f= this.$, ab
			
			// LEAK MEMORY DETECTED (13/11/2017)
			this.watchRemoveListener= vox.mutation.watchAppend(f.menu, (ev)=>{
	                this.$pEvents(ev.jTarget.find(">a"));
	        }, "li");
            this.$pEvents(f.menu.find("li>a"))
			var self=this
			
			
	        this.attachEvent($(document), "keyup", function(ev){
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
            
            
            
	        this.attachEvent($(document), "click", function(ev){
                if(!self.isOpened()){
                    return 
                }
                var e= $(ev.target)
                if((ev.target!= f.obj.get(0)) && (f.obj.find(e).length==0)){
                    
                    var ev2= self.createEvent("outerclick")
                    ev2.dropdown= self
                    ev2.target= ev.target
                    ev2.clickEvent= ev
                    self.emit(ev)
                    if(ev.defaultPrevented)
                        return
                    
                    self.close()
                }
            })

            f.btn=f.obj.find("a,.button").eq(0)
            
            this.attachEvent(f.btn,"click", function(){
                if(f.lEvent=="mouseenter")
                    return self.open()
                
                self.toggle()
            })
            
            
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
            //f.btn.hover(j)
            //f.menu.hover(j)
            	
            this.attachEvent(f.btn, "hover", j)	
            this.attachEvent(f.menu, "hover", j)	
            

		}
	}

//	return Dropdown
//}

var doc={}
if(typeof document === "object")
	doc=document

export default Dropdown