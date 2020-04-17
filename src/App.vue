<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    this.resh();
    this.person();
    this.$store.commit("setPhone", localStorage.phone);
    this.base.AddStyle(`
      .el-input__inner {
          background: none !important;
          color: #fff !important;
          border: 1px solid #000c3b !important;
      }`);
    this.root();
  },
  computed: {
    uId() {
      return this.$store.state.root.uId;
    },
    phone() {
      return this.$store.state.phone;
    }
  },
  methods: {
    // 人员
    person() {
      let params = { uId: this.uId };
      this.$axios.post(this.baseurl + "/manage/findAll", params).then(data => {
        this.$store.commit("set_person", data.data);
        // this.direction = data.data.方向负责人;
        // this.ResponsiblePerson = data.data.分管负责人;
        // this.projectLeader = data.data.项目负责人;
        // this.participant = data.data.参与人员;
        // console.log(this.direction);
      });
    },
    resh() {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem("store"))
          )
        );
        sessionStorage.removeItem("store");
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      });
    },
    root() {
      this.$axios
        .post(this.baseurl + "/manage/selPhone", { phone: this.phone })
        .then(data => {
          let str = data.data[0].grade.trim();
          let fg =
            str == "方向负责人" || str == "分管负责人" || str == "项目负责人";
          if (fg) {
            this.$store.commit("set_grade", 1);
          } else {
            this.$store.commit("set_grade", 2);
          }
          this.$store.commit("set_user_msg", data.data[0]);
        });
    }
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
