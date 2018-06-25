// 生成网格直线


// @options object：{
			// 矩形区域
			// 	x1:, 
			// 	y1:,
			// 	x2:,
			// 	y2:,

			// 网格线颜色
			// 	color:,

			// 网格线间隔
			// 	interval:,
			// }
// @return array：网格直线数组
// 输入options 返回grid中所有直线的集合
var gridLines = function(options) {
	var g = []
	var lineParam = {
		// 网格线颜色
		stroke: options.color,

		// 网格线宽度
		strokeWidth: 1,

    // 是否可以选中
    selectable: false,

    // 网格线的 pattern
    strokeDashArray: [2, 2],
  }

	// 求出网格线数目
	var	verticalNum = (options.x2 - options.x1) / options.interval
	var	horizontalNum = (options.y2 - options.y1) / options.interval

	// 生成垂直方向的网格线
	for (var i = 0; i < verticalNum; i++) {
		var x = i * options.interval + options.x1
		var vertical = new fabric.Line([ x, options.y1, x, options.y2], lineParam)
		if(i%5 === 0){
			vertical.set({strokeDashArray: null})
		}
		g.push(vertical)
	}

	// 生成水平方向的网格线
	for (var i = 0; i < horizontalNum; i++) {
		var y = i * options.interval + options.y1
		var horizontal = new fabric.Line([ options.x1, y, options.x2, y], lineParam)
		if(i % 5 === 0){
			horizontal.set({strokeDashArray: null})
		}
		g.push(horizontal)
	}
	return g
}

export { gridLines }