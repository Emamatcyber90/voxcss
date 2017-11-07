
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


	getFriendly(str){
		var e=/\[\s*[\"|\'](.*)[\"|\']\s*\]/
		str= str.replace(e, function(a){
			return "."+a.split(e)[1]
		})
		e=/\[\s*(\d*)\s*\]/
		str= str.replace(e, function(a){
			return "."+a.split(e)[1]
		})
		return str
	}



  observe(args){
    var str= args.name
		str= this.getFriendly(str)
		//this.convertToThrowable(args)
    var observable= this.scope

    var parts= str.split(/\>|\./), val
    //console.info("OBSERVE", str, parts)
    if(!observable.getObservable(parts[0])){
      val= observable[parts[0]]// this.getValue(parts)
			//console.info("VALUE YET: ", parts,val)
      observable.createVariable(parts[0], val)
    }

    var ar1
    if(parts.length==1 && args.array){
      var v= observable.getObservable(parts[0]), vas
      if(v&&!(v.value instanceof core.dynvox.ObservableList)){
        vas= new core.dynvox.ObservableList()
				if(v.value)
        	vas.value= v.value
        v.value= vas
				this.attachArrayEvents(vas, parts.join(">") )
        ar1= true
      }
    }

    // First time check ...
    var val1= this.getValue(parts, true)
    val= val1?val1.valueOf():val1

    // 06-04-2017
    // ATTACH EVENTS ON ARRAY OBJECT
    if(!ar1 && val instanceof core.dynvox.ObservableList){
      this.attachArrayEvents(val, parts.join(">"))
    }


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
    if(val1 instanceof core.dynvox.Observable){
      this.attachEvents(val1, parts.join(">"))
    }

  }

  attachEvents(val, str){
    val.H= val.H||{}
    if(!val.H[this.id]){
      val.on("change", (ev)=>{
        this._eventValueChanged(str, ev.value, ev.observable)
      })
      val.H[this.id]=true
    }
  }

  attachArrayEvents(val, str){
    val.G= val.G||{}
    if(!val.G[this.id]){
      val.on("push", (ev)=>{
        var events= this.events.filter(function(a){
          return a.str==str
        })
        //ev.index= val.length-1
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
      val.G[this.id]=true
    }
  }

  assignValue(args){

    var name= args.name
		name= this.getFriendly(name)
    var value= args.value

    var parts= name.split(/\>|\./), part
    var cur= this.scope
    for(var i=0;i< parts.length-1;i++){
      part= parts[i]
      cur= cur[part]
      if(!cur)
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
            //val= val?val.valueOf():val
            if(escape && val){
              val= core.dynvox.EscapeHtml(val)
              val= val.replace(/\r?\n|\r/ig, "<br/>")
            }

            if(val!==undefined && val!==null)
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



  compileFormat(format, options={}){
    var cached= {}
    var cached2= {}
    var z, i, y, value, str, name,procesar, val, funcs=[], code=[], html, name2

    //str=''
    code.push("str=''")
    while(format){
      procesar=true
      i= format.indexOf("#")
      if(i>=0){
        z=i
        procesar= false
        html= false
        if(format[i+1]=="#"){
          i++
          html= true
        }

        if(format[i+1]=="{"){
          y= format.indexOf("}", i+1)
          if(y>=0){
            str+= format.substring(0, z)
            name= format.substring(i+2, y)



            //name2= (html?"#-" :"")+ name
            if(!cached2[name]){
              cached[name]=  `funcs[${funcs.length}]`  //this.getValue(name)

              //options.html=
              funcs.push(this.compile(name, options))
              cached2[name]= true
            }


            val= cached[name]
            //val= val?val.valueOf():val
            if(!options.extractVars){

              if(!html){
                code.push("var temp= "+ val +"(observer,scope)")
                code.push("temp= core.dynvox.EscapeHtml(temp)")
                code.push("temp= temp.replace(/\\r?\\n|\\r/ig, '<br/>')")
                code.push("str+= temp")
              }
              else{
                code.push("str+= "+ val +"(observer,scope)")
              }

            }


            format= format.substring(y+1)
          }
        }
        else{
          if(!options.extractVars)
            code.push("str+= "+ JSON.stringify(format.substring(0, i+1)))
          format= format.substring(i+1)
        }
      }
      if(procesar){
        if(!options.extractVars)
          code.push("str+= "+ JSON.stringify(format))
        format=undefined
      }
    }

    if(options.extractVars)
      return options.ref

    code= `
    (function(observer, scope){
      ${code.join("\n")}
      return str
    })
    `

    var result= eval(code)
    return result
    //return str
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
      //ev.value= ev.value?ev.value.valueOf():ev.value

			try{
	      event.args.onchange&&event.args.onchange(ev)
				val= ev.value
	      if(val instanceof Array || val instanceof core.dynvox.ObservableList){

	        if(val instanceof core.dynvox.ObservableList)
	          this.attachArrayEvents(val, lstr)

	        event.args.onremoveall&& event.args.onremoveall(ev2)
	        for(var i=0;i<val.length;i++){
	          ev2.value= val[i]
            if(val instanceof core.dynvox.ObservableList){
  	           ev2.observable= val.v[i]
            }
            else{
              ev2.observable= new core.dynvox.ObservableValue()
              ev2.observable.value= ev2.value
            }
            ev2.index= i
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

  getValue(parts, observable){
    if(typeof parts=="object" && !(parts instanceof Array)){
      parts=parts.name
		}

    if(typeof parts=="string"){
			parts= this.getFriendly(parts)
      parts=parts.split(/\>|\./)
		}

    var val=this.scope
    for(var i=0;i<parts.length;i++){
      val= val?val[parts[i]]:undefined
      if(!val)
        break
    }
    if(!observable)
      val= val?val.valueOf():val
	if(val===undefined && this.scope.parent)
		val= this.scope.parent.observer.getValue(parts, observable)

    return val
  }


  obtenerValorPrimero(val, args){
    var ev= {
      value: null,
      "observable": null
    }
    if(val instanceof Array || val instanceof core.dynvox.ObservableList){
      args.onremoveall&& args.onremoveall(ev)
      for(var i=0;i<val.length;i++){
        ev.value= val[i]
        if(val instanceof core.dynvox.ObservableList){
          ev.observable= val.v[i]
        }
        else{
          ev.observable= new core.dynvox.ObservableValue()
          ev.observable.value= ev.value
        }
        ev.index= i
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

		name= this.getFriendly(name)
		args.name=name
		this.observe(args)
		//this.register(parts.join(">"), args)
  }

  extractVars(format){
    var ref= {
      vars:{}
    }
    this.compileFormat(format,{
      ref,
      extractVars: true
    })
    var vars=[]
    for(var id in ref.vars){
      vars.push(id)
    }
    return vars
  }


  compile(format, {ref, extractVars}){

    var last, c, result, items= format.split(/(\W*)(\$*\w*)(\W*)/).filter(function(d){return !!d})
    result= []
    var bracket= false, point= false
    //console.info("JAJJAJA")
    for(var i=0;i<items.length;i++){

      c= false

      //if(last){

          /*if(bracket){
            last+= items[i]
            if(items[i].endsWith("]"))
              bracket= false
          }
          else */
          if(/*items[i].startsWith("[") || items[i].startsWith("]") ||*/
              items[i].startsWith("$")||items[i].startsWith(".")||/\w\w*/.test(items[i])){

            if(/\d\d*/.test(items[i])){
              if(last){
                last+= items[i]
                c= true
              }
            }
            else if(!point){
              last= (last || "" ) + items[i]
              //bracket= items[i].startsWith("[")
              c= true
            }

          }
      //}



      if(!c){
        if(last){
          if(ref){
            ref.vars[last]= true
          }
          result.push({
            //var: true,
            text: `observer.getValue(${JSON.stringify(last)})`
          })
        }
        last= items[i]
        if(/\d\d*/.test(last)){
          result.push({
            text:last
          })
          last= undefined
        }
        else if(!/\w\w*/.test(last)){
          result.push({
            text:last
          })
          point= last.trim().endsWith(".")
          last= undefined
        }
        else{
          result.push({
            text:last
          })
          point= false
          last= undefined
        }
      }


    }

    if(last){
      if(ref){
          ref.vars[last]= true
      }
      result.push({
        text: `observer.getValue(${JSON.stringify(last)})`
      })
    }

    if(extractVars)
      return ref

    var code= result.map((x)=>x.text)
    code= `(function(observer, scope){ if(!observer && scope){observer= scope.observer} \n return  ${code.join(" ")}})`
    result= eval(code)

    return result
  }


}
ScopeBestObserver.id=0
export default ScopeBestObserver
