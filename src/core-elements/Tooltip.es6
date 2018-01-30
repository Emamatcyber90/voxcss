

/**
* @author James Suárez
* Tooltip.js 
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
        
        static register(){
        	if(this.registered)
				return 
			
            $.fn.voxtooltip= function(){
                var dp=[]
                this.each(function(){
                    var o= $(this)
                    var t=undefined
                    /*
                    if(!(t=o.data("vox-tooltip"))){
                        t=new Tooltip(o)
                        o.data("vox-tooltip", t)
                    }*/
                    
                    this.voxcss_element= this.voxcss_element||{}
		            t= this.voxcss_element["vox-tooltip"]
		            if(!t){
		            	t=new Tooltip(o)
		            	this.voxcss_element["vox-tooltip"]= t
		            }
                    dp.push(t)
                })
                return dp
            }

            vox.mutation.watchAppend($("body"), function(ev){
                ev.jTarget.voxtooltip()
            }, ".tooltip")
            $(".tooltip").voxtooltip()
            
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


        get html(){
            return this.$.obj.html()
        }

        set html(/*string */value){
            this.$.obj.html(value)
        }

        get text(){
            return this.$.obj.text()
        }

        set text(/*string */value){
            this.$.obj.text(value)
        }

    	obtainProps(){
    		
    	}

    	init(){
            var f= this.$
            //f.obj.removeClass("toast")
            //toast.container.append(f.obj)
            //f.obj.addClass("toast")
    		this.events()
    	}

    	isOpened(){
            return this.$.obj.hasClass("opened")
        }


        activate(parent){
            var f= this.$
            if(f.activating2){
                clearTimeout(f.activating2)
                f.activating2= undefined
            }
            if(f.activating){
                clearTimeout(f.activating)
                f.activating= undefined
            }

            var time= f.obj.data("delay")
            if(isNaN(time)|| !time)
                time=500
            
            if(parent)
                f.lParent= parent
            
            f.activating= setTimeout(()=>this.open(), time)
        }

        acomode(){
            var f= this.$
            f.obj.addClass("activating")
            var task= new core.VW.Task()
            setTimeout(function(){
               
                var h= f.obj.outerHeight()
                var hg= $(window).height()
                var w= f.obj.outerWidth()
                var hw= $(window).width()

                // Verificar cual sería el mejor left: 
                var l=(hw-w)/2
                f.obj.css("top", 0)

                var f_abs= f.obj.offset().top // El top absolute a partir de fixed 0 ...
                var lOff=0, lFixed=0, lh= 0, lw=0, lLeft=0
                var maxHeight,top,bottom


                if(f.lParent){
                   lw= f.lParent.outerWidth()
                   lOff= f.lParent.offset().top
                   lLeft= f.lParent.offset().left
                   lFixed= lOff - f_abs
                   lh= f.lParent.outerHeight()
                }

                // Si el fixed del lParent es mayor a la mitad del height, se acomoda en la parte superior ...
                if(lFixed> (hg/2)){ // Acomodando a la parte superior ...
                   
                   maxHeight= (lFixed-20 )
                   if(maxHeight<30)
                       maxHeight= "auto"
                   
                   else
                       maxHeight= maxHeight.toString()+ "px"
                   
                   
                   top= "initial"
                   bottom= (hg - lOff + 4) + "px"
                   
                }
                else{ // Acomodando a la parte inferior ...
                    
                    top= (lOff + lh + 4)
                    maxHeight= hg- top;
                    if(maxHeight<30)
                        maxHeight= "auto"
                    else
                        maxHeight= maxHeight.toString()+ "px"
                    bottom= "initial"
                    top= top.toString() + "px"
                }


                l= (lLeft + (lw/2)) - (w/2)
                if(l<0)
                   l= 0


                f.obj.css("left", l+"px")
                f.obj.css("max-height", maxHeight)
                f.obj.css("top", top)
                f.obj.css("bottom", bottom)
                f.obj.removeClass("activating")
                task.finish()          
               
                
            },0)
            return task
        }

        async open(event){
            var f= this.$
            if(this.isOpened())
                return
            
            f.activating= undefined
            var ev= this.createEvent("beforeopen",event)
            ev.tooltip= this
            this.emit(ev)
            if(ev.defaultPrevented)
                return
            
            if(f.delay){
                clearTimeout(f.delay)
                f.delay=undefined
            }
            
            await this.acomode()
            f.lEvent= event?event.type:""
            var effect= f.obj.data("ineffect") || "fadeIn short"
            f.obj.addClass("opened")
            f.obj.voxanimate(effect, undefined,()=>{
                var ev= this.createEvent("open",event)
                ev.tooltip= this            
                this.emit(ev)
            })

        }


        close(){

            if(!this.isOpened())
                return
            
            var f= this.$
            var ev= this.createEvent("beforeclose")
            ev.tooltip= this
            this.emit(ev)
            if(ev.defaultPrevented)
                return
            
            
            
            f.lEvent= undefined
            f.obj.removeClass("opened")
            
            var effect= f.obj.data("outeffect") || "fadeOut short"
            f.obj.voxanimate(effect, undefined, ()=>{
                var ev= this.createEvent("close")
                ev.tooltip= this
                this.emit(ev)
            });

        }

        toggle(){
            this.isOpened()? this.close(): this.open()
        }

        activateClose(){
            var f= this.$
            if(f.activating){
                clearTimeout(f.activating)
                f.activating= undefined
            }
            if(f.activating2){
                clearTimeout(f.activating2)
                f.activating2= undefined
            }
            var time= f.obj.data("delay")
            if(isNaN(time)|| !time)
                time=500
            
            
            f.activating2= setTimeout(()=>this.close(), time)
        }


    	events(){
    		var f= this.$
    		f.obj.hover((ev)=>{
                if(ev.type=="mouseenter")
                    this.activate()
                
                else if(ev.type="mouseleave")
                    this.activateClose()
            })

            vox.platform.attachOuterClick(f.obj, {
                active:()=>this.isOpened(),
                processEvent:(ev)=>{
                    var ev2= this.createEvent("outerclick",ev)
                    ev2.tooltip= this
                    ev2.target= ev.target
                    ev2.clickEvent= ev
                    return ev2
                },
                self:this,
                callback:(ev)=>{
                    this.emit(ev)
                    if(ev.defaultPrevented)
                        return

                    this.close()
                }
            })
    	}

    }
    return Tooltip
}
export default init(w)

