<template>
  <div id="home">
    <!-- 全局布局 -->
    <el-container>
      <!-- 头部标题 -->
      <el-header style="position:relative">
        <img src="../assets/好经理.png" alt />
        <div class="logo1">
          <img :style="{left:this.$store.state.left}" :src="this.$store.state.logo" alt />
          {{this.$store.state.title}}
        </div>
        <!-- 用户按钮 -->
        <div class="userbutton">
          <img src="../assets/电源.png" alt @click="quit()" />
        </div>
        <!-- 用户名称 -->
        <div class="username">
          <b>{{this.$store.state.phone}}</b>
        </div>
      </el-header>
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside>
          <el-row class="tac">
            <el-col>
              <el-menu :default-active="active" :unique-opened="true" :router="true">
                <el-menu-item-group>
                  <el-menu-item index="project">
                    <i class="el-icon-setting"></i>项目管理
                  </el-menu-item>
                  <el-menu-item index="allocation">
                    <i class="el-icon-menu"></i>产值分配
                  </el-menu-item>
                  <el-menu-item index="Statistical">
                    <i class="el-icon-s-data"></i>统计分析
                  </el-menu-item>
                  <el-menu-item index="market">
                    <i class="el-icon-monitor"></i>市场跟踪
                  </el-menu-item>
                  <el-menu-item index="Personal">
                    <i class="el-icon-user-solid"></i>个人中心
                  </el-menu-item>
                </el-menu-item-group>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <!-- 中部主要 -->
          <el-main>
            <router-view />
          </el-main>
          <!-- 下部 -->
          <el-footer>
            <p>{{this.$store.state.title}}</p>
            <p>技术支持：江苏智城慧宁交通科技有限公司</p>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernamer: ""
    };
  },
  computed: {
    active() {
      return this.$store.state.active;
    }
  },
  methods: {
    // 退出按钮
    quit() {
      //清除localstorage里面的token 然后让页面跳转到登入
      localStorage.removeItem("user");
      localStorage.removeItem("phone");
      this.$router.push("/login");
    }
  },
  mounted() {
    this.usernamer = JSON.parse(localStorage.getItem("user"));
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#home {
  width: 100%;
  height: 100%;
  position: absolute;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  height: 70px !important;
  background-color: #000c3b;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #32479b;
  position: relative;
}
.el-header img {
  width: 85%;
  height: 90%;
  position: absolute;
}
.userbutton {
  width: 4%;
  height: 100%;
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.userbutton img {
  width: 55%;
  height: 45%;
}
.username {
  width: 6%;
  height: 100%;
  position: absolute;
  right: 4%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.username b {
  color: white;
  font-size: 18px;
}
.el-footer {
  height: 50px !important;
  width: 100%;
  background-color: #0e1c55;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #a0aad4;
}
.el-aside {
  background-color: #000c3b;
  text-align: center;
  border-right: 1px solid #32479b;
  width: 16% !important;
}
.el-main {
  padding: 7px !important;
  background-color: #000c3b;
  box-shadow: 10px 35px 100px #6e80ca;
}
.el-menu {
  border-right: none !important;
  background: none !important;
}
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-menu-item {
  border-right: none !important;
  color: white !important;
  border-bottom: 1px solid #354892;
}
.el-menu-item:hover {
  background: #354892 !important;
}
.el-menu-item:focus {
  background: #354892 !important;
  color: gold !important;
}
.logo1 {
  color: white;
  width: 700px;
  /* border: 1px solid red; */
  text-align: center;
  position: absolute;
  font-size: 30px;
  font-weight: 900;
  margin: 0 auto;
  pointer-events: none;
  padding: 0 60px;
  box-sizing: border-box;
}
.logo1 img {
  position: absolute;
  top: 3px;
  width: 50px;
}
.el-menu-item.is-active {
  color: gold !important;
}
</style>