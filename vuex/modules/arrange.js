// vuex store file for Arrange.vue component
// 传递排列信号
import * as types from '../mutation-types'

const state = {
	// 排列信号
	signal:0,

	// 排列类型
	type:'',
}

const mutations = {
  [types.ARRANGE_SIGNAL] (state, type) {
    state.signal++
    state.type = type
  },
}

export default {
  state,
  mutations
}
