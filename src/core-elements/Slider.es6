

/**
* @author James Suárez
* Slider
* 10-03-2017
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox
var w={}
if(typeof window !=="undefined")
	w=window

function init(window){
	class Slider extends Element{

		static init(){

		}

		static register(){
			$.fn.voxslider= function(){
		        var dp=[]
		        this.each(function(){
		            var o= $(this)
		            var t=undefined
		            if(!(t=o.data("vox-slider"))){
		                t=new Slider(o)
		                o.data("vox-slider", t)
		            }
		            dp.push(t)
		        });
		        return dp
		    }

		    $(function(){
		        vox.mutation.watchAppend($("body"), function(ev){
		            ev.jTarget.voxslider()
		        }, ".slider")
		        $(".slider").voxslider()
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
      var f= this.$
			this.events()
      if(f.obj.hasClass("discrete"))
        this.createSteps()
		}

    get maxValue(){
      var v=this.$.obj.data("maxvalue")
      return v===undefined?100:v
    }

    get minValue(){
      var v= this.$.obj.data("minvalue")
      return v===undefined?0:v
    }

    get step(){
      var v= this.$.obj.data("step")
      return v===undefined?1:v
    }


    createSteps(){
      var f= this.$, s
      var minValue= parseFloat(f.obj.data("minvalue"))
      var maxValue= parseFloat(f.obj.data("maxvalue"))
      var step= parseFloat(f.obj.data("step"))
      var dif=maxValue-minValue

      var percent= 0
      var stepPercent= step*100 / dif

      while(percent<=100){
        s=$("<div>")
        s.addClass("step")
        s.insertAfter(f.progress)
        if(f.obj.hasClass("vertical")){
          if(f.obj.hasClass("inverted"))
            s.css("top", percent+"%")
          else
            s.css("bottom", percent+"%")
        }
        else{

            s.css("left", percent+"%")
        }
        percent+= stepPercent
      }
    }

    obtainProps(){

      var f= this.$
      f.line= f.obj.find(".line")
      f.progress= f.obj.find(".progress")
      f.ball= f.obj.find(".ball")
      f.ball.addClass("first")


      f.line.addClass("transitioned")
      f.progress.addClass("transitioned")
      f.ball.addClass("transitioned")

      if(f.obj.data("color")){
        f.ball.addClass(f.obj.data("color"))
        f.progress.addClass(f.obj.data("color"))
        f.ball.addClass("text-" + f.obj.data("color"))
      }


      f.span= f.ball.find("span")
      if(!f.span.length){
        f.span=$("<span>")
        f.span.addClass("text-" + f.obj.data("text-color"))
        f.ball.append(f.span)
      }
      var observable= f.obj.data("bind")
      if(observable){
        var scope= f.obj.voxscope()
        f.observable= observable
        f.scope= scope
        f.scope.observer.onValueChanged(observable, this._changeValue.bind(this))
      }



      if(f.obj.data("value"))
        this.set(f.obj.data("value"))
    }

    get(){
      return this.$value
    }

    set(value){

      var f= this.$
      if(f.scope){
        f.scope.observer.assignValue({
          name:  f.observable,
          value
        })
      }
      else{
        this._changeValue({value})
      }
    }


    _changeValue(ev){
      var f= this.$
      var discrete= f.obj.hasClass("discrete"), v1=ev.value


      var percent=ev.value,v=0
      if(ev.value===undefined || ev.value===null)
        ev.value=0

      //if(discrete){
        v= Math.max(Math.min(ev.value, this.maxValue), this.minValue)
        if(isNaN(v))
          v=this.minValue

        if(v==ev.value && discrete){
          // take step ...
          v1=v
          v= Math.round((v-this.minValue)/this.step)*this.step
          v+= this.minValue
          v= Math.max(Math.min(v, this.maxValue), this.minValue)
        }

        if(v!=ev.value && f.scope){
          return f.scope.observer.assignValue({
            name:  f.observable,
            value: v
          })
        }

        ev.value= v
        if(this.usermode){
					v1= Math.max(Math.min(v1, this.maxValue), this.minValue)
          percent= (v1-this.minValue)*100/(this.maxValue-this.minValue)
          this.uservalue= v1
        }
        else{
          percent= (ev.value-this.minValue)*100/(this.maxValue-this.minValue)
        }
      //}
      this.$value= ev.value
      f.span.text(ev.value)
      var inverted= f.obj.hasClass("inverted")
      if(f.obj.hasClass("vertical")){

        f.progress.css("top", !inverted? (( 100-percent)+"%") : 0)
        f.progress.css("height", percent+"%")
        f.ball.css(inverted?"top":"bottom", percent+"%")
      }
      else{
        f.progress.css("left", inverted? (( 100-percent)+"%") : 0)
        f.progress.css("width", percent+"%")
        f.ball.css(inverted?"right":"left", percent+"%")
      }
    }

    next(){
      this.set(this.get()+ (this.step||1))
    }

    prev(){
      this.set(this.get()- (this.step||1))
    }

    _keyNext(){
      this.clearTimeout()
      this.next()
      this.timeout=setTimeout(()=>{
        this.next()
        this.interval= setInterval(this.next.bind(this), 100)
      },1000)
    }

    _keyPrev(){
      this.clearTimeout()
      this.prev()
      this.timeout=setTimeout(()=>{
        this.prev()
        this.interval= setInterval(this.prev.bind(this), 10)
      },1000)
    }


    clearTimeout(){
      if(this.timeout){
        clearTimeout(this.timeout)
        this.timeout= undefined
      }
      if(this.interval){
        clearTimeout(this.interval)
        this.interval= undefined
      }
    }

    mouseEvent(ev){
      var f= this.$
    //  console.info(ev)
      var inverted= f.obj.hasClass("inverted")
      var off=0, w, pos= f.obj.offset()
      if(f.obj.hasClass("vertical")){
        off= ev.pageY- pos.top
        if(!inverted)
          off= f.obj.outerHeight()- off
        w= f.obj.outerHeight()
      }
      else{
        off= ev.pageX-pos.left
        if(inverted)
          off= f.obj.outerWidth()- off
        w= f.obj.outerWidth()
      }


      //console.info(ev.pageX-pos.left, w)
      //var percent= off*100/w
      var dif= this.maxValue-this.minValue
      var value= dif*off/w
      value+= this.minValue

      if(f.obj.data("decimals")!==undefined)
        value= parseFloat(value.toFixed(f.obj.data("decimals")||2))
      else {
        value= parseInt(value)
      }

      this.set(value)
    }

    createStyle(){

      var f= this.$
			var transparent
			if(!(transparent=Slider.transparent)){
				var $temp = $('<div style="background:none;display:none;"/>').appendTo('body');
			  transparent = Slider.transparent=$temp.css('backgroundColor');
			  $temp.remove();

			}

			var inherited=function(){
				var bc
				$(this).parents().each( function(){
		      bc = $(this).css("background-color");
		      if( bc == transparent ){
		         return inherited.call(this)
		      }
		      else{
		         return bc
		      }
		   });
			 return bc
		 }

		 var bc= f.obj.css("background-color");
		 if(bc==transparent)
		 	bc=inherited.call(f.obj.get(0))

			

      if(this.style)
        this.style.remove()

			if(!bc)
				return


      this.style=this.style||$("<div>")
      var content= ["<style>"]
      content.push(".d-"+this.id+"[disabled] .ball.first{")
      content.push("border-color:"+bc.toString()+";")
			content.push("border-width:0.2em;")
			content.push("margin:-0.6em;")
			content.push("border-style:solid;")
      content.push("}")
      this.style.html(content.join("\n"))

      $("body").append(this.style)


    }

		events(){
			var f= this.$
      Slider.count=Slider.count||0
      this.id=(Date.now()+(Slider.count++)).toString(32)
      f.obj.addClass("d-"+this.id)
      this.createStyle()

      f.ball.on("focus", function(){

				if(f.obj.attr("disabled")!==undefined || f.obj.attr("readonly")!==undefined)
					return


        f.obj.addClass("focus")
        if(f.obj.hasClass("discrete")){

        }
      })
      f.ball.on("blur", function(){
        f.obj.removeClass("focus")
      })

      f.obj.click(()=>{
				if(f.obj.attr("disabled")!==undefined || f.obj.attr("readonly")!==undefined)
					return
        f.ball.focus()
      })

      f.ball.on("keydown", (ev)=>{
				if(f.obj.attr("disabled")!==undefined || f.obj.attr("readonly")!==undefined)
					return


				var vertical=f.obj.hasClass("vertical")
				var inverted= f.obj.hasClass("inverted")
        if((!vertical&&ev.keyCode==39) || (vertical && ev.keyCode==38)){
					ev.preventDefault()
          inverted?this._keyPrev():this._keyNext()
        }
        else if((!vertical && ev.keyCode==37) || (vertical && ev.keyCode==40)){
					ev.preventDefault()
          !inverted?this._keyPrev():this._keyNext()
        }
      })


      f.obj.on("mousedown", (ev)=>{
				if(f.obj.attr("disabled")!==undefined || f.obj.attr("readonly")!==undefined)
					return

        ev.preventDefault()
        this.usermode= true
        f.obj.addClass("clic")
        f.ball.focus()
        this.mouseEvent(ev)
      })



      $(document).on("mouseup", (ev)=>{

				if(f.obj.attr("disabled")!==undefined || f.obj.attr("readonly")!==undefined)
					return

        if(this.usermode){
          f.obj.removeClass("clic")
          this.usermode=false
          this.set(this.get())
        }
      });

      /*
      $(document).on("mouseup", (ev)=>{
        this.usermode=false
        this.mouseEvent(ev)
      })*/

    	$(document).on("mousemove", (ev)=>{
				if(f.obj.attr("disabled")!==undefined || f.obj.attr("readonly")!==undefined)
					return

        if(this.usermode)
          this.mouseEvent(ev)
      })



      f.ball.on("keyup", this.clearTimeout.bind(this))
		}


	}
	Slider.init()
	return Slider
}
export default init(w)
