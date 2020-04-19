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
          <h1>总体负责人</h1>
          <ul class="inlist">
            <li v-for="(item, id) in direction" :key="id">
              <p>{{item.name}}{{item.phone | filter_phone}}</p>
              <button v-show="show1" @click="del(1,item.id)">删除</button>
            </li>
            <li class="none" v-if="direction.length == 0">暂无数据</li>
          </ul>
          <button v-show="show1" class="add" @click="add(0)">添加</button>
        </li>
        <li>
          <h1>分管负责人</h1>
          <ul class="inlist">
            <li v-for="(item, id) in ResponsiblePerson" :key="id">
              <p>{{item.name}}{{item.phone | filter_phone}}</p>
              <button v-show="show2" @click="del(1,item.id)">删除</button>
            </li>
            <li class="none" v-if="ResponsiblePerson.length == 0">暂无数据</li>
          </ul>
          <button v-show="show2" class="add" @click="add(1)">添加</button>
        </li>
        <li>
          <h1>项目负责人</h1>
          <ul class="inlist">
            <li v-for="(item, id) in projectLeader" :key="id">
              <p>{{item.name}}{{item.phone | filter_phone}}</p>
              <button v-show="show3" @click="del(2,item.id)">删除</button>
            </li>
            <li class="none" v-if="projectLeader.length == 0">暂无数据</li>
          </ul>
          <button v-show="show3" class="add" @click="add(2)">添加</button>
        </li>
        <li>
          <h1>参与人员</h1>
          <ul class="inlist">
            <li v-for="(item, id) in participant" :key="id">
              <p>{{item.name}}{{item.phone | filter_phone}}</p>
              <button v-show="show4" @click="del(3,item.id)">删除</button>
            </li>
            <li class="none" v-if="participant.length == 0">暂无数据</li>
          </ul>
          <button v-show="show4" class="add" @click="add(3)">添加</button>
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
      participant: [], //参与人员
      uId: "",
      show1: true,
      show2: true,
      show3: true,
      show4: true,
      id: ""
    };
  },
  components: {},
  computed: {},
  watch: {
    isshow(v) {
      if (!v) {
        this.iptvalue = "";
        this.iptphone = "";
      }
    }
  },
  created() {
    this.$store.commit("set_active", "Personal");
  },
  mounted() {
    let phone = localStorage.phone1;
    this.$axios
      .post(this.baseurl + "/manage/selPhone", { phone: phone })
      .then(data => {
        console.log(data);
        this.$store.commit("set_user_msg", data.data[0]);
        this.id = data.data[0].id;
        this.uId = data.data[0].uId;
        this.getdata();
      });
  },
  filters: {
    filter_phone(v) {
      return ":" + v;
    }
  },
  methods: {
    getdata() {
      var params = {};
      if (this.uId == 0) {
        params = { uId: this.id };
      } else {
        params = { uId: this.uId };
      }
      console.log(params);
      this.$axios.post(this.baseurl + "/manage/findAll", params).then(data => {
        console.log(data);
        this.$store.commit("set_person", data.data);
        this.direction = data.data.方向负责人;
        this.ResponsiblePerson = data.data.分管负责人;
        this.projectLeader = data.data.项目负责人;
        this.participant = data.data.参与人员;

        for (let i = 0; i < this.participant.length; i++) {
          let s = this.participant[i].name.replace(/\s/g, "");
          for (let j = i + 1; j < this.participant.length - i; j++) {
            let e = this.participant[j].name.trim(/\s/, "");
            if (s == e) {
              this.participant.splice(j, 1);
            }
          }
        }
        this.participant.sort((a, b) => {
          return a.id - b.id;
        });
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
        : (this.title = "总体负责人");
    },
    //取消
    des() {
      this.isshow = !this.isshow;
      this.iptvalue = "";
    },
    //确认添加
    sure() {
      var params = {};
      var title = "";
      if (this.title == "总体负责人") {
        title = "方向负责人";
      } else {
        title = this.title;
      }
      if (this.uId == 0) {
        params = {
          grade: title,
          name: this.iptvalue.trim(),
          phone: this.iptphone,
          uId: this.id
        };
      } else {
        params = {
          grade: title,
          name: this.iptvalue.trim(),
          phone: this.iptphone,
          uId: this.uId
        };
      }
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
    autoadd() {
      let name = [
        "胡斌",
        "陈忠兵",
        "陈飞",
        "丁振强",
        "陈晨",
        "黄思思",
        "韩光",
        "魏永平",
        "孙如龙",
        "刘巧仙",
        "王可庆",
        "鲍辰瑜",
        "钱皓寅",
        "邱虹淦",
        "夏斯明",
        "孙结松",
        "沈颖洁",
        "孙志文",
        "赵玉洁",
        "丁品文",
        "冉旭",
        "金春良",
        "徐赛娜",
        "刘雨婷",
        "王苗苗",
        "陈义",
        "李璇",
        "许景蕊",
        "于乐美",
        "李云峰",
        "仲小燕",
        "张礼响",
        "严晶",
        "蔡云培",
        "胡小海",
        "程真",
        "檀文芳",
        "周洋",
        "史伟",
        "陈相州"
      ];
      let phone = [
        "13813930159",
        "13655197750",
        "13951685690",
        "15062262545",
        "13805161191",
        "17851226699",
        "15261415693",
        "13851691314",
        "15150671896",
        "13451868110",
        "13512540378",
        "13675149608",
        "13621598538",
        "15950525835",
        "18751844636",
        "18502554580",
        "15850595585",
        "18625152092",
        "15950477759",
        "13776442340",
        "18795898770",
        "13585148658",
        "18913348135",
        "18362981009",
        "15905168476",
        "13315434476",
        "15951904557",
        "18761606152",
        "18353135277",
        "15251866223",
        "18915996171",
        "15380967223",
        "18974537778",
        "13770712685",
        "13068307205",
        "17551080560",
        "18705190327",
        "18221806787",
        "18013997828",
        "18252088547"
      ];
      const auto = (name, phone) => {
        let n = 0;
        var timer = null;
        timer = setInterval(() => {
          let params = {
            grade: "参与人员",
            name: name[n],
            phone: phone[n],
            uId: 10
          };
          this.$axios
            .post(this.baseurl + "/manage/addManage", params)
            .then(data => {
              console.log(name[n] + "已导入成功" + n);
            });
          if (n == name.length - 1) {
            clearInterval(timer);
            return;
          }
          n++;
        }, 2000);
      };
      auto(name, phone);
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
  margin-right: 80px;
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