<template>
  <div class="distribution">
    <!-- 主要 -->
    <div class="distributionmain">
      <table class="distributiontable" border="1">
        <tr>
          <td>项目编号</td>
          <td>{{this.projectNum}}</td>
          <td>项目名称</td>
          <td>{{this.projectNam}}</td>
        </tr>
        <tr>
          <td>可分配产值(万元)</td>
          <td>{{this.distributableValue}}</td>
          <td>2020年分配比例(%)</td>
          <td>
            <el-input v-model="proportion" placeholder="请输入"></el-input>
          </td>
        </tr>
        <tr>
          <td>2020年可分配产值(万元)</td>
          <!-- <td>{{(this.proportion == "")?"":(this.distributableValue * this.proportion).toFixed(2)/100}}</td> -->
          <td>
            <el-input v-model="twoalready"></el-input>
          </td>
          <td>分配人员</td>
          <td>
            <el-select v-model="personnel" placeholder="请选择">
              <el-option v-for="item in personneloptions" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>人员分配比例(%)</td>
          <td>
            <el-autocomplete
              class="inline-input"
              v-model="people"
              :fetch-suggestions="querySearch"
              placeholder="请输入分配比例"
              @select="handleSelect"
            ></el-autocomplete>
          </td>
          <td>分配产值</td>
          <td>{{(this.people == "")?"":(this.people * this.distributableValue * this.proportion).toFixed(2)/100/100}}</td>
        </tr>
      </table>
    </div>

    <p v-show="isshow" class="notice">注意：本项目产值已经分配给{{pNum}}个成员，还可分配比例为{{100-hasbili}}%</p>
    <!-- 按钮 -->
    <div class="distributionbutton">
      <el-button class="distributionbuttonmin" type="primary" @click="allocation()">确认产值分配</el-button>
      <!-- <el-button class="distributionbuttonmin" type="primary" @click="allocationdetail()">查看项目产值分配详情</el-button> -->
      <el-button class="distributionbuttonmin" type="primary" @click="close3()">关闭</el-button>
    </div>
    <!-- 表格 -->
    <div class="allocationmain">
      <table class="allocationtable" border="1">
        <tr>
          <th>项目编号</th>
          <th>项目名称</th>
          <th>可分配产值(万)</th>
          <th>分配比例(%)</th>
          <th>可分配产值(万)</th>
          <th>分配人员</th>
          <th>人员分配比例(%)</th>
          <th>分配产值</th>
          <th width="20%">操作</th>
        </tr>
        <tr v-for="(item,index) in changeallocationdata" :key="index">
          <td>{{item.projectNum}}</td>
          <td>{{item.projectNam}}</td>
          <td>{{item.distributableValue}}</td>
          <td>{{item.currentDistributionRatio}}%</td>
          <td>{{item.currentDistributableValue}}</td>
          <td>{{item.personnel}}</td>
          <td>{{item.distributionRatio}}%</td>
          <td>{{item.distributionOutput}}</td>
          <td>
            <el-button
              type="primary"
              class="allocationbutton"
              @click="changeallocation(item.id)"
            >更改产值分配</el-button>
            <el-button
              type="primary"
              class="allocationbutton allocationbutton2"
              @click="delete1(item.id)"
            >删除</el-button>
          </td>
        </tr>
        <tr v-if="this.changeallocationdata == ''">
          <td colspan="9">此项目暂无产值分配</td>
        </tr>
      </table>
    </div>
    <!-- 更改产值分配弹窗 -->
    <el-dialog :visible.sync="allocationdialogVisible">
      <dialogallcation v-on:close2="close2" :name="na" :message="emit"></dialogallcation>
    </el-dialog>
  </div>
</template>

