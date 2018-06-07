// 微调 功能

import { formGroup, dismantleGroup } from './group'
import { utils } from '../../utils'

// @object object：fabric 普通对象
// @direction string：方向
// 向指定方向将对象平移一个像素
function _move(object, direction) {
	var d = direction
	var o = object
	if (d === 'left') {
		o.left -= 1
	}
	if (d === 'right') {
		o.left += 1
	}
	if (d === 'upward') {
		o.top -= 1
	}
	if (d === 'downward') {
		o.top += 1
	}
}

// @palette object：画布对象 Palette类实例
// @direction string：方向
// 微调，将画布上选中的对象向指定方向平移
function move(palette, direction) {
	var p = palette

	// 获取画布上的选中对象，若为 tempGroup，则先组合成普通 group，再平移，最后解组为 tempGroup
	var a = p.getActiveObject()
	var cb = function() {
		var bool = utils.isTempGroup(a)
		if (bool) {
			formGroup(p.canvas, a)
			a = p.getActiveObject()
		}
		_move(a, direction)
		if (bool) {
			dismantleGroup(p.canvas, a)
		}
		p.renderAll()
	}
	p.patch(cb)
}

// 左移
function leftMove(palette) {
	move(palette, 'left')
}

// 右移
function rightMove(palette) {
	move(palette, 'right')
}

// 上移
function upwardMove(palette) {
	move(palette, 'upward')
}

// 下移
function downwardMove(palette) {
	move(palette, 'downward')
}
export {
	// 左移
	leftMove,

	// 右移
	rightMove,

	// 上移
	upwardMove,

	// 下移
	downwardMove,
}