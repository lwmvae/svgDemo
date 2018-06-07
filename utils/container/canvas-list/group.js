// 组合 和 解组 功能

import { utils } from '../../utils'
import { customizeGroup } from './custom'
import { cloneObject, cloneActiveGroup } from './clone'
import { listGroup } from './treeGroup'


// @group object：fabric.Group 实例
// @return array：复制并返回 group 所包含的对象；不影响传入的 group
function componentsFrom(group) {
	var g = cloneObject(group)
	var objs = g._objects
	g._restoreObjectsState()
	return objs
}

// @canvas object：fabric.Canvas 类实例
// @activeGroup object：tempGroup，该 tempGroup 位于传入的 canvas 上
// 组合，传入的 activeGroup 组成为普通 fabric.Group 实例
var formGroup = function(canvas, activeGroup) {
	var c = canvas
	var a = activeGroup
	var p = c.owner
	var g = cloneObject(a)
	customizeGroup(g)
	p.delete()
	p.addShape(g)
	c.setActiveObject(g)
	p.renderAll()
}

// @canvas object：fabric.Canvas 类实例
// @group object：普通 fabric.Group 实例，该 group 位于传入的 canvas 上
// 解组，基于传入的 group 生成新的 tempGroup
var dismantleGroup = function(canvas, group) {
	var g = group
	var c = canvas
	var objs = componentsFrom(g)
	c.remove(g)
	objs.forEach(function(o) {
		c.add(o)
		c.item(c.size() - 1).hasControls = true
	})
	utils.createActiveGroup(c, objs)
	c.renderAll()
}

// @palette object：画布对象
// 组合，将 palette 上选中的多个图形组合在一起
var group = function(palette) {
	var h = palette.history
	var c = palette.canvas
	var a = c.getActiveGroup()
	h.lock()
	if(a !== null) {
		formGroup(c, a)
	}
	h.unlock()
	if(a !== null) {
		h.add(JSON.stringify(c))
	}
}

// @palette object：画布对象
// 解组，解组 palette 上选中的普通 group 对象
var ungroup = function(palette) {
	var h = palette.history
	var c = palette.canvas
	var g = c.getActiveObject()
	h.lock()
	if(g !== null && g.type === 'group') {
		dismantleGroup(c, g)
	}
	h.unlock()
	if(g !== null && g.type === 'group') {
		h.add(JSON.stringify(c))
	}

	var arr=listGroup(c._objects);
	palette.vue.$store.commit('SET_TREE', arr);
}

export {
	// 组合
	group,

	// 解组
	ungroup,

	// 提取普通 group 或者 tempGroup 内含的对象，后续对提取对象的操作对传入对象没有影响
	componentsFrom,

	// 生成普通 group 对象
	formGroup,

	// 解组普通 group 对象
	dismantleGroup,
}