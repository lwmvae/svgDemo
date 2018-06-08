<template>
  <el-form label-width="60px">
    <trigger-mode :options="options" :radios="radios" @mode="getType"></trigger-mode>
    <el-form-item label="变量名">
      <el-input v-model="form.name" class="name"></el-input>
    </el-form-item>
    <el-form-item label="值">
      <el-input v-model="form.value" class="name"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import TriggerMode from '../triggerMode/triggerMode'
import { encodeUnicode, decodeUnicode } from '../../utils/container/canvas-list/transcoding'

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
      options:['页面创建','实时刷新','左键单击','左键双击','右键单击','右键双击']
    }
  },
  methods:{
    getType(index){
      this.form.type=encodeUnicode(this.options[index])
      // console.log(this.form.type)
    }
  },
  mounted(){
    if(this.form.type){
      this.radios=this.options.indexOf(decodeUnicode(this.form.type))
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
.name{
  width: 200px;
}
</style>