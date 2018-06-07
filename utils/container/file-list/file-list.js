// 记录 画布 在本地文件系统中的存储信息


// fileList 中存储的 存储信息对象 结构：
// {
// 	id: string类型，当前 list 中的 ID
//  name：string类型，文件名
// 	dir: string 类型，在本地文件系统的目录，null 表示没有存入本地文件系统
// 	saved: boolean 类型, 表示文件是否已保存
// }

function FileList() {
	var F = FileList

	// 存储信息对象 存储处
	this.list = {}

	// 与 activeTab 对应的存储信息的对象
	this.cur = undefined

	// @id string：id
	// @options object
	// 新添加一个 存储信息对象
	F.prototype.add = function(id, options) {
		var f = {}
		var o = options
		f.id = id
		f.name =o.name
		f.dir = o.dir
		f.saved = o.saved
		this.list[id] = f
 	}

 	// @id string：activeTab 对应的 id
 	// 设置与 activeTab 对应的 存储信息对象
 	F.prototype.setCurrent = function(id) {
 		this.cur = this.list[id]
 	}

 	// @options object
 	// @id string optional：若为 undefined，则更新 this.cur
 	// 更新 存储信息对象
 	F.prototype.update = function(options, id) {
 		var o = options
 		var f = this.cur 
 		if (id !== undefined) {
 			f = this.list[id]
 		}
 		f.name = o.name === undefined ? f.name : o.name
    	f.dir = o.dir === undefined ? f.dir : o.dir
    	f.saved = o.saved === undefined ? f.saved : o.saved
 	}

 	// @return object
 	// 返回 this.cur 表示的 存储信息对象
 	F.prototype.current = function() {
 		return this.cur
 	}

 	// @status boolean
 	// 更新 this.cur 指向的 存储信息对象 的存储状态
 	F.prototype.updateSaveStatus = function(status) {
 		this.update({
 			saved: status,
 		})
 	}
}

export { FileList }