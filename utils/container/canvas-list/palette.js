// 画布 类
// TODO：针对 AttributeEditor 组件信号的响应

import { shapes } from './shapes'
import { HistoryItem } from './item'
import { registerEvent, hasNoActive } from './canvas-event'
import { utils } from '../../utils'
import { ZoomData } from './zoom-data'
import { updatePostion } from './position'
import { customizeImage } from './custom'

import { listGroup } from './treeGroup'

import * as visibility from './form-setting'

import { SaveAttr } from './attribute'


var num;

// 记录 Palette 类实例与 attribute.js 属性名的对应关系
var attrMap = {
	// 'canvasHeight': 'height',
	// 'canvasWidth': 'width',
	'canvasHeight': 'backgroundHeight',
	'canvasWidth': 'backgroundWidth',
	'gridVisibility': 'gridVisibility',
	'gridColor': 'gridColor',
	'rulerVisibility': 'rulerVisibility',
	'backgroundColor': 'backgroundColor',
}

// 各背景属性名
var bg = Object.keys(attrMap)

// @palette object：Palette 类实例
// @return object：返回可用于修改 attribute.js 的对象
var getCommitProps = function(palette) {
	var o = {}
	bg.forEach(function(a) {
		o[attrMap[a]] = palette[a] 
	});
	return o
}

// @from object：src object
// @to object：dest object
// 从 from 中将各背景属性值复制到 to 中
var _copy = function(from, to) {
	utils.copyFromTo(from, to, bg)
}

// @canvas object：fabric.Canvas 类实例
// @zoomVal number：缩放倍数
// 设定 canvas 的缩放
var _setZoom = function(canvas, zoomVal) {
	let h = utils.floor(canvas.owner.canvasHeight * zoomVal)
	let w = utils.floor(canvas.owner.canvasWidth * zoomVal)
	canvas.setZoom(zoomVal)
	canvas.setHeight(h)
	canvas.setWidth(w)
}

// @canvas object：fabric.Canvas 类实例
// @options object：包含属性值的对象
// 使用默认配置值初始化 canvas 的尺寸和背景颜色，背景颜色透明
var _initCanvas = function(canvas, options) {
	canvas.setWidth(options.canvasWidth)
	canvas.setHeight(options.canvasHeight)
	// canvas.renderAll()
	//必须透明，否则会遮挡网格线
	canvas.setBackgroundColor('rgba(255, 255, 255, 0.0)')
}

// @palette object：Palette 类实例
// @options object：包含属性值的对象
// 将背景属性挂载到 Palette 类实例上
var _initPalette = function(palette, options) {
	// console.log(palette)
	_copy(options, palette)
}

// @palette object：Palette 类实例
// @options object：包含属性值的对象
// 初始化 Palette 类实例
var _init = function(palette, options) {
	// console.log(palette);
	_initPalette(palette, options)
	_initCanvas(palette.canvas, options)
	// _initAttr(palette.saveAttr)
}

// @palette object：Palette 类实例
// @return string：画布内容和画布背景序列化后的string
// 序列化画布
var _toData = function(palette) {
	var p = palette
	var c = JSON.stringify(p.canvas)
	var a = JSON.stringify(p.saveAttr)
	var bg = {}
	_copy(p, bg)
	var data = {
		json:c,
		bg:bg,
		attr:a
	}
	// console.log(JSON.stringify(data))
	return JSON.stringify(data)
}

// @palette object：Palette 类实例
// 画布的属性写入 store，更新 UI
var _updateBg = function(palette) {
	var p = palette
	var s = p.vue.$store
	s.commit('SET_BACKGROUND_HEIGHT', p.canvasHeight)
	s.commit('SET_BACKGROUND_WIDTH', p.canvasWidth)
	s.commit('SET_ATTRIBUTE_GRID_VISIBILITY', p.gridVisibility)
	s.commit('SET_ATTRIBUTE_GRID_COLOR', p.gridColor)
	s.commit('SET_ATTRIBUTE_RULER_VISIBILITY', p.rulerVisibility)
	s.commit('SET_ATTRIBUTE_BACKGROUND_COLOR', p.backgroundColor)
	s.commit('SET_BACKGROUND_ZOOM', p.zoom)
}

