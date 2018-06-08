<template>
  <el-form label-width="60px">
    <trigger-mode :options="options" :radios="radios" @mode="getType"></trigger-mode>
    <el-form-item label="变量名">
      <el-input class="name" v-model="form.name"></el-input>
    </el-form-item>
    <table class="table" v-show="form.value.length">
      <thead>
        <th>序号</th>
        <th>选中</th>
        <th></th>
        <th>下限</th>
        <th></th>
        <th>上限</th>
        <th>赋值为</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in form.value">
          <td>{{index+1}}</td>
          <td><el-checkbox v-model="item.choose"></el-checkbox></td>
          <td>
            <i class="more-equal"></i>
          </td>
          <td><el-input v-model="item.min" class="num"></el-input></td>
          <td>
            <i class="less"></i>
          </td>
          <td><el-input v-model="item.max" class="num"></el-input></td>
          <td><el-input v-model="item.evaluate" class="num"></el-input></td>
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
    },
    add(){
      this.form.value.push({choose:true,min:null,max:null,evaluate:null})
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
    this.form.value=this.filterForm(this.form.value);
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
  width: 300px;
}
.num{
  width: 60px;
}
.table {
  text-align: center;
  width: 100%;
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
.el-form-item {
  margin-bottom: 10px;
}
.el-form-item__label {
  text-align: left;
}
.btn-add {
  text-align: center;
  margin: 10px 0;
}

</style>