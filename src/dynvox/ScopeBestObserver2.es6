
var id=0
var cons= 0
import {EventEmitter} from 'events'

var NullValue= function(){}

NullValue.valueOf= function(){
	return null
}
NullValue.toString= function(){
	return ""
}


class ScopeBestObserver extends EventEmitter{

  constructor(scope){
    this.scope= scope
    this.events=[]
    ScopeBestObserver.id++
    this.id= ScopeBestObserver.id
  }



  observe(args){
    var str= args.name
		//this.convertToThrowable(args)
    var observable= this.scope

    var parts= str.split(/\>|\./), val
    //console.info("OBSERVE", str, parts)
    if(!observable.getObservable(parts[0])){
      val= this.getValue(parts)
      observable.createVariable(parts[0], val)
    }


    if(parts.length==1 && args.array){
      var v= observable.getObservable(parts[0]), vas
      if(v&&!(v.value instanceof core.dynvox.ObservableList)){
        vas= new core.dynvox.ObservableList()
				if(v.value)
        	vas.value= v.value
        v.value= vas
				this.attachArrayEvents(vas, parts.join(">") )
      }
    }

    // First time check ...
    val= this.getValue(parts)
    this.obtenerValorPrimero(val, args)
    this.register(parts.join(">"), args)

    // Obtener el observable más cercano
    var curobs=observable, p=[]
    var i=0
    while(observable){
      if(i>=parts.length)
        break
      observable= i>0?(observable.value?observable.value.getObservable(parts[i]): null):observable.getObservable(parts[i])
      if(observable){
        curobs=observable
        p.push(parts[i])
      }
    }

    if(p.length>0 && curobs){
      this.attachEvents(curobs, p.join(">"))
    }

  }

  attachEvents(val, str){
    val.H= val.H||{}
    if(!val.H[id]){
      val.on("change", (ev)=>{
        this._eventValueChanged(str, ev.value, ev.observable)
      })
      val.H[id]=true
    }
  }

  attachArrayEvents(val, str){
    val.G= val.G||{}
    if(!val.G[id]){
      val.on("push", (ev)=>{
        var events= this.events.filter(function(a){
          return a.str==str
        })
        for(var event of events){
          event.args.onpush&&event.args.onpush(ev)
        }
      })
      val.on("remove", (ev)=>{
        var events= this.events.filter(function(a){
          return a.str==str
        })
        for(var event of events){
          event.args.onremove&&event.args.onremove(ev)
        }
      })
      val.on("removeall", (ev)=>{
        var events= this.events.filter(function(a){
          return a.str==str
        })
        for(var event of events){
          event.args.onremoveall&&event.args.onremoveall(ev)
        }
      })
      val.G[id]=true
    }
  }

  assignValue(args){

    var name= args.name
    var value= args.value

    var parts= name.split(/\>|\./), part
    var cur= this.scope
    for(var i=0;i< parts.length-1;i++){
      part= parts[i]
      cur= cur[part]
      if(cur)
        break
    }

    if(!cur)
      console.error("No se pudo asignar el valor: ", args)
    else{
      cur[parts[parts.length-1]]= value
      this._eventValueChanged(name, value)
    }
  }


  format(format, escape){
		var cached= {}
		var cached2= {}
		var z, i, y, value, str, name,procesar, val

		str=''
		while(format){
			procesar=true
			i= format.indexOf("#")
			if(i>=0){
				z=i
				procesar= false
				if(format[i+1]=="#")
					i++

				if(format[i+1]=="{"){
					y= format.indexOf("}", i+1)
					if(y>=0){
						str+= format.substring(0, z)
						name= format.substring(i+2, y)

						if(!cached2[name]){
							cached[name]= this.getValue(name)
							cached2[name]= true
						}
						val= cached[name]
						if(escape && val){
							val= core.dynvox.EscapeHtml(val)
							val= val.replace(/\r?\n|\r/ig, "<br/>")
						}

						if(val)
							str+=val.toString()

						format= format.substring(y+1)
					}
				}
				else{
					str+=format.substring(0, i+1)
					format= format.substring(i+1)
				}
			}
			if(procesar){
				str+= format
				format=undefined
			}
		}

		return str


	}

  _eventValueChanged(str, value, observable){
    var ev= {}
    var rstr= str.split(/\>|\./).join(">"), lstr
    var events= this.events.filter(function(a){
      return a.str==rstr || a.str.startsWith(rstr+">")
    })

    // Ahora ejecutar los eventos ...
    var cached={}, cached2={}, ev2={},val
    for(var event of events){
      lstr= event.str.split(/\>|\./).join(">")
      if(!cached2[lstr]){
        cached[lstr]= this.getValue(lstr)
        cached2[lstr]= true
      }
      ev.observable= ev.observable||observable|| new core.dynvox.Observable()
      ev.value= cached[lstr]

			try{
	      event.args.onchange&&event.args.onchange(ev)
				val= ev.value
	      if(val instanceof Array || val instanceof core.dynvox.ObservableList){

	        if(val instanceof core.dynvox.ObservableList)
	          this.attachArrayEvents(val, lstr)

	        event.args.removeall&& event.args.removeall(ev2)
	        for(var i=0;i<val.length;i++){
	          ev2.value= val[i]
	          ev2.observable= new core.dynvox.ObservableValue()
	          ev2.observable.value= ev2.value
	          event.args.onpush&& event.args.onpush(ev2)
	        }
	      }
			}
			catch(e){
				console.error("Error al ejecutar un evento del scope: ", e, "Name: ", lstr)
			}

    }
  }


  register(str, args){
    this.events.push(
      {
        str,
        args
      }
    )
  }

  getValue(parts){
    if(typeof parts=="object" && !(parts instanceof Array))
      parts=parts.name

    if(typeof parts=="string")
      parts=parts.split(/\>|\./)

    var val=this.scope
    for(var i=0;i<parts.length;i++){
      val= val?val[parts[i]]:null
      if(!val)
        break
    }
    return val
  }


  obtenerValorPrimero(val, args){
    var ev= {
      value: null,
      "observable": null
    }
    if(val instanceof Array || val instanceof core.dynvox.ObservableList){
      args.removeall&& args.removeall(ev)
      for(var i=0;i<val.length;i++){
        ev.value= val[i]
        ev.observable= new core.dynvox.ObservableValue()
        ev.observable.value= ev.value
        args.onpush&& args.onpush(ev)
      }
    }
    else{
      ev.value= val
      ev.observable= new core.dynvox.ObservableValue()
      ev.observable.value= ev.value
      args.onchange&&args.onchange(ev)
    }
  }

  onValueChanged(name, args){

		//var parts= name.split(/\>|\./)
		if(typeof args === "function")
			args={onchange:args}
		else if(!args)
			return

		args.name=name
		this.observe(args)
		//this.register(parts.join(">"), args)
  }


}
ScopeBestObserver.id=0
export default ScopeBestObserver
