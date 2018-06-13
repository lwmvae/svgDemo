<template>
  <div id="app" @click="rightKeyHide">
    <MainMenu></MainMenu>
    <ToolBar></ToolBar>
    <div id="content" :style="contentStyle">
      <div id="component">
        <component-selector></component-selector>
      </div>
      <div id="work-area">
        <WorkAreaEle></WorkAreaEle>
      </div>
      <div id="editor">
        <attribute-editor></attribute-editor>
      </div>
    </div>
    <div id="status-bar"></div>
  </div>
</template>
<script>
import ComponentSelector from './components/ComponentSelector'
import AttributeEditor from './components/AttributeEditor'
import WorkAreaEle from './components/WorkAreaEle'
import MainMenu from './components/MainMenu'
import ToolBar from './components/ToolBar'

import {mapMutations} from 'vuex'

// 以下两个函数是布局用的，但是应使用 纯CSS来布局
// "el-tabs__content" class 的 height 撑满 "el-tabs" 的剩余部分
var extendHeight = function(element) {
  let e = element
  let parent = e.parentElement
  let pre = e.previousElementSibling
  let height = parent.getBoundingClientRect().height - pre.getBoundingClientRect().height
  e.style.height = `${height}px`
}

var adjustContentHeight = function() {
  let eleContent = document.querySelector(".el-tabs__content")
  extendHeight(eleContent)
}



// 根据 ID 返回元素的尺寸
var boundingRectById = function(id) {
  let e = document.querySelector(id)
  return e.getBoundingClientRect()
}

export default {
  name: 'app',
  components: {
    ComponentSelector,
    AttributeEditor,
    WorkAreaEle,
    MainMenu,
    ToolBar,
  },
  data: function() {
    // body...
    return {
      contentHeight: 838,
      workAreaWidth: 1266,
    }
  },
  computed:{
    contentStyle() {
      let style = {};
      style['height'] = `${this.contentHeight}px`
      return style
    },
  },
  methods:{
    adjustLayout() {
      this.contentHeight = window.innerHeight - boundingRectById('#content').top - boundingRectById('#status-bar').height
    },
    rightKeyHide(){
      this.setRightShow(false)
    },
    ...mapMutations({
      setRightShow:'SET_RIGHT_SHOW'
    })
  },
  mounted:function() {
    // 初始化事件响应
    window.addEventListener("load", this.adjustLayout)
    window.addEventListener("load", adjustContentHeight)
    window.addEventListener("resize", this.adjustLayout)
    window.addEventListener("resize", adjustContentHeight)
  },
}
</script>
<style>
#app {
  overflow: hidden;
  background-color: #eee;
}
#content {
  overflow: hidden;
  display: flex;
}
#component {
  width: 146px;
}
#work-area{
  flex: 1;
}
#editor {
  width: 168px;
  background-color: #fff;
  margin-left: 5px;
  /*border-left: 1px solid #d0c7c7;
  border-top: 1px solid #d0c7c7;*/
  margin-top: 30px;
}
#work-area > div, #work-area > * > .el-tabs--card {
  height: 100%;
}
#status-bar {
  border: 1px solid #d0c7c7;
  height: 20px;
}

/*.ivu-btn {
  background-color: #eee;
}

.ivu-collapse {
  background-color: #eee;
}

.ivu-collapse-content {
  background-color: #eee;
}

.is-active {
  background-color: #fff;
}

.ivu-form-item {
  margin-bottom: 1px;
  border-bottom: 1px solid #d0c7c7;
}

.ivu-form {
  padding-left: 3px;
}*/





/*.ivu-form-item-content > *:first-child {
  border-left: 1px solid #d0c7c7;
}

.ivu-form-item-label {
  margin-top: 6px;
}

.ivu-form .ivu-form-item-label {
  padding: 0px;
}

.ivu-form-item-content {
  line-height: normal;
}*/
</style>
