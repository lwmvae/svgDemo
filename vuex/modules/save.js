// 负责传递文件保存状态

import * as types from '../mutation-types'

const state = {
	// 保存状态
	saveStatus:true,

	// 保存状态信号
	saveStatusSignal: 0,
}

const mutations = {
  [types.SET_SAVE_STATUS] (state, status) {
    state.saveStatus = status
    state.saveStatusSignal++
  },
}

export default {
  state,
  mutations
}
