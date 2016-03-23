exports.default= function($, f){

	f.voxStyle= f.obj.find("vox-css[vox-func='input-style']")
    if(f.voxStyle.length==0)
        f.voxStyle= $('<vox-css vox-type="class" vox-func="input-style" vox-selector="li>a:not([disabled]>a)">')
    
    var cl=[f.obj.data("activecolor")  + "-hover"]
    if(f.obj.data("activecolortext"))
        cl.push("text" + f.obj.data("select-activecolortext")  + "-hover")
    else
        cl.push("text-white-hover")
    


    f.voxStyle.data("value", cl.join(" "))
    
    
    
    
    f.select= f.obj.find("select")
    f.sw= $("<div>")
    f.sw.addClass("select-wrapper")
    f.opw= $("<ul>")
    f.opw.addClass("text-"+f.obj.data("activecolor"))
    f.opw.addClass("options-wrapper")
    var i1= $("<input>")
    i1.attr("type","text")
    i1.attr("readonly","readonly")
    f.inp= i1

    var av= f.select.val()
    var caret= $("<i class='fa fa-caret-down select-down'></i>")
    f.select.css("position", "absolute")
    f.select.css("top", "80px")
    var val=''
    f.selectDVal= ' '
    f.select.find("option").each(function(){
        var op= $("<li>")
        var e= $(this)
        var vv= e.val()||""
        op.attr("value", vv)
        
        var a= $("<a>")
        a.data("value", vv)
        
        a.text(e.text())
        op.append(a)
        if(e.attr("disabled")!==undefined){
            op.attr("disabled", "disabled")
        }
        if(vv==""){
           f.selectDVal= e.text()
        }
        
        if(!av){
            if(e.attr("selected")!==undefined && e.attr("disabled")===undefined){
                op.attr("selected", "selected")
                i1.val(e.text())
                val=vv
            }
        }
        else{
            if(vv==av){
                op.attr("selected", "selected")
                i1.val(e.text())
                val=vv
            }
        }
        f.opw.append(op)
    })
    
    
    if(!val)
        i1.val(f.selectDVal)
    
    
    f.sw.append(i1)
    f.sw.append(caret)
    f.sw.append(f.opw)
    f.sw.insertBefore(f.select)
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