// vuex store file for Scene.vue component
// 负责传递缩放信号
import * as types from '../mutation-types'

const state = {
  // 放大
  zoomIn:0,

  // 缩小
  zoomOut:0,

  //原始尺寸
  zoomOri:0
}

const mutations = {
  [types.SCENE_SIGNAL] (state, type) {
    state[type]++
  },
}

export default {
  state,
  mutations
}
