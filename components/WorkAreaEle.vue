<!-- 编辑区域 组件 -->
<!-- 使用 Element 的 Tabs 组件和 iview 的 Modal 组件-->
<!-- Background 组件是自定义组件 -->
<!-- 该组件是绝大部分主要功能的响应者和实现者 -->
<!-- TODO：对于 AttributeEditor.vue 组件动作的响应-->
<!-- TODO：默认下显示 画布的属性 -->
<template>
  <div id="con">
    <el-tabs :value="value" type="card" editable @edit="handleTabsEdit" @tab-click='setActiveTab'>

      <Background :rulerVisibility='rulerVisibility' :gridVisibility='gridVisibility' :gridColor='gridColor' :height='backgroundHeight' :width='backgroundWidth' :zoom='zoom' :hLocation='hLocation' :vLocation='vLocation' :bgcolor='backgroundColor'></Background>
      <el-tab-pane :key="tab.name" v-for="(tab, index) in tabs" :label="tab.fileName + (tab.saved ? '' : '*')" :name="tab.name">
        <div @click.right="rightClick">
          <canvas :id="prefix + tab.name"></canvas>
        </div>
      </el-tab-pane>
    </el-tabs>
    
    <!-- 弹窗 -->
    <Modal v-model="modalSingleSave" :closable='false' :mask-closable='false' title="保存资源">
      <p>已经修改了“{{fileName}}”。要保存更改吗？</p>
      <div slot='footer'>
        <Button  size="large"   @click="hideModalSingleSave">取消</Button>
        <Button  size="large"   @click="handleSingleNoSave">不保存</Button>
        <Button  size="large"   @click="handleSingleSave" type="primary">保存</Button>
      </div>
    </Modal>
    <Modal v-model="modalMultiSave" :closable='false' :mask-closable='false' title="保存资源">
      <p>已经修改了“{{fileName}}”。要保存更改吗？</p>
      <div slot='footer'>
        <Button  size="large"   @click="hideModalMultiSave">取消</Button>
        <Button  size="large"   @click="handleMultiNoSave">不保存</Button>
        <Button  size="large"   @click="handleMultiSave" type="primary">保存</Button>
      </div>
    </Modal>

    <!-- 弹出属性和事件框 -->
    <popup @save="saveValue" @del="del" :title="form.attrTitle">
      <component :is="componentName" :form="form"></component>
    </popup>

    <Configure :form="defaultPaletteOption"></Configure>
    

    <!-- 点击鼠标右键出现 -->
    <div id="rightKey" ref="rightKey">
      <right-key :rightShow="rightShow" @addSomething="showPop"></right-key>
    </div>

  </div>
</template>
<script>
import Background from './Background'
import { mapState,mapGetters,mapMutations } from 'vuex'
import { Container } from '../utils/container/container.js'

import Popup from '../attributes/popup/popup'

//值显示
import Value from '../attributes/value/value'
// 文本动态
import TextDynamics from '../attributes/text/text'
// 长度动态
import Length from '../attributes/length/length'
// 颜色动态
import Color from '../attributes/color/color'
// 可见动态
import Visible from '../attributes/visible/visible'
// 变量映射
import Mapping from '../attributes/mapping/mapping'
// SET
import Set from '../events/set/set'
// SETDYNA
import Setdyna from '../events/setdyna/setdyna'
// ADD
import Add from '../events/add/add'
// GO
import Go from '../events/go/go'
//OPEN
import Open from '../events/open/open'

import RightKey from './RightKey'

import { encodeUnicode } from '../utils/container/canvas-list/transcoding'

import Configure from './Configure'

// @func function：经过 Function.prototype.bind 显示绑定 this 的函数
// 延迟 300ms 处理
function defer(func) {
  setTimeout(func, 300)
}