// 画布 类
// @vueInstance object：WorkAreaEle 组件实例
// @id string：<canvas> 标签的 id 属性值
class Palette {
	constructor(vueInstance, id) {
		// 新建个 fabric.Canvas 实例
		this.canvas = new fabric.Canvas(id)

		this.id = id

		// 记录 fabric.Canvas 实例所属的 画布 实例
		this.canvas.owner = this

		// 操作记录
		this.history = undefined

		// 当前 画布 实例的缩放倍数，初始化时为 1
		this.zoomData = new ZoomData()
		this.zoom = 1

		// 属性
		this.saveAttr= new SaveAttr();


		// 挂载 WorkAreaEle 组件实例，并注册事件
		this.vue = vueInstance
		registerEvent(this.canvas, this.vue)

		// 根据默认配置，初始化 画布 实例
		let d = this.vue.defaultPaletteOption
		_init(this, d);

	}

	// 重新选中已经选中的对象
	reselect() {
		var c = this.canvas
		var arr = c.getObjects().filter(o => o.active === true)
		if (arr.length < 1) {
			return
		} else {
			c.deactivateAll()
			c.renderAll()
			if (arr.length === 1) {
				c.setActiveObject(arr[0])
			} else {
				utils.createActiveGroup(c, arr)
			}
		}
		c.renderAll()
	}


	// @type string：基本图元类型
	//       object：fabric 对象
	// 在 画布 上添加图形
	addShape(type) {
		var o = typeof type === 'object' ? type : shapes[type]()
		
		this.vue.$store.commit('ADDNUM',o.obrType);
		num=this.vue.$store.state.nameNum[o.obrType];
		
		o.name=o.obrType+num
		
		this.canvas.add(o)

		// console.log(this.canvas)
		this.recordHistory()
	}



	// 保存
	save() {
		// console.log(this.history)
		this.history.save()
	}

	// 
	setCurrent() {
		this.updateBg()
		if(hasNoActive(this.canvas)) {
			let ops = visibility['canvas']
			let props = getCommitProps(this)
			this.vue.$store.commit("SET_FORM_ITEMS_VISIBILITY", ops)
			this.vue.$store.commit('SET_ATTRIBUTES', props)
		} else {
			this.reselect()
		}

	}

	// @dataURL string：图片的 data url
	// 在 画布 上添加图片
	addImage(dataURL) {
		var cb = function(img) {
			customizeImage(img)
			this.addShape(img)
			// console.log(img)
		}
		fabric.Image.fromURL(dataURL, cb.bind(this))
	}

	// @return object：fabric 对象
	// 返回选中的 fabric 对象，包含普通 fabric 对象和 tempGroup 对象
	getActiveObject() {
		return this.canvas.getActiveObject() || this.canvas.getActiveGroup()
	}

	// 重新渲染
	renderAll() {
		this.canvas.renderAll()
	}

	// TODO：响应 AttributeEditor 组件的信号
	setAttribute(attribute, value) {
		var obj=this.canvas.getActiveObject() || this.canvas.getActiveGroup();
		//不选中任何图形
		if(obj == undefined){
			this[attribute]=value;
			this.recordHistory()
		}else{
			obj.set(attribute,value);
			obj.setCoords();
		}
		
		this.canvas.renderAll();
	}

	// @return string：序列化画布内容和画布背景所生产的 string
	// 序列化 画布 实例
	toData() {
		return _toData(this)
	}


	// @json string: 序列化画布内容和画布背景所生产的 string
		// json 的结构：
		// {
		// 		json:'JSON.stringify(canvas) 的 值',
		// 		attr:添加的属性和事件,
		// 		bg: {
		// 			canvasHeight: 100,
		// 			canvasWidth: 100 ,
		// 			gridVisibility: true ,
		// 			gridColor: '#123456' ,
		// 			rulerVisibility: true,
		// 			backgroundColor: '#123456'
		// 			}
		// }
	// 加载文件
	load(json) {
		var data = JSON.parse(json)
		
		this.canvas.loadFromJSON(data.json);
		this.saveAttr['addAttr']=JSON.parse(data.attr).addAttr;

		_init(this, data.bg);

		var _that=this.vue;
		JSON.parse(data.json).objects.forEach(function(e){
			_that.$store.commit('ADDNUM', e.obrType);
		});

		this.changeTree()

		this.renderAll()
	}

