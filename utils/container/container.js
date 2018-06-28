import { CanvasList } from './canvas-list/canvas-list.js'
import { FileList } from './file-list/file-list.js'
import { utils } from '../utils'
const {dialog} = require('electron').remote
const fs = require('fs')
const nativeImage = require('electron').nativeImage

var filePath='C:\\';
var imagePath='C:\\';
var svaePath='C:\\';

// @return string
// 返回 image 的 Data URL
function getImageDataURL() {
    var paths = dialog.showOpenDialog({

            // TODO:配置
            defaultPath:imagePath,
            filters:[{name: 'Custom File Type', extensions: ['png', 'bmp', 'jpg']},],
            properties:['openFile',],
    })
    if (paths === undefined) {
        return null
    }
    var p = paths[0]
    imagePath=p
    var img = nativeImage.createFromPath(p)
    return img.toDataURL()
}

// constructor
// @vueInstance object：WorkAreaEle 组件实例
// @idPrefix string：id 前缀
var Container = function(vueInstance, idPrefix) {
    var C = Container


    this.canvasList = new CanvasList(vueInstance)
    this.fileList = new FileList()
    this.vue = vueInstance
    this.prefix = idPrefix

    // @id string：索引
    // 修改各 this.cur 的指向
    C.prototype.setCurrent = function(id) {
        this.canvasList.setCurrent(id)
        this.fileList.setCurrent(id)
    }

    // @id string：存储索引，也是 <canvas> 标签id
    // 往 container 里面添加新的条目，id为索引
    C.prototype.add = function(id) {
        this.canvasList.add(id)
        this.fileList.add(id, {
            name:id,
            dir:null,
            saved:true,
        })
    }

    // TODO
    C.prototype.remove = function(id) {
    }


    // @type string：添加图元的类型
    // 添加图元
    C.prototype.addShape = function(type) {
        if (typeof type === 'object' || type !== 'Image') {
            this.canvasList.addShape(type)
        } else {
            var dataURL = getImageDataURL()
            if (dataURL === null) {
                return
            }
            this.canvasList.addImage(dataURL)
        }
    }

    // TODO
    C.prototype.setAttribute = function(attribute, value) {
        this.canvasList.setAttribute(attribute, value)
    }

    

    // @path string：文件路径
    // @paletteId string：目标 画布 对象的索引
    // @return object：文件路径、文件名和后缀等信息
    // 将文件加载到画布上，并返回文件信息
    C.prototype.openPath = function(path, paletteId) {
        var data = fs.readFileSync(path, 'utf8')
        var meta =utils.dividePath(path)
        // TODO:需要修改，data 里面包含 canvas 保存时会丢失的的信息
        //      处理完成后 commit store 用来设定 background.vue
        //      的 visibility(ruler and grid)、gridColor、height、width
        this.canvasList.load(data, paletteId)
        this.fileList.update({
            name:meta.name,
            dir:meta.dir,
            saved:true,
        }, paletteId)
        return meta
    }

    // @paletteId string：目标 画布 对象的索引
    // @return object：文件路径、文件名和后缀等信息
    // 打开成功返回文件信息
    // 打开失败返回null
    C.prototype.open = function(paletteId,filePath) {
        
        var paths = dialog.showOpenDialog({

            // TODO:配置
            defaultPath:filePath,
            filters:[{name: 'Custom File Type', extensions: ['json']},],
            properties:['openFile',],
        })

        if (paths === undefined) {
            return null
        }
        var path = paths[0]
        filePath=path
        var meta = this.openPath(path, paletteId)
        return meta
    }

    // @path string：文件路径
    // @return boolean：表示文件是否存在于本地文件系统
    // 判断文件是否存在于本地文件系统
    C.prototype.exists = function(path) {
        return fs.existsSync(path)
    }

    // 保存当前的 activeTab
    // 保存成功返回文件路径、文件名和后缀等信息
    // 保存失败返回null
    C.prototype.save = function() {
        var f = this.fileList.current()

        // 若当前 activeTab 并未存储于本地文件系统
        if (f.dir === null) {
            var path = dialog.showSaveDialog({
                title:'保存',
                // TODO:配置
                defaultPath:svaePath,
                filters:[{name: 'Custom File Type', extensions: ['json']},],
            })

            // 保存取消
            if(path === undefined) {
                return null
            }
            var data = this.canvasList.save()
            var meta = utils.dividePath(path)
            
            svaePath=path[0];
            // 写入本地文件
            fs.writeFileSync(path, data)

            // 更新存储信息
            this.fileList.update({
                name:meta.name,
                dir:meta.dir,
                saved:true,
            })
            return meta
        } else {

            var path = f.dir + f.name + '.json'
            var data = this.canvasList.save()

            // 写入本地文件
            var fd = fs.openSync(path, 'r+')
            fs.ftruncateSync(fd, 0)
            fs.writeSync(fd, data, 0, 'utf8')
            fs.closeSync(fd)

            // 更新存储信息
            this.fileList.update({
                dir:f.dir,
                saved:true,
            })
            return utils.dividePath(path)
        }
    }

    // 另存当前的 activeTab
    // 另存成功返回文件路径、文件名和后缀等信息
    // 另存失败返回null
    C.prototype.saveAs = function() {
        var f = this.fileList.current()
        var dir = f.dir

        // 设置 dir 为 null，重新保存
        this.fileList.update({
            dir:null,
        })
        var meta =this.save()

        if(meta === null) {
            // 若保存失败，恢复原 dir 属性
            this.fileList.update({
                dir:dir,
            })
            return null
        } else {
            // 若保存成功，返回文件信息
            this.fileList.update({
                dir:meta.dir,
                name:meta.name,
                saved:true,
            })
            return meta
        }
    }

    // @status boolean
    // 更新 activeTab 的存储状态
    C.prototype.updateSaveStatus = function(status) {
        this.fileList.updateSaveStatus(status)
    }

    // 初始化 操作历史 
    C.prototype.initHistory = function() {
        this.canvasList.initHistory()
    }


    // edit
    // 取消上次操作
    C.prototype.undo = function() {
        this.canvasList.undo()
    }

    // 恢复上次操作
    C.prototype.redo = function() {
        this.canvasList.redo()
    }

    // 剪切
    C.prototype.cut = function() {
        this.canvasList.cut()
    }

    // 拷贝
    C.prototype.copy = function() {
        this.canvasList.copy()
    }

    // 粘贴
    C.prototype.paste = function() {
        this.canvasList.paste()
    }

    // 删除
    C.prototype.delete = function() {
        this.canvasList.delete()
    }

    // 选中所有
    C.prototype.selectAll = function() {
        this.canvasList.selectAll()
    }

    // 反向选中
    C.prototype.selectRest = function() {
        this.canvasList.selectRest()
    }


    // scene
    // 更新网格可见性
    C.prototype.setGridVisibility = function(gridVisibility) {
        this.canvasList.setGridVisibility(gridVisibility)
    }

    // 更新标尺可见性
    C.prototype.setRulerVisibility = function(rulerVisibility) {
        this.canvasList.setRulerVisibility(rulerVisibility)
    }

    // C.prototype.setBgWidth = function(backgroundWidth) {
    //     this.canvasList.setBgWidth(backgroundWidth)
    // }

    // C.prototype.setBgHeight = function(backgroundHeight) {
    //     this.canvasList.setBgHeight(backgroundHeight)
    // }

    // 放大
    C.prototype.zoomIn = function() {
        this.canvasList.zoomIn()
    }

    // 缩小
    C.prototype.zoomOut = function() {
        this.canvasList.zoomOut()
    }

    //原始尺寸
    C.prototype.zoomOri = function() {
        this.canvasList.zoomOri()
    }


    // arrange
    // 更新位置
    C.prototype.posUpdate = function(type) {
        this.canvasList.posUpdate(type)
    }


    // 属性和事件相关操作
    C.prototype.addAttr = function(id,attrName,data){
        this.canvasList.addAttr(id,attrName,data)
    }
    C.prototype.delAttr = function(id,attrName){
        this.canvasList.delAttr(id,attrName)
    }
    C.prototype.obtainAttr = function(id,attrName){
        return this.canvasList.obtainAttr(id,attrName)
    }
    C.prototype.getSaveAttr = function(id){
        return this.canvasList.getSaveAttr(id)
    }

    C.prototype.activeShape = function(newVal) {
        this.canvasList.activeShape(newVal)
    }


}


export { Container }