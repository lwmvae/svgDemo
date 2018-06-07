<template>
  <el-form label-width="60px">
    <el-form-item label="变量名">
      <el-input v-model="form.name" class="name"></el-input>
      <el-radio v-model="form.radio" label="1">背景色</el-radio>
      <el-radio v-model="form.radio" label="2">文字颜色</el-radio>
    </el-form-item>
    <table class="table" v-show="form.value.length">
      <thead>
        <th>序号</th>
        <th>选中</th>
        <th></th>
        <th>下限</th>
        <th></th>
        <th>上限</th>
        <th>闪烁</th>
        <th>基本色</th>
        <th>变换色</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in form.value">
          <td>{{index+1}}</td>
          <td><el-checkbox v-model="item.choose"></el-checkbox></td>
          <td>
            <i class="more-equal"></i>
          </td>
          <td><el-input class="num" v-model="item.min"></el-input></td>
          <td>
            <i class="less"></i>
          </td>
          <td><el-input class="num" v-model="item.max"></el-input></td>
          <td><el-checkbox v-model="item.twinkle"></el-checkbox></td>
          <td><el-color-picker v-model="item.color1"></el-color-picker></td>
          <td><el-color-picker v-model="item.color2"></el-color-picker></td>
          <el-button plain class="el-icon-minus" @click="reduce(index)"></el-button>
        </tr>
      </tbody>
    </table>
    <div class="btn-add">
      <el-button type="primary" class="el-icon-plus" @click="add"></el-button>
    </div>
  </el-form>
</template>
<script>

export default {
  props: {
    form: {
      type:Object,
      default:{}
    }    
  },
  methods:{
    add(){
      this.form.value.push({choose:true,min:null,max:null,twinkle:false,color1:'#409EFF',color2:'#FF0000'})
    },
    reduce(index){
      this.form.value.splice(index,1)
    },
    filterForm(arr){
      let ret=[];
      arr.forEach((item)=>{
        if(item.choose===true){
          ret.push(item)
        }
      })
      return ret;
    }
  },
  mounted(){
    this.form.value=this.filterForm(this.form.value)
  }
}
</script>
<style scoped>
.name{
  width: 300px;
}
.table {
  width: 100%;
  text-align: left;
}
.table th {
  font-weight: 100;
  font-size: 14px;
}
.table .tr {
  height: 45px;
}
.table .more-equal {
  display: block;
  width: 20px;
  height: 20px;
  background: url('../../../../icons/moreEqual.png') no-repeat center;
}
.table .less {
  display: block;
  width: 20px;
  height: 20px;
  background: url('../../../../icons/left.png') no-repeat center;
}
.el-icon-minus,
.el-icon-plus {
  padding: 7px;
}
.num {
  width: 60px;
}
.el-color-picker__trigger {
  border: none;
  padding: 0;
}
.el-color-picker__trigger .el-color-picker__color {
  width: 60px;
  height: 30px;
  border: none;
}
.el-color-picker__trigger span + span {
  display: none;
}
.btn-add {
  text-align: center;
  margin: 10px 0;
}

</style>