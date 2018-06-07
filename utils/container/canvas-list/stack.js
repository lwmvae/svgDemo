// 叠放次序 功能

import { utils } from '../../utils'


// @palette object：Palette 类的实例
// 提到最上面
function toFront(palette) {
	var p = palette
	var a = p.getActiveObject()
	if (a !== null && !utils.isTempGroup(a)) {
		p.canvas.bringToFront(a)
	}
}

// @palette object：Palette 类的实例
// 上移一层
function moveUp(palette) {
	var p = palette
	var a = p.getActiveObject()
	if (a !== null && !utils.isTempGroup(a)) {
		p.canvas.bringForward(a)
	}
}

// @palette object：Palette 类的实例
// 下移一层
function moveDown(palette) {
	var p = palette
	var a = p.getActiveObject()
	if (a !== null && !utils.isTempGroup(a)) {
		p.canvas.sendBackwards(a)
	}
}

// @palette object：Palette 类的实例
// 放到最后面
function toBottom(palette) {
	var p = palette
	var a = p.getActiveObject()
	if (a !== null && !utils.isTempGroup(a)) {
		p.canvas.sendToBack(a)
	}
}

export {
	// 提到最上面
	toFront,

	// 上移一层
	moveUp,

	// 下移一层
	moveDown,

	// 放到最后面
	toBottom,
}