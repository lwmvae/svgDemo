import { utils } from '../../utils'
import { formGroup, dismantleGroup } from './group'

// @object object：fabric 对象
// @prop string：属性名
// toggle 属性值，该属性为 boolean 类型
function toggle(object, prop) {
	object[prop] = object[prop] === true ? false : true
}

// @object object：fabric 对象
// @direction string：翻转方向
// 根据 direction，toggle fabric 对象的 flipX 或者 flipY 的值
function toggleFlip(object, direction) {
	var o = object
	var d = direction
	if (d === 'horizontal') {
		toggle(o, 'flipX')
	} else if (d === 'vertical') {
		toggle(o, 'flipY')
	}
}

// @object object：fabric 对象
// 更新传入对象的角度
function updateAngle(object) {
	var o = object
	if (utils.IsEqualZero(o.angle)) {
		o.angle = 0
	} else {
		o.angle = 360 - o.angle
	}
}

// @palette object：画布对象
// @direction string：翻转方向
// 将画布上选中的对象翻转
var _flip = function(palette, direction) {
	// 获取选中对象
	// 确定对象类型 tempGroup 或 非tempGroup
	// 	非tempGroup：toggle flip， 更新角度
	// 	tempGroup：组合为group, toggle flip, 更新角度，解组
	var p = palette
	var a = p.getActiveObject()
	var callback = function() {
		var bool = utils.isTempGroup(a)
		if (bool) {
			formGroup(p.canvas, a)
			a = p.getActiveObject()
		}
		toggleFlip(a, direction)
		updateAngle(a)
		if (bool) {
			dismantleGroup(p.canvas, a)
		}
		p.renderAll()
	}
	p.patch(callback)
}

// @palette object：画布对象
// 水平翻转
var horizontalFlip = function(palette) {
	_flip(palette, 'horizontal')
}

// @palette object：画布对象
// 垂直翻转
var verticalFlip = function(palette) {
	_flip(palette, 'vertical')
}

export {
	// 水平翻转
	horizontalFlip,

	// 垂直翻转
	verticalFlip,
}