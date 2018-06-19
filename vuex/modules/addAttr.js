import * as types from '../mutation-types'

let state = {
  showPopup:false,
  attrData:[],
  popName:null,
  showConfig:false
}

const getters = {
  showPopup(state) {
    return state.showPopup
  },
  attrData(state){
    return state.attrData
  },
  popName(state){
    return state.popName
  },
  showConfig(state) {
    return state.showConfig
  }
}


const mutations = {
  [types.SET_SHOW_POPUP](state, showPopup) {
    state.showPopup = showPopup
  },
  [types.SET_ATTR_DATA](state, attrData) {
    state.attrData = attrData
  },
  [types.SET_POP_NAME](state, popName) {
    state.popName = popName
  },
  [types.SET_SHOW_CONFIG](state, showConfig) {
    state.showConfig = showConfig
  }
}

export default {
  state,
  getters,
  mutations
}