// 该文件提供 对齐 功能

import { utils } from '../../utils'

// 
var _doUpdate = function(palette, update) {
	var c = palette.canvas
	var h = palette.history

	// 获取 tempGroup
	var a = c.getActiveGroup()
    if (a && a.type === 'group') {
    	// 获取 tempGroup 中的对象
        var items = a._objects
        a._restoreObjectsState()

        // 锁住 操作历史 的记录
        h.lock()

        // 删除 tempGroup
        c.remove(a)

        // 更新对象的位置
        update(items)

        // 生成新的 tempGroup
        items.forEach(function(item) {
            item.hasControls = true
            item.setCoords()
        })
        var group = new fabric.Group(items, {
            originX: 'center',
            originY: 'center',
        })
        c._activeObject = null
        group['canvas'] = c
        c.setActiveGroup(group.setCoords()).renderAll()

        // 解锁 操作历史 的记录
        h.unlock()

        // 记录 操作历史
        h.add(JSON.stringify(c))
    }
}


// 四边对齐 开始
// @origin string
// @return object 
// {
// 	originX: 
// 	originY: 
// }
var _getOrigin = function(origin) {
	var o = {
		originX: 'left',
		originY: 'top',
	}
	if (origin === 'bl') {
		o.originY = 'bottom'
	}
	if (origin === 'br') {
		o.originY = 'bottom'
		o.originX = 'right'
	}
	if (origin === 'tr') {
		o.originX = 'right'
	}
	return o
}

// @point object:
	// {
	// 	x: number
	// 	y: number
	// }
// @origin string
// @return :
	// {
	// 	x: number
	// 	y: number
	// 	originX: string
	// 	originY: string
	// }
// 传入一个点和它的origin， 返回点和origin合并在一起的对象
var _point = function(point, origin) {
	var o = _getOrigin(origin)
	utils.copyFromTo(point, o)
	return o
}


// @rect object:
	// {
	// 	bl: {x:, y:},
	// 	br: {x:, y:},
	// 	tl: {x:, y:},
	// 	tr: {x:, y:},
	// }
// @return array
// 传入一个矩形对象，返回各顶点信息
var _vertice = function(rect) {
	var arr = []
	var keys = Object.keys(rect)
	for (let i = 0; i < keys.length; i++) {
		let k = keys[i]
		arr.push(_point(rect[k], k))
	}
	return arr
}

// @rect object:
	// {
	// 	bl: {x:, y:},
	// 	br: {x:, y:},
	// 	tl: {x:, y:},
	// 	tr: {x:, y:},
	// }
// @side string
// @return object
// 传入一个矩形，返回矩形最靠边的点
var _findMostSide = function(rect, side) {
	var vertices = _vertice(rect)
	if (side === 'left') {
		return utils.findMinO(vertices, 'x')
	}
	if (side === 'right') {
		return utils.findMaxO(vertices, 'x')
	}
	if (side === 'top') {
		return utils.findMinO(vertices, 'y')
	}
	if (side === 'bottom') {
		return utils.findMaxO(vertices, 'y')
	}
}

// @coords array: 对象外接矩形的数组
// @side string
// @return 返回靠一边对齐后的对象外接矩形的数组
var _alignCoords = function(coords, side) {
	if (side === 'left') {
		let x = utils.findMin(coords, 'x')
		coords.forEach(function(c) {
			c.x = x
		})
	}
	if (side === 'right') {
		let x = utils.findMax(coords, 'x')
		coords.forEach(function(c) {
			c.x = x
		})
	}
	if (side === 'top') {
		let y = utils.findMin(coords, 'y')
		coords.forEach(function(c) {
			c.y = y
		})
	}
	if (side === 'bottom') {
		let y = utils.findMax(coords, 'y')
		coords.forEach(function(c) {
			c.y = y
		})
	}
	return coords
}

// @objects array: fabric 对象的数组
// @side string
// @return 返回靠一边对齐后的对象外接矩形的数组
var _getNewCoords = function(objects, side) {
	var oldCoords = objects.map(function(o) {
		return _findMostSide(o.aCoords, side)
	})
	return _alignCoords(oldCoords, side)
}

// @objects array: fabric 对象的数组
// @newCoords array: 新坐标的数组
// 使用 newCoords 更新传入对象的坐标
var _setNewPos = function(objects, newCoords) {
	objects.forEach(function(o, i) {
		let c = newCoords[i]
		o.setPositionByOrigin(new fabric.Point(c.x, c.y), c.originX, c.originY)
	})
}

// @objects array: fabric 对象的数组
// @side string
// 使传入对象按照某一边对齐
var _sideAlign = function(objects, side) {
	var newCoords = _getNewCoords(objects, side)
	_setNewPos(objects, newCoords)
}

// @palette object: 画布对象
// 左对齐
var leftAlign = function(palette) {
	var update = function(items) {
		_sideAlign(items, 'left')
	}
	_doUpdate(palette, update)
}

// @palette object: 画布对象
// 右对齐
var rightAlign = function(palette) {
	var update = function(items) {
		_sideAlign(items, 'right')
	}
	_doUpdate(palette, update)
}

