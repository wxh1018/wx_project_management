<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    this.$store.commit("setPhone", localStorage.phone);
  }
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
.el-progress__text{
  color: #00e1fd!important;
}
</style>
