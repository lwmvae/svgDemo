<template>
  <div id="popup" v-show="showPopup">
    <div class="popup-wrapper" ref="wrapper">
      <div class="popup-container">
        <div class="popup-title" ref="title">
          <div class="title">{{title}}</div>
          <div class="el-icon-close" @click="closeBtn"></div>
        </div>
        <div class="popup-content">
          <slot></slot>
        </div>
        <div class="popup-btn">
          <el-button @click="saveBtn" class="sure">{{saveBtnText}}</el-button>
          <el-button @click="delBtn">{{delBtnText}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters,mapMutations } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    saveBtnText: {
      type: String,
      default: '保存'
    },
    delBtnText: {
      type: String,
      default: '删除'
    }
  },
  computed:{
    ...mapGetters(['showPopup'])
  },
  mounted(){
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
  methods: {
    saveBtn() {
      this.$emit('save')
      this.setShow(false)
    },
    delBtn() {
      this.$emit('del')
      this.setShow(false)
    },
    closeBtn() {
      this.setShow(false)
    },
    ...mapMutations({setShow:'SET_SHOW_POPUP'})
  }
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
}
#popup .popup-wrapper {
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