// @palette object: 画布对象
// 上对齐
var topAlign = function(palette) {
	var update = function(items) {
		_sideAlign(items, 'top')
	}
	_doUpdate(palette, update)
}

// @palette object: 画布对象
// 下对齐
var bottomAlign = function(palette) {
	var update = function(items) {
		_sideAlign(items, 'bottom')
	}
	_doUpdate(palette, update)
}

// 四边对齐 结束



// 居中对齐 开始

// @side string: 居中方式
// 根据 居中方式 确定所关心的坐标 是 'x' 还是 'y'
var _optionFromSide = function(side) {
	var o = {
		prop:null
	}
	if (side === 'horizontal') {
		o.prop = 'x'
	} else if (side === 'vertical') {
		o.prop = 'y'
	}
	return o
}


// @vertices array: 各顶点信息
// @option object: option.prop 表示所关心的坐标，'x' 还是 'y'
// @return：返回所关心坐标最小的值
var _findMin = function(vertices, option) {
	var min = utils.findMin(vertices, option.prop)
	return min
}

// @vertices array: 各顶点信息
// @option object: option.prop 表示所关心的坐标，'x' 还是 'y'
// @return：返回所关心坐标最大的值
var _findMax = function(vertices, option) {
	var max = utils.findMax(vertices, option.prop)
	return max
}

// @objects array: fabric 对象数组
// @option object: option.prop 表示所关心的坐标，'x' 还是 'y'
// @return object: 包含 mins 数组和 maxs 数组，代表所关心坐标的最小值和最大值 
var _findMostCenter = function(objects, option) {
	var most = {
		mins:[],
		maxs:[],
	}
	objects.forEach(function(o) {
		var vertices = _vertice(o.aCoords)
		most.mins.push(_findMin(vertices, option))
		most.maxs.push(_findMax(vertices, option))
	})
	return most
}

// @most object: 包含 mins 数组和 maxs 数组，代表所关心坐标的最小值和最大值 
// @return number: 返回居中的位置坐标
var _center = function(most) {
	var min = Math.min(...most.mins)
	var max = Math.max(...most.maxs)
	return (min + max) / 2 
}

// @most object: 包含 mins 数组和 maxs 数组，代表所关心坐标的最小值和最大值 
// @return array: 每个对象的中线 x 的值或者 y 的值
var _middles = function(most) {
	var mins = most.mins
	var maxs = most.maxs
	return mins.map(function(min, i) {
		return (mins[i] + maxs[i]) / 2
	})
}

// @value number：水平或者垂直方向平移的距离
// @option object: option.prop 表示所关心的坐标，'x' 还是 'y'
// @return object：平移向量
var _vector = function(value, option) {
	var v = {
		x:0,
		y:0,
	}
	if (option.prop === 'x') {
		v.x = value
	} else {
		v.y = value
	}
	return v
}

// @most object: 包含 mins 数组和 maxs 数组，代表所关心坐标的最小值和最大值
// @dest number：整体居中位置的坐标
// @option object: option.prop 表示所关心的坐标，'x' 还是 'y'
// @return array：各对象平移到整体居中位置的平移向量
var _vectors = function(most, dest, option) {
	var mids = _middles(most)
	return mids.map(function(mid) {
		let t = dest - mid
		return _vector(t, option)
	})
}

// @objects array: fabric 对象数组
// @side string：表示居中方式，水平或垂直
// @return array：各对象平移到整体居中位置的平移向量
var _translationVec = function(objects, side) {
	var opt = _optionFromSide(side)
	var most = _findMostCenter(objects, opt)
	var center = _center(most)
	return _vectors(most, center, opt)
}

// @object object：fabric 对象
// @vector object：平移向量
// 平移单个对象
var _translate = function(object, vector) {
	let x = object.left + vector.x
	let y = object.top + vector.y
	object.setPositionByOrigin(new fabric.Point(x, y), 'left', 'top')
}

// @objects array: fabric 对象数组
// @vectors array: 平移向量数组
// 批量平移
var _translateObjs = function(objects, vectors) {
	objects.forEach(function(o, i) {
		let v = vectors[i]
		_translate(o, v)
	})
}

// @objects array：fabric 对象数组
// @side string：表示居中方式，水平或垂直
// 居中对齐传入的对象
var _centerAlign = function(objects, side) {
	// 生成平移向量数组
	var vectors = _translationVec(objects, side)

	// 批量平移对象
	_translateObjs(objects, vectors)
}

// @palette object：画布对象
// 水平居中
var horizontalAlign = function(palette) {
	var update = function(items) {
		_centerAlign(items, 'horizontal')
	}
	_doUpdate(palette, update)
}

// @palette object：画布对象
// 垂直居中
var verticalAlign = function(palette) {
	var update = function(items) {
		_centerAlign(items, 'vertical')
	}
	_doUpdate(palette, update)
}

// 居中对齐 结束

export {
	// 左对齐
	leftAlign,

	// 水平居中
	horizontalAlign,

	// 右对齐
	rightAlign,

	// 上对齐
	topAlign,

	// 垂直居中
	verticalAlign,

	// 下对齐
	bottomAlign,
}