// 负责传递添加新图元的序号

import * as types from '../mutation-types'

const state = {
	rect:0,
  triangle:0,
  line:0,
  circle:0,
  ellipse:0,
  iText:0,
  sector:0,
  curve:0,
  polygon:0,
  polyline:0,
  image:0,
  group:0
}

const mutations = {
  [types.ADDNUM] (state, type) {
  	state[type]++
  },
}

export default {
  state,
  mutations
}
