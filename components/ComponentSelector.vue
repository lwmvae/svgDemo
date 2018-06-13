<!-- 图元选择 组件 -->
<!-- 使用的 iview 的 Collapse 和 Panel 组件 -->
<!-- ObrIcon 是自定义组件 -->
<!-- TODO 加入系统图元 -->
<template>
  <Collapse v-model="value">
    <Panel name="1">
      基本图元
      <div slot="content" class="content">
        <a @click="add('Rect')" accesskey="R" title="正方形"><ObrIcon type="zhengfangxing"></ObrIcon></a>
        <a @click="add('Line')" title="直线"><ObrIcon type="zhixian"></ObrIcon></a>
        <a @click="add('Triangle')" title="三角形"><ObrIcon type="sanjiaoxing"></ObrIcon></a>
        <a @click="add('Circle')" title="圆形"><ObrIcon type="yuanxing"></ObrIcon></a>
        <a @click="add('Ellipse')" title="椭圆"><ObrIcon type="tuoyuan"></ObrIcon></a>
        <a @click="add('Text')" title="文字"><ObrIcon type="wenben"></ObrIcon></a>
        <a @click="add('Polygon')" title="多边形"><ObrIcon type="duobianxing"></ObrIcon></a>
        <a @click="add('Polyline')" title="折线"><ObrIcon type="zhexian"></ObrIcon></a>
        <a @click="add('Curve')" title="曲线"><ObrIcon type="quxian"></ObrIcon></a>
        <a @click="add('Sector')" title="扇形"><ObrIcon type="shanxing"></ObrIcon></a>
        <a @click="add('Image')" title="本地图库"><ObrIcon type="tupian"></ObrIcon></a>
      </div>
    </Panel>
  </Collapse>
</template>
<script>
  import ObrIcon from './ObrIcon'
  import { mapMutations } from 'vuex'
  export default {
    components:{
      ObrIcon,
    },
    data() {
      return {
        value: '1'
      }
    },
    methods: {
      ...mapMutations({
        add:'ADD'
      })
    }
  }
</script>
<style scoped>
.content a {
  display: inline-block;
  padding: 4px;
  border: 1px solid transparent;
}
.content a:hover {
  border: 1px solid #5cadff;
  background-color: #f8f8f9;
}
</style>
