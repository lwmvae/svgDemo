// 基本图元 功能，除 图片 外
// TODO：可设定基本图元的默认属性

// @return object：内含生成 基本图元 的函数，除 图片 外
var _shapes = function () {

	// 基本图元的默认属性
	// var left = 50
	// var top = 50
	var stroke = "#ffffff"
	var fill = "#808080"
	var height = 80
	var width = 120
	var padding = 5
	var radius = 60
	var ry = 40
	var rx = 60
	var textBackgroundColor = "#000000"
	var sectorPath = 'M 0 0 l 50 0 a 50 50 0 1 1 -50 -50 z'
	var curvePath = 'M0 0 C 20 20, 40 20, 120 0'

	// 返回的对象
	var o = {
		left:50,
		top:50
	}

	o.Rect = function() {
		var r = new fabric.Rect({ 
			top: this.top, 
			left: this.left, 
			width: width, 
			height: height, 
			stroke: stroke, 
			fill: fill, 
			obrType: 'rect',
		})

		return r
	}


	o.Triangle = function () {
		var t = new fabric.Triangle({ 
			top: this.top, 
			left: this.left, 
			width: width, 
			height: height, 
			stroke: stroke, 
			fill: fill, 
			obrType: 'triangle',
		})
		return t
	}


	o.Line = function() {
		var option = {
			bl: false,
			br: false,
			mb: false,
			tl: false,
			mt: false,
			tr: false,
		}
		var l =  new fabric.Line([this.left, this.top, this.left+120, this.top], {
			stroke:stroke,
			padding:padding,
			obrType: 'line',
		})
		l.setControlsVisibility(option)
		l.length = 120
		return l
	}

	o.Circle = function() {
		var option = {
			mb: false,
			mt: false,
			ml: false,
			mr: false,
		}
		var c = new fabric.Circle({ 
			top: this.top, 
			left: this.left, 
			radius: radius, 
			stroke: stroke, 
			fill: fill, 
			obrType: 'circle',
		})
		c.setControlsVisibility(option)
		return c
	}


	o.Ellipse = function() {
		var e = new fabric.Ellipse({
			left: this.left,
			top: this.top,
			stroke: stroke,
			fill: fill,
			rx: rx,
			ry: ry,
			obrType: 'ellipse',
		})
		return e
	}

	o.Text = function() {
		var t = new fabric.IText('edit', { 
			top: this.top, 
			left: this.left, 
			stroke: stroke, 
			textBackgroundColor: textBackgroundColor, 
			fill: fill,
			textContent:'edit',
			obrType: 'iText',
		})
		// console.log(t)
		return t
	}


	o.Sector = function() {
		var s = new fabric.Path(sectorPath)
		s.set({
			top:this.top,
			left:this.left,
			fill:fill,
			stroke:stroke,
		})
		s.type = 'path'
		s.radius = 50
		s.startAngle = 0
		s.endAngle = 270
		s.obrType = 'sector'
		return s
	}



	o.Curve = function() {
		var c = new fabric.Path(curvePath)
		c.set({
			top:this.top,
			left:this.left,
			fill:'transparent',
			stroke:stroke,
			obrType: 'curve',
		})
		c.type = 'path'
		return c
	}


	o.Polygon = function() {
		var p = new fabric.Polygon([
			{ x: 0, y: 0 },
			{ x: 120, y: 0 },
			{ x: 100, y: 100 },
			{ x: 40, y: 80 },
			], {
				stroke: stroke,
				left: this.left,
				top: this.top,
				fill:fill,
				obrType: 'polygon',
			})
		return p
	}


	o.Polyline = function() {
		var p = new fabric.Polyline([
			{ x: 0, y: 0 },
			{ x: 120, y: 0 },
			{ x: 100, y: 100 },
			{ x: 40, y: 80 },
			], {
				stroke: stroke,
				left: this.left,
				top: this.top,
				fill:'transparent',
				obrType: 'polyline',
			})
		return p
	}
	return o
}

var shapes = _shapes()
export { 
	// object，内含生成 基本图元 的函数，除 图片 外
	shapes,
}