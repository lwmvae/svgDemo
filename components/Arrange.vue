<!-- 排列 组件 -->
<!-- 使用 iview 的 Dropdown 组件和 Icon 组件 -->
<!-- ObrIcon 组件是自定义组件 -->
<!-- 该组件负责发送 “排列” 信号，由 WorkAreaEle 组件响应 -->
<template>
    <Dropdown style="margin-left: 20px" @on-click="handler" placement="bottom-start">
        <a href="javascript:void(0)">
            排列
            <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
            <Dropdown placement="right-start">
                <DropdownItem>
                    <span class="span-no-leading-icon">对齐<Icon type="ios-arrow-right"></Icon></span>
                </DropdownItem>
                <DropdownMenu slot="list">
                    <DropdownItem name='leftAlign'>
                        <ObrIcon size="12" type="zuoduiqi"></ObrIcon><span class="span-has-leading-icon">左对齐</span>
                    </DropdownItem>
                    <DropdownItem name='horizontalAlign'>
                        <ObrIcon size="12" type="shuipingjuzhong"></ObrIcon><span class="span-has-leading-icon">水平居中</span>
                    </DropdownItem>
                    <DropdownItem name='rightAlign'>
                        <ObrIcon size="12" type="youduiqi"></ObrIcon><span class="span-has-leading-icon">右对齐</span>
                    </DropdownItem>
                    <DropdownItem name='topAlign'>
                        <ObrIcon size="12" type="shangduiqi"></ObrIcon><span class="span-has-leading-icon">上对齐</span>
                    </DropdownItem>
                    <DropdownItem name='verticalAlign'>
                        <ObrIcon size="12" type="chuizhijuzhong"></ObrIcon><span class="span-has-leading-icon">垂直居中</span>
                    </DropdownItem>
                    <DropdownItem name='bottomAlign'>
                        <ObrIcon size="12" type="xiaduiqi"></ObrIcon><span class="span-has-leading-icon">下对齐</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="right-start">
                <DropdownItem>
                    <span class="span-no-leading-icon">翻转<Icon type="ios-arrow-right"></Icon></span>
                </DropdownItem>
                <DropdownMenu slot="list">
                    <DropdownItem name='horizontalFlip'>
                        <ObrIcon size="12" type="shuipingfanzhuan"></ObrIcon><span class="span-has-leading-icon">水平翻转</span>
                    </DropdownItem>
                    <DropdownItem name='verticalFlip'>
                        <ObrIcon size="12" type="chuizhifanzhuan"></ObrIcon><span class="span-has-leading-icon">垂直翻转</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="right-start">
                <DropdownItem>
                    <span class="span-no-leading-icon">旋转<Icon type="ios-arrow-right"></Icon></span>
                </DropdownItem>
                <DropdownMenu slot="list">
                    <DropdownItem name='rightRotate'>
                        <ObrIcon size="12" type="shunshizhen"></ObrIcon><span class="span-no-leading-icon">顺时针</span>
                    </DropdownItem>
                    <DropdownItem name='leftRotate'>
                        <ObrIcon size="12" type="nishizhen"></ObrIcon><span class="span-no-leading-icon">逆时针</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Dropdown placement="right-start">
                <DropdownItem>
                    <span class="span-no-leading-icon">微调<Icon type="ios-arrow-right"></Icon></span>
                </DropdownItem>
                <DropdownMenu slot="list">
                    <DropdownItem name='leftMove'>
                        <span class="span-no-leading-icon">左移</span>
                    </DropdownItem>
                    <DropdownItem name='rightMove'>
                        <span class="span-no-leading-icon">右移</span>
                    </DropdownItem>
                    <DropdownItem name='upwardMove'>
                        <span class="span-no-leading-icon">上移</span>
                    </DropdownItem>
                    <DropdownItem name='downwardMove'>
                        <span class="span-no-leading-icon">下移</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <DropdownItem divided name="group">
                <ObrIcon size="12" type="zuhe1"></ObrIcon><span class="span-has-leading-icon">组合</span>
            </DropdownItem>
            <DropdownItem name='ungroup'>
                <ObrIcon size="12" type="fenzu"></ObrIcon><span class="span-has-leading-icon">拆分</span>
            </DropdownItem>
            <Dropdown placement="right-start">
                <DropdownItem>
                    <span class="span-no-leading-icon">叠放次序<Icon type="ios-arrow-right"></Icon></span>
                </DropdownItem>
                <DropdownMenu slot="list">
                    <DropdownItem name='toFront'>
                        <span class="span-no-leading-icon">提到最上面</span>
                    </DropdownItem>
                    <DropdownItem name='moveUp'>
                        <ObrIcon size="12" type="shangyiyiceng"></ObrIcon><span class="span-has-leading-icon">上移一层</span>
                    </DropdownItem>
                    <DropdownItem name='moveDown'>
                        <ObrIcon size="12" type="xiayiyiceng"></ObrIcon><span class="span-has-leading-icon">下移一层</span>
                    </DropdownItem>
                    <DropdownItem name='toBottom'>
                        <span class="span-no-leading-icon">放到最后面</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
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
                this.$store.commit('ARRANGE_SIGNAL', name)
            },
        }
}
</script>
<style>
</style>
