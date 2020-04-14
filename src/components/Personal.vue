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
            <li v-for="(item, id) in ResponsiblePerson" :key="id">
              <p>{{item.person}}</p>
              <button @click="del(1,item.id)">删除</button>
            </li>
            <li class="none" v-if="ResponsiblePerson.length == 0">暂无数据</li>
          </ul>
          <button class="add" @click="add(0)">添加</button>
        </li>
        <li>
          <h1>分管负责人</h1>
          <ul class="inlist">
            <li v-for="(item, id) in ResponsiblePerson" :key="id">
              <p>{{item.person}}</p>
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
              <p>{{item.person}}</p>
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
              <p>{{item.person}}</p>
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
  computed: {},
  watch: {},
  created() {
    this.getdata();
    this.$store.commit('set_active','Personal')
  },
  mounted() {},
  methods: {
    getdata() {
      let params = { phone: this.$store.state.phone };
      this.$axios.post(this.baseurl + "/ps/selRP", params).then(data => {
        this.ResponsiblePerson = data.data;
        console.log(1, data.data);
      });
      this.$axios.post(this.baseurl + "/ps/selPL", params).then(data => {
        this.projectLeader = data.data;
        console.log(2, data.data);
      });
      this.$axios.post(this.baseurl + "/ps/selPP", params).then(data => {
        this.participant = data.data;
      });
    },
    del(a, b) {
      let params = { id: b };
      if (a == 1) {
        let obj = this.ResponsiblePerson.filter(v => v.id == b)[0];

        this.$confirm(`此操作将删除<${obj.person}>负责人, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios
              .post(this.baseurl + "/ResponsiblePerson/delPerson", params)
              .then(() => {
                this.$message({
                  type: "success",
                  message: `已删除分管负责人${obj.person}`
                });
                let index = this.ResponsiblePerson.indexOf(obj); //删除的索引
                this.ResponsiblePerson.splice(index, 1);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });

        return;
      }
      if (a == 2) {
        let obj = this.projectLeader.filter(v => v.id == b)[0];
        this.$confirm(`此操作将删除<${obj.person}>负责人, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios
              .post(this.baseurl + "/projectLeader/delPerson", params)
              .then(() => {
                this.$message({
                  type: "success",
                  message: `已删除项目负责人${obj.person}`
                });
                let index = this.projectLeader.indexOf(obj); //删除的索引
                this.projectLeader.splice(index, 1);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
        return;
      }
      if (a == 3) {
        let obj = this.participant.filter(v => v.id == b)[0];
        console.log(obj);
        this.$confirm(`此操作将删除<${obj.person}>负责人, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios
              .post(this.baseurl + "/participant/delPerson", params)
              .then(() => {
                this.$message({
                  type: "success",
                  message: `已删除参与人员${obj.person}`
                });
                let index = this.participant.indexOf(obj); //删除的索引
                this.participant.splice(index, 1);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
        return;
      }
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
      let params = { person: this.iptvalue, phone: this.$store.state.phone };
      if (this.iptvalue == "") {
        this.tip(`请输入${this.title}`);
        return;
      }
      //判断手机号
      if(!this.regular.phone(this, this.iptphone))return;

      if (this.content == 1) {
        //分管
        this.$axios
          .post(this.baseurl + "/ResponsiblePerson/addPerson", params)
          .then(() => {
            this.$message({ type: "success", message: "分管负责人添加成功" });
            this.isshow = false;
            this.getdata();
            this.iptvalue = "";
          });
      } else if (this.content == 2) {
        //项目
        this.$axios
          .post(this.baseurl + "/projectLeader/addProjectLeader", params)
          .then(data => {
            console.log(data);
            this.$message({ type: "success", message: "项目负责人添加成功" });
            this.isshow = false;
            this.getdata();
            this.iptvalue = "";
          });
      } else if (this.content == 0) {
        //反向负责人
        console.log("方向负责人");
      } else {
        //参与人员
        this.$axios
          .post(this.baseurl + "/participant/addPerson", params)
          .then(data => {
            console.log(data);
            this.$message({ type: "success", message: "参与人员添加成功" });
            this.isshow = false;
            this.getdata();
            this.iptvalue = "";
          });
      }
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
  width: 30%;
  height: 100%;
  /* border: 1px solid red; */
  position: relative;
  border-right: 1px dashed white;
}
.list > li:nth-last-child(1){
  border:none
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
  display: flex;
  flex-flow: column;
  align-items: center;
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
  width: 66%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inlist li button {
  width: 20%;
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