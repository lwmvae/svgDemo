// 负责传递添加新图元的信号

import * as types from '../mutation-types'

const state = {
	// 添加图元信号
  	add:0,

  	// 添加图元类型
  	type:'',
}

const mutations = {
  [types.ADD] (state, type) {
  	state.add++
  	state.type = type
  },
}

export default {
  state,
  mutations
}
