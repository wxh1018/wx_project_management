<template>
  <div class="top">
    <!-- 头部面包屑 -->
    <div class="mianbao">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>个人中心 ></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <main>
      <p class="phone">尊敬的用户：{{this.$store.state.phone}}</p>
      <ul class="list">
        <li>
          <h1>方向负责人</h1>
          <ul class="inlist">
            <li v-for="(item, id) in direction" :key="id">
              <p>{{item.name}}{{item.phone | filter_phone}}</p>
              <button @click="del(1,item.id)">删除</button>
            </li>
            <li class="none" v-if="direction.length == 0">暂无数据</li>
          </ul>
          <button class="add" @click="add(0)">添加</button>
        </li>
        <li>
          <h1>分管负责人</h1>
          <ul class="inlist">
            <li v-for="(item, id) in ResponsiblePerson" :key="id">
              <p>{{item.name}}{{item.phone | filter_phone}}</p>
              <button @click="del(1,item.id)">删除</button>
            </li>
            <li class="none" v-if="ResponsiblePerson.length == 0">暂无数据</li>
          </ul>
          <button class="add" @click="add(1)">添加</button>
        </li>
        <li>
          <h1>项目负责人</h1>
          <ul class="inlist">
            <li v-for="(item, id) in projectLeader" :key="id">
              <p>{{item.name}}{{item.phone | filter_phone}}</p>
              <button @click="del(2,item.id)">删除</button>
            </li>
            <li class="none" v-if="projectLeader.length == 0">暂无数据</li>
          </ul>
          <button class="add" @click="add(2)">添加</button>
        </li>
        <li>
          <h1>参与人员</h1>
          <ul class="inlist">
            <li v-for="(item, id) in participant" :key="id">
              <p>{{item.name}}{{item.phone | filter_phone}}</p>
              <button @click="del(3,item.id)">删除</button>
            </li>
            <li class="none" v-if="participant.length == 0">暂无数据</li>
          </ul>
          <button class="add" @click="add(3)">添加</button>
        </li>
      </ul>
    </main>
    <div class="dialog" v-show="isshow">
      <h1>{{title}}</h1>
      <input type="text" v-model="iptvalue" placeholder="请输入负责人" />
      <input type="text" v-model="iptphone" placeholder="请输入手机号" />
      <div class="btn">
        <button @click="des">取消</button>
        <button @click="sure">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isshow: "",
      iptvalue: "",
      iptphone: "",
      content: "", //判断是哪一个
      title: "",
      direction: "", //方向负责人
      ResponsiblePerson: [], //分管数据
      projectLeader: [], //负责人
      participant: [] //参与人员
    };
  },
  components: {},
  computed: {
    uId() {
      return this.$store.state.root.uId;
    }
  },
  watch: {
    isshow(v) {
      if (!v) {
        this.iptvalue = "";
        this.iptphone = "";
      }
    }
  },
  created() {
    this.getdata();
    this.$store.commit("set_active", "Personal");
  },
  mounted() {},
  filters: {
    filter_phone(v) {
      return "—" + v;
    }
  },
  methods: {
    getdata() {
      let params = { uId: this.uId };
      this.$axios.post(this.baseurl + "/manage/findAll", params).then(data => {
        this.$store.commit('set_person',data.data)
        this.direction = data.data.方向负责人;
        this.ResponsiblePerson = data.data.分管负责人;
        this.projectLeader = data.data.项目负责人;
        this.participant = data.data.参与人员;
      });
    },
    del(a, b) {
      let params = { id: b };
      this.$confirm(`此操作将删除负责人, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(this.baseurl + "/manage/delManage", params)
            .then(() => {
              this.$message({
                type: "success",
                message: `已删除负责人`
              });
              this.getdata();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add(i) {
      this.isshow = !this.isshow;
      this.content = i;
      i == 1
        ? (this.title = "分管负责人")
        : i == 2
        ? (this.title = "项目负责人")
        : i == 3
        ? (this.title = "参与人员")
        : (this.title = "方向负责人");
    },
    //取消
    des() {
      this.isshow = !this.isshow;
      this.iptvalue = "";
    },
    //确认添加
    sure() {
      let params = {
        grade: this.title,
        name: this.iptvalue,
        phone: this.iptphone,
        uId: this.uId
      };
      if (this.iptvalue == "") {
        this.tip(`请输入${this.title}`);
        return;
      }
      //判断手机号
      if (!this.regular.phone(this, this.iptphone)) return;
      //分管
      this.$axios
        .post(this.baseurl + "/manage/addManage", params)
        .then(data => {
          console.log(data);
          this.$message({ type: "success", message: this.title + "添加成功" });
          this.isshow = false;
          this.getdata();
          this.iptvalue = "";
        });
    },
    tip(v) {
      this.$message({ type: "error", message: v });
    }
  }
};
</script>
<style scoped>
.top {
  width: 100%;
  height: 100%;
  /* border:1px solid red */
}
main {
  width: 95%;
  height: 90%;
  margin: 0 auto;
  /* border: 1px solid red; */
  padding: 10px 0;
  box-sizing: border-box;
}
.phone {
  color: white;
  font-size: 18px;
  display: inline-block;
  padding: 10px;
  border: 1px solid #354892;
}
.list {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.list > li {
  width: 24%;
  height: 100%;
  /* border: 1px solid red; */
  position: relative;
}
.list > li:nth-last-child(1) {
  border: none;
}
.list > li h1 {
  font-size: 20px;
  color: white;
  text-align: center;
}
.inlist {
  padding-top: 10px;
  width: 100%;
  height: 88%;
  /* display: flex;
  flex-flow: column;
  align-items: center; */
  overflow: auto;
}
.inlist::-webkit-scrollbar {
  background: white;
  width: 5px;
}
.inlist::-webkit-scrollbar-thumb {
  width: 5px;
  background: #354892;
  border-radius: 10px;
}
.inlist li {
  width: 88%;
  height: 50px;
  margin: 2px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.inlist li p {
  color: white;
  border: 1px solid white;
  height: 80%;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inlist li button {
  width: 25%;
  height: 80%;
  font-size: 16px;
  background: rgba(34, 48, 103);
  color: white;
  border: 1px solid #354892;
  cursor: pointer;
}
.add {
  position: absolute;
  width: 80%;
  height: 50px;
  background: #3f529e;
  border: 1px solid #354892;
  color: white;
  margin-left: -40%;
  bottom: 0;
  left: 50%;
  font-size: 16px;
  cursor: pointer;
  outline: none;
}
.el-dialog {
  width: 30% !important;
}
.dialog {
  position: absolute;
  width: 400px;
  top: 30%;
  height: 300px;
  z-index: 99;
  left: 50%;
  margin-left: -200px;
  border: 1px solid skyblue;
  border-radius: 5px;
  background: rgba(0, 12, 59, 0.8);
  display: flex;
  flex-flow: column;
  align-items: center;
}
.dialog h1 {
  color: white;
  font-size: 20px;
  padding: 10px;
}
.dialog input {
  width: 70%;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  border: none;
  font-size: 16px;
  margin-top: 20px;
}
.dialog .btn {
  width: 80%;
  height: 50px;
  display: flex;
  justify-content: space-between;
}
.dialog .btn button {
  width: 48%;
  height: 100%;
  background: #354892;
  color: white;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 40px;
}
.none {
  width: 100%;
  color: red;
  text-align: center;
  display: flex;
  justify-content: center !important;
  border: 1px solid #354892;
}
</style>