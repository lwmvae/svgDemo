<!-- 主菜单 组件 -->
<!-- File、Edit、Scene、Arrange 均为自定义组件 -->
<template>
	<div id="mainmenu">
	    <File></File>
	    <Edit></Edit>
	    <Scene></Scene>
	    <Arrange></Arrange>
	</div>
</template>
<script>
import File from './File'
import Edit from './Edit'
import Scene from './Scene'
import Arrange from './Arrange'

export default {
    name: 'mainmenu',
    components: {
        File,
        Edit,
        Scene,
        Arrange,
    },
    data: function() {
        // body...
        return {}
    }
}
</script>
<style>
    #mainmenu a {
        font-size: 14px;
        color: black;
    }
    #mainmenu a:hover {
        color: #5cadff;
    }

    /* dropdown-item 对齐*/
    /* left property 的差就是 icon 的 width */
    .span-no-leading-icon{
        position: relative;
        left: 20px;
    }
    .span-has-leading-icon{
        position: relative;
        left: 8px;
    }

    /*同一下拉菜单的宽度*/
    #mainmenu ul {
        width: 120px;
    }
</style>
