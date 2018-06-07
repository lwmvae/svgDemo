var listGroup=function(arr){
	var newArr=[];
	for(var i=0;i<arr.length;i++){
		var obj={};
		obj.title=arr[i].name;
		obj.expand=true;
		if(arr[i]._objects){
			obj.children=listGroup(arr[i]._objects)
		}
		newArr.push(obj)
	}
	return newArr
}




export {listGroup}