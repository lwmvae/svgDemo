// fabric 对象的clone

import { customProperties } from './custom'
import { componentsFrom } from './group'

// @object object：fabric 对象，普通 fabric 对象或者 tempGroup
// @return：若输入为普通 fabric 对象，则返回一个有相同属性值的不同实例
//			若输入为 tempGroup，则返回一个组合后的 group
function cloneObject(object) {
	var o = null
	object.clone(function(c) {
		// console.log('cloneObject', c)
		o = c
	}, customProperties)
	return o
}

// @activeGroup object： fabric 对象，tempGroup
// @return：返回 activeGroup 中包含的对象的数组
function cloneActiveGroup(activeGroup) {
	// fabric clone 函数复制 activeGroup 时 
	// 返回一个 group object
	return componentsFrom(activeGroup)
}

export {
	cloneObject,
	cloneActiveGroup,
}