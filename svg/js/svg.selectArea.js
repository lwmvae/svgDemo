/**
 * selectArea
 */

 (function(){

 	function SelectAreaHandler(el){
 		el.remember('_selectArea',this);
 		this.el=el

 		this.drawDashArea=undefined
 		// 传入参数
 		this.flag=false;
 		//鼠标坐标
 		this.points={}
 	}

 	SelectAreaHandler.prototype.init=function(val){
 		var _this=this;
 		
 		if(val){
 			return;
 		}

 		const OFFSETLEFT=_this.el.parent().offsetLeft;
 		const OFFSETTOP=_this.el.parent().offsetTop;

 		this.el.on('mousedown',function(e){
 		
 			this.flag=true
			_this.points.x=e.pageX-OFFSETLEFT;
			_this.points.y=e.pageY-OFFSETTOP;
			
			// console.log(_this.points.x)

			this.drawDashArea=this.rect();
			this.drawDashArea.draw(e).fill('rgba(6,117,234,0.3)')

		},false)

 		this.el.on('mouseup',function(e){
 			this.flag=false
 		},false)

 		window.addEventListener('mouseup',function(e){
 			this.flag=false
			_this.el.drawDashArea.draw('stop',e);
			_this.el.drawDashArea.remove();
			
			// console.log(_this.el.children())

			_this.points.x2=e.pageX-OFFSETLEFT;
			_this.points.y2=e.pageY-OFFSETTOP;
			
			// console.log(_this.points)
			var containArr=_this.cacl(_this.el.children());
			_this.selectShapes(containArr)
		
		},false)
 	}
 	//选中鼠标划过区域所有的节点
 	SelectAreaHandler.prototype.selectShapes=function(arr){
 		if(arr.length==0){
 			return;
 		}else{
 			arr.forEach(function(e){
 				e.selectize()
 			})

 		}
 	}
 	SelectAreaHandler.prototype.getPoints=function(arr){
 		var group=this.el.group();
 		for(let i=0;i<arr.length;i++){
 			group.add(arr[i])
 		}
 		var points=group.bbox();
 		// group.remove()
 		return points;
 	}
 	//返回适用于函数isInPolygon的数组
 	SelectAreaHandler.prototype.createAreaArr=function(obj){
 		var arr=[];
 		arr.push([obj.x,obj.y])
 		arr.push([obj.x2,obj.y])
 		arr.push([obj.x2,obj.y2])
 		arr.push([obj.x,obj.y2])
 		return arr;
 	}
 	SelectAreaHandler.prototype.createShapeArr=function(obj){
 		var arr=[];
 		arr.push([obj.x,obj.y])
 		arr.push([obj.cx,obj.y])
 		arr.push([obj.x2,obj.y])
 		arr.push([obj.x2,obj.cy])
 		arr.push([obj.x2,obj.y2])
 		arr.push([obj.cx,obj.y2])
 		arr.push([obj.x,obj.y2])
 		arr.push([obj.x,obj.cy])
 		return arr;
 	}
 	// 更加精确
 	SelectAreaHandler.prototype.createShapesArr=function(obj){
 		if(obj.x > obj.x2){
 			var middleX=obj.x;
 			var middleY=obj.y;
 			obj.x=obj.x2;
 			obj.y=obj.y2;
 			obj.x2=middleX;
 			obj.y2=middleY;
 		}
 		var arr=[];

 		for(let i=obj.x;i<=obj.x2;i=i+2){
 			arr.push([i,obj.y])
 			arr.push([i,obj.y2])
 		}

 		for(let i=obj.y;i<=obj.y2;i=i+2){
 			arr.push([obj.x2,i])
 			arr.push([obj.x,i])
 		}

 		return arr;
 	}
 	// 返回鼠标画区内包含的元素
 	SelectAreaHandler.prototype.cacl=function(arr){
 		var containArr=[];
 		var areaArr=this.createAreaArr(this.points);
 		// console.log(areaArr)
 		for(let i=0;i<arr.length;i++){

 			if(arr[i]!=this.el){
 				var bbox=arr[i].bbox();
 				var regexArr=this.createShapesArr(bbox);
 				var isContain=false

 				for(let j=0;j<regexArr.length;j++){
 					isContain=this.isInPolygon(regexArr[j],areaArr)
 					if(isContain){
 						containArr.push(arr[i])
 						break;
 					}
 				}
 			}
 		}
 		// console.log(containArr)
 		return containArr;
 	}
 	// 点是否在多边形的算法函数
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

