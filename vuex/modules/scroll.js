
//记录滚动的top和left
import * as types from '../mutation-types'

let state = {
  scrollTop:0,
  scrollLeft:0
}

const getters = {
  scrollTop(state) {
    return state.scrollTop
  },
  scrollLeft(state){
    return state.scrollLeft
  }
}


const mutations = {
  [types.SET_SCROLL_TOP](state, scrollTop) {
    state.scrollTop = scrollTop
  },
  [types.SET_SCROLL_LEFT](state, scrollLeft) {
    state.scrollLeft = scrollLeft
  }
}

export default {
  state,
  getters,
  mutations
}