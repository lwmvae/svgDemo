import {decodeUnicode} from './transcoding'

function SaveAttr() {
	this.addAttr={};	
}

SaveAttr.prototype.add=function(id,attrName,data){
	if(this.addAttr[id]){
		this.addAttr[id][attrName]=data;
	}else{
		let obj={};
		obj[attrName]=data;
		this.addAttr[id]=obj;
	}
	// console.log(this.addAttr[id])
}

SaveAttr.prototype.del=function(id,attrName){
	if(this.addAttr[id]){
		return this.addAttr[id][attrName]={}
	}
}

SaveAttr.prototype.obtain=function(id,attrName){
	if(this.addAttr[id]){
		if(this.addAttr[id][attrName]==undefined){
			return {};
		}
		// this.addAttr[id][attrName].attrTitle=decodeUnicode(this.addAttr[id][attrName].attrTitle)
		// console.log(this.addAttr[id][attrName].attrTitle)
		return this.addAttr[id][attrName];
	}
	return {};
}

SaveAttr.prototype.getAttr=function(id){
	var obj=this.addAttr[id];
	if(obj){
		let arr=[];
		for(var k in obj){
			if(JSON.stringify(obj[k])!='{}'){
				let o={};
				o.attrTitle=decodeUnicode(obj[k].attrTitle);
				o.name=obj[k].name;
				arr.push(o)
			}
		}
		return arr;
	}else{
		return []
	}
	
}

SaveAttr.prototype.idChange=function(oldId,newId){
	var oldVal=JSON.stringify(this.addAttr[oldId]);
	this.addAttr[newId]=JSON.parse(oldVal);
	delete this.addAttr[oldId];
}


export { SaveAttr };





