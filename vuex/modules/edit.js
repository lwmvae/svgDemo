// vuex store file for Edit.vue component
// 负责传递编辑信号

import * as types from '../mutation-types'

const state = {
  // 取消上次操作
  undo:0,

  // 恢复上次操作
  redo:0,

  // 剪切
  cut:0,

  // 拷贝
  copy:0,

  // 粘贴
  paste:0,

  // 删除
  delete:0,

  // 全部选中
  selectAll:0,

  // 反向选中
  selectRest:0,
}

const mutations = {
  [types.EDIT_SIGNAL] (state, type) {
    state[type]++
  },
}

export default {
  state,
  mutations
}
