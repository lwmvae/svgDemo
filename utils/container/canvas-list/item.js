// 操作记录 历史

// constructor
// @initialState string：画布内容的初始状态
// @owner object：Palette 类实例，操作记录 的所有者
function HistoryItem(initialState, owner) {
	var H = HistoryItem

	// 存储 state，state 为画布内容序列化后的string
	this.states = []
	this.states.push(initialState)

	// 下标，指向已经保存的 state
	this.base = 0

	// 下标，指向画布当前状态对应的 state
	this.cur = 0

	// 锁的数量
	this.locks = 0

	// 指向所属的 palette
	this.owner = owner

	// 设定画布的存储状态
	H.prototype.setSaveStatus = function() {
		var s = this.owner.vue.$store
		if (this.isSaved()) {
			s.commit('SET_SAVE_STATUS', true)
		} else {
			s.commit('SET_SAVE_STATUS', false)
		}
	}

	// 给 操作记录 加一把锁
	H.prototype.lock = function() {
		this.locks++
	}

	// 给 操作记录 解一把锁
	H.prototype.unlock = function() {
		this.locks--
	}

	// @return boolean：判断是否能记录 操作记录
	H.prototype.addable = function() {
		if (this.locks === 0) {
			return true
		} else {
			return false
		}
	}

	// @state string：画布内容序列化后的string
	// 记录 操作记录
	H.prototype.add = function(state) {
		var bool = this.addable()
		if (bool) {
			this.states.splice(this.cur + 1)
			this.states.push(state)
			this.cur++
			this.setSaveStatus()
		}
	}

	// 保存，同时设定画布的存储状态
	H.prototype.save = function() {
		this.base = this.cur
		this.setSaveStatus()
	}

	// @return boolean：判断画布的当前内容是否已经保存
	H.prototype.isSaved = function() {
		return this.base === this.cur
	}

	// @return boolean：判断是否可以取消上次操作
	H.prototype.isUndoAble = function() {
		return this.cur > 0
	}

	// @return boolean：判断是否可以恢复上次操作
	H.prototype.isRedoAble = function() {
		return this.cur < this.states.length - 1
	}

	// @return string：返回上次操作前的 state
	// @return null：无法取消上次操作
	// 取消上次操作
	H.prototype.undo = function() {
		var able = this.isUndoAble()
		if(able) {
			this.cur--
			var s = this.states[this.cur]
			this.setSaveStatus()
			return s
		}else {
			return null
		}	
	}

	// @return string：返回上次操作前的 state
	// @return null：无法恢复上次操作
	// 恢复上次操作
	H.prototype.redo = function() {
		var able = this.isRedoAble()
		if(able) {
			var s = this.states[++this.cur]
			this.setSaveStatus()
			return s
		}else {
			return null
		}
	}

	// @callback function：对画布内容进行修改的操作
	// 批量修改画布内容，只记录一次操作历史
	H.prototype.patch = function(callback) {
		this.lock()
		callback()
		this.unlock()
		this.owner.recordHistory()
	}
}

export { HistoryItem }