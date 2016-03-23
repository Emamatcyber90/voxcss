

/**
* @author James Suárez
* Toast.js 
* 15-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox

class Toast extends Element{
    
    static init(){
        if(!Toast.container){
            Toast.container= $(".toast-container")
            if(Toast.container.length==0){
                Toast.container= $("<div>")
                Toast.container.addClass("toast-container")
                Toast.container.addClass("flow-text")
                $("body").append(Toast.container)
            }
        }
    }

    static register(){
        Toast.init()


        $.fn.voxtoast= function(){
            var dp=[]
            this.each(function(){
                var o= $(this)
                var t=undefined
                if(!(t=o.data("vox-toast"))){
                    t=new Toast(o)
                    o.data("vox-toast", t)
                }
                dp.push(t)
            })
            return dp
        }
        
        $(function(){
            vox.mutation.watchAppend($("body"), function(ev){
                if(ev.moved==false){
                    ev.jTarget.voxtoast()
                }
            }, ".toast")
            $(".toast").voxtoast()
            
            $("[data-toggle=toast]").click(function(){
               var e= $(this)
               var s= e.attr("vox-selector")
               var g= $(s).eq(0)
               var h= g.voxtoast()[0]
               if(h){
                   h.open()
               }
            })
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
		
	}

	init(){
        var f= this.$
        f.obj.removeClass("toast")
        toast.container.append(f.obj)
        f.obj.addClass("toast")
		this.events()
	}

	isOpened(){
        return this.$.obj.hasClass("opened")
    }

    open(event){

        var f= this.$
        var ev= this.createEvent("beforeopen",event)
        ev.toast= this
        this.emit(ev)
        if(ev.defaultPrevented)
            return
        
        if(f.delay){
            clearTimeout(f.delay)
            f.delay=undefined
        }
        
        
        f.lEvent= event?event.type:""
        f.obj.addClass("opened")
        f.obj.show()
        
        
        var ev= this.createEvent("open",event)
        ev.toast= this
        this.emit(ev)
        if(ev.defaultPrevented)
            return
        
        
        var time= parseInt(f.obj.data("delay"))
        if(isNaN(time) || !time){
            time=1000
        }
        
        f.delay= setTimeout(()=>this.close(), time)
    }


    close(){

        var f= this.$
        var ev= this.createEvent("beforeclose")
        ev.toast= this
        this.emit(ev)
        if(ev.defaultPrevented)
            return
        
        
        
        f.lEvent= undefined
        f.obj.removeClass("opened")
        f.obj.hide()
        
        var ev= vox.platform.createEvent("close")
        ev.toast= this
        this.emit(ev)
    }

    toggle(){
        this.isOpened()?this.close():this.open()
    }

	events(){
		var f= this.$
		vox.platform.attachOuterClick(f.obj, {
            active:()=>this.isOpened(),
            processEvent:(ev)=>{
                var ev2= this.createEvent("outerclick",ev)
                ev2.toast= this
                ev2.target= ev.target
                ev2.clickEvent= ev
                return ev2
            },
            self:this,
            callback:(ev)=>{
                this.emit(ev)
            }
        })
	}

}

export default Toast

