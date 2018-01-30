

/**
* @author James Suárez
* Input.js
* 14-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox
export var mask= require("./jquery-mask")
var fnVal= $.fn.val

/*
vox.mutation.watchAppend($("body"), function(ev){
    ev.jTarget.each(function(){
        var a= $(this)
        a.mask(a.data("mask").toString())
    })
}, "[data-mask]")
*/
class Input extends Element{


	static register(){
		if(this.registered)
			return 
			
		$.fn.voxinput= function(){
	        var dp=[]
	        this.each(function(){
	            var o= $(this)
	            var t=undefined
	            /*
	            if(!(t=o.data("vox-input"))){
	                t=new Input(o)
	                o.data("vox-input", t)
	            }*/
	            this.voxcss_element= this.voxcss_element||{}
	            t= this.voxcss_element["vox-input"]
	            if(!t){
	            	t=new Input(o)
	            	this.voxcss_element["vox-input"]= t
	            }
	            dp.push(t)
	        })
	        return dp
	    }

	    $(function(){
	        vox.mutation.watchAppend($("body"), function(ev){
	            ev.jTarget.voxinput()
	        }, ".input-field")
	        $(".input-field").voxinput()
	    })

	    var value= fnVal
	    var replaceval= $.fn.val= function(){
	    	var er, result = value.apply(this,arguments)
	    	$.fn.val= value

	    	try{
	    		this.each(function(){
	    			var o= $(this)

                    //if(o.attr("vox-input")!==undefined){
                        var p= o.parents(".input-field").eq(0)
                        if(p.length>0){
                            var t= p[0].voxcss_element?p[0].voxcss_element["vox-input"]:null
                            if(t){
                                t.adjustValue()
                                t.$.r()
                                t.$.elasticr()
                            }
                        }
                    //}
	    		})
	    	}
	    	catch(e){
	    		er=e

	    	}
	    	$.fn.val= replaceval

	    	if(er){
	    		throw er;
	    	}
	    	return result;
	    }
	    this.registered= true
	}


	constructor(/* Node */obj){
		super()
		obj= $(obj)
		var f= this.$={}
		f.obj=obj
		this.func=[]
		this.obtainProps()
		
		this.init()
		

	}


	init(){

		var scope, f= this.$
        // dynvox observable list ..
        f.observable= f.obj.data("list")
        if(f.observable){
            scope= f.obj.voxscope()
            //scope= core.dynvox.Scope.get(scope)
            if(scope){
                f.scope= scope
            }
        }

        f.r= this.r.bind(this)
        f.adjustValue= this.adjustValue.bind(this)
		if(f.obj.is(".select")){
            require("./Input-createSelect").default($,f)
            f.select.attr("vox-input", "vox-input")
        }
        this.events()
		f.r()
	}
	
	imask(input){
		 
		setTimeout(function(){
			var d=input.data("imask")
	        if((typeof d!="object") && d ){
	          input.mask(d.toString())
	        }	
		},30)
		
	}

	obtainProps(){
		var f=this.$, self=this
		f.inp= f.obj.find("input,textarea")
        f.inp.each(function(){
          self.imask($(this))
        })

        f.label= f.obj.find("label")
        f.label.addClass("normal")
        f.action= f.obj.find(".action")

        f.inp.attr("vox-input", "vox-input");
        if(!f.obj.data("error-color"))
            f.obj.data("error-color", "red")

        if(!f.obj.data("error-color"))
            f.obj.data("error-color", "red")

        if(!f.obj.data("warning-color"))
            f.obj.data("warning-color", "orange")

        if(!f.obj.data("ok-color"))
            f.obj.data("ok-color", "green")

	}
	
	dynamicDispose(){
		
		Element.prototype.dynamicDispose.call(this)
		if(this.$){
			if(this.$.sw){
				this.$.sw.remove()
			}
			for(var id in this.$){
				delete this.$[id]
			}
			delete this.$
			
		}
	}



	adjustValue(){
		var f= this.$
        if(!f.select)
            return
				var va=v= f.select.val()



				if(!v&&f.select.attr("data-value")){
            v= f.select.attr("data-value")
						f.select.data("value", v)
						f.select.attr("data-value", "")
        }
				else if(!v&&f.select.data("value")){
            v= f.select.data("value")
        }

				if(va)
					f.select.data("value", "")

        f.opw.find("li").removeAttr("selected")
        f.opw.find("li>a").removeAttr("hover-active")
        /*if(!v){
            f.inp.val(f.selectDVal)
            return
        }*/

        f.opw.find("li").each(function(){
            var l= $(this)
            if(l.attr("value")==v || (!l.attr("value") && !v)){
                l.attr("selected", "selected")
                l.find("a").attr("hover-active","hover-active")
                f.inp.val(l.text())
            }
        })
	}




    r(){

        var f= this.$
        if((f.inp.val() && f.inp.val().length>0 && f.inp.attr("type")!="search") || f.inp.attr("type")=="date")
            f.label.addClass("active")
        else
            f.label.removeClass("active")



    }
    
    
   

	events(){
		var f= this.$;


        f.elasticr= ()=>{
            if(f.inp.hasClass("vox-textarea") || f.inp.hasClass("vox-elastic"))
                f.inp.voxelastic()[0] && f.inp.voxelastic()[0].refresh()
        }

        f.line= f.obj.find(".line")
        if(f.line.length==0){
            f.line= $("<div>")
            f.line.addClass("line")
            f.obj.append(f.line)
        }

        if(f.select){
            f.select.focus(function(ev){
                f.inp.focus()
            })
            f.select.blur(function(ev){
                f.inp.blur()
            })
            f.select.change(()=>{
								f.select.data("value", f.select.val())
                this.adjustValue()
            })

			this.attachEvent(f.dropdown, "select", function(ev){
                f.select.val(ev.value)
                f.select.change()
            })
            
        }

        f.addactive= function(){
            if(f.inp.attr("type")!="search"){
                f.label.addClass("active")
                f.label.removeClass("normal")
            }
            f.obj.addClass("active")
        }


        var oninput= (ev)=>{
        	f.obj.removeClass("error warning ok");
            this.emit("focus", ev) // No estoy seguro si debe ir
            if(ev.defaultPrevented)
                return


            f.addactive()
            var l
            if(f.lineClass){
                l= "text-" + f.lineClass
                f.line.removeClass(f.lineClass)
                f.label.removeClass(l)
            }

            f.lineClass= f.obj.data("activecolor")
            f.line.addClass(f.lineClass)
            l= "text-"+f.lineClass
            f.label.addClass(l)
        }
        f.inp.on("keyup input", oninput)

        f.inp.focus(function(ev){

            if(f.obj.hasClass("error")|| f.obj.hasClass("warning") || f.obj.hasClass("ok"))
                return

            return oninput(ev)
        });


        f.inp.blur((ev)=>{


            if(f.obj.hasClass("error")|| f.obj.hasClass("warning") || f.obj.hasClass("ok"))
                return

            this.emit("blur", ev)
            if(ev.defaultPrevented)
                return


            f.r()
            f.obj.removeClass("active")
            f.label.addClass("normal")

            if(f.lineClass){
                l= "text-" + f.lineClass
                f.line.removeClass(f.lineClass)
                f.label.removeClass(l)
            }
            f.lineClass=undefined

        })

        this.on("change", ()=>{
        	if(f.select){
                this.adjustValue()
            }
            return f.r()
        })
	}
}

export default Input
