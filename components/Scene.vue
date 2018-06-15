<!-- 主菜单栏 视图 组件 -->
<!-- 使用 iview 的 Dropdown 组件和 Icon 组件 -->
<!-- ObrIcon 组件是自定义组件 -->
<!-- 该组件负责发送 “视图” 信号，由 WorkAreaEle 组件响应 -->
<template>
  <Dropdown style="margin-left: 20px" @on-click="handler" placement="bottom-start">
    <a href="javascript:void(0)">
      视图
      <Icon type="arrow-down-b"></Icon>
    </a>
    <DropdownMenu slot="list">
      <DropdownItem name='grid'>
        <ObrIcon size="12" type="wangge"></ObrIcon>
        <span class="span-has-leading-icon">
          网格<Icon type='checkmark' style="margin-left:20px;" v-show='grid'></Icon>
        </span> 
      </DropdownItem>
      <DropdownItem name='ruler'>
        <span class="span-no-leading-icon">
          标尺<Icon type='checkmark' style="margin-left:20px;" v-show='ruler'></Icon>
        </span> 
      </DropdownItem>
      <DropdownItem divided name="zoomIn">
        <ObrIcon size="12" type="fangda"></ObrIcon><span class="span-has-leading-icon">放大</span>
      </DropdownItem>
      <DropdownItem name='zoomOut'>
        <ObrIcon size="12" type="suoxiao"></ObrIcon><span class="span-has-leading-icon">缩小</span>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
  import ObrIcon from './ObrIcon'
  import { mapState } from 'vuex'
  export default {
    components: {
      ObrIcon, 
    },
    data() {
      return {
      }
    },
    methods: {
      // 详见 iview Dropdown 组件文档
      handler: function(name) {
        if (name == 'grid') {
          let state = !this.grid
          this.$store.commit('SET_ATTRIBUTE_GRID_VISIBILITY', state)
        } else if (name == 'ruler') {
          let state = !this.ruler
          this.$store.commit('SET_ATTRIBUTE_RULER_VISIBILITY', state)
        } else {
          this.$store.commit('SCENE_SIGNAL', name)
        }
      }
    },
    computed: {
      ...mapState({
        grid: state=>state.attributes.gridVisibility,
        ruler: state=>state.attributes.rulerVisibility,
      }),
    }
  }
</script>
<style>
</style>
