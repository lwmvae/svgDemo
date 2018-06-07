// control visibility of attribute-editor form-items
// 负责控制 AttributeEditor 组件中 form-items 的显示

import * as types from '../mutation-types'

const state = {
  // 左边坐标编辑框
  left: false,

  // 上边坐标编辑框
  top:false,

  // 高度编辑框
  height:false,

  // 宽度编辑框
  width:false,

  // 角度编辑框
  angle:false,

  // 长度编辑框
  length:false,

  // 半径编辑框
  radius:false,

  // 起始角度编辑框
  startAngle:false,

  // 终止角度编辑框
  endAngle:false,

  // TODO：圆角半径编辑框
  ry:false,
  rx:false,

  // 行高编辑框
  lineHeight:false,

  // 字体大小编辑框
  fontSize:false,

  // 字符间距编辑框
  characterSpace:false,

  // 文本内容编辑框
  textContent:false,

  // 透明度编辑框
  opacity:false,

  // 线条宽度编辑框
  strokeWidth:false,

  // 自定义类型编辑框
  obrType:false,

  // 文本对齐编辑框
  textAlign:false,

  // 字体编辑框
  fontFamily:false,

  // 粗体编辑框
  bold:false,

  // 斜体编辑框
  italic:false,

  // 下划线编辑框
  underline:false,

  // 网格显示编辑框
  grid:false,

  // 标尺显示编辑框
  ruler:false,

  // 网格颜色编辑框
  gridColor:false,

  // 背景颜色编辑框
  backgroundColor:false,

  // 线条颜色编辑框
  stroke:false,

  // 填充色编辑框
  fill:false,

  // 文本背景色编辑框
  textBackgroundColor:false,

  // 图层分组编辑框
  layer:false,

  // 线条类型编辑框
  strokeDashArray:false,

  name:true,
  

  //右键菜单操作控制
  copy:true,
  paste:true,
  Value:true,
  TextDynamics:true,
  Length:true,
  Color:true,
  Visible:true,
  Mapping:true,
  Set:true,
  Setdyna:true,
  Add:true,
  Go:true,
  Open:true,
  leftAlign:true,
  horizontalAlign:true,
  rightAlign:true,
  topAlign:true,
  verticalAlign:true,
  bottomAlign:true,
  toFront:true,
  moveUp:true,
  moveDown:true,
  toBottom:true,
  group:true,
  ungroup:true
}

const mutations = {
  [types.SET_FORM_ITEMS_VISIBILITY] (state, setting) {
    var v = Object.keys(setting)
    for (var i = 0; i < v.length; i++) {
      state[v[i]] = setting[v[i]]
    }
  },
}

export default {
  state,
  mutations
}
