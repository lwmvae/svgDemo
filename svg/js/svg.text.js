function editText(){
	text.on('dblclick',function(e){
	var _this=this;
	//get points
	let bbox=this.bbox();
	//font-size
	let size=this.font().size;
	//text length
	let text_length=this.node.innerHTML.length;
	//every text width
	let text_width=parseInt(bbox.w/text_length);
	// create nodes
	let input=document.createElement('input');
	input.setAttribute('type','text');
	input.value=this.node.innerHTML;
	input.style.cssText=`height:${bbox.h}px;position:absolute;top:${bbox.y}px;left:${bbox.x}px;font-size:${size}px`
	input.style.width=bbox.w+text_width+'px'

	//append nodes
	document.getElementById('myDrawing').appendChild(input)
	//focus
	input.focus()
	//listen input
	input.oninput=function(){
		_this.node.innerHTML=this.value
		this.style.width=(this.value.length+1)*text_width+'px'
	}
	//blur
	input.onblur=function(){
		this.remove()
	}
	
})
}