<template>
	<Dropdown trigger="custom" :visible="rightShow" placement="right-start">
		<DropdownMenu slot="list">
			<DropdownItem :disabled='copy'><span v-if="copy">复制</span><span v-else @click="editSignal('copy')">复制</span></DropdownItem>
			<DropdownItem :disabled='paste'><span v-if="paste">粘贴</span><span v-else @click="editSignal('paste')">粘贴</span></DropdownItem>
			<Dropdown placement="right-start">
				<DropdownItem divided>
					添加属性
					<Icon type="ios-arrow-right"></Icon>
				</DropdownItem>
				<DropdownMenu slot="list">
					<DropdownItem :disabled="Value"><span v-if="Value">值显示</span><span v-else @click="add('Value')">值显示</span></DropdownItem>
					<DropdownItem :disabled="TextDynamics"><span v-if="TextDynamics">文本动态</span><span v-else @click="add('TextDynamics')">文本动态</span></DropdownItem>
					<DropdownItem :disabled="Length"><span v-if="Length">长度动态</span><span v-else @click="add('Length')">长度动态</span></DropdownItem>
					<DropdownItem :disabled="Color"><span v-if="Color">颜色动态</span><span v-else @click="add('Color')">颜色动态</span></DropdownItem>
					<DropdownItem :disabled="Visible"><span v-if="Visible">可见动态</span><span v-else @click="add('Visible')">可见动态</span></DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Dropdown placement="right-start">
				<DropdownItem>
					添加事件
					<Icon type="ios-arrow-right"></Icon>
				</DropdownItem>
				<DropdownMenu slot="list">
					<DropdownItem :disabled="SetR"><span v-if="SetR">SET</span><span v-else @click="add('Set')">SET</span></DropdownItem>
					<DropdownItem :disabled="Setdyna"><span v-if="Setdyna">SETDYNA</span><span v-else @click="add('Setdyna')">SETDYNA</span></DropdownItem>
					<DropdownItem :disabled="Add"><span v-if="Add">ADD</span><span v-else @click="add('Add')">ADD</span></DropdownItem>
					<DropdownItem :disabled="Go"><span v-if="Go">GO</span><span v-else @click="add('Go')">GO</span></DropdownItem>
					<DropdownItem :disabled="Open"><span v-if="Open">OPEN</span><span v-else @click="add('Open')">OPEN</span></DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<DropdownItem :disabled='Mapping' divided><span v-if="Mapping">变量映射</span><span v-else @click="add('Mapping')">变量映射</span></DropdownItem>
			<Dropdown placement="right-start">
				<DropdownItem divided>
					对齐
					<Icon type="ios-arrow-right"></Icon>
				</DropdownItem>
				<DropdownMenu slot="list">
					<DropdownItem :disabled="leftAlign"><span v-if="leftAlign">左对齐</span><span v-else @click="arrangeSignal('leftAlign')">左对齐</span></DropdownItem>
					<DropdownItem :disabled="horizontalAlign"><span v-if="horizontalAlign">水平居中</span><span v-else @click="arrangeSignal('horizontalAlign')">水平居中</span></DropdownItem>
					<DropdownItem :disabled="rightAlign"><span v-if="rightAlign">右对齐</span><span v-else @click="arrangeSignal('rightAlign')">右对齐</span></DropdownItem>
					<DropdownItem :disabled="topAlign"><span v-if="topAlign">上对齐</span><span v-else @click="arrangeSignal('topAlign')">上对齐</span></DropdownItem>
					<DropdownItem :disabled="verticalAlign"><span v-if="verticalAlign">垂直居中</span><span v-else @click="arrangeSignal('verticalAlign')">垂直居中</span></DropdownItem>
					<DropdownItem :disabled="bottomAlign"><span v-if="bottomAlign">下对齐</span><span v-else @click="arrangeSignal('bottomAlign')">下对齐</span></DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<Dropdown placement="right-start">
				<DropdownItem>
					叠放次序
					<Icon type="ios-arrow-right"></Icon>
				</DropdownItem>
				<DropdownMenu slot="list">
					<DropdownItem :disabled="toFront"><span v-if="toFront">移到最上</span><span v-else @click="arrangeSignal('toFront')">移到最上</span></DropdownItem>
					<DropdownItem :disabled="moveUp"><span v-if="moveUp">上移一层</span><span v-else @click="arrangeSignal('moveUp')">上移一层</span></DropdownItem>
					<DropdownItem :disabled="moveDown"><span v-if="moveDown">下移一层</span><span v-else @click="arrangeSignal('moveDown')">下移一层</span></DropdownItem>
					<DropdownItem :disabled="toBottom"><span v-if="toBottom">移到最下</span><span v-else @click="arrangeSignal('toBottom')">移到最下</span></DropdownItem>
				</DropdownMenu>
			</Dropdown>
			<DropdownItem :disabled='group' divided><span v-if="group">合并元件</span><span v-else @click="arrangeSignal('group')">合并元件</span></DropdownItem>
			<DropdownItem :disabled='ungroup'><span v-if="ungroup">拆分元件</span><span v-else @click="arrangeSignal('ungroup')">拆分元件</span></DropdownItem>
		</DropdownMenu>
	</Dropdown>
</template>
<script>
import { mapMutations, mapState} from 'vuex'
export default {
	props:{
		rightShow:{
			type:Boolean
		}
	},
	mounted(){
		// console.log(this.copy)
	},
	methods:{
		add(e){
			this.$emit('addSomething',e)
		},
		...mapMutations({
			editSignal: 'EDIT_SIGNAL',
			arrangeSignal: 'ARRANGE_SIGNAL'
		})
	},
	computed:{
		...mapState({
			copy:state=>state.show.copy,
			paste:state=>state.show.paste,
			Value:state=>state.show.Value,
			TextDynamics:state=>state.show.TextDynamics,
			Length:state=>state.show.Length,
			Color:state=>state.show.Color,
			Visible:state=>state.show.Visible,
			Mapping:state=>state.show.Mapping,
			SetR:state=>state.show.Set,
			Setdyna:state=>state.show.Setdyna,
			Add:state=>state.show.Add,
			Go:state=>state.show.Go,
			Open:state=>state.show.Open,
			leftAlign:state=>state.show.leftAlign,
			horizontalAlign:state=>state.show.horizontalAlign,
			rightAlign:state=>state.show.rightAlign,
			topAlign:state=>state.show.topAlign,
			verticalAlign:state=>state.show.verticalAlign,
			bottomAlign:state=>state.show.bottomAlign,
			toFront:state=>state.show.toFront,
			moveUp:state=>state.show.moveUp,
			moveDown:state=>state.show.moveDown,
			toBottom:state=>state.show.toBottom,
			group:state=>state.show.group,
			ungroup:state=>state.show.ungroup
		})
	},
	watch:{
		
	}
	
}
</script>
<style scoped>
.ivu-dropdown-item{
	padding: 5px 16px;
}
</style>
