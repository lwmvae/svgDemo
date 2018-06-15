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
							<el-input v-model="form.backgroundWidth"></el-input>
						</el-form-item>
						<el-form-item label="画布高度">
							<el-input v-model="form.backgroundHeight"></el-input>
						</el-form-item>
						<el-form-item label="背景颜色">
							<el-color-picker v-model="form.backgroundColor"></el-color-picker>
						</el-form-item>
						<el-form-item label="标尺">
							<el-switch v-model="form.rulerVisibility" on-text="on" off-text="off">
							</el-switch>
						</el-form-item>
						<el-form-item label="网格">
							<el-switch v-model="form.gridVisibility" on-text="on" off-text="off">
							</el-switch>
						</el-form-item>
						<el-form-item label="网线颜色">
							<el-color-picker v-model="form.gridColor"></el-color-picker>
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
				value2:true,
				form:{
					backgroundWidth:0,
					backgroundHeight:0,
					gridVisibility:true,
					rulerVisibility:true,
					backgroundColor:'',
					gridColor:''
				}
			}
		},
		mounted(){

			setTimeout(()=>{
				this.form.backgroundWidth=this.backgroundWidth;
				this.form.backgroundHeight=this.backgroundHeight;
				this.form.rulerVisibility=this.rulerVisibility;
				this.form.gridVisibility=this.gridVisibility;
				this.form.backgroundColor=this.backgroundColor;
				this.form.gridColor=this.gridColor;
			},0)
			

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
			saveConfig(){
				this.setShowConfig(false);
				
				this.form.backgroundWidth=parseInt(this.form.backgroundWidth);
				this.form.backgroundHeight=parseInt(this.form.backgroundHeight);
			
				this.setAttributes(this.form);
			},
			...mapMutations({
				setShowConfig:'SET_SHOW_CONFIG',
				setAttributes:'SET_ATTRIBUTES'
			})
		},
		computed:{
			...mapState({
				backgroundHeight: state=>state.attributes.backgroundHeight,
				backgroundWidth: state=>state.attributes.backgroundWidth,
				gridVisibility: state=>state.attributes.gridVisibility,
				rulerVisibility: state=>state.attributes.rulerVisibility,
				gridColor: state=>state.attributes.gridColor,
				backgroundColor: state=>state.attributes.backgroundColor
			})
		},
		watch:{
			backgroundHeight(newVal){
				this.form.backgroundHeight=newVal
			},
			backgroundWidth(newVal){
				this.form.backgroundWidth=newVal
			},
			gridVisibility(newVal){
				this.form.gridVisibility=newVal
			},
			rulerVisibility(newVal){
				this.form.rulerVisibility=newVal
			},
			gridColor(newVal){
				this.form.gridColor=newVal
			},
			backgroundColor(newVal){
				this.form.backgroundColor=newVal
			}
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