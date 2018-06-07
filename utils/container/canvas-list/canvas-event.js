// 在 fabric canvas 对象上注册事件响应函数

import * as visibility from './form-setting'
import { customizeGroup } from './custom'
import { utils } from '../../utils'
import { getCommitProps } from './palette'
import {decodeUnicode} from './transcoding'




// @canvas object：fabric.Canvas 实例
// @return boolean
// 判断 canvas 上是否有被选中的对象
// 若 canvas 上没有对象被选中则返回 true，否则返回 false
function hasNoActive(canvas) {
  var objs = canvas.getObjects();
  for (var i = 0; i < objs.length; i++) {
    if (objs[i].active === true) {
      return false; 
    } 
  }
  return true;
}

// @canvas object：fabric.Canvas 实例
// @vueInstance object: WorkAreaEle 组件的实例
// 声明 event handler，然后注册
var registerEvent = function (canvas, vueInstance) {

  // 指向 WorkAreaEle 的 this
  var __that = vueInstance

  // canvas 上对象移动的响应函数
  var objectMovingHandler = function (e) {
    var props = {
      left:e.target.left,
      top:e.target.top,
    }
    __that.$store.commit("SET_ATTRIBUTES", props)
  }

  // 处理数据
  var attrData=function(obj){
    if(obj){
      if(JSON.stringify(obj) == "{}"){
        return []
      }else{
        let arr=[];
        for(var k in obj){
          let o={};
          o.attrTitle=decodeUnicode(obj[k].attrTitle);
          o.name=obj[k].name;
          arr.push(o)
        }
        return arr;
      }
    }else{
      return []
    }
  }

  // canvas 上对象选中的响应函数
  var objectSelectedHandler = function(e) {

    var t = e.target
    // console.log(t)
    if (t.type === 'group') {
      customizeGroup(t)
    }
    var treeTitle=t.name
    var ops = visibility[t.obrType]
    var props = utils.copy(t, ops)
    var obj=canvas.owner.saveAttr.addAttr[t.name]

    __that.$store.commit("SET_TREE_TITLE", treeTitle)
    __that.$store.commit("SET_FORM_ITEMS_VISIBILITY", ops)
    __that.$store.commit("SET_ATTRIBUTES", props)
    __that.$store.commit("SET_ATTR_DATA", attrData(obj))

  }


  // 记录 操作记录 
  var recordHistory = function(e) {
    var c = e.target.canvas
    var h = c.owner.history
    if (h !== undefined) {   
      var s = JSON.stringify(c)
      h.add(s)
    }
  }

  // canvas 上鼠标移动事件响应
  var mouseMoveHandler = function(e) {
    __that.hLocation = e.e.layerX
    __that.vLocation = e.e.layerY
  }

  // hack，before:selection:cleared 事件才能获得事件发生的 fabric.Canvas 实例
  // 而 selection:cleared 无法获得
  // before:selection:cleared 事件响应函数
  var beforeSelectionClearedHandler = function(e) {
    var c = e.target.canvas
    var p = c.owner
    setTimeout(function() {
      if (hasNoActive(c)) {
        var ops = visibility['canvas']
        var props = getCommitProps(p)
        __that.$store.commit("SET_FORM_ITEMS_VISIBILITY", ops)
        __that.$store.commit("SET_ATTRIBUTES", props)
        __that.$store.commit('SET_ATTR_DATA',[])
        __that.$store.commit('SET_TREE_TITLE','暂无内容')
      }
    }, 1)
  }

  // 注册事件
  canvas.on({
    "object:moving":objectMovingHandler,
    "object:selected":objectSelectedHandler,
    "object:modified":recordHistory,
    "object:removed":recordHistory,
    "mouse:move":mouseMoveHandler,
    "before:selection:cleared":beforeSelectionClearedHandler,
  })
}

export { 
  registerEvent,
  hasNoActive,
}