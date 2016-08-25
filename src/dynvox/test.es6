import ObservableList from './ObservableList'
import ObservableValue from './ObservableValue'

var init= function(){
	var d= new Date()
	let list= new ObservableList(), e=[]
	for(var i=0;i<100000;i++){
		list.push("James")
	}


	list[2].on("change", function(){
		console.info("--- Value changed")
	})


	console.info(new Date()- d)
	console.info(list[2].valueOf())

	list[2]= "Oh sí"

}
init()
