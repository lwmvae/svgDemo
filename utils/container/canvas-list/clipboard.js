import { utils } from '../../utils'
import { cloneObject, cloneActiveGroup } from './clone'
import { listGroup } from './treeGroup'

// @array array：fabric 对象数组
// @return array：返回深度复制后的对象
var cloneArray = function(array) {
	// console.log('cloneArray array', array)
	return array.map(function(item) {
		// console.log('cloneArray item', item)
		return cloneObject(item)
	})
}

// @canvas object：fabric.Canvas 类实例
// @object object：fabric 对象
// 在 canvas 上添加图形
var pasteObject = function(canvas, object,vueInstance) {
	var o = object
	o.left += 10
	o.top += 10
	o.set('canvas', canvas)
	o.setCoords()
	
	vueInstance.$store.commit('ADDNUM',o.obrType);
	var num=vueInstance.$store.state.nameNum[o.obrType];
	o.name=o.obrType+'-'+num
	canvas.add(o)

	var arr=listGroup(canvas._objects);
	vueInstance.$store.commit('SET_TREE', arr);
} 

// @canvas object：fabric.Canvas 类实例
// @objects array：fabric 对象数组
// 批量添加对象，只记录一次history
var pasteObjects = function(canvas, objects,vueInstance) {
	var h = canvas.owner.history
	h.lock()
	objects.forEach(function(o) {
		pasteObject(canvas, o,vueInstance)
	})
	h.unlock()
	h.add(JSON.stringify(canvas))
}

// @canvas object：fabric.Canvas 类实例
// 将新添加到 canvas 上面一个对象设定为 active
var setLastActiveObject = function(canvas) {
	var objs = canvas.getObjects()
	canvas.setActiveObject(objs[objs.length - 1])
}


// @canvas object：fabric.Canvas 类实例
// @numOfObjects number：fabric 对象个数
// 将新添加到 canvas 上的多个对象设定为 active
var setLastsActiveGroup = function(canvas, numOfObjects) {
	var n = numOfObjects
	var arr = canvas.getObjects()
	var objs = arr.slice(-n)
	utils.createActiveGroup(canvas, objs)
}

// @canvas object：fabric.Canvas 类实例
// @numOfObjects number：fabric 对象个数
// 将新添加到 canvas 上的一个或者多个对象设定为 active
var setNewAddedActive = function(canvas, numOfObjects) {
  	var n = numOfObjects
	if (n < 1) {
		return
	}
	canvas.deactivateAll()
  	canvas.discardActiveGroup()
  	if (n === 1) {
  		setLastActiveObject(canvas)
  	} else {
  		setLastsActiveGroup(canvas, numOfObjects)
  	}
}

// constructor
// 剪切板
function Clipboard() {
	var C = Clipboard
	this.clipboard = []

	// @palette object：画布对象
	// 从传入的 palette 对象上拷贝
	C.prototype.copy = function(palette) {
		var canvas = palette.canvas
		var activeObject = canvas.getActiveObject()
      	var	activeGroup = canvas.getActiveGroup()
      	if(activeGroup) {
      		this.clipboard = cloneActiveGroup(activeGroup)
      	} else if (activeObject) {
      		this.clipboard = []
      		this.clipboard.push(cloneObject(activeObject))
      	}
	}

	// @palette object：画布对象
	// 粘贴到传入的 palette 对象上
	C.prototype.paste = function(palette,vueInstance) {
		var canvas = palette.canvas
		if (this.clipboard.length === 0) {
			return
		}
		// console.log('paste clipboard', this.clipboard)
		var cb = cloneArray(this.clipboard)
		var len = cb.length
		pasteObjects(canvas, cb,vueInstance)
		setNewAddedActive(canvas, len)
	}
}

export { Clipboard }