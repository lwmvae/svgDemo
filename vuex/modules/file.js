// vuex store file for File.vue component
// 负责传递文件相关信号

import * as types from '../mutation-types'

const state = {
  // 新建
  new:0,

  // 打开
  open:0,

  // 保存
  save:0,

  // 全部保存
  saveAll:0,

  // 另存为
  saveAs:0,

  // 关闭
  close:0,

  // 全部关闭
  closeAll:0,

  // 配置
  config:0,
}

const mutations = {
  [types.FILE_SIGNAL] (state, type) {
    state[type]++
  },
}

export default {
  state,
  mutations
}
