<template>
  <el-form label-width="60px">
    <el-form-item label="变量名">
      <el-input v-model="form.name" class="name"></el-input>
    </el-form-item>
    <table class="table">
      <thead>
        <th>序号</th>
        <th>选中</th>
        <th></th>
        <th>下限</th>
        <th></th>
        <th>上限</th>
        <th>文本</th>
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
          <td>
            <el-input class="num" v-model="item.max"></el-input>
          </td>
          <td>
            <el-input v-model="item.text"></el-input>
          </td>
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
      this.form.value.push({choose:true,min:null,max:null,text:null})
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
    // console.log(this.form)
    this.form.value=this.filterForm(this.form.value)
  }
}
</script>
<style scoped>
.name {
  width: 300px;
}
.table {
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
.btn-add {
  text-align: center;
  margin: 10px 0;
}

</style>