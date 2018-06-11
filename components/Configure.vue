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
							<el-input v-model="form.canvasWidth"></el-input>
						</el-form-item>
						<el-form-item label="画布高度">
							<el-input v-model="form.canvasHeight"></el-input>
						</el-form-item>
						<el-form-item label="背景颜色">
							<el-color-picker v-model="form.backgroundColor"></el-color-picker>
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
							<el-color-picker v-model="form.gridColor"></el-color-picker>
						</el-form-item>
					</el-form>
				</div>
				<div class="popup-btn">
					<el-button @click="saveBtn" class="sure">确定</el-button>
					<el-button @click="delBtn">返回</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters,mapMutations } from 'vuex'
	export default{
		props:{
			form:{
				type:Object,
			}
		},
		data(){
			return{
				value1:true,
				value2:true,
			}
		},
		mounted(){
			this.value1=this.form.rulerVisibility;
			this.value2=this.form.gridVisibility;
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
			closeBtn(){},
			saveBtn(){},
			delBtn(){},
			rule(){
				this.form.rulerVisibility=this.value1;
			},
			grid(){
				this.form.gridVisibility=this.value2;
			},
			cancel(){
				this.setShowConfig(false);
			},
			saveConfig(){
				this.setShowConfig(false);
				this.form.canvasWidth= +this.form.canvasWidth;
				this.form.canvasHeight= +this.form.canvasHeight;
				this.updateConfig(this.form);
			},
			...mapMutations({
				updateConfig:'UPDATE_CONFIG',
				setShowConfig:'SET_SHOW_CONFIG'
			})
		},
		// computed:{
		// 	...mapGetters(['showConfig'])
		// },
		// components:{
		// 	Popup
		// }
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