/**
 * selectArea
 */

 (function(){

 	function SelectAreaHandler(el){
 		el.remember('_selectArea',this);
 		this.el=el
 		this.drawDashArea=undefined
 		this.flag=false;
 		this.points={
 			x:0,
 			y:0,
 			x2:0,
 			y2:0
 		}
 		this.possibleObj={}
 	}

 	SelectAreaHandler.prototype.init=function(val){
 		var _this=this;

 		if(val){
 			return;
 		}


 		this.el.on('mousedown',function(e){
 			this.flag=true
 			
			_this.points.x=e.pageX;
			_this.points.y=e.pageY;

			_this.possibleObj={}

			this.drawDashArea=this.rect();
			this.drawDashArea.draw(e).fill('rgba(6,117,234,0.3)')

		},false)

 		this.el.on('mousemove',function(e){
 			if(this.flag){
 				// this.points[e.target.instance]=1
 				_this.possibleObj[e.target.instance.node.id]=1
 				// console.log(e.target.instance.node.id)
 			}
 		},false)


 		this.el.on('mouseup',function(e){

 			// console.log(Object.keys(this.points))
 			this.flag=false
 		},false)


 		window.addEventListener('mouseup',function(e){
 			this.flag=false
			_this.el.drawDashArea.draw('stop',e);
			_this.el.drawDashArea.remove();
			
			_this.points.x2=e.pageX;
			_this.points.y2=e.pageY;

			console.log(_this.possibleObj)
			_this.cacl(_this.possibleObj)
		},false)
 	}
 	//返回适用于函数isInPolygon的数组
 	SelectAreaHandler.prototype.createArr=function(obj){
 		var arr=[];
 		arr.push([obj.x,obj.y])
 		arr.push([obj.x2,obj.y])
 		arr.push([obj.x2,obj.y2])
 		arr.push([obj.x,obj.y2])

 		return arr;
 	}
 	// 返回鼠标画区内包含的元素
 	SelectAreaHandler.prototype.cacl=function(obj){
 		var arr=Object.keys(obj);
 		var containArr=[];

 		for(let i=0;i<arr.length;i++){
 			if(this.getElement(arr[i]).instance==this.el){
 				continue;
 			}else{
 				var bbox=this.getElement(arr[i]).instance.bbox();
 				var regexArr=this.createArr(bbox);
 				var areaArr=this.createArr(this.points);

 				var isContain=false
 				for(let j=0;j<regexArr.length;j++){
 					isContain=this.isInPolygon(regexArr[j],areaArr)
 					if(isContain){
 						containArr.push(arr[i])
 						break
 					}
 				}
 			}
 		}
 		console.log(containArr)
 		return containArr;
 	}
 	SelectAreaHandler.prototype.getElement=function(id){
 		return document.getElementById(id);
 	}
 	// 点在多边形的算法函数
 	SelectAreaHandler.prototype.isInPolygon=function(checkPoint, polygonPoints){
 		var counter = 0;
 		var i;
 		var xinters;
 		var p1, p2;
 		var pointCount = polygonPoints.length;
 		p1 = polygonPoints[0];

 		for (i = 1; i <= pointCount; i++) {
 			p2 = polygonPoints[i % pointCount];
 			if (
 				checkPoint[0] > Math.min(p1[0], p2[0]) &&
 				checkPoint[0] <= Math.max(p1[0], p2[0])
 				) {
 				if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
 					if (p1[0] != p2[0]) {
 						xinters =
 						(checkPoint[0] - p1[0]) *
 						(p2[1] - p1[1]) /
 						(p2[0] - p1[0]) +
 						p1[1];
 						if (p1[1] == p2[1] || checkPoint[1] <= xinters) {
 							counter++;
 						}
 					}
 				}
 			}
 			p1 = p2;
 		}
 		if (counter % 2 == 0) {
 			return false;
 		} else {
 			return true;
 		}
 	}

 	SVG.extend(SVG.Element, {

 		selectArea:function(val){
 			if(val){
 				return;
 			}

 			var selectAreaHandler=this.remember('_selectArea') || new SelectAreaHandler(this);

 			selectAreaHandler.init(val)
			// console.log(this)
			return this;

		}
	})


 }).call(this)

