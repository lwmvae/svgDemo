// vuex store file for configuration
// 画布的默认配置，只有重新配置的时候才修改

import * as types from '../mutation-types'

const state = {
  // 是否显示 grid 和 ruler
  gridVisibility: true,
  rulerVisibility: true,

  // 网格线条颜色
  gridColor:"#aaaaaa",

  // 画布高度
  canvasHeight: 900,

  // 画布宽度
  canvasWidth: 1200,

  // 背景颜色
  backgroundColor:"#888888",
}

const mutations = {
  [types.UPDATE_CONFIG] (state, option) {
    Object.keys(option).forEach((key) => {
      state[key] = option[key]
    })
  },
}

const getters = {
  // 默认画布配置
  defaultPaletteOption: state => {
    var c = {
      gridVisibility: state.gridVisibility,
      rulerVisibility: state.rulerVisibility,
      gridColor: state.gridColor,
      canvasHeight: state.canvasHeight,
      canvasWidth: state.canvasWidth,
      backgroundColor: state.backgroundColor,
    }
    return c
  },
}

export default {
  state,
  mutations,
  getters,
}
