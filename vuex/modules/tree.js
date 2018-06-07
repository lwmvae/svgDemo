// 负责记录tree的结构

import * as types from '../mutation-types'

const state = {
  treeTitle:'暂无内容',
	tree:[]
}

const getters = {
  treeTitle(state) {
    return state.treeTitle
  },
  treeList(state) {
    return state.tree
  }
}

const mutations = {
  [types.SET_TREE_TITLE] (state, treeTitle) {
  	state.treeTitle=treeTitle
  },
  [types.SET_TREE] (state, tree) {
    state.tree=tree
  }
}

export default {
  state,
  getters,
  mutations
}
