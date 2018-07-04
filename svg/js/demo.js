var draw = SVG('myDrawing').size(1300, 800);

//左键点击选中单个shapes
draw.on('mousedown',function(e){
  this.each(function(){
    if(this._memory){
      this.selectize(false).resize(false).draggable(false);
    }
  })
  if(e.target.instance!=this){
    e.target.instance.selectize().resize().draggable();
  }
})