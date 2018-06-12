<template>
	<div id="popup">
		<div class="popup-wrapper" ref="wrapper">
			<div class="popup-container">
				<div class="popup-title" ref="title">
					<div class="title">配置</div>
					<div class="el-icon-close" @click="closeBtn"></div>
				</div>
				<div class="popup-content">
					<el-form label-width="80px">
						<el-form-item label="画布宽度">
							<el-input v-model="backgroundWidth"></el-input>
						</el-form-item>
						<el-form-item label="画布高度">
							<el-input v-model="backgroundHeight"></el-input>
						</el-form-item>
						<el-form-item label="背景颜色">
							<el-color-picker v-model="backgroundColor"></el-color-picker>
						</el-form-item>
						<el-form-item label="标尺">
							<el-switch v-model="value1" on-text="on" off-text="off" @change="rule">
							</el-switch>
						</el-form-item>
						<el-form-item label="网格">
							<el-switch v-model="value2" on-text="on" off-text="off" @change="grid">
							</el-switch>
						</el-form-item>
						<el-form-item label="网线颜色">
							<el-color-picker v-model="gridColor"></el-color-picker>
						</el-form-item>
					</el-form>
				</div>
				<div class="popup-btn">
					<el-button @click="saveConfig" class="sure">确定</el-button>
					<el-button @click="delBtn">返回</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data(){
			return{
				value1:true,
				value2:true
			}
		},
		mounted(){
			this.value1=this.rulerVisibility;
			this.value2=this.gridVisibility;
			var title=this.$refs.title;
			var wrapper=this.$refs.wrapper;
			title.onmousedown=function(e){
				var disx = e.pageX - wrapper.offsetLeft;
				var disy = e.pageY - wrapper.offsetTop;
				document.onmousemove = function (e){
					wrapper.style.left = e.pageX - disx+'px';
					wrapper.style.top = e.pageY - disy+'px';
				}
				document.onmouseup = function(){
					document.onmousemove = document.onmouseup = null;
				}
			}
		},
		methods:{
			closeBtn(){
				this.setShowConfig(false);
			},
			delBtn(){
				this.setShowConfig(false);
			},
			rule(){
				this.rulerVisibility = this.value1;
			},
			grid(){
				this.gridVisibility=this.value2;
			},
			saveConfig(){
				this.setShowConfig(false);
			},
			...mapMutations({
				setShowConfig:'SET_SHOW_CONFIG',
				setBgHeight:'SET_BACKGROUND_HEIGHT',
				setBgWidth:'SET_BACKGROUND_WIDTH',
				setGridVisibility:'SET_ATTRIBUTE_GRID_VISIBILITY',
				setRulerVisibility:'SET_ATTRIBUTE_RULER_VISIBILITY',
				setGridColor:'SET_ATTRIBUTE_GRID_COLOR',
				setbackgroundColor:'SET_ATTRIBUTE_BACKGROUND_COLOR'
			})
		},
		computed:{
			...mapState({
				backgroundHeight: state=>state.background.backgroundHeight,
				backgroundWidth: state=>state.background.backgroundWidth,
				gridVisibility: state=>state.attributes.gridVisibility,
				rulerVisibility: state=>state.attributes.rulerVisibility,
				gridColor: state=>state.attributes.gridColor,
				backgroundColor: state=>state.attributes.backgroundColor
			})
		}
	}
</script>
<style scoped>
#popup {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999;
	background-color: rgba(0,0,0,0.1);
}
#popup .popup-wrapper {
	min-width: 300px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 1000;
}
#popup .popup-container {
	background-color: #fff;
	border: 1px solid #dfdfdf;
}
#popup .popup-title {
	padding: 0 5px 0 10px;
	display: flex;
	height: 30px;
	line-height: 30px;
	background-color: #dfdfdf;
	cursor: move;
}
#popup .popup-title .title {
	flex: 1;
}
#popup .popup-title .el-icon-close {
	width: 30px;
	line-height: 30px;
	text-align: center;
	cursor: pointer;
}
#popup .popup-content {
	padding: 10px 15px;
}
#popup .popup-btn {
	text-align: center;
	padding: 0 15px 15px 15px;
}
#popup .popup-btn .sure {
	margin-right: 20px;
}

</style>
<style>
.el-color-picker__trigger{
	padding: 0 6px;
}
</style>