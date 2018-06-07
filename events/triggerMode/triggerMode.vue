<template>
	<div class="trigger-mode">
		<p class="type">触发方式：</p>
		<el-radio-group v-model="radio" @change="choose" :style="{width:width+'px'}">
			<el-radio v-for="(option,index) in options" :label="index" :key="index">{{option}}</el-radio>
		</el-radio-group>
	</div>
</template>
<script>
export default {
	data(){
		return{
			radio:-1
		}
	},
	props:{
		options:{
			type:Array,
			default:()=>[]
		},
		width:{
			type:Number,
			default:315
		},
		radios:{
			type:Number,
			default:-1
		}
	},
	methods:{
		choose(){
			this.$emit('mode',this.radio)
		}
	},
	watch:{
		radios(newVal){
			this.radio=newVal
		}
	}
}
	
</script>
<style scoped>
.el-radio-group{
  /*width: 315px;*/
}
.type{
  font-size: 15px;
  margin:0 0 10px 0;
}
.el-radio{
  margin: 0 20px 20px 5px;
}
.el-radio+.el-radio {
    margin-left: 5px;
}

</style>