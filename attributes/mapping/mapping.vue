<template>
  <el-form label-width="60px">
    <table class="table" v-show="form.value.length">
      <thead>
        <th>序号</th>
        <th>选中</th>
        <th>增加前缀</th>
        <th>绑定变量</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in form.value">
          <td>{{index+1}}</td>
          <td><el-checkbox v-model="item.choose"></el-checkbox></td>
          <td><el-input v-model="item.oldVal" class="name"></el-input></td>
          <td><el-input v-model="item.newVal" class="name"></el-input></td>
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
  props:{
    form:{
      type:Object,
      default:{}
    }
  },
  methods:{
    add(){
      this.form.value.push({choose:true,oldVal:null,newVal:null})
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
.name {
  width: 150px;
}
.table {
  text-align: center;
}
.table th {
  font-weight: 100;
  font-size: 14px;
}
.table .tr {
  height: 45px;
}
.el-icon-minus,
.el-icon-plus {
  padding: 7px;
}
.btn-add {
  text-align: center;
  margin: 10px 0;
}
</style>