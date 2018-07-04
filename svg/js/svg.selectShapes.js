/**
 * 点击鼠标左键
 * 传入参数为false，不执行 
 * 传入参数为true，选中该shapes
 * 
*/

(function(){

	function SelectedHandler(el){
		el.remember('_selected',this)
		this.el=el		
	}

	SelectedHandler.prototype.init=function(val){
		if(val){
			return;
		}

		this.el.on('mousedown',function(e){
			
			// console.log(e.target.instance)
			//点击鼠标左键
			if(e.button==0){
				this.each(function(){
					// console.log(this)
					if(this._memory){
						this.selectize(false).resize(false).draggable(false);
					}
				})

				if(e.target.instance!=this){
					e.target.instance.selectize().resize().draggable();
				}
			}
			

		},false)

	}
	
	SVG.extend(SVG.Element, {

		selected:function(val){

			var selectedHandler=this.remember('_selected') || new SelectedHandler(this)
			
			selectedHandler.init(val)
			// console.log(this)
			return this
		}

	})


}).call(this)

