<template>
  <el-form label-width="60px">
    <el-form-item label="变量名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="格式">
      <el-input v-model="form.type"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props:{
    form:{
      type:Object,
      default:{}
    }
  }
}
</script>
<style>
.el-input__inner{
  height: 30px;
}
.el-form-item{
  margin-bottom: 5px;
}
</style>