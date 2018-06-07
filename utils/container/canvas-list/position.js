// 汇总完成 排列 功能的函数

import * as align from './align.js'
import * as flip from './flip.js'
import * as g from './group.js'
import * as micro from './micro.js'
import * as stack from './stack.js'
import * as rotate from './rotate.js'

var funList = {
	leftAlign: align.leftAlign,
	horizontalAlign: align.horizontalAlign,
	rightAlign: align.rightAlign,
	topAlign: align.topAlign,
	verticalAlign: align.verticalAlign,
	bottomAlign: align.bottomAlign,
	horizontalFlip: flip.horizontalFlip,
	verticalFlip: flip.verticalFlip,
	leftRotate: rotate.leftRotate,
	rightRotate: rotate.rightRotate,
	leftMove: micro.leftMove,
	rightMove: micro.rightMove,
	upwardMove: micro.upwardMove,
	downwardMove: micro.downwardMove,
	group: g.group,
	ungroup: g.ungroup,
	toFront: stack.toFront,
	moveUp: stack.moveUp,
	moveDown: stack.moveDown,
	toBottom: stack.toBottom,
}

// @palette object：Palette 类的实例
// @type string：排列 功能的类型
var updatePostion = function(palette, type) {
	var f = funList[type]
	f(palette)
}

export { updatePostion }