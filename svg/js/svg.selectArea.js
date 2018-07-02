/**
 * selectArea
 */

 (function(){

 	function SelectAreaHandler(el){
 		el.remember('_selectArea',this);
 		this.el=el
 		this.drawDashArea=undefined
 		this.flag=false;
 		this.points={}
 	}

 	SelectAreaHandler.prototype.init=function(val){
 		var _this=this;

 		if(val){
 			return;
 		}

 		this.el.on('mousedown',function(e){
 			this.flag=true

			// console.log(e.pageY);
			this.drawDashArea=this.rect();
			this.drawDashArea.draw(e).fill('rgba(6,117,234,0.3)')

		},false)

 		this.el.on('mousemove',function(e){
 			if(this.flag){
 				
 				// console.log(e.target)
 			}
 		},false)


 		this.el.on('mouseup',function(e){
 			this.flag=false
 		},false)


 		window.addEventListener('mouseup',function(e){
 			this.flag=false
			// console.log(this)
			_this.el.drawDashArea.draw('stop',e);
			_this.el.drawDashArea.remove();
		},false)
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

