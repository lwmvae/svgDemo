/**
 * selectArea
 */

 (function(){

 	function SelectAreaHandler(el){
 		el.remember('_selectArea',this);
 		this.el=el

 		this.drawDashArea=undefined;
 		// 是否有选中的图形
 		this.activeShapes=false;

 		this.shapesArr=[];
 		this.preArr=[];
 		
 		this.OFFSETLEFT=this.el.parent().offsetLeft;
 		this.OFFSETTOP=this.el.parent().offsetTop;
 		
 		//记录鼠标开始和结束的坐标
 		this.points={};

 		//记录preGroup
 		this.preGroup=undefined;
 		this.ppreGroup=undefined;

 	}

 	SelectAreaHandler.prototype.init=function(val){
 		var _this=this;
 		
 		this.stop();

 		if(val){
 			return;
 		}

 		this.el.on('mousedown',function(e){ _this.down(e) });
 		// this.el.on('mousemove',function(e){ _this.move(e) });
 		this.el.on('mouseup',function(e){ _this.up(e) });
 		window.addEventListener('mouseup',function(e){ _this.windowUp(e) });
 		return this.shapesArr
 	}
 	SelectAreaHandler.prototype.down=function(e){
 		//鼠标左键点击
 		if(e.button==0){
 			this.el.each(function(){
 				if(this._memory){
 					this.selectize(false).resize(false).draggable(false);
 				}
 			})
 			// console.log(this.activeShapes)

 			if(e.target.instance!=this.el){
 				this.activeShapes=true;
 				if(e.target.instance.parent().type=='g'){
	 				e.target.instance.parent().selectize().resize().draggable();
 				}else{
 					// console.log(e.target)
 					if(this.preGroup){
 						this.cancelGroup()
 						// this.preGroup.ungroup()
 					}
	 				e.target.instance.selectize().resize().draggable();
 				}
 			}else{
 				this.activeShapes=false;
 				if(this.preGroup){
 						this.cancelGroup()

 					// this.preGroup.ungroup()
 				}
 			}
 			
 			
 		}else if(e.button==2){//右键点击
 			e.stopPropagation()
 		}

 		if(!this.activeShapes){
 			this.points.x=e.pageX-this.OFFSETLEFT;
 			this.points.y=e.pageY-this.OFFSETTOP;

 			this.drawDashArea=this.el.rect();
 			this.drawDashArea.draw(e).fill('rgba(6,117,234,0.3)')
 		}
 	}
 	// SelectAreaHandler.prototype.move=function(e){

 	// }
 	SelectAreaHandler.prototype.up=function(e){
 		// console.log(this.activeShapes)
 		if(!this.activeShapes){
 			
 			this.drawDashArea.draw('stop',e);
			this.drawDashArea.remove();

			this.points.x2=e.pageX-this.OFFSETLEFT;
			this.points.y2=e.pageY-this.OFFSETTOP;

			var containArr=this.cacl(this.el.children());
			this.shapesArr=containArr;
			this.selectShapes(containArr)
			
		}
 	}
 	SelectAreaHandler.prototype.windowUp=function(e){
		if(this.drawDashArea){
			this.drawDashArea.remove();
		}
 	}
 	SelectAreaHandler.prototype.stop=function(){
 		this.el.off('mousedown');
 		this.el.off('mousemove');
 		this.el.off('mouseup');

 		return this;
 	}
 	
 	//选中鼠标划过区域所有的节点
 	SelectAreaHandler.prototype.selectShapes=function(arr){
 		// console.log(arr)
 		if(arr.length==0){
 			return;
 		}else if(arr.length==1){
 			arr[0].selectize().resize().draggable();
 		}else if(arr.length>1){
			this.tempGroup(arr)
 			return arr;
 		}
 	}
 	SelectAreaHandler.prototype.tempGroup=function(arr){
 		let hasGroup=false;
 		let groupEle=undefined;
 		let _this=this;
 		arr.forEach(function(e,index){
 			if(e.type==='g'){
 				groupEle=e;
 				_this.ppreGroup=e;
 				hasGroup=true;
 				arr.splice(index,1)
 			}
 		})
 		console.log(this.ppreGroup)
 		if(this.ppreGroup){
 			this.preArr=arr;
 			
 		}

 		if(!groupEle){
 			groupEle=this.el.group();
 		}
 		
 		arr.forEach(function(e){
 			groupEle.add(e)
 		})
 		groupEle.selectize().resize().draggable();
 		this.preGroup=groupEle
 		this.activeShapes=true
 	}
 	SelectAreaHandler.prototype.cancelGroup=function(){
 		
 	}
 	SelectAreaHandler.prototype.setGroup=function(){
 		this.preGroup=undefined
 	}
 	SelectAreaHandler.prototype.setUngroup=function(){

 	}
 	SelectAreaHandler.prototype.getPoints=function(arr){
 		var group=this.el.group();
 		for(let i=0;i<arr.length;i++){
 			group.add(arr[i])
 		}
 		var points=group.bbox();
 		
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
 			var val=val || false;
 			if(val){
 				return;
 			}

 			var selectAreaHandler=this.remember('_selectArea') || new SelectAreaHandler(this);

 			selectAreaHandler.init(val)
			// console.log(this)
			// return this;
			return selectAreaHandler.init(val);

		}
	})


 }).call(this)

