<!-- 属性编辑 组件 -->
<!-- 使用了 iview 的 Form、Input、Select、Option 组件 -->
<!-- 该组件负责发送 “属性编辑” 信号，属性编辑是由 WorkAreaEle 组件响应 -->
<!-- TODO 表单验证规则 -->
<!-- TODO 图层和线条形状逻辑 -->
<!-- TODO 自定义的 name 属性 -->
<template>
  <div id='ae'>
    <aside-select></aside-select>
    <Tabs value="name1">
      <TabPane label="系统属性" name="name1">
        <Form :label-width="80" label-position="left">
          <FormItem label="名字" v-show="nameVisble">
            <Input size="small" :value="name" readonly></Input>
          </FormItem>
          <FormItem label="左边坐标" v-show="leftVisble">
            <Input size="small" :value="left" @on-blur="setLeft" @on-enter="setLeft"></Input>
          </FormItem>
          <FormItem label="上边坐标" v-show="topVisble">
            <Input size="small" :value="top" @on-blur="setTop" @on-enter="setTop"></Input>
          </FormItem>
          <FormItem label="高度" v-show="heightVisble">
            <Input size="small" :value="height" @on-blur="setHeight" @on-enter="setHeight"></Input>
          </FormItem>
          <FormItem label="宽度" v-show="widthVisble">
            <Input size="small" :value="width" @on-blur="setWidth" @on-enter="setWidth"></Input>
          </FormItem>
          <FormItem label="高度" v-show="backgroundHeightVisble">
            <Input size="small" :value="backgroundHeight" @on-blur="setBgHeight" @on-enter="setBgHeight"></Input>
          </FormItem>
          <FormItem label="宽度" v-show="backgroundWidthVisble">
            <Input size="small" :value="backgroundWidth" @on-blur="setBgWidth" @on-enter="setBgWidth"></Input>
          </FormItem>
          <FormItem label="旋转角度" v-show="angleVisble">
            <Input size="small" :value="angle" @on-blur="setAngle" @on-enter="setAngle"></Input>
          </FormItem>
          <FormItem label="长度" v-show="lengthVisble">
            <Input size="small" :value="length" @on-blur="setLength" @on-enter="setLength"></Input>
          </FormItem>
          <FormItem label="半径" v-show="radiusVisble">
            <Input size="small" :value="radius" @on-blur="setRadius" @on-enter="setRadius"></Input>
          </FormItem>
          <FormItem label="起始角度" v-show="startAngleVisble">
            <Input size="small" :value="startAngle" @on-blur="setStartAngle" @on-enter="setStartAngle"></Input>
          </FormItem>
          <FormItem label="终止角度" v-show="endAngleVisble">
            <Input size="small" :value="endAngle" @on-blur="setEndAngle" @on-enter="setEndAngle"></Input>
          </FormItem>
          <FormItem label="半长轴" v-show="rxVisble">
            <Input size="small" :value="rx" @on-blur="setRx" @on-enter="setRx"></Input>
          </FormItem>
          <FormItem label="半短轴" v-show="ryVisble">
            <Input size="small" :value="ry" @on-blur="setRy" @on-enter="setRy"></Input>
          </FormItem>
          <FormItem label="行高" v-show="lineHeightVisble">
            <Input size="small" :value="lineHeight" @on-blur="setLineHeight" @on-enter="setLineHeight"></Input>
          </FormItem>
          <FormItem label="字体大小" v-show="fontSizeVisble">
            <Input size="small" :value="fontSize" @on-blur="setFontSize" @on-enter="setFontSize"></Input>
          </FormItem>
          <FormItem label="字间距" v-show="characterSpaceVisble">
            <Input size="small" :value="characterSpace" @on-blur="setCharacterSpace" @on-enter="setCharacterSpace"></Input>
          </FormItem>
          <FormItem label="输入内容" v-show="textContentVisble">
            <Input size="small" :value="text" @on-blur="setTextContent" @on-enter="setTextContent"></Input>
          </FormItem>
          <FormItem label="透明度" v-show="opacityVisble">
            <Input size="small" :value="opacity" @on-blur="setOpacity" @on-enter="setOpacity"></Input>
          </FormItem>
          <FormItem label="线条宽度" v-show="strokeWidthVisble">
            <Input size="small" :value="strokeWidth" @on-blur="setStrokeWidth" @on-enter="setStrokeWidth"></Input>
          </FormItem>
          <FormItem label="类型" v-show="obrTypeVisble">
            <Input size="small" :value="obrType" readonly></Input>
          </FormItem>

          <!-- TODO -->
          <FormItem label="线条形状" v-show="strokeDashArrayVisble">
            <Select size="small" :value="strokeDashArray" @on-change="setStrokeDashArray">
              <Option value="solid">实线</Option>
              <Option value="dash">虚线</Option>
            </Select>
          </FormItem>
          <FormItem label="图层" v-show="layerVisble">
            <Select size="small" :value="layer">
              <Option value="1">北京市</Option>
              <Option value="2">上海市</Option>
              <Option value="3">深圳市</Option>
            </Select>
          </FormItem>
          <!-- end TODO -->

          <FormItem label="对齐方式" v-show="textAlignVisble">
            <Select size="small" :value="textAlign" @on-change="setTextAlign">
              <Option value="left">left</Option>
              <Option value="middle">middle</Option>
              <Option value="right">right</Option>
              <Option value="justify">justify</Option>
            </Select>
          </FormItem>
          <FormItem label="字体" v-show="fontFamilyVisble">
            <Select size="small" :value="fontFamily" @on-change="setFontFamily">
              <Option value="song">宋体</Option>
              <Option value="yahei">雅黑</Option>
              <Option value="kaiti">楷体</Option>
            </Select>
          </FormItem>
          <FormItem label="粗体" v-show="boldVisble">
            <i-switch :value="bold" @on-change="setBold">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
          </FormItem>
          <FormItem label="斜体" v-show="italicVisble">
            <i-switch :value="italic" @on-change="setItalic">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
          </FormItem>
          <FormItem label="下划线" v-show="underlineVisble">
            <i-switch :value="underline" @on-change="setUnderline">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
          </FormItem>
          <FormItem label="网格" v-show="gridVisble">
            <i-switch :value="gridVisibility" @on-change="setGridVisibility">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
          </FormItem>
          <FormItem label="标尺" v-show="rulerVisble">
            <i-switch :value="rulerVisibility" @on-change="setRulerVisibility">
              <span slot="open">On</span>
              <span slot="close">Off</span>
            </i-switch>
          </FormItem>
          <FormItem label="网线颜色" v-show="gridColorVisble">
            <input type="color" :value="gridColor" @change="setGridColor" name="">
          </FormItem>
          <FormItem label="背景颜色" v-show="backgroundColorVisble">
            <input type="color" :value="backgroundColor" @change="setBackgroundColor" name="">
          </FormItem>
          <FormItem label="线条颜色" v-show="strokeVisble">
            <input type="color" :value="stroke" @change="setStroke" name="">
          </FormItem>
          <FormItem label="填充色" v-show="fillVisble">
            <input type="color" :value="fill" @change="setFill" name="">
          </FormItem>
          <FormItem label="文字背景色" v-show="textBackgroundColorVisble">
            <input type="color" :value="textBackgroundColor" @change="setTextBackgroundColor" name="">
          </FormItem>
        </Form>
      </TabPane>
      <TabPane label="属性" name="name2">
        <div class="asideAttr" v-show="attrList.length">
          <Form :label-width="80" label-position="left">
            <FormItem v-for="item in attrList" :label="item.attrTitle">
              <span @dblclick='setName(item.attrTitle)'>{{item.name}}</span>
            </FormItem>
          </Form> 
        </div>
      </TabPane>
      <TabPane label="方法" name="name3">
        <div class="asideAttr" v-show="eventList.length">
          <Form :label-width="80" label-position="left">
            <FormItem v-for="item in eventList" :label="item.attrTitle">
              <span>{{item.name}}</span>
            </FormItem>
          </Form> 
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
  import { mapState,mapGetters,mapMutations } from 'vuex'
  import AsideSelect from './AsideSelect'

  export default {
    components:{
      AsideSelect
    },
    data() {
      return {
        attrList:[],
        eventList:[]
      }
    },
    mounted(){

    },
    computed:{ 
      ...mapGetters(['attrData']),
      ...mapState({
        // attributes value
        name: state=>state.attributes.name,
        left: state=>state.attributes.left,
        top: state=>state.attributes.top,
        height:state=>state.attributes.height,
        width: state=>state.attributes.width,
        angle: state=>state.attributes.angle,
        length: state=>state.attributes.length,
        radius: state=>state.attributes.radius,
        startAngle:state=>state.attributes.startAngle,
        endAngle: state=>state.attributes.endAngle,
        ry:state=>state.attributes.ry,
        rx: state=>state.attributes.rx,
        lineHeight: state=>state.attributes.lineHeight,
        fontSize: state=>state.attributes.fontSize,
        characterSpace: state=>state.attributes.characterSpace,
        text: state=>state.attributes.text,
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
        backgroundWidth: state=>state.attributes.backgroundWidth,
        backgroundHeight: state=>state.attributes.backgroundHeight,
        stroke: state=>state.attributes.stroke,
        fill: state=>state.attributes.fill,
        textBackgroundColor:state=>state.attributes.textBackgroundColor,
        layer: state=>state.attributes.layer,
        strokeDashArray: state=>state.attributes.strokeDashArray,


        // control visibility
        nameVisble: state=>state.show.name,
        leftVisble: state=>state.show.left,
        topVisble: state=>state.show.top,
        heightVisble:state=>state.show.height,
        widthVisble: state=>state.show.width,
        angleVisble: state=>state.show.angle,
        lengthVisble: state=>state.show.length,
        radiusVisble: state=>state.show.radius,
        startAngleVisble:state=>state.show.startAngle,
        endAngleVisble: state=>state.show.endAngle,
        ryVisble:state=>state.show.ry,
        rxVisble: state=>state.show.rx,
        lineHeightVisble: state=>state.show.lineHeight,
        fontSizeVisble: state=>state.show.fontSize,
        characterSpaceVisble: state=>state.show.characterSpace,
        textContentVisble: state=>state.show.text,
        opacityVisble: state=>state.show.opacity,
        strokeWidthVisble: state=>state.show.strokeWidth,
        obrTypeVisble: state=>state.show.obrType,
        textAlignVisble: state=>state.show.textAlign,
        fontFamilyVisble: state=>state.show.fontFamily,
        boldVisble: state=>state.show.bold,
        italicVisble: state=>state.show.italic,
        underlineVisble: state=>state.show.underline,
        gridVisble: state=>state.show.grid,
        rulerVisble: state=>state.show.ruler,
        gridColorVisble: state=>state.show.gridColor,
        backgroundColorVisble: state=>state.show.backgroundColor,
        backgroundWidthVisble: state=>state.show.backgroundWidth,
        backgroundHeightVisble: state=>state.show.backgroundHeight,
        strokeVisble: state=>state.show.stroke,
        fillVisble: state=>state.show.fill,
        textBackgroundColorVisble:state=>state.show.textBackgroundColor,
        layerVisble: state=>state.show.layer,
        strokeDashArrayVisble: state=>state.show.strokeDashArray,
      })
    },
    methods: {
      setName(title){
        var popName='';
        switch(title){
          case '值显示':
            popName='Value'
            break;
          case '文本动态':
            popName='TextDynamics'
            break;
          case '长度动态':
            popName='Length'
            break;
          case '颜色动态':
            popName='Color'
            break;
          case '可见动态':
            popName='Visible'
            break;
          case '变量映射':
            popName='Mapping'
            break;
          case 'SET':
            popName='Set'
            break;
          case 'SETDYNA':
            popName='Setdyna'
            break;
          case 'ADD':
            popName='Add'
            break;
          case 'GO':
            popName='Go'
            break;
          case 'OPEN':
            popName='Open'
            break;
        } 
        this.setPopName(popName)
      },
      ...mapMutations({
        setPopName:'SET_POP_NAME'
      }),
      setLeft:function (e) {
        // dir(e)
        var val = parseInt(e.target.value)
        // console.log(val);
        this.$store.commit("SET_ATTRIBUTE_LEFT", val)
      },
      setTop:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_TOP", val)
      },
      setHeight:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_HEIGHT", val)
      },
      setWidth:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_WIDTH", val)
      },
      setBgHeight:function (e) {
        var val=parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_BACKGROUND_HEIGHT", val)
      },
      setBgWidth:function (e) {
        var val=parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_BACKGROUND_WIDTH", val)
      },
      setAngle:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_ANGLE", val)
      },
      setLength:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_LENGTH", val)
      },
      setRadius:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_RADIUS", val)
      },
      setStartAngle:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_START_ANGLE", val)
      },
      setEndAngle:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_END_ANGLE", val)
      },
      setRy:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_RY", val)
      },
      setRx:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_RX", val)
      },
      setLineHeight:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_LINE_HEIGHT", val)
      },
      setFontSize:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_FONT_SIZE", val)
      },
      setCharacterSpace:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_CHARACTER_SPACE", val)
      },
      setTextContent:function (e) {
        console.log(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_TEXT_CONTENT", e.target.value)
      },
      setOpacity:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_OPACITY", val)
      },
      setStrokeWidth:function (e) {
        var val = parseInt(e.target.value)
        this.$store.commit("SET_ATTRIBUTE_STROKE_WIDTH", val)
      },
      // setStrokeDashArray(e){
      //   console.log(e)
      // },
      setTextAlign:function (align) {
        this.$store.commit("SET_ATTRIBUTE_TEXT_ALIGN", align)
      },
      setFontFamily:function (fontFamily) {
        this.$store.commit("SET_ATTRIBUTE_FONT_FAMILY", fontFamily)
      },
      setBold:function (status) {
        this.$store.commit("SET_ATTRIBUTE_BOLD", status)
      },
      setItalic:function (status) {
        this.$store.commit("SET_ATTRIBUTE_ITALIC", status)
      },
      setUnderline:function (status) {
        this.$store.commit("SET_ATTRIBUTE_UNDERLINE", status)
      },
      setGridVisibility:function (status) {
        this.$store.commit("SET_ATTRIBUTE_GRID_VISIBILITY", status)
      },
      setRulerVisibility:function (status) {
        this.$store.commit("SET_ATTRIBUTE_RULER_VISIBILITY", status)
      },
      setGridColor:function (e) {
        this.$store.commit("SET_ATTRIBUTE_GRID_COLOR", e.target.value)
      },
      setBackgroundColor:function (e) {
        this.$store.commit("SET_ATTRIBUTE_BACKGROUND_COLOR", e.target.value)
      },
      setStroke:function (e) {
        this.$store.commit("SET_ATTRIBUTE_STROKE", e.target.value)
      },
      setFill:function (e) {
        this.$store.commit("SET_ATTRIBUTE_FILL", e.target.value)
      },
      setTextBackgroundColor:function (e) {
        this.$store.commit("SET_ATTRIBUTE_TEXT_BACKGROUND_COLOR", e.target.value)
      },


      // TODO
      setLayer:function (layer) {
        this.$store.commit("SET_ATTRIBUTE_LAYER", layer)
      },
      setStrokeDashArray:function (val) {
        // console.log(val);
        this.$store.commit("SET_ATTRIBUTE_STROKE_DASH_ARRAY", val)
      },
    },
    watch:{
      //区分添加的属性和事件
      attrData(newVal){
        this.attrList.length=0;
        this.eventList.length=0;
        if(newVal.length>0){
          var reg=/^\w/;
          newVal.forEach((e)=>{
            if(reg.test(e.attrTitle)){
              this.eventList.push(e)
            }else{
              this.attrList.push(e)
            }
          })
        }
      }
    }
  }
</script>
<style>
.asideAttr span{
  display: block;
  height: 24px;
  line-height: 24px;
  padding: 0 7px;
}
#ae .ivu-tabs-nav .ivu-tabs-tab{
  padding: 8px 3px;
}
#ae .ivu-input-small{
  border: none;
}
#ae .ivu-input-small:focus{
  box-shadow: none;
}
#ae .ivu-form-item-label{
  padding-left: 5px;
}
#ae .ivu-form-item{
  margin-bottom: 0;
}
#ae .ivu-form{
  padding-left: 0;
  border-top: 1px solid #d0c7c7;
}
.ivu-form-item-content > *:first-child {
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
}
</style>
