exports.default= function($, f){

	 
    var voxselect= f.obj.find("vox-select");
    if(voxselect.length>0){

        var select= f.obj.find("select");
        if(select.length==0){
            select= $("<select>");
            // select.attr("name", voxselect.attr("name"));

            $.each(voxselect.get(0).attributes, function() {
                // this.attributes is not a plain object, but an array
                // of attribute nodes, which contain both the name and value
                if(this.specified) {
                    select.attr(this.name, this.value);
                }
            });

            var options= voxselect.find("vc-option");
            options.each(function(){
                var toption= $(this);
                var option= $("<option>");

                option.html(toption.html());
                // option.val(toption.attr("value"));

                $.each(this.attributes, function() {
                    // this.attributes is not a plain object, but an array
                    // of attribute nodes, which contain both the name and value
                    if(this.specified) {
                        option.attr(this.name, this.value);
                    }
                });

                option.data("vc-option", toption);
                select.append(option);
                f.obj.append(select);
                voxselect.hide();
            });

        }

    }


	f.voxStyle= f.obj.find("vox-css[vox-func='input-style']")
    if(f.voxStyle.length==0)
        f.voxStyle= $('<vox-css vox-type="class" vox-func="input-style" vox-selector="li>a:not([disabled]>a)">')

    var cl=[f.obj.data("activecolor")  + "-hover"]
    if(f.obj.data("activecolortext"))
        cl.push("text" + f.obj.data("select-activecolortext")  + "-hover")
    else
        cl.push("text-white-hover")



    f.voxStyle.data("value", cl.join(" "))



    f.obj.find(".select-wrapper").remove()
    f.select= f.obj.find("select")

    f.sw= $("<div>")
    f.sw.addClass("select-wrapper")
    f.sw.insertBefore(f.select)
    f.opw= $("<ul>")
    f.opw.addClass("text-"+f.obj.data("activecolor"))
    f.opw.addClass("options-wrapper")
    var i1= $("<input>")
    i1.attr("voxs", "voxs")
    i1.attr("type","text")
    i1.attr("readonly","readonly")
    f.inp= i1

    var av= f.select.val()
    var caret= $("<i class='fa fa-caret-down select-down'></i>")
    f.select.css("position", "absolute")
    f.select.css("top", "80px")
    var val=''
    f.selectDVal= ' '




    f.appendOption= function(e){
        var op= $("<li>")
        if(e.jOption){
            e.jOption.get(0).__optionwrapper= op
        }

        var vv= e.value||""
        op.attr("value", vv)

        var a= $("<a>")
        a.attr("voxs","voxs")
        a.data("value", vv)

        if(e.html)
            a.html(e.html)
        else
            a.text(e.text)


        op.append(a)
        if(e.disabled!==undefined){
            op.attr("disabled", "disabled")
        }
        if(vv==""){
           f.selectDVal= e.text
        }

        if(!av){
            if(e.selected!==undefined && e.disabled===undefined){
                op.attr("selected", "selected")
                i1.val(e.text)
                val=vv
            }
        }
        else{
            if(vv==av){
                op.attr("selected", "selected")
                i1.val(e.text)
                val=v
            }
        }
        f.opw.append(op)

        return op
    }



    f.select.find("option").each(function(){
        var e=$(this)
        f.appendOption({
            html: e.html(),
            text: e.text(),
            disabled: e.attr("disabled"),
            selected: e.attr("selected"),
            value: e.val(),
            jOption: e
        })
    })

    var adjtime=0
    var atm= function(){
      if(adjtime)
        clearTimeout(adjtime)
      adjtime= setTimeout(function(){
          f.adjustValue()
          adjtime=0
      },200)
    }


    
    if(f.scope && f.observable){


        var options=[], items=[]
        var values= {}
		var scope= f.scope
		
		var createOption= function(value){
			var option= $("<option>")
			
			/*
	        if(values[value.value])
	            return 
	          */
	          
	        values[value.value]= true
	        value.jOption= option
	        var t, item= f.appendOption(value)
	        items.push(item)
	        if(!value.text){
	            t= $("<div>")
	            t.html(value.html)
	            value.text= t.text()
	        }
	        options.push(option)
	        option.text(value.text)
	        option.val(value.value)
	        if(value.selected)
	            option.attr("selected","selected")
	        if(value.disabled)
	            option.attr("disabled","disabled")
	           
	          
	        f.select.append(option)
	        if(value.selected){
	            f.select.val(value.value)
	            f.r()
	        }
	        return item
		}
	
		var newdom, child, childs=[], newdom2
		var adding= function(ev, index){
			
			
			if(f.select.attr("dynamic-removed")!==undefined)
				return
				
			var current= true, temporal, g, dom2
			if(index==undefined)
				index= ev.value.index
			
			newdom=items[index]
			child= childs[index]
			
			if(!newdom){
				newdom= createOption(ev.value[0])
				current=false
				//temporal=$("<div>")
				//temporal.append(newdom)
			}
			else{
				// Por ahora no hace nada
				dom2= createOption(ev.value[0])
				//newdom.replaceWith(dom2)
				newdom.remove()
				newdom=dom2
			}
			items[index]= newdom
			
			
			if(!child){
				child= scope.createChild()
				childs[index]= child
				
				if(newdom){
					newdom.attr("dynamic-child-scope", true)
					newdom.each(function(){
						this["dynamic_scope"]=child
					})
				}
				
			}
			
			
			if(current ){
				child["option"]= ev.value
			}
			else{
			
				child["option"]= ev.value[0]
				child.$index= index
				
				/*g= function(ev){
					if(g.finished)
						return 
					window.DEBUG && console.info("CAMBIANDO ...", ev, index)
					adding(ev, index)
				}
				g.event= f.observable + "." + child.$index
				
				
				scope.attach({
					event: "change", 
					name: arrname + "." + child.$index, 
					func: g,
					dom: newdom
				})
				
				// parse with new scope
				self.parse(temporal, child)*/
			}
			
		}
		
		var removing= function(ev){
			var keys=Object.keys(items)
			if(ev.value< keys.length){
				for(var i=ev.value;i<keys.length;i++){
					// remove object ...
					try{
						items[keys[i]].remove()
						//funcs[i].finished= true
						//scope.removechange(funcs[i].event, funcs[i])
						
						delete items[keys[i]]
						delete childs[keys[i]]
					}catch(e){
						console.error("ERROR REMOVING:", e)
					}
				}
			}
		}
		
		
		scope.attach({
			event: "push", 
			name: f.observable,
			func: adding,
			dom: f.obj
		})
		scope.attach({
			event: "change", 
			name: f.observable + ".length", 
			func: removing,
			dom: f.obj
		})
		
		
		
		// COPIAR ACTUALES ...
		var j= function(){
			var keys=Object.keys(items)
			if(keys.length>0){
				for(var i=0;i<keys.length;i++){
					// remove object ...
					try{
						items[i].remove()
						//funcs[i].finished= true
						delete items[i]
						delete childs[i]
					}catch(e){
						console.error("ERROR REMOVING:", e)
					}
				}
			}
			
			var parts= f.observable.split(".")
			var o= scope
			for(var i=0;i<parts.length;i++){
				o= o[parts[i]]
				if(!o)
					break 
			}
			
			if(o && o.length){
				// push the array ...
				for(var i=0;i<o.length;i++){
					adding({
						value:{
							"0": o[i],
							"index": i
						}
					})
				}
				
				if(f.select.data("value")){
					setTimeout(function(){
						f.select.val(f.select.data("value"))	
					},80)
				}
			}
		}
		
		j()
		
		
		scope.attach({
			event: "change", 
			func: function(ev){
				var t= ev.name+"."
				if(f.observable.startsWith(t) || f.observable==ev.name){
					j()
				}
			},
			dom: f.obj
		})
    }


    if(!val)
        i1.val(f.selectDVal)


    f.sw.append(i1)
    f.sw.append(caret)
    f.sw.append(f.opw)
    f.sw.append(f.voxStyle)



    f.opw.addClass("dropdown-menu")
    
    
    f.dropdown= f.sw.voxdropdown()[0]
    var h= function(){
        f.dropdown.toggle()
    }
    f.sw.find(".select-down").click(h)
    f.inp.click(h)
    f.label.click(h)

}
