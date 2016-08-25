

/**
* @author James Suárez
* Tab.js 
* 15-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox

class Tab extends Element{

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
        f.a= f.obj.find("a")
	}

	init(){

		var h= this.href()
		h&&h.hide()
		this.events()
	}

	href(){
		var f= this.$
		var href= f.a.attr("href")
        if(href){
            href= $(href)
            f.href= href
        }
        return f.href
	}

	unselect(){
		var f= this.$
		var a0= f.a
        var ev= this.createEvent("beforeunselect")
        ev.tab= this
        ev.jTarget= a0
        
        this.emit(ev)
        if(ev.defaultPrevented)
            return false
        
        var ev= this.createEvent("unselect")
        ev.tab= this
        ev.jTarget= a0
        
        this.href().hide();
        if(f.parent){
            f.parent.removeIndicator();
        }
        
        this.emit(ev)
        if(ev.defaultPrevented)
            return
	}

	select(){

        console.info("TAB HERE -----")
		var f=this.$
		var a0= f.a
        var ev= this.createEvent("beforeselect")
        ev.tab= this
        ev.jTarget= a0
        
        this.emit(ev)
        if(ev.defaultPrevented)
            return false
        
    
        var ev= this.createEvent("select")
        ev.tab= this
        ev.jTarget= a0
        if(f.parent){
            if(f.parent.unselect()===false){
                return false
            }
        }
        this.href().show()
        if(f.parent)
            f.parent.addIndicator(this)
        
        this.emit(ev)
	}

	events(){
		var f= this.$
        console.info("AQUI BABE...")
		f.a.click((ev)=>{
            if(f.obj.attr("disabled")===undefined && f.a.attr("disabled")===undefined){
                ev.preventDefault()
                this.select()
            }
        })
	}

}

export default Tab

