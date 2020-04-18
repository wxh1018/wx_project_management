<template>
  <div class="login">
    <!-- 背景图片 -->
    <img src="../assets/login.jpg" alt class="backgroundimg" />

    <!-- 登陆盒子 -->
    <div class="loginbox">
      <!-- 登陆名称 -->
      <div class="loginphone">
        <div class="logo">
          <img :src="this.$store.state.logo" alt />
        </div>
        {{this.$store.state.title}}
      </div>
      <!-- input选择框 -->
      <div class="inputselect">
        <el-input v-model="phone" placeholder="请输入手机号" class="logininput"></el-input>
        <div class="code">
          <el-input v-model="code" placeholder="请输入验证码" class="logininput" show-code></el-input>
          <button class="getCode" @click="getCode">{{btnmsg}}</button>
        </div>
      </div>
      <!-- 登陆按钮 -->
      <div class="loginbutton">
        <el-button type="primary" class="denglu" @click="loginin()">登陆</el-button>
      </div>
    </div>
    <footer class="foot">
      <span>Copyright © 2019-2020 江苏纬信工程咨询有限公司 版权所有</span>
      技术支持：江苏智城慧宁交通科技有限公司 苏ICP备16017949号-3
    </footer>
  </div>
</template>

<script>
let timer = null;
export default {
  data() {
    return {
      phone: "",
      code: "",
      btnmsg: "获取验证码",
      isClick: false,
      truecode: "",
      truePhone: ""
    };
  },
  mounted() {
    let phone = localStorage.getItem("phone1");
    if (phone) {
      console.log(1);
      this.$router.push("/project");
    }
  },
  methods: {
    loginin() {
      if (this.phone == "") {
        this.$message({
          message: "请输入手机号",
          type: "error"
        });
        return;
      }
      //超级管理员
      if (this.code == 88888888) {
        if (!this.phoneFg(this.phone)) {
          return;
        }
        this.tologin();
        return;
      }
      if (this.code == "") {
        this.$message({
          message: "请输入验证码",
          type: "error"
        });
        return;
      }
      if (this.code != this.truecode) {
        this.$message({
          message: "验证码有误，请检查！",
          type: "error"
        });
        return;
      }
      if (this.phone != this.truePhone) {
        this.$message({
          message: "检测到当前手机号，不是获取验证码的手机号，请重试！",
          type: "error"
        });
        return;
      }
      this.tologin();
    },
    tologin() {
      this.$axios
        .post(this.baseurl + "/user/phoneLogin", {
          phone: this.phone
        })
        .then(data => {
          console.log(data.data.data);
          if (data.data.data == "无此账号") {
            this.base.warn(this, "暂无此账号");
            return;
          }
          this.$message({
            message: "登陆成功！ 尊敬的" + this.phone + "用户",
            type: "success"
          });
          localStorage.setItem("phone1", this.phone);
          this.$store.commit("setPhone", this.phone);
          var userphone = this.phone;
          localStorage.setItem("user", JSON.stringify(userphone));
          console.log("1");
          this.$router.push("/project");
        });
    },
    // 获取验证码
    getCode() {
      if (!this.phoneFg(this.phone)) {
        //判断手机号格式
        return;
      }
      this.$axios
        .post(this.baseurl + "/user/phoneLogin", {
          phone: this.phone
        })
        .then(data => {
          console.log(data.data.data);
          if (data.data.data == "无此账号") {
            this.base.warn(this, "暂无此账号");
          } else {
            sendmsg();
          }
        });
      //   请求发短信
      var sendmsg = () => {
        if (!this.isClick) {
          this.random();
          var contenttext =
            "您的手机验证码为:" +
            this.truecode +
            "。工作人员不会向您索要，如果不是本人操作请忽略";
          this.$axios
            .post("/api", {
              phonenum: this.phone,
              contenttext
            })
            .then(data => {
              this.truePhone = this.phone;
              console.log(data);
              this.$message.success("短信发送成功，请注意查收！");
            });
          this.isClick = true;
          this.btnmsg = "还剩下60秒";
          let n = 60;
          timer = setInterval(() => {
            n--;
            this.btnmsg = `还剩下${n}秒`;
            if (n == 0) {
              clearInterval(timer);
              this.btnmsg = "获取验证码";
              this.isClick = false;
            }
          }, 1000);
        }
      };
    },
    // 检验手机号格式
    phoneFg(v) {
      if (v == "") {
        this.$message({
          message: "请输入手机号",
          type: "error"
        });
        return;
      }
      var fg = /^(1[3|5|6|7|8|9])\d{9}$/.test(v);
      if (!fg) {
        this.$message({
          message: "手机号格式错误",
          type: "error"
        });
      }
      return fg;
    },
    // 随机数
    random() {
      let n = "";
      for (let i = 0; i < 6; i++) {
        n += parseInt(Math.random() * 10);
      }
      this.truecode = n;
      //   setTimeout(()=>{
      //     this.truecode = ''
      //   },60000)
    }
  }
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}
.backgroundimg {
  width: 100%;
  height: 100%;
  position: absolute;
}
.loginbox {
  width: 30%;
  height: 45%;
  background-color: rgba(86, 117, 170, 0.8);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  opacity: 0.9;
  border-radius: 20px;
  box-shadow: 4px 4px 4px #0e326e;
}
.loginphone {
  width: 100%;
  height: 30%;
  background: #0e326e;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #fff;
  font-weight: 600;
  border-bottom: 2px solid #061a3b;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
.inputselect {
  width: 100%;
  height: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.inputselect input {
  color: white;
}
.logininput {
  width: 70%;
}
.el-input__inner {
  background: none !important;
  color: white !important;
}
.el-input__inner::placeholder {
  color: white;
}
.loginbutton {
  width: 100%;
  height: 22%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.denglu {
  width: 70%;
  background: #123a7e !important;
}
.denglu:hover {
  color: gold !important;
}
.foot {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  flex-flow: column;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 73, 126, 0.8);
}
.logo {
  width: 40px;
  top: 30px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
}
.logo img {
  width: 100%;
}
.code {
  width: 70%;
  display: flex;
  justify-content: space-between;
}
.getCode {
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  border: 1px solid black;
  color: white;
  background: rgba(17, 73, 126, 0);
  border-radius: 10px;
  position: relative;
  z-index: 999;
}
</style>
