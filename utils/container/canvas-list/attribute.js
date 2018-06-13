// 保存属性及事件

import {decodeUnicode} from './transcoding'

function SaveAttr() {
	this.addAttr={};	
}
//增加
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
// 删除
SaveAttr.prototype.del=function(id,attrName){
	if(this.addAttr[id]){
		return this.addAttr[id][attrName]={}
	}
}
// 获取
SaveAttr.prototype.obtain=function(id,attrName){
	if(this.addAttr[id]){
		if(this.addAttr[id][attrName]==undefined){
			return {};
		}
		this.addAttr[id][attrName].attrTitle=decodeUnicode(this.addAttr[id][attrName].attrTitle)
		return this.addAttr[id][attrName];
	}
	return {};
}
// 获取过滤后的属性及事件名称
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
// id改变时复制数据
SaveAttr.prototype.idChange=function(oldId,newId){
	var oldVal=JSON.stringify(this.addAttr[oldId]);
	this.addAttr[newId]=JSON.parse(oldVal);
	delete this.addAttr[oldId];
}


export { SaveAttr };





