// 负责传递文字编辑信号

import * as types from '../mutation-types'

const state = {
  // 文字加粗
  bold:0,

  // 文字斜体
  italic:0,

  // 文字左对齐
  textLeft:0,

  // 文字居中对齐
  textCenter:0,

  // 文字右对齐
  textRight:0,

  // 文字颜色
  textColor:0,

  // 填充色
  stroke:0,

  // 线条颜色
  lineColor:0,
}

const mutations = {
  [types.TEXT_EDIT_SINGAL] (state, type) {
    state[type]++
  },
}

export default {
  state,
  mutations
}
