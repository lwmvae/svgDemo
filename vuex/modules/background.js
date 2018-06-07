// 传递背景变化的信号（部分）
// 部分 background 相关的属性 见 attributes.js

import * as types from '../mutation-types'

const state = {
  // 背景高度
  backgroundHeight: 300,

  // 背景宽度
  backgroundWidth: 400,

  // 缩放倍数
  zoom: 1,
}

const mutations = {
  [types.SET_BACKGROUND_HEIGHT] (state, backgroundHeight) {
    state.backgroundHeight = backgroundHeight
  },
  [types.SET_BACKGROUND_WIDTH] (state, backgroundWidth) {
    state.backgroundWidth = backgroundWidth
  },
  [types.SET_BACKGROUND_ZOOM] (state, zoom) {
    state.zoom = zoom
  },
}

export default {
  state,
  mutations
}
