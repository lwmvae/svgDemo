
import { Clipboard } from './clipboard'
import { Palette } from './palette'

// constructor
// @vueInstance object：WorkAreaEle 组件实例
function CanvasList(vueInstance) {
	var C = CanvasList

	// Palette 类实例存储地
	this.list = {}

	// 与 activeTab 对应的 Palette 类实例
	this.cur = undefined

	// WorkAreaEle 组件实例
	this.vue = vueInstance

	// 剪切板实例
    this.clipboard = new Clipboard()

    // @id string：对应的 <canvas> 标签的 id 属性值
    // 新生成一个 Palette 实例，并存储
	C.prototype.add = function(id) {
		var p = new Palette(this.vue, id)
		this.list[id] = p
	}

	// @return string：Palette 类对象序列化后的 string
    C.prototype.save = function() {
        this.cur.save()
        return this.toData()
    }

    // @id string：key
    // 将 activeTab 对应的 Palette 实例赋值给 this.cur，同时更新画布背景
	C.prototype.setCurrent = function(id) {
		this.cur = this.list[id]
		this.cur.setCurrent()
	}

	// @type string：基本图元类型
	// 添加基本图元到当前 activeTab 对应的画布
	C.prototype.addShape = function(type) {
		this.cur.addShape(type)
	}

	// @dataURL：data url
	// 添加图片到当前 activeTab 对应的画布
    C.prototype.addImage = function(dataURL) {
        this.cur.addImage(dataURL)
    }

    // 返回被选中的对象，普通对象 或 tempGroup
	C.prototype.getActiveObject = function() {
		this.cur.getActiveObject()
	}

	// 渲染当前画布
	C.prototype.renderAll = function() {
		this.cur.renderAll()
	}

	// @attribute string：
	// 修改选中对象的属性
	C.prototype.setAttribute = function(attribute, value) {
		this.cur.setAttribute(attribute, value)
	}

	// 序列化画布
	C.prototype.toData = function() {
		return this.cur.toData()
	}

	// @json string：序列化后的画布内容
	// @id string optional: 可选，指定加载到的画布 id，默认加载到 this.cur
	// 加载内容到画布
	C.prototype.load = function(json, id) {
		var p = this.cur
		if (id !== undefined) {
			p = this.list[id]
		}
		p.load(json)
	}



	// edit
	// 初始化 操作历史 
	C.prototype.initHistory = function() {
		this.cur.initHistory()
	}

	// 锁定 操作历史 的记录
	C.prototype.lockHistory = function() {
		this.cur.lockHistory()
	}

	// 解锁 操作历史 的记录
	C.prototype.unlockHistory = function() {
		this.cur.unlockHistory()
	}

	// 取消上次操作
	C.prototype.undo = function() {
		this.cur.undo()
	}

	// 恢复上次操作
	C.prototype.redo = function() {
		this.cur.redo()
	}

	// 剪切
	C.prototype.cut = function() {
		this.copy()
		this.delete()
	}

	// 拷贝
	C.prototype.copy = function() {
		this.clipboard.copy(this.cur)
	}

	// 粘贴
	C.prototype.paste = function() {
		this.clipboard.paste(this.cur,this.vue)
	}

	// 删除
	C.prototype.delete = function() {
		this.cur.delete()
	}

	// 选中所有
	C.prototype.selectAll = function() {
		this.cur.selectAll()
    }

    // 反向选中
    C.prototype.selectRest = function() {
    	this.cur.selectRest()
    }


    // scene
    // 更新网格可见性
    C.prototype.setGridVisibility = function(gridVisibility) {
        this.cur.setGridVisibility(gridVisibility)
    }

    // 更新标尺可见性
    C.prototype.setRulerVisibility = function(rulerVisibility) {
        this.cur.setRulerVisibility(rulerVisibility)
    }

    // 放大
    C.prototype.zoomIn = function() {
        this.cur.zoomIn()
    }

    // 缩小
    C.prototype.zoomOut = function() {
        this.cur.zoomOut()
    }

    //原始尺寸
    C.prototype.zoomOri = function() {
        this.cur.zoomOri()
    }


    // arrange
    // 更新位置
    C.prototype.posUpdate = function(type) {
    	this.cur.posUpdate(type)
    }




    // 属性和事件相关操作
    C.prototype.addAttr = function(id,attrName,data){
        this.cur.addAttr(id,attrName,data)
    }
    C.prototype.delAttr = function(id,attrName){
        this.cur.delAttr(id,attrName)
    }
    C.prototype.obtainAttr = function(id,attrName){
        return this.cur.obtainAttr(id,attrName)
    }
    C.prototype.getSaveAttr = function(id){
        return this.cur.getSaveAttr(id)
    }

    C.prototype.activeShape = function(newVal) {
        this.cur.activeShape(newVal)
    }

}

export { CanvasList }