	// 更新背景，画布的属性写入 store，更新 UI
	updateBg() {
		_updateBg(this)
	}

	// 初始化 操作记录
	initHistory() {
		let initialState = JSON.stringify(this.canvas)
		this.history = new HistoryItem(initialState, this)
	}

	// 记录当前状态
	recordHistory() {
		this.history.add(JSON.stringify(this.canvas))

		this.changeTree()
		
	}

	//更改树形数组
	changeTree(){
		var arr=listGroup(this.canvas._objects);
		this.vue.$store.commit('SET_TREE', arr);
	}

	// 给 操作记录 加一个锁
	lockHistory() {
		this.history.lock()
	}

	// 给 操作记录 解一个锁
	unlockHistory() {
		this.history.unlock()
	}

	// @callback function：有多次改变 画布 内容的函数
	// 批量处理，只记录一次操作记录
	patch(callback) {
		this.history.patch(callback)
	}

	// 取消上次操作
	undo() {
		let pre = this.history.undo()
		if(pre !== null) {
			this.canvas.clear()
			this.canvas.loadFromJSON(pre)
			this.changeTree()
		}
	}

	// 恢复上次操作
	redo() {
		let next = this.history.redo()
		if(next !== null) {
			this.canvas.clear()
			this.canvas.loadFromJSON(next)
			this.changeTree()
		}
	}

	// 删除选中的对象
	delete() {
		var c = this.canvas
		if(c.getActiveGroup()) {
			// 批量删除，只记录一次history
			this.history.lock()
			c.getActiveGroup().forEachObject(function(o) {
				c.remove(o)
			})
			this.history.unlock()
			this.history.add(JSON.stringify(c))
			c.discardActiveGroup().renderAll()
		} else {
			c.remove(c.getActiveObject())
		}
		
		this.changeTree()

	}

	// 选中画布上全部的对象
	selectAll() {
		let objs = this.canvas.getObjects()
		utils.createActiveGroup(this.canvas, objs)
	}

	// 反向选中
	selectRest() {
		var objs = this.canvas.getObjects().filter(function(o) {
    		return o.active === false
    	})
    	utils.createActiveGroup(this.canvas, objs)
	}


	// 更新网格可见性
	setGridVisibility(gridVisibility) {
		this.gridVisibility = gridVisibility
	}

	// 更新标尺可见性
	setRulerVisibility(rulerVisibility) {
		this.rulerVisibility = rulerVisibility
	}

	// setBgWidth(backgroundWidth){
	// 	this.canvasWidth=backgroundWidth
	// }

	// setBgHeight(backgroundHeight){
	// 	this.canvasHeight=backgroundHeight
	// }



	// 放大
	zoomIn() {
		this.zoom = this.zoomData.zoomIn()
		_setZoom(this.canvas, this.zoom)
		this.vue.$store.commit('SET_BACKGROUND_ZOOM', this.zoom)
	}

	// 缩小
	zoomOut() {
		this.zoom = this.zoomData.zoomOut()
		_setZoom(this.canvas, this.zoom)
		this.vue.$store.commit('SET_BACKGROUND_ZOOM', this.zoom)
	}

	// 原始尺寸
	zoomOri() {
		this.zoom = this.zoomData.zoomOri()
		_setZoom(this.canvas, this.zoom)
		this.vue.$store.commit('SET_BACKGROUND_ZOOM', this.zoom)
	}


	// arrange
	// @type string：更新位置操作的类型
	// 根据传入类型更新 画布 上选中的对象
	posUpdate(type) {
		updatePostion(this, type)
	}


	// 属性相关操作
	addAttr(id,attrName,data){
		this.saveAttr.add(id,attrName,data)
		this.recordHistory()
	}
	delAttr(id,attrName){
		this.saveAttr.del(id,attrName)
		this.recordHistory()
	}
	obtainAttr(id,attrName){
		return this.saveAttr.obtain(id,attrName)
	}
	getSaveAttr(id){
		return this.saveAttr.getAttr(id);
	}

	//右侧状态树
	activeShape(newVal){
		var _that=this;
		this.canvas._objects.forEach(function(e){
			if(e.name===newVal){
				e.active=true;
			}else{
				e.active=false;
			}
		})
		this.renderAll()
	}

}


export { 
	Palette,
	getCommitProps,
}