// 负责生成标尺的刻度线、刻度值和位置指示器



// 生成刻度线

// @coords array：直线坐标 [x1, y1, x2, y2]
// @return object：fabric.Line 类实例
var line = function(coords) {
	return new fabric.Line(coords, {
		selectable: 	false,
		strokeWidth: 	1,
		stroke: 'black',
	})
}

// @isVertical boolean：标尺方位
// @height number：标尺的宽度
// @index number：线条编号（编号与长度有关）
// @interval number：刻度线间的间隔
// @return array：直线坐标 [x1, y1, x2, y2]
var coordOfLine = function(isVertical, height, index, interval) {
	let length = null
	if (index % 10 === 0) {
		length = height
	} else if (index % 5 === 0) {
		length = 0.75 * height
	} else if (index % 2 === 0) {
		length = 0.5 * height
	} else {
		length = 0.25 * height
	}

	if (isVertical) {
		return [height - length, index * interval, height, index * interval]
	} else {
		return [index * interval, height - length, index * interval, height]
	}
}

// @isVertical boolean：标尺方位
// @params object:  {
			//  	length: 	标尺实际长度
			//  	unit: 		最小刻度所表示的长度
			//  	interval: 	最小刻度的实际长度
			// }
// @height number：标尺的宽度
// @return array：直线坐标 [x1, y1, x2, y2] 的数组
// 生成标尺上的刻度线的坐标
var coordArrOfLines = function(isVertical, params, height) {
	var numOfLines = Math.floor(params.length / params.interval)
	var coordArr = []
	for (var i = 0; i < numOfLines; i++) {
		let coord = coordOfLine(isVertical, height, i, params.interval)
		coordArr.push(coord)
	}
	return coordArr
}

// @isVertical boolean：标尺方位
// @params object:  {
			//  	length: 	标尺实际长度
			//  	unit: 		最小刻度所表示的长度
			//  	interval: 	最小刻度的实际长度
			// }
// @height number：标尺的宽度
// @return array：fabric.Line 类实例的数组
// 生成标尺上的刻度线
var lines = function(isVertical, params, height) {
	var coordArr = coordArrOfLines(isVertical, params, height)
	var arr = []
	for (var i = 0; i < coordArr.length; i++) {
		arr.push(line(coordArr[i]))
	}
	return arr
}




// 生成刻度值

// @text string：刻度数字
// @option object：详见 labelOption 函数
// @return object：fabric.IText 类实例
// 生成单个刻度值
var label = function(text, option) {
	var text=Math.round(text)+'';
	return new fabric.IText(text, option)
}

// @text array：刻度数字数组
// @option array：详见 labelOption 函数
// @return array：fabric.IText 类实例数组
// 生成标尺上所有刻度值
var labelArr = function(texts, options) {
	var arr = []
	for (var i = 0; i < texts.length; i++) {
		arr.push(label(texts[i], options[i]))
	}
	return arr
}

// @isVertical boolean：标尺方位
// @height number：标尺的宽度
// @distance number：与 0 刻度线的距离
// @return object
// 返回用于生成 刻度线 的 option
var labelOption = function(isVertical, height, distance) {
	var opt = {
		originX: 'left',
		originY: 'top',
		fontSize: height / 2,
		angle: 0,
		top: 0,
		left: distance,
		selectable: false,
	}
	if (isVertical) {
		opt.originX = 'right'
		opt.originY = 'top'
		opt.angle = 270
		opt.top = distance
		opt.left = 0
	}
	return opt
}

// @isVertical boolean：标尺方位
// @params object:  {
			//  	length: 	标尺实际长度
			//  	unit: 		最小刻度所表示的长度
			//  	interval: 	最小刻度的实际长度
			// }
// @height number：标尺的宽度 
// @return array
// 返回用于生成 刻度线 的 option 数组
var optionArrOfLabels = function(isVertical, params, height) {
	var num = Math.floor(params.length / (params.interval * 10))
	var arr = []
	for (var i = 0; i <= num; i++) {
		arr.push(labelOption(isVertical, height, i * params.interval * 10))
	}
	return arr
}

// @params object:  {
			//  	length: 	标尺实际长度
			//  	unit: 		最小刻度所表示的长度
			//  	interval: 	最小刻度的实际长度
			// }
// @return array：刻度数字数组
// 返回刻度数字数组
var textArrOfLabels = function(params) {
	var num = Math.floor(params.length / (params.interval * 10))
	var arr = []
	var s = params.unit * 10
	for (var i = 0; i <= num; i++) {
		let t = (s * i).toString()
		arr.push(t)
	}
	return arr
}

// @isVertical boolean：标尺方位
// @params object:  {
			//  	length: 	标尺实际长度
			//  	unit: 		最小刻度所表示的长度
			//  	interval: 	最小刻度的实际长度
			// }
// @height number：标尺的宽度 
// @return array：fabric.IText 类实例数组
// 生成标尺上所有刻度值
var labels = function(isVertical, params, height) {
	var optionArr = optionArrOfLabels(isVertical, params, height)
	var textArr = textArrOfLabels(params)
	return labelArr(textArr, optionArr)
}




// 生成位置指示器

// @isVertical boolean：标尺方位
// @height number：标尺的宽度
// @return object：fabric.Triangle 类实例
// 生成一个位置指示器（实心小三角形）
var indicator = function(isVertical, height) {
	var t = new fabric.Triangle({
		top: height,
		left: 0,
		originX: 'center',
		originY: 'bottom',
		height: height / 4,
		width: height / 4,
		selectable: false,
		fill: '#000000',
	})
	if (isVertical) {
		t.set({
			top: 0,
			left: height,
			angle: 270,
		})
	}
	return t
}

var ruler = {
	// 生成刻度线
	lines: lines,

	// 生成刻度值
	labels: labels,

	// 生成位置指示器（实心小三角形）
	indicator: indicator,
}

export { ruler }