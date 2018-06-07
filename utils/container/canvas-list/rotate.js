// 旋转 功能

import { utils } from '../../utils'
import { formGroup, dismantleGroup } from './group'

// @object object：普通 fabric 对象
// @direction string：旋转方向
// 根据旋转方向更新角度
function updateAngle(object, direction) {
	var o = object
	var d = direction
	var a = o.angle
	if (d === 'left') {
		a -= 90
	} else if (d === 'right') {
		a += 90
	}
	a = (a + 360) % 360
	if (utils.IsEqualZero(a)) {
		a = 0
	}
	o.set('angle', a)
}

// @palette object：Palette 类的实例
// @direction string：旋转方向
// 根据旋转方向旋转90度
function rotate(palette, direction) {
	var p = palette
	var a = p.getActiveObject()
	if(a !== null) {
		var cb = function() {
			var bool = utils.isTempGroup(a)
			if (bool) {
				formGroup(p.canvas, a)
				a = p.getActiveObject()
			}
			updateAngle(a, direction)
			if (bool) {
				dismantleGroup(p.canvas, a)
			}
			p.renderAll()
		}
		p.patch(cb)
	}
}

// 左旋
function leftRotate(palette) {
	rotate(palette, 'left')
}

// 右旋
function rightRotate(palette) {
	rotate(palette, 'right')
}

export {
	// 左旋
	leftRotate,

	// 右旋
	rightRotate,
}