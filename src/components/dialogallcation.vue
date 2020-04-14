<template>
  <div class="dialogallcation">
    <!-- 主要 -->
    <div class="dialogallcationmain">
      <table class="dialogallcationtable" border="1">
        <tr>
          <td>项目编号</td>
          <td>{{this.projectNum}}</td>
          <td>项目名称</td>
          <td>{{this.projectNam}}</td>
        </tr>
        <tr>
          <td>可分配产值(万元)</td>
          <!-- <td>{{this.distributableValue}}</td> -->
          <td>
            <el-input v-model="distributableValue"></el-input>
          </td>
          <td>2020年分配比例(%)</td>
          <td>
            <el-input v-model="proportion" placeholder="请输入"></el-input>
          </td>
        </tr>
        <tr>
          <td>2020年可分配产值(万元)</td>
          <td>{{(this.proportion == "")?"":(this.distributableValue * this.proportion).toFixed(2)/100}}</td>
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
            <!-- <el-select v-model="people" placeholder="请选择">
              <el-option
                v-for="item in peopleoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
            <el-autocomplete
              class="inline-input"
              v-model="people"
              :fetch-suggestions="querySearch"
              placeholder="请输入分配比例"
              @select="handleSelect"
            ></el-autocomplete>
          </td>
          <td>分配产值</td>
          <td>{{(this.people == "")?"":(this.people * this.distributableValue * this.proportion).toFixed(2)/10000}}</td>
        </tr>
      </table>
    </div>

    <!-- 按钮 -->
    <div class="dialogallcationbutton">
      <el-button class="dialogallcationbuttonmin" type="primary" @click="updatedialog()">确认更改产值分配</el-button>
    </div>
  </div>
</template>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script>
export default {
  props: ["message", "name"],
  data() {
    return {
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
      ]
    };
  },
  computed: {
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
    querySearch(queryString, cb) {
      console.log(queryString);
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
    // 接收父组件id渲染默认数据进行修改
    dialogallcation() {
      this.$axios
        .post(this.baseurl + "/pv/selId", {
          id: this.id
        })
        .then(res => {
          (this.projectNum = res.data[0].projectNum),
            (this.projectNam = res.data[0].projectNam),
            (this.distributableValue = res.data[0].distributableValue),
            (this.proportion = res.data[0].currentDistributionRatio),
            (this.personnel = res.data[0].personnel),
            (this.people =''+ res.data[0].distributionRatio);
        });
    },
    // 更改产值分配按钮
    updatedialog() {
      if (this.proportion == "") {
        this.$message({
          message: "请输入2020年分配比例",
          type: "error"
        });
      } else if (this.personnel == "") {
        this.$message({
          message: "请输入分配人员",
          type: "error"
        });
      } else if (this.people == "") {
        this.$message({
          message: "请输入人员分配比例",
          type: "error"
        });
      } else {
        this.$axios
          .post(this.baseurl + "/pv/update", {
            id: this.id,
            projectNum: this.projectNum,
            projectNam: this.projectNam,
            distributableValue: this.distributableValue,
            currentDistributionRatio: this.proportion,
            currentDistributableValue:
              (this.distributableValue * this.proportion).toFixed(2) / 100,
            personnel: this.personnel,
            distributionRatio: this.people,
            distributionOutput:
              (this.people * this.distributableValue * this.proportion).toFixed(
                2
              ) / 10000
          })
          .then(res => {
            console.log(res.data);
            if (res.data.msg == "OK") {
              this.$message({
                message: "产值分配更改成功",
                type: "success"
              });
              this.$em.$emit('close')
              this.$emit("close2");
            } else {
              this.$message({
                message: "更改失败" + res.data.msg,
                type: "error"
              });
            }
          });
      }
    },
    getFenPei() {
      let params = { phone: this.$store.state.phone };
      this.$axios.post(this.baseurl + "/ps/selPP", params).then(data => {
        console.log(data);
        //展示参与人员
        let arr = [];
        data.data.forEach(v => {
          arr.push({ value: v.person.trim() });
        });
        this.personneloptions = arr;
      });
    }
  },
  watch: {
    message(v) {
      this.id = v;
      this.dialogallcation();
      console.log(v);
    },
    name(v) {
      console.log(v);
    }
  },
  mounted() {
    this.getFenPei();
    console.log(this.name);
    console.log(this.message);
    this.id = this.message;
    this.$axios
      .post(this.baseurl + "/pv/selId", {
        id: this.id
      })
      .then(res => {
        console.log(res);
        if (res.data.length == 0) {
          this.$message({
            message: "暂无数据",
            type: "error"
          });
          return;
        }
        console.log(res);
        (this.projectNum = res.data[0].projectNum),
          (this.projectNam = res.data[0].projectNam),
          (this.distributableValue = res.data[0].distributableValue),
          (this.proportion = res.data[0].currentDistributionRatio),
          (this.personnel = res.data[0].personnel),
          (this.people = ''+res.data[0].distributionRatio);

      });
  }
};
</script>

<style>
.v-modal {
  z-index: -1 !important;
}
.dialogallcation {
  width: 100%;
  height: 100%;
}
.dialogallcationmain {
  width: 100%;
  height: 90%;
  overflow: hidden;
}
.dialogallcationtable {
  width: 100%;
  height: 100%;
  border: 1.5px solid #6b79a8;
  text-align: center;
}
.dialogallcationtable tr td {
  height: 50px;
  font-size: 17px;
  color: #00e1fd;
  width: 10%;
}
.dialogallcationbutton {
  width: 20%;
  height: 10%;
  margin-left: 40%;
  margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.dialogallcationbuttonmin {
  height: 80%;
  line-height: 0 !important;
  background: #10193f !important;
}
.dialogallcationbuttonmin:hover {
  background: #202e63 !important;
  color: gold !important;
}
.el-select {
  width: 100% !important;
}
</style>