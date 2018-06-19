// 与 AttributeEditor.vue 组件对应的 store
// 传递属性编辑信号
// TODO：图层分组、线条类型

import * as types from '../mutation-types'

const state = {
  // 左边坐标
  left: 0,

  // 上边坐标
  top:0,

  // 高度
  height:0,

  // 宽度
  width:0,

  // 角度
  angle:0,

  // 长度
  length:0,

  // 半径
  radius:0,

  // 起始角度
  startAngle:0,

  // 终止角度
  endAngle:0,

  // 圆角
  ry:0,
  rx:0,

  // 行高
  lineHeight:0,

  // 字体大小
  fontSize:0,

  // 字符间距
  characterSpace:0,

  // 文本内容
  text:"test",

  // 透明度
  opacity:0,

  // 线条宽度
  strokeWidth:0,

  // 自定义类型
  obrType:"test",

  // 文本对齐方式
  textAlign:"left",

  // 字体
  fontFamily:"yahei",

  // 粗体
  bold:false,

  // 斜体
  italic:false,

  // 下划线
  underline:false,

  // 控制 background
  // 是否显示 grid 和 ruler，网格颜色和背景颜色
  gridVisibility: true,
  rulerVisibility: true,
  gridColor:"#aaaaaa",
  backgroundColor:"#888888",

  // 逻辑上不属于该文件 TODO， 见 background.js
  backgroundHeight: 0,
  backgroundWidth: 0,

  // 线条颜色
  stroke:"#ff0000",

  // 填充色
  fill:"#ff0000",

  // 文本背景色
  textBackgroundColor:"#ff0000",

  // TODO
  // 图层分组
  layer:"1",

  // TODO
  // 线条类型
  strokeDashArray:"solid",

  name:'',

}

const mutations = {
  [types.SET_ATTRIBUTE_LEFT] (state, left) {
  	state.left = left
  },
  [types.SET_ATTRIBUTE_TOP] (state, top) {
    state.top = top
  },
  [types.SET_ATTRIBUTE_HEIGHT] (state, height) {
    state.height = height
  },
  [types.SET_ATTRIBUTE_WIDTH] (state, width) {
    state.width = width
  },
  [types.SET_ATTRIBUTE_ANGLE] (state, angle) {
    state.angle = angle
  },
  [types.SET_ATTRIBUTE_LENGTH] (state, length) {
    state.length = length
  },
  [types.SET_ATTRIBUTE_RADIUS] (state, radius) {
    state.radius = radius
  },
  [types.SET_ATTRIBUTE_START_ANGLE] (state, startAngle) {
    state.startAngle = startAngle
  },
  [types.SET_ATTRIBUTE_END_ANGLE] (state, endAngle) {
    state.endAngle = endAngle
  },
  [types.SET_ATTRIBUTE_RY] (state, ry) {
    state.ry = ry
  },
  [types.SET_ATTRIBUTE_RX] (state, rx) {
    state.rx = rx
  },
  [types.SET_ATTRIBUTE_LINE_HEIGHT] (state, lineHeight) {
    state.lineHeight = lineHeight
  },
  [types.SET_ATTRIBUTE_FONT_SIZE] (state, fontSize) {
    state.fontSize = fontSize
  },
  [types.SET_ATTRIBUTE_CHARACTER_SPACE] (state, characterSpace) {
    state.characterSpace = characterSpace
  },
  [types.SET_ATTRIBUTE_TEXT_CONTENT] (state, text) {
    state.text = text
  },
  [types.SET_ATTRIBUTE_OPACITY] (state, opacity) {
    state.opacity = opacity
  },
  [types.SET_ATTRIBUTE_STROKE_WIDTH] (state, strokeWidth) {
    state.strokeWidth = strokeWidth
  },
  [types.SET_ATTRIBUTE_TYPE] (state, type) {
    state.type = type
  },
  [types.SET_ATTRIBUTE_TEXT_ALIGN] (state, textAlign) {
    state.textAlign = textAlign
  },
  [types.SET_ATTRIBUTE_FONT_FAMILY] (state, fontFamily) {
    state.fontFamily = fontFamily
  },
  [types.SET_ATTRIBUTE_BOLD] (state, bold) {
    state.bold = bold
  },
  [types.SET_ATTRIBUTE_ITALIC] (state, italic) {
    state.italic = italic
  },
  [types.SET_ATTRIBUTE_UNDERLINE] (state, underline) {
    state.underline = underline
  },
  [types.SET_ATTRIBUTE_GRID_VISIBILITY] (state, gridVisibility) {
    state.gridVisibility = gridVisibility
  },
  [types.SET_ATTRIBUTE_RULER_VISIBILITY] (state, rulerVisibility) {
    state.rulerVisibility = rulerVisibility
  },
  [types.SET_ATTRIBUTE_GRID_COLOR] (state, gridColor) {
    state.gridColor = gridColor
  },
  [types.SET_ATTRIBUTE_BACKGROUND_HEIGHT] (state, backgroundHeight) {
    state.backgroundHeight = backgroundHeight
  },
  [types.SET_ATTRIBUTE_BACKGROUND_WIDTH] (state, backgroundWidth) {
    state.backgroundWidth = backgroundWidth
  },
  [types.SET_ATTRIBUTE_BACKGROUND_COLOR] (state, backgroundColor) {
    state.backgroundColor = backgroundColor
  },
  [types.SET_ATTRIBUTE_STROKE] (state, stroke) {
    state.stroke = stroke
  },
  [types.SET_ATTRIBUTE_FILL] (state, fill) {
    state.fill = fill
  },
  [types.SET_ATTRIBUTE_TEXT_BACKGROUND_COLOR] (state, textBackgroundColor) {
    state.textBackgroundColor = textBackgroundColor
  },

  [types.SET_ATTRIBUTE_NAME] (state, name) {
    state.name = name
  },


  [types.SET_ATTRIBUTES] (state, props) {
    for(var prop in props) {
      state[prop] = props[prop]
    }
  },




  // TODO
  [types.SET_ATTRIBUTE_LAYER] (state, layer) {

  },
  [types.SET_ATTRIBUTE_STROKE_DASH_ARRAY] (state, strokeDashArray) {
    state.strokeDashArray=strokeDashArray
  },
  // end TODO
}

export default {
  state,
  mutations
}
