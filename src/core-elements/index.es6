
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

core.VW.Util.createProperties(e)
e.register= function(){
	e.Card.register()
	e.Dropdown.register()
	e.Input.register()
	e.Modal.register()
	e.ScrollFire.register()
	e.Parallax.register()
	e.Pinned.register()
	e.SideNav.register()
	e.TabGroup.register()
	e.Toast.register()
	e.Tooltip.register()
	e.HasTooltip.register()
	e.Elastic.register()
}