export default {
  name: 'workareaele',

  components: {
    Background,
    Popup,
    Value,
    TextDynamics,
    Length,
    Color,
    Mapping,
    Visible,
    Set,
    Setdyna,
    Add,
    Go,
    Open,
    RightKey,
    Configure
  },

  data: function() {
    // body...
    return {
      // tabs 数组存储的对象结构
      // {
      //         // 表示选项卡别名，详见 Element 的 Tabs 组件文档
      //         name:name,

      //         // 值为 false 时，标示会被删除的 tab
      //         visible:true,

      //         // 指示文件是否保存，决定文件名上 * 号的显示
      //         saved:true,

      //         // 所编辑文件的文件名
      //         fileName:fileName,

      //         // 所编辑文件处在的文件夹
      //         dir:null,

      //         // 唯一，与 container 中的 id 对应
      //         id:fileName,
      // }        
      tabs:[],

      // id 后缀
      num:0,

      // prefix + tab.id 是container中canvas和file的唯一标识
      prefix:'tab',

      // 指示当前 active 的 tab，详见 Element 的 Tabs 组件文档
      value:'',

      // modals 详见 iview Modal 组件文档
      modalSingleSave:false,
      modalMultiSave:false,
      fileName:'',

      // 在批量关闭 tab 的时候，记录初始activeTab
      beginTab:null,

      // 水平与垂直标尺 指示器（黑色小三角）的位置
      hLocation:0,
      vLocation:0,

      // 获取点击id
      getId:'',
      // 获取弹出框name
      componentName:'',
      // 定义弹出框内容数据
      form:{},
      // 初始化弹出框
      formStyle:{
        'Value':{
          attrTitle:'值显示',
          name:'',
          type:''
        },
        'TextDynamics':{
          attrTitle:'文本动态',
          name: '',
          value:[{choose:true,min:'',max:'',text:''}]
        },
        'Color':{
          attrTitle:'颜色动态',
          name: '',
          radio:'1',
          value:[{
            choose:true,
            min:'',
            max:'',
            twinkle:false,
            color1:'#409EFF',
            color2:'#FF0000'
          }]
        },
        'Length':{
          attrTitle:'长度动态',
          name:'',
          attr:'',
          dfval:'',
          upperLimit:'',
          lowerLimit:''
        },
        'Mapping':{
          attrTitle:'变量映射',
          value:[{choose:true,oldVal:'',newVal:''}]
        },
        'Visible':{
          attrTitle:'可见动态',
          name: '',
          value:[{
            choose:true,
            min:'',
            max:'',
            val:''
          }]          
        },
        'Set':{
          attrTitle:'SET',
          type:'',
          name: '',
          value: ''
        },
        'Setdyna':{
          attrTitle:'SETDYNA',
          type:'',
          name: '',
          value:[{choose:true,min:'',max:'',evaluate:''}]
        },
        'Add':{
          attrTitle:'ADD',
          type:'',
          name: '',
          value: '',
          addOrde:'0',
          toplimit:''
        },
        'Go':{
          attrTitle:'GO',
          type:'',
          name: ''
        },
        'Open':{
          attrTitle:'OPEN',
          type:'',
          wType:'',
          index:'',
          param:'',
          X:0,
          Y:0,
          mType:'',
          checked:false,
          color: '#20a0ff',
          name: '',  
        }
      }

    }
  },
  methods:{
    showPop(e){
      this.addpop(e,this.shapeName) 
    },  
    rightClick(e){
      this.setRightShow(true);
      let x=e.pageX-145;
      let y=e.pageY-110;
      // console.log(this.$refs.rightKey)
      this.$refs.rightKey.style.cssText =`top:${y}px;left:${x}px`
      // console.log('x:'+x,'y:'+y);
    },
    // 点击弹出框 保存 按钮，保存数据
    saveValue(){
      this.form.attrTitle=encodeUnicode(this.form.attrTitle)
      // console.log(this.form);
      this.container.addAttr(this.getId,this.componentName,this.form);
      this.setAttrData(this.container.getSaveAttr(this.getId))
      this.form={}
    },
    // 点击弹出框 删除 按钮，删除数据
    del(){
      this.container.delAttr(this.getId,this.componentName)
      // console.log(this.container.getSaveAttr(this.getId))
      this.setAttrData(this.container.getSaveAttr(this.getId))
    },
    // 调出弹出框时，调用的函数
    addpop(name,id){
      this.setShow(true);
      this.componentName=name;
      this.getId=id;
      // console.log(this.container.getSaveAttr(id))
      this.setAttrData(this.container.getSaveAttr(id))

      var getForm=this.container.obtainAttr(id,name)

      if(Object.getOwnPropertyNames(getForm).length){
        this.form=this.container.obtainAttr(id,name)
      }else{
        this.form=this.deepCopy(this.formStyle[name])
        // console.log(this.form);
      }
    },
    // 深拷贝，防止原对象被赋值
    deepCopy(obj1,obj2){
      var obj2=obj2||{}; 
      for(var name in obj1){
        if(typeof obj1[name] === "object"){ 
          obj2[name]= (obj1[name].constructor===Array)?[]:{}; 
          this.deepCopy(obj1[name],obj2[name]); 
        }else{
          obj2[name]=obj1[name];  
        }
      }
      return obj2; 
    },





    // 删除 visible 标记为 false 的 tab
    removeInvisible() {
      this.tabs = this.tabs.filter(tab => tab.visible === true) 
    },

    // @name string
    // 返回相应的 tabs 数组中的 tab
    tabByName(name) {
      var t = this.tabs.find(tab => tab.name === name)
      return t
    },

    // edit 事件处理函数，详见 Element 的 Tabs 组件文档
    handleTabsEdit(targetName, action) {
      if(action === 'add') {
        this.addTab()
      }
      if(action === 'remove') {
        var t = this.tabByName(targetName)
        if (t.saved) {
          this.removeTab(t)
        } else {
          this.setActiveTab(t)
          this.showModalSingleSave()
        }
      }
    },

    // @tab object，data.tabs数组中的对象
    // 在批量关闭时，以传入 tab 为起点，确定下一个 active tab
    setNextTab(tab) {
      var tabs = this.tabs
      var i = tabs.indexOf(tab)
      var next = tabs[i - 1] || tabs[i + 1]
      if(next) {
        this.setActiveTab(next)
      } else {
        this.addTab()
      }
    },

    // @options {
    //   visible, 
    //   saved,
    //   fileName,
    //   dir,
    // }
    // 在 data.tabs 数组中更新当前 active tab      
    updateActiveTab(options) {
      var cur = this.activeTab
      cur.visible = options.visible === undefined ? cur.visible : options.visible
      cur.saved = options.saved === undefined ? cur.saved : options.saved
      cur.fileName = options.fileName === undefined ? cur.fileName : options.fileName
      cur.dir = options.dir === undefined ? cur.dir : options.dir
    },

    // 初始化 tab 
    // 初始化 UI 和 背后数据
    initTab() {
      var name = String(this.num)
      var fileName = this.prefix+name
      this.tabs.push({
        // tab 标示

        // 表示选项卡别名，详见 Element 的 Tabs 组件文档
        name:name,

        // 值为 false 时，标示会被删除的 tab
        visible:true,

        // 指示文件是否保存，决定文件名上 * 号的显示
        saved:true,

        // 所编辑文件的文件名
        fileName:fileName,

        // 所编辑文件处在的文件夹
        dir:null,

        // 唯一，与 container 中的 id 对应
        id:fileName,
      });
      this.$nextTick(function() {
        var id = this.prefix+this.num
        this.container.add(id)
        this.num++
      })
    },

    // 新添加一个 tab
    addTab() {
      this.initTab()
      this.$nextTick(function() {
        this.setLastActive()
        this.container.initHistory()
      })
    },

    // @tab 的可能值 1. data.tabs 数组中的某个 entry
    //               2. element-ui 中的组件 el-tab-pane
    // 均包含 'name' property
    // 设定传入的 tab 为 active tab
    setActiveTab(tab) {
      this.container.setCurrent(this.prefix + tab.name)
      this.value = tab.name

      // TODO:更新status bar
    },

    // 将 data.tabs 数组中最后一个 tab 设定为 active tab
    setLastActive() {
      var last = this.tabs[this.tabs.length - 1]
      this.setActiveTab(last)
    },

    // 返回 data.tabs 数组中最后一个 tab 的 id
    idOfLastTab() {
      var last = this.tabs[this.tabs.length - 1]
      return last.id
    },

    // @tab  data.tabs 数组中的某个 entry
    // 删除传入的 tab
    removeTab(tab) {
      // TODO:在container中处理
      tab.visible = false
      if (tab.name === this.value) {
        this.setNextTab(tab)
      }
      this.removeInvisible()
    },

    // 关闭单个未保存文件时，显示 Modal
    showModalSingleSave() {
      this.fileName = this.activeTab.fileName
      this.modalSingleSave = true
    },

    // 关闭 Modal
    hideModalSingleSave() {
      this.modalSingleSave = false
    },

    // 关闭单个文件，弹出 Modal 组件，点击 保存 按钮的 handler
    handleSingleSave() {
      this.container.save()
      this.removeTab(this.activeTab)
      this.hideModalSingleSave()
    },

    // 关闭单个文件，弹出 Modal 组件，点击 不保存 按钮的 handler
    handleSingleNoSave() {
      this.removeTab(this.activeTab)
      this.hideModalSingleSave()
    },

    // 批量关闭未保存文件时，显示 Modal
    showModalMultiSave() {
      this.fileName = this.activeTab.fileName
      this.modalMultiSave = true
    },

    // 关闭 Modal
    hideModalMultiSave() {
      this.modalMultiSave = false
    },

    // 批量关闭文件时，弹出 Modal 组件，点击 保存 按钮的 handler
    handleMultiSave() {
      this.container.save()
      this.continueRemove()
    },

    // 批量关闭文件时，弹出 Modal 组件，点击 不保存 按钮的 handler
    handleMultiNoSave() {
      this.continueRemove()
    },

    // 批量关闭的中间过程
    continueRemove() {
      if(this.tabs.length > 1) {
        this.$nextTick(function() {
          this.closeRestTabs()
        })
      }
      this.hideModalMultiSave()
      this.removeTab(this.activeTab)         
    },

    // 批量关闭的中间过程
    closeRestTabs() {
      setTimeout(this.closeActiveTab, 500)
    },

    // 批量关闭的中间过程
    closeActiveTab() {    
      var a = this.activeTab
      if(!a.saved) {
        this.showModalMultiSave()
      } else {
        this.continueRemove()
      }
    },

    // 保存当前 activeTab
    saveActiveTab() {
      if (!this.activeTab.saved) {
        var meta = this.container.save()
        if (meta) {
          this.updateActiveTab({
            // saved: true,
            dir: meta.dir,
            fileName: meta.name,
          })
        }
      }
    },

    // 批量保存的中间过程，确定下一个 tab
    nextTab() {
      var i = this.tabs.indexOf(this.activeTab)
      var n = i + 1
      if(n < this.tabs.length) {
        return this.tabs[n]
      } else {
        return null
      }
    },

    // 批量保存的中间过程，记录批量保存开始前的 activeTab
    markBeginTab() {
      this.beginTab = this.activeTab
    },

    // 批量保存
    saveAllTabs() {
      this.markBeginTab()
      this.setActiveTab(this.tabs[0])
      setTimeout(this.continueSave, 500)
    },

    // 批量保存的中间过程
    continueSave() {
      this.saveActiveTab()
      var next = this.nextTab()
      if(next !== null) {
        this.setActiveTab(next)
        setTimeout(this.continueSave, 500)
      } else {
        this.setActiveTab(this.beginTab)
      }
    },

    ...mapMutations({
      setShow:'SET_SHOW_POPUP',
      setAttrData:'SET_ATTR_DATA',
      setRightShow:'SET_RIGHT_SHOW',
      setShowConfig:'SET_SHOW_CONFIG'
    })

  },

  mounted:function() {
    // 初始化
    // 将 container 挂载到 this 上，再新建一个 tab
    this.container = new Container(this, this.prefix)
    this.addTab()
  },

  beforeUpdate:function() {
  },

  updated: function() {
  },

  computed: {
    // 返回当前的 activeTab
    activeTab:function() {
      var t = this.tabs.find(tab => tab.name === this.value)
      return t
    },

    // 子组件，详见 Element Tabs 组件文档
    child:function() {
      return this.$children[0]
    },

    // 从 store 传来的信号
    ...mapState({

      add: state=>state.component.add, 
      type: state=>state.component.type,

      saveStatus: state=>state.save.saveStatus,
      saveStatusSignal: state=>state.save.saveStatusSignal,



      left: state=>state.attributes.left,
      top: state=>state.attributes.top,
      height: state=>state.attributes.height,
      width: state=>state.attributes.width,
      angle: state=>state.attributes.angle,
      length: state=>state.attributes.length,
      radius: state=>state.attributes.radius,
      startAngle: state=>state.attributes.startAngle,
      endAngle: state=>state.attributes.endAngle,
      ry: state=>state.attributes.ry,
      rx: state=>state.attributes.rx,
      lineHeight: state=>state.attributes.lineHeight,
      fontSize: state=>state.attributes.fontSize,
      characterSpace: state=>state.attributes.characterSpace,
      textContent: state=>state.attributes.textContent,
      opacity: state=>state.attributes.opacity,
      strokeWidth: state=>state.attributes.strokeWidth,
      obrType: state=>state.attributes.obrType,
      textAlign: state=>state.attributes.textAlign,
      fontFamily: state=>state.attributes.fontFamily,
      bold: state=>state.attributes.bold,
      italic: state=>state.attributes.italic,
      underline: state=>state.attributes.underline,
      gridVisibility: state=>state.attributes.gridVisibility,
      rulerVisibility: state=>state.attributes.rulerVisibility,
      gridColor: state=>state.attributes.gridColor,
      backgroundColor: state=>state.attributes.backgroundColor,
      stroke: state=>state.attributes.stroke,
      fill: state=>state.attributes.fill,
      textBackgroundColor: state=>state.attributes.textBackgroundColor,
      layer: state=>state.attributes.layer,
      strokeDashArray: state=>state.attributes.strokeDashArray,
      shapeName: state=>state.attributes.name,





      backgroundHeight: state=>state.background.backgroundHeight,
      backgroundWidth: state=>state.background.backgroundWidth,
      zoom: state=>state.background.zoom,




      new: state=>state.file.new,
      open: state=>state.file.open,
      save: state=>state.file.save,
      saveAll: state=>state.file.saveAll,
      saveAs: state=>state.file.saveAs,
      rename: state=>state.file.rename,
      close: state=>state.file.close,
      closeAll: state=>state.file.closeAll,
      config: state=>state.file.config,



      undo: state=>state.edit.undo,
      redo: state=>state.edit.redo,
      cut: state=>state.edit.cut,
      copy: state=>state.edit.copy,
      paste: state=>state.edit.paste,
      delete: state=>state.edit.delete,
      selectAll: state=>state.edit.selectAll,
      selectRest: state=>state.edit.selectRest,




      zoomIn: state=>state.scene.zoomIn,
      zoomOut: state=>state.scene.zoomOut,
      zoomOri: state=>state.scene.zoomOri,


      arrangeSignal: state => state.arrange.signal,
      arrangeType: state => state.arrange.type,


      defaultGridVisibility: state => state.config.gridVisibility,
      defaultRulerVisibility: state => state.config.rulerVisibility,
      defaultGridColor: state => state.config.gridColor,
      defaultCanvasHeight: state => state.config.canvasHeight,
      defaultCanvasWidth: state => state.config.canvasWidth,
      defaultBackgroundColor: state => state.config.backgroundColor,

      treeTitle: state => state.tree.treeTitle
    }),

    // 画布的默认属性，见 config.js 
    defaultPaletteOption: function() {
      return this.$store.getters.defaultPaletteOption
    },
    ...mapGetters(['rightShow','popName','defaultPaletteOption','showConfig'])

  },
  watch: {
    //双击属性弹出弹出框
    popName(newVal){
      this.showPop(newVal)
    },
    // 响应 ComponentSelector.vue 组件的动作
    // 在画布中新添一个图元，图元类型由 this.type 决定
    add: function() {
      var f = (function() {
        this.container.addShape(this.type)
      }).bind(this)
      if (this.type === 'Image') {
        defer(f)
      } else {
        f()
      }
    },


    // 更新 activeTab 的保存状态
    saveStatusSignal: function() {
      this.updateActiveTab({
        saved: this.saveStatus,
      })
      this.container.updateSaveStatus(this.saveStatus)
    },


    // 响应 AttributeEditor.vue 组件的动作
    // TODO
    left: function() {
      this.container.setAttribute("left", this.left)
    },
    top: function() {
      this.container.setAttribute("top", this.top)
    },
    height: function() {
      // this.container.setAttribute("height",this.height)
    },
    width: function() {
      // this.container.setAttribute("width", this.width)
    },
    angle: function() {
      this.container.setAttribute("angle", this.angle)
    },
    length: function() {
      this.container.setAttribute("length", this.length)
    },
    radius: function() {
      this.container.setAttribute("radius", this.radius)
    },
    startAngle: function() {
      this.container.setAttribute("startAngle", this.startAngle)
    },
    endAngle: function() {
      this.container.setAttribute("endAngle", this.endAngle)
    },
    ry: function() {
      this.container.setAttribute("ry", this.ry)
    },
    rx: function() {
      this.container.setAttribute("rx", this.rx)
    },
    lineHeight: function() {
      this.container.setAttribute("lineHeight", this.top)
    },
    fontSize: function() {
      this.container.setAttribute("fontSize", this.top)
    },
    characterSpace: function() {
      this.container.setAttribute("characterSpace", this.characterSpace)
    },
    text: function() {
      this.container.setAttribute("text", this.text)
    },
    opacity: function() {
      this.container.setAttribute("opacity", this.opacity)
    },
    strokeWidth: function() {
      this.container.setAttribute("strokeWidth", this.strokeWidth)
    },
    // obrType: function() {
    //   this.container.setAttribute("obrType", this.obrType)
    // },
    textAlign: function() {
      this.container.setAttribute("textAlign", this.textAlign)
    },
    fontFamily: function() {
      this.container.setAttribute("fontFamily", this.fontFamily)
    },
    bold: function() {
      this.container.setAttribute("bold", this.bold)
    },
    italic: function() {
      this.container.setAttribute("italic", this.italic)
    },
    underline: function() {
      this.container.setAttribute("underline", this.underline)
    },
    grid: function() {
      this.container.setAttribute("grid", this.grid)
    },
    ruler: function() {
      this.container.setAttribute("ruler", this.ruler)
    },
    gridColor: function() {
      this.container.setAttribute("gridColor", this.gridColor)
    },
    backgroundColor: function() {
      this.container.setAttribute("backgroundColor", this.backgroundColor)
    },
    stroke: function() {
      this.container.setAttribute("stroke", this.stroke)
    },
    fill: function() {
      this.container.setAttribute("fill", this.fill)
    },
    textBackgroundColor: function() {
      this.container.setAttribute("textBackgroundColor", this.textBackgroundColor)
    },
    layer: function() {
      this.container.setAttribute("layer", this.layer)
    },
    strokeDashArray: function() {
      this.container.setAttribute("strokeDashArray", this.strokeDashArray)
    },
    


    // 响应 File.vue 组件的动作
    // 新建
    new:function() {
      this.addTab()
    },
    // 打开
    open:function() {
      this.initTab()

      // this.$nextTick(function() {
      //   var id = this.idOfLastTab()
      //   var meta = this.container.open(id)
      //   this.setLastActive()
      //   if (meta) {
      //     this.updateActiveTab({
      //       fileName: meta.name,
      //       dir: meta.dir,
      //     })

      //     // TODO:设置状态栏的路径
      //   } else {
      //     this.child.$emit("edit", this.activeTab.name, 'remove')
      //   }
      //   this.container.initHistory()
      // })
      var f = function() {
        var id = this.idOfLastTab()
        var meta = this.container.open(id)
        this.setLastActive()
        if (meta) {
          this.updateActiveTab({
            fileName: meta.name,
            dir: meta.dir,
          })
          // TODO:设置状态栏的路径

        } else {
          this.child.$emit("edit", this.activeTab.name, 'remove')
        }
        this.container.initHistory()
      }
      defer(f.bind(this))
    },
    // 保存
    save:function() {
      defer(this.saveActiveTab.bind(this))
    },
    // 全部保存
    saveAll:function() {
      this.saveAllTabs()
    },
    // 另存为
    saveAs:function() {
      // var meta = this.container.saveAs()
      // if(meta !== null) {
      //   this.updateActiveTab({
      //     saved: true,
      //     dir: meta.dir,
      //     fileName: meta.name,
      //   })
      // }
      var f = function() {
        var meta = this.container.saveAs()
        if(meta !== null) {
          this.updateActiveTab({
            saved: true,
            dir: meta.dir,
            fileName: meta.name,
          })
        }
      }
      defer(f.bind(this))
    },
    // 关闭当前 activeTab
    close:function() {
      this.child.$emit('edit', this.activeTab.name, 'remove')
    },
    // 关闭所有
    closeAll:function() {
      this.closeRestTabs()
    },

    config(){
      this.setShowConfig(true)
    },



    // 响应 Edit.vue 组件的动作
    // 取消上次操作
    undo:function() {
      this.container.undo()
    },
    // 恢复上次操作
    redo:function() {
      this.container.redo()
    },
    // 剪切
    cut:function() {
      this.container.cut()
    },
    // 拷贝
    copy:function() {
      this.container.copy()
    },
    // 粘贴
    paste:function() {
      this.container.paste()
    },
    // 删除
    delete:function() {
      this.container.delete()
    },
    // 全部选中
    selectAll:function() {
      this.container.selectAll()            
    },
    // 反向选中
    selectRest:function() {
      this.container.selectRest()
    },


    // 响应 Scene.vue 组件的动作
    // 网格和标尺的可见性是直接绑定在 Background.vue 组件上的
    // 更新网格可见性
    gridVisibility:function() {
      this.container.setGridVisibility(this.gridVisibility)
    },
    // 更新标尺可见性
    rulerVisibility:function() {
      this.container.setRulerVisibility(this.rulerVisibility)
    },
    // 放大
    zoomIn:function() {
      this.container.zoomIn()
    },
    // 缩小
    zoomOut:function() {
      this.container.zoomOut()
    },
    //原始尺寸
    zoomOri:function() {
      this.container.zoomOri()
    },



    // 响应 Arrange.vue 组件的动作
    // 更新选中对象的位置，更新的类型由 this.arrangeType 决定
    arrangeSignal: function() {
      this.container.posUpdate(this.arrangeType)
    },

    treeTitle(newVal){
      this.container.activeShape(newVal)
    }
  },
}
</script>
<style >
#con{
  position: relative;
}
#rightKey{
  background-color: #fff;
  position: absolute;
}
.none {
  display: none;
}
#y-ruler{
  background-color: #545151;
}
.el-tab-pane {
  position: absolute;
  left: 22px;
  top: 22px;
}
.el-tabs__item{
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable{
  padding:0 10px;
}
</style>

