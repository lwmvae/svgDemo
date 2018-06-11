<!-- 文件 组件 -->
<!-- 使用 iview 的 Dropdown 组件和 Icon 组件 -->
<!-- ObrIcon 组件是自定义组件 -->
<!-- 该组件负责发送 “文件” 信号，由 WorkAreaEle 组件响应 -->
<!-- TODO：配置 功能 -->
<template>
  <Dropdown style="margin-left: 8px" @on-click="handler" placement="bottom-start">
    <a href="javascript:void(0)">
      文件
      <Icon type="arrow-down-b"></Icon>
    </a>
    <DropdownMenu slot="list">
      <DropdownItem name='new'>
        <ObrIcon size="12" type="xinjian"></ObrIcon><span class="span-has-leading-icon">新建</span>
      </DropdownItem>
      <DropdownItem name='open'>
        <ObrIcon size="12" type="dakai"></ObrIcon><span class="span-has-leading-icon">打开</span>
      </DropdownItem>
      <DropdownItem divided name="save">
        <ObrIcon size="12" type="baocun"></ObrIcon><span class="span-has-leading-icon">保存</span>
      </DropdownItem>
      <DropdownItem name='saveAll'>
        <span class="span-no-leading-icon">全部保存</span>
      </DropdownItem>
      <DropdownItem name='saveAs'>
        <span class="span-no-leading-icon">另存为</span>
      </DropdownItem>
      <DropdownItem divided name="close">
        <span class="span-no-leading-icon">关闭</span>
      </DropdownItem>
      <DropdownItem name='closeAll'>
        <span class="span-no-leading-icon">关闭所有</span>
      </DropdownItem>
      <DropdownItem name='config'>
        <ObrIcon size="12" type="peizhi"></ObrIcon><span class="span-has-leading-icon">配置</span>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
  import ObrIcon from './ObrIcon'
  export default {
    components: {
      ObrIcon, 
    },
    data() {
      return {
      }
    },
    methods: {
      handler: function(name) {
        if (!name.includes('.')) {
          this.$store.commit('FILE_SIGNAL', name)
        }
      },
    }
  }
</script>
<style>
</style>
