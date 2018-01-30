
/**
* @author James Suárez
* Este módulo depende de vw.js
* está pensado para ejecutarse en Web ...
*/

var e=core.VW.Web.Elements=core.VW.Web.Elements||{}
exports= module.exports=core
e.get_Element=function(){
	return require("./Element").default
}
e.get_Card= function(){
	return require("./Card").default
}
e.get_Dropdown= function(){
	return require("./Dropdown").default
}

var Input= require("./Input")
e.get_Input= function(){
	return Input.default
}
e.get_mask= function(){
	return Input.mask
}

e.get_Anchor= function(){
	return require("./Anchor").default
}

e.get_Modal= function(){
	return require("./Modal").default
}
e.get_ScrollFire= function(){
	return require("./ScrollFire").default
}
e.get_Parallax= function(){
	return require("./Parallax").default
}
e.get_Pinned= function(){
	return require("./Pinned").default
}
e.get_SideNav= function(){
	return require("./SideNav").default
}

e.get_Tab= function(){
	return require("./Tab").default
}
e.get_TabGroup= function(){
	return require("./Tabs").default
}
e.get_Toast= function(){
	return require("./Toast").default
}
e.get_Tooltip= function(){
	return require("./Tooltip").default
}
e.get_HasTooltip= function(){
	return require("./HasTooltip").default
}

e.get_Elastic= function(){
	return require("./Elastic").default
}

e.get_Slider= function(){
	return require("./Slider").default
}

e.get_Theme= function(){
	return require("./Theme").default
}

core.VW.Util.createProperties(e)
e.register= function(){
	
	var jqueryCleanData= jQuery.cleanData
	jQuery.cleanData= function(elems){
		var g= function(self){
			var ev, eves
			if(self.voxcss_element){
				
				for(var id in self.voxcss_element){
					ev= self.voxcss_element[id]
					if(ev){
						
						try{
							if(ev.dynamicDispose){
								ev.dynamicDispose()
							}
						}catch(e){
							console.error("Error in dispose method:", e)
						}
					}
					
					delete self.voxcss_element[id]
				}
			}
			delete self.voxcss_element
		}
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			g(elem)
		}
		return jqueryCleanData.apply(this, arguments)
	}
	
	
	if(!e.Theme.current)
		e.Theme.default()

	e.Card.register()
	e.Dropdown.register()
	e.Input.register()
	e.Modal.register()
	e.ScrollFire.register()
	e.Parallax.register()
	e.Pinned.register()
	e.SideNav.register()
	e.Slider.register()
	e.TabGroup.register()
	e.Toast.register()
	e.Tooltip.register()
	e.HasTooltip.register()
	e.Elastic.register()
	e.Anchor.register()
}
