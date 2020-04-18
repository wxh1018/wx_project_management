<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      uId: ""
    };
  },
  created() {
    // this.resh();
    if (!localStorage.phone1) {
      this.$router.push("/login");
    }else{
      this.$router.push("/");
    }
  },
  computed: {},
  methods: {}
};
</script>
<style>
.basebtn {
  width: 120px;
  height: 40px;
  border: 1px solid #409eff;
  background: #202e63;
  color: white;
  outline: none;
  margin: 0 20px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.basebtn:hover {
  color: gold;
}
.el-upload-list__item-name {
  color: #00e1fd !important;
}
.el-progress__text {
  color: #00e1fd !important;
}
.el-dialog {
  width: 82% !important;
  height: 75% !important;
  border: 1px solid #fff;
  background: #000c3b !important;
}
.addproject {
  width: 150px !important;
}
.el-breadcrumb__inner {
  color: white !important;
}
.distpicker-address-wrapper select {
  background: #000c3b !important;
  border: 1px solid #6b79a8 !important;
  border-radius: 0px !important;
  color: white !important;
  width: 90px !important;
}
.el-input__inner {
  background: none !important;
  color: #fff !important;
  border: 1px solid #000c3b !important;
}
.el-textarea__inner {
  padding: 0px 5px !important;
  border-radius: 0 !important;
  background: #000c3b !important;
  border: none !important;
  color: white !important;
}
.el-dialog__body {
  height: 82% !important;
}
.el-progress-bar {
  padding-right: 50px;
  width: 80% !important;
  margin-right: -55px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
