import * as types from '../mutation-types'

let state = {
  rightShow:false
}

const getters = {
  rightShow(state) {
    return state.rightShow
  }
}


const mutations = {
  [types.SET_RIGHT_SHOW](state, rightShow) {
    state.rightShow = rightShow
  }
}

export default {
  state,
  getters,
  mutations
}