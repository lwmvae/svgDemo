<template>
  <el-form ref="form" :model="form" >
    <trigger-mode :options="options" :radios="radios" @mode="getType" :width="420"></trigger-mode>
    <div class="winType clearFix">
      <el-form-item label="窗口类型" label-width="70px">
        <el-select v-model="form.wType" placeholder="请选择">
          <el-option v-for="item in winType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="索引" label-width="40px">
        <el-input v-model="form.index" class="num"></el-input>
      </el-form-item>
      <el-form-item label="参数" label-width="40px">
        <el-input v-model="form.param" class="num"></el-input>
      </el-form-item>
    </div>
    <p>窗口显示属性</p>
    <div class="winType clearFix">
      <el-form-item label="X坐标" label-width="50px">
        <el-input v-model="form.X" class="num"></el-input>
      </el-form-item>
      <el-form-item label="Y坐标" label-width="50px">
        <el-input v-model="form.Y" class="num"></el-input>
      </el-form-item>
      <el-select v-model="form.mType" placeholder="请选择">
        <el-option v-for="item in mouseType" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="win">
      <el-checkbox v-model="form.checked">单独打开窗口</el-checkbox>
      <Row>
        <Col span="100">
            窗口背景色
            <ColorPicker v-model="form.color" />
        </Col>
      </Row>
    </div>
    <el-form-item label="窗口标题" class="title">
      <el-input v-model="form.name" class="name"></el-input>
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
      options:['左键单击','左键双击','右键单击','右键双击'],
      winType:[{
        value: '选项1',
        label: '1'
      },{
        value: '选项2',
        label: '2'
      }],
      mouseType:[{
        value: '选项3',
        label: '3'
      },{
        value: '选项4',
        label: '4'
      }]
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
.el-form-item__label {
  text-align: left;
}
.num {
  width: 60px;
}
.name {
  width: 300px;
}
.winType > div {
  float: left;
}
.winType .el-select{
  top:3px;
}
.win > div {
  display: inline-block;
  margin-left: 30px;
}
.el-color-picker__trigger{
  height: 30px;
}
.ivu-row{
  font-size: 14px;
}
.el-form-item{
  margin-right: 20px;
}
.title{
  margin-top: 20px;
}
</style>