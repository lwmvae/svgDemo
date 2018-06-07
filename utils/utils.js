var utils = {}

// @options object: 
			// {
			// 	a: true,
			// 	b: false,
			// 	c: true,
			// }
// @return array： 属性值为 true 的属性名组成的数组
// 如传入以上 object，则返回['a', 'c']
function objToArray(options) {
	var a = []
	var keys = Object.keys(options)
	keys.forEach(function(k) {
		if (options[k]) {
			a.push(k)
		}
	})
	return a.length > 0 ? a : undefined
}

// @path string：完整路径名
// @return object：
				// {
				// 	dir：string 目录
				// 	name：string 文件名
				// 	extension：string 文件后缀
				// }
// 将完整路径名按照 目录、文件名和文件后缀分离
utils.dividePath = function(path) {
	var f = {}
	var dotIndex = path.lastIndexOf(".")
	var slashIndex = path.lastIndexOf("\\")
	f.dir = path.slice(0, slashIndex + 1)
	f.name = path.slice(slashIndex + 1, dotIndex)
	f.extension = path.slice(dotIndex + 1)
	return f
}


// @canvas object：fabric.Canvas 类实例
// @objects array：fabric 对象数组，注意：'objects' are on 'canvas' already
// 利用 'objects' 生成一个 tempGroup
utils.createActiveGroup = function(canvas, objects) {
	canvas.deactivateAll()
	objects.forEach(function(o) {
		o.set('active', true)
	})
	var g = new fabric.Group(objects, {
			originX: 'center',
			originY: 'center',
	})
	g.set('canvas', canvas)
	canvas.setActiveGroup(g.setCoords()).renderAll()   
} 

// @object object：fabric 对象
// @return boolean
// 判断是否为 tempGroup
utils.isTempGroup = function(object) {
	return object.type === 'group' && !object.hasOwnProperty('type')
}

// @canvas object：fabric.Canvas 类实例
// @objArr array：fabric 对象数组
// 将 'objArr' 数组中的对象添加到 'canvas' 上
utils.addObjects = function(canvas, objArr) {
	objArr.forEach(function(o) {
		canvas.add(o)
	})
}

// @canvas object：fabric.Canvas 类实例
// @objArr array：fabric 对象数组，注意：'objArr' are on 'canvas' already
// 将 'objArr' 数组中的对象从 'canvas' 上删除
utils.removeObjects = function(canvas, objArr) {
	objArr.forEach(function(o) {
		canvas.remove(o)
	})
}

// @value number
// @return number：向下取整后的数
// floor
utils.floor = function(value) {
	return Math.floor(value)
}

// @positiveInt number：非负数
// @return boolean
// 判断一个非负数是否足够靠近 0 
utils.IsEqualZero = function(positiveInt) {
	return positiveInt < 0.00001 ? true : false
}
 
// @from object
// @to object
// @options array optional：属性名数组，若为 undefined，则完整复制
// 根据options，将 from 对象中的值浅拷贝到 to
utils.copyFromTo = function(from, to, options) {
	// options 为 undefined，则完整复制
	var opts = Object.keys(from)
	if (options !== undefined) {
		opts = options
	}
	opts.forEach((op) => {
		to[op] = from[op]
	})
}

// 返回一个对象； options 为 undefined，则完整复制
utils.copy = function(src, options) {
	var o = {}
	if (!Array.isArray(options)) {
		options = objToArray(options)
	}
	utils.copyFromTo(src, o, options)
	return o
}


// @array array：对象数组
// @property string：属性名
// @return number：最大的属性值
// 传入一个对象数组和目标属性，返回最大的属性值
utils.findMax = function(array, prop) {
	let max = Number.MIN_SAFE_INTEGER
	array.forEach(function(o, i) {
		if (o[prop] > max) {
			max = o[prop]
		}
	})
	return max
}

// @array array：对象数组
// @property string：属性名
// @return number：最小的属性值
// 传入一个对象数组和目标属性，返回最小的属性值
utils.findMin = function(array, prop) {
	let min = Number.MAX_SAFE_INTEGER
	array.forEach(function(o, i) {
		if (o[prop] < min) {
			min = o[prop]
		}
	})
	return min
}

// @array array：对象数组
// @property string：属性名
// @return object：最大的属性值
// 传入一个对象数组和目标属性，返回包含最大的属性值的对象
utils.findMaxO = function(array, prop) {
	let max = Number.MIN_SAFE_INTEGER
	let obj = null
	array.forEach(function(o) {
		if (o[prop] > max) {
			max = o[prop]
			obj = o
		}
	})
	return obj
}


// @array array：对象数组
// @property string：属性名
// @return object：最小的属性值
// 传入一个对象数组和目标属性，返回包含最小的属性值的对象
utils.findMinO = function(array, prop) {
	let min = Number.MAX_SAFE_INTEGER
	let obj = null
	array.forEach(function(o) {
		if (o[prop] < min) {
			min = o[prop]
			obj = o
		}
	})
	return obj
}

export { utils }