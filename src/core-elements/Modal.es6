

/**
* @author James Suárez
* Card.js 
* 14-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox
var modals=[]


class Modal extends Element{
	

	static checkOpened(){
		var open;
        for(var i=0;i<modals.length;i++){
            open= open || modals[i].isOpened()
            if(open)
                break
        }
        if(!open){
            $("body").removeClass("modal-opened")
             $(".modal-back").hide()
        }
        else{
            $("body").addClass("modal-opened")
            $(".modal-back").show()
        }
	}


	static openBack(){
		$("body").addClass("modal-opened")
        var m= $(".modal-back")
        if(m.length==0){
            m= $("<div>")
            m.addClass("modal-back")
            m.addClass("default")
            $("body").append(m)
        }
        m.show()
	}

	static register(){
		$.fn.voxmodal= function(){
	        var dp=[]
	        this.each(function(){
	            var o= $(this)
	            var t=undefined
	            if(!(t=o.data("vox-modal"))){
	                t=new Modal(o)
	                o.data("vox-modal", t)
	            }
	            dp.push(t)
	        })
	        return dp
	    }
	    
	    $(function(){
	        vox.mutation.watchAppend($("body"), function(ev){
	            ev.jTarget.voxmodal()
	        }, ".modal")
	        $(".modal").voxmodal()
	        
	        $("[data-toggle=modal]").click(function(){
	           var e= $(this)
	           var s= e.attr("vox-selector")
	           var g= $(s).eq(0)
	           var h= g.voxmodal()[0]
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


	init(){
		this.events()
	}

	obtainProps(){
		var f=this.$;
		f.container= f.obj.parent()
		modals.push(this)
	}

	

	isOpened(){
		return this.$.obj.hasClass("opened")
	}

	open(event){

		var f= this.$
		var ev= this.createEvent("beforeopen",event)
		ev.modal=this
		this.emit(ev)

		if(ev.defaultPrevented)
			return

		if(f.delay){
			clearTimeout(f.delay)
			f.delay=undefined
		}



		Modal.openBack()
		f.lEvent= event?event.type:""
		f.obj.addClass("opened")
        f.container.show()
        f.obj.voxanimate(f.obj.data("ineffect")||"bounceInUp", undefined,()=>{
            
            modal.checkOpened()
            var ev= this.createEvent("open",event)
            ev.modal= this
            this.emit(ev)

        })

	}

	close(event){

		var f= this.$
		var ev= this.createEvent("beforeclose",event)
		ev.modal=this
		this.emit(ev)

		if(ev.defaultPrevented)
			return

		if(f.delay){
			clearTimeout(f.delay)
			f.delay=undefined
		}



		
		f.lEvent= event?event.type:""
		f.obj.removeClass("opened")
        f.container.hide()
        f.obj.voxanimate(f.obj.data("outeffect")||"bounceOutDown", undefined,()=>{
            
            modal.checkOpened()
            var ev= this.createEvent("close",event)
            ev.modal= this
            this.emit(ev)

        })

	}


	toggle(){
        if(f.obj.hasClass("opened"))
            this.close()
        
        else
            this.open()
        
    }


	events(){
		var f= this.$;
		vox.platform.attachEvents("keyup keydown", {
            active:()=> this.isOpened(),
            processEvent:(ev)=>{
                ev.modal=this
                return ev
            },
            self:this,
            callback:(ev)=>{
                if(ev.keyCode==27 && ev.type=="keyup"){
                    if(!f.obj.data("escape-disabled")){
                        this.close()
                    }
                }
            }
        })
        
        vox.platform.attachOuterClick(f.obj, {
            active:()=>this.isOpened(),
            processEvent:(ev)=>{
                var ev2= this.createEvent("outerclick")
                ev2.modal= this
                ev2.target= ev.target
                ev2.clickEvent= ev
                return ev2
            },
            self:self,
            callback:(ev)=>{
                !f.obj.data("closeonouterclick-disabled")&&this.close()
            }
        })
	}
}

export default Modal