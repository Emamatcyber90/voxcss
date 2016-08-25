

/**
* @author James Suárez
* Tabs.js 
* 15-03-2016
*/

var Element= require("./Element").default
var $=core.VW.Web.JQuery
var vox= core.VW.Web.Vox
var Tab= core.VW.Web.Elements.Tab
var doc={};
if(typeof document !== "undefined"){
    doc=document;
}
function init(document){
    class Tabs extends Element{
        
        static register(){
            $.fn.voxtabgroup= function(){
                var dp=[]
                this.each(function(){
                    var o= $(this)
                    var t=undefined
                    if(!(t=o.data("vox-tabgroup"))){
                        t=new Tabs(o)
                        o.data("vox-tabgroup", t)
                    }
                    dp.push(t)
                })
                return dp
            }
            
            $(function(){
                vox.mutation.watchAppend($("body"), function(ev){
                    ev.jTarget.voxtabgroup()
                }, ".tabs");
                $(".tabs").voxtabgroup()
            });
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
    		var f= this.$
            f.indicator= f.obj.find(".indicator")
            if(f.indicator.length==0){
                f.indicator= $("<div>")
                f.indicator.addClass("indicator")
                f.indicator.addClass("transitioned")
            }
            f.indicator.hide()
    	}

    	init(){
    		this.$.tabs=[]
            this.tabs()
    		this.events()

    	}

        removeIndicator(){
            this.$.indicator.hide()
        }

        isOpened(){
            return true
        }

        getTabs(){
            return this.$.tabs
        }

        tabs(){
            var f=this.$
            var utab= f.obj.find(".tab")
            console.info("OTABS",utab)
            var i=0
            var self= this
            utab.each(function(){
                var jtab= $(this)
                if(i==0){
                    jtab.append(f.indicator)
                }
                
                var otab= new Tab(jtab)
                jtab.attr("vox-index",i)
                otab.$.index=i
                otab.$.parent = self
                i++
                f.tabs.push(otab)
                
            })
        }

        addIndicator(tab){
            var f= this.$
            var o= f.lastTab
            f.selectedTab= tab
            f.lastTab= tab
            var obj= tab.$.obj
            var left= obj.position().left
            f.indicator.show()
            
            if(f.tabs[0]){
                let nl=0
                if(o)
                    nl = o.$.obj.position().left
                
                nl= nl.toString() + "px"
                
                f.indicator.css("left", nl)
                f.tabs[0].$.obj.append(f.indicator)
            }
            

            f.indicator.css("width", obj.outerWidth())
            f.indicator.voxtransition({
                left:left.toString() + "px"
            }, undefined, 1000, function(){
               
               f.indicator.css("left", 0)
               f.indicator.css("width", "100%")
               obj.append(f.indicator)

            })
        }

        unselect(){
            var f= this.$
            if(f.selectedTab){
                if(f.selectedTab.unselect()!== false){
                    f.selectedTab=undefined
                }
            }
        }

    	events(){
    		var f= this.$
    		vox.platform.attachOuterClick(f.obj, {
                active:()=>this.isOpened(),
                processEvent:(ev)=>{
                    var ev2= this.createEvent("outerclick",ev)
                    ev2.tabs= this
                    ev2.target= ev.target
                    ev2.clickEvent= ev
                    return ev2
                },
                self:this,
                callback:(ev)=>{
                    this.emit(ev)
                    if(ev.defaultPrevented)
                        return

                   // this.close()
                }
            })
    	}

    }
    return Tabs
}
export default init(doc)

