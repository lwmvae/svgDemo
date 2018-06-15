<!-- 编辑 组件 -->
<!-- 使用 iview 的 Dropdown 组件和 Icon 组件 -->
<!-- ObrIcon 组件是自定义组件 -->
<!-- 该组件负责发送 “编辑” 信号，由 WorkAreaEle 组件响应 -->
<template>
  <Dropdown style="margin-left: 20px" @on-click="handler" placement="bottom-start">
    <a href="javascript:void(0)">
      编辑
      <Icon type="arrow-down-b"></Icon>
    </a>
    <DropdownMenu slot="list">
      <DropdownItem name='undo'>
        <ObrIcon size="12" type="quxiaoshangcicaozuo"></ObrIcon><span class="span-has-leading-icon">取消上次操作</span>
      </DropdownItem>
      <DropdownItem name='redo'>
        <ObrIcon size="12" type="huifushangcicaozuo"></ObrIcon><span class="span-has-leading-icon">恢复上次操作</span>
      </DropdownItem>
      <DropdownItem divided name="cut">
        <ObrIcon size="12" type="jianqie"></ObrIcon><span class="span-has-leading-icon">剪切</span>
      </DropdownItem>
      <DropdownItem name='copy'>
        <ObrIcon size="12" type="kaobei"></ObrIcon><span class="span-has-leading-icon">拷贝</span>
      </DropdownItem>
      <DropdownItem name='paste'>
        <ObrIcon size="12" type="niantie"></ObrIcon><span class="span-has-leading-icon">粘贴</span>
      </DropdownItem>
      <DropdownItem name='delete'>
        <ObrIcon size="12" type="shanchu"></ObrIcon><span class="span-has-leading-icon">删除</span>
      </DropdownItem>
      <DropdownItem divided  name='selectAll'>
        <span class="span-no-leading-icon">全部选中</span>
      </DropdownItem>
      <DropdownItem name='selectRest'>
        <span class="span-no-leading-icon">反向选中</span>
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
        this.$store.commit('EDIT_SIGNAL', name)
      }
    }
  }
</script>
<style>
</style>
