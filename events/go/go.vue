<template>
  <el-form label-width="70px">
    <trigger-mode :options="options" :radios="radios" @mode="getType" :width="420"></trigger-mode>
    <el-form-item label="流程图名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import TriggerMode from '../triggerMode/triggerMode'
export default {
  props:{
    form:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      radios:-1,
      options:['左键单击','左键双击','右键单击','右键双击']
    }
  },
  methods:{
    getType(index){
      this.form.type=this.options[index]
      // console.log(this.form.type)
    }
  },
  mounted(){
    if(this.form.type){
      this.radios=this.options.indexOf(this.form.type)
    }else{
      this.radios=-1
    }
  },
  components: {
    TriggerMode
  }
}
</script>
<style scoped>
.trigger-mode .el-radio-group{
  /*width: 420px;*/
}
.el-form-item__label{
  text-align: left;
}
</style>