<script>
import dialogallcation from "../components/dialogallcation";
export default {
  // computed: {
  //   twoalready() {
  //     let a =
  //       this.proportion == ""
  //         ? ""
  //         : (this.distributableValue * this.proportion).toFixed(2) / 100;
  //     return a;
  //   }
  // },
  components: {
    dialogallcation: dialogallcation
  },
  props: ["message"],
  data() {
    return {
      valueId: "",
      isshow: false,
      // 字符串
      id: "",
      // 项目编号
      projectNum: "",
      // 项目名称
      projectNam: "",
      // 可分配产值
      distributableValue: "",
      // 2020年分配比例
      proportion: "",
      twoalready: "",
      // 分配人员
      personnel: "",
      // 人员分配比例
      people: "",

      // 数组
      // 分配人员
      personneloptions: [
        {
          value: "丁振强"
        },
        {
          value: "孙结松"
        },
        {
          value: "冉旭"
        },
        {
          value: "陈义"
        },
        {
          value: "王苗苗"
        },
        {
          value: "张礼响"
        },
        {
          value: "李璇"
        },
        {
          value: "于乐美"
        },
        {
          value: "严晶"
        },
        {
          value: "程真"
        }
      ],
      // 人员分配比例
      peopleoptions: [
        {
          label: "5%",
          value: "5"
        },
        {
          label: "10%",
          value: "10"
        },
        {
          label: "15%",
          value: "15"
        },
        {
          label: "20%",
          value: "20"
        },
        {
          label: "25%",
          value: "25"
        },
        {
          label: "30%",
          value: "30"
        },
        {
          label: "35%",
          value: "35"
        },
        {
          label: "40%",
          value: "40"
        },
        {
          label: "45%",
          value: "45"
        },
        {
          label: "50%",
          value: "50"
        },
        {
          label: "55%",
          value: "55"
        },
        {
          label: "60%",
          value: "60"
        },
        {
          label: "65%",
          value: "65"
        },
        {
          label: "70%",
          value: "70"
        },
        {
          label: "75%",
          value: "75"
        },
        {
          label: "80%",
          value: "80"
        },
        {
          label: "85%",
          value: "85"
        },
        {
          label: "90%",
          value: "90"
        },
        {
          label: "95%",
          value: "95"
        },
        {
          label: "100%",
          value: "100"
        }
      ],
      changeallocationdata: [],
      allocationdata: [],
      allocationdialogVisible: false,
      emit: "",
      na: "",
      twoData: [],
      pNum: "", //可分配人员
      hasbili: "" //可分配比例
    };
  },
  methods: {
    changeallocation(a) {
      this.allocationdialogVisible = true;
      this.emit = a;
      console.log(a);
    },
    //删除
    delete1(v) {
      // let _this = this;
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(this.baseurl+"/pv/del", { id: v })
            .then(data => {
              console.log(data);
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.gettwodata();
              this.noti();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelect(item) {
      console.log(item);
    },
    close3() {
      this.changeallocationdata = [];
      this.$emit("close1");
    },
    close2() {
      // this.changeallocationdata = []
      this.allocationdialogVisible = false;
      this.gettwodata();
    },
    querySearch(queryString, cb) {
      var restaurants = this.peopleoptions;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    distribution() {
      this.gettwodata();
      this.$axios
        .post(this.baseurl+"/ps/selPV", {
          id: this.id
        })
        .then(res => {
          console.log(res);
          this.projectNum = res.data[0].projectNum;
          // this.na =  this.projectNum
          this.projectNam = res.data[0].projectNam;
          this.distributableValue = res.data[0].distributableValue;
          this.personnel = res.data[0].participant;
          let arr = this.personnel.split(",");
          this.personnel = this.personnel.split(",")[0];
          this.valueId = res.data[0].id;
          let arr1 = [];
          arr.forEach(v => {
            arr1.push({ value: v });
          });
          this.personneloptions = arr1;
          console.log(this.twoalready);
        });
    },
    // 确认产值分配按钮
    allocation() {
      if (this.proportion == "") {
        this.$message({
          message: "请输入2020年分配比例",
          type: "error"
        });
      } else if (this.people == "") {
        this.$message({
          message: "请输入人员分配比例",
          type: "error"
        });
      } else {
        let params = {
          id: this.id,
          projectNum: this.projectNum,
          projectNam: this.projectNam,
          distributableValue: this.distributableValue,
          currentDistributionRatio: this.proportion,
          // currentDistributableValue:
          //   (this.distributableValue * this.proportion).toFixed(2) / 100,
          currentDistributableValue: this.twoalready,
          personnel: this.personnel,
          distributionRatio: this.people,
          pId: this.valueId,
          distributionOutput:
            (this.people * this.distributableValue * this.proportion).toFixed(
              2
            ) /
            100 /
            100
        };
        console.log(params);
        this.$axios
          .post(this.baseurl+"/pv/save", params)
          .then(res => {
            if (res.data.msg == "OK") {
              console.log(res);
              this.$axios
                .post(this.baseurl+"/pv/selNum", {
                  projectNum: this.projectNum
                })
                .then(res => {
                  console.log(res);
                });
              // this.changeallocationdata.push(params);
              this.$message({
                message: "产值分配更改成功",
                type: "success"
              });
              this.gettwodata();
              this.noti();
              // setTimeout(function() {
              //   router.push({
              //     path: "/allocation",
              //     query: { projectNum: this.projectNum }
              //   });
              // location.reload();
              // }, 1000);
            } else {
              this.$message({
                message: "更改失败" + res.data.msg,
                type: "error"
              });
            }
          });
      }
    },
    // 查看产值分配按钮
    allocationdetail() {
      this.$router.push({
        path: "/allocation",
        query: { projectNum: this.projectNum }
      });
    },
    gettwodata() {
      this.$axios.post(this.baseurl+"/pv/selNum", {
        phone:this.$store.state.phone
      }).then(res => {
        // this.$store.commit("setdata", res.data);
        // this.$store.commit("setIsone", true);
        console.log(res);
        res.data.length == 0 ? (this.isshow = false) : (this.isshow = true);
        this.changeallocationdata = res.data.filter(
          v => v.projectNum == this.projectNum
        );
      });
    },
    noti() {
      //      this.baseurl+ /pv/selCount 个数
      //this.baseurl+ /pv/selRatio 比例
      this.$axios
        .post(this.baseurl+"/pv/selCount", {
          projectNum: this.projectNum
        })
        .then(data => {
          console.log(data);
          this.pNum = data.data;
        });
      this.$axios
        .post(this.baseurl+"/pv/selRatio", {
          projectNum: this.projectNum
        })
        .then(data => {
          console.log(data);
          this.hasbili = data.data;
        });
    }
  },
  watch: {
    message(v) {
      this.id = v;
      console.log(v);
      this.distribution();
      // this.gettwodata();
    },
    proportion() {
      this.twoalready =
        this.proportion == ""
          ? ""
          : (this.distributableValue * this.proportion).toFixed(2) / 100;
    }
  },
  mounted() {
    this.$em.$on("updata", () => {
      console.log("收到");
      this.distribution();
    });
    this.id = this.message;
    this.$axios
      .post(this.baseurl+"/ps/selPV", {
        id: this.id
      })
      .then(res => {
        console.log(res);
        res.data.length == 0 ? (this.isshow = false) : (this.isshow = true);
        this.projectNum = res.data[0].projectNum;
        this.projectNam = res.data[0].projectNam;
        this.distributableValue = res.data[0].distributableValue;
        this.personnel = res.data[0].participant;
        let arr = this.personnel.split(",");
        this.personnel = this.personnel.split(",")[0];

        this.valueId = res.data[0].id;
        let arr1 = [];
        arr.forEach(v => {
          arr1.push({ value: v });
        });
        this.personneloptions = arr1;
        this.twoalready =
          this.proportion == ""
            ? ""
            : (this.distributableValue * this.proportion).toFixed(2) / 100;
        console.log(this.twoalready);
        this.gettwodata();
        this.noti();
      });
  }
};
</script>

<style>
.distribution {
  width: 100%;
  height: 50%;
}
.distributionmain {
  width: 100%;
  height: 90%;
  overflow: hidden;
}
.distributiontable {
  width: 100%;
  height: 100%;
  border: 1.5px solid #6b79a8;
  text-align: center;
}
.distributiontable tr td {
  height: 50px;
  font-size: 17px;
  color: #00e1fd;
  width: 10%;
}
.distributionbutton {
  width: 20%;
  height: 10%;
  margin-left: 40%;
  margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.distributionbuttonmin {
  height: 80%;
  line-height: 0 !important;
  background: #10193f !important;
}
.distributionbuttonmin:hover {
  background: #202e63 !important;
  color: gold !important;
}
.el-select {
  width: 100% !important;
}
.allocationmain {
  height: 82% !important;
  overflow: auto;
}
.allocationbutton {
  width: 50% !important;
  font-size: 12px !important;
}
.allocationbutton2 {
  width: 25% !important;
}
.notice {
  color: red;
  position: absolute;
  top: 46%;
}
</style>