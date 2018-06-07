// 数据配置文件

// 
var zoomData = [
	0.25,
	0.5,
	0.75,
	1.00,
	1.25,
	1.50,
	2.00,
	3.00,
	4.00,
	5.00,
]


var options = {
	// 缩放倍数
	zoomData: zoomData,

	// 默认画布高度
	canvasHeight: 900,

	// 默认画布宽度
	canvasWidth: 1200,

	// 默认网格线条颜色
	gridColor: '#ebebeb',

	// 默认画布背景颜色
	backgroundColor: '#999999',

	// 默认网格线间距
	gridInterval: 20,

	// 画布最大高度
	maxCanvasHeight: 4500,

	// 画布最大宽度
	maxCanvasWidth: 6000,
}

export { options }