// 负责传递文字编辑信号

import * as types from '../mutation-types'

const state = {
  // 文字加粗
  textBold:0,

  // 文字斜体
  textItalic:0,

  // 文字左对齐
  textLeft:0,

  // 文字居中对齐
  textCenter:0,

  // 文字右对齐
  textRight:0,

  // 文字背景颜色
  textbgColor:0,

  // 文字填充色
  textStroke:0,

  // 文字线条颜色
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
