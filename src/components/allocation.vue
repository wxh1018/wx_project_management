<template>
  <div class="allocation">
    <!-- 头部面包屑 -->
    <div class="mianbao">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>产值分配 ></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-select clearable v-model="value1" class="clec1" placeholder="根据项目名查询">
      <el-option v-for="item in resetObj" :key="item.value" :value="item.value"></el-option>
    </el-select>
    <el-select clearable v-model="value2" class="clec1" placeholder="根据分配人员查询">
      <el-option v-for="item in resetPer" :key="item.value" :value="item.value"></el-option>
    </el-select>
    <el-button class="detailbuttonmin" type="primary" @click="out()">项目导出</el-button>
    <!-- 中部主要 -->
    <div class="allocationmain">
      <table class="allocationtable" id="tableExcel" border="1">
        <tr>
          <th>项目编号</th>
          <th>项目名称</th>
          <th>可分配产值(万元)</th>
          <th>2020年分配比例(%)</th>
          <th>2020可分配产值(万元)</th>
          <th>分配人员</th>
          <th>人员分配比例(%)</th>
          <th>分配产值(万元)</th>
          <th>操作</th>
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
          </td>
        </tr>
        <tr v-if="this.allocationdata == ''">
          <td colspan="9">暂无数据</td>
        </tr>
      </table>
    </div>
    <table id="outtable" style="display:none">
      <thead>
        <tr>
          <th>项目编号</th>
          <th>项目名称</th>
          <th>可分配产值(万元)</th>
          <th>2020年分配比例(%)</th>
          <th width="15%">2020可分配产值(万元)</th>
          <th>分配人员</th>
          <th>人员分配比例(%)</th>
          <th>分配产值(万元)</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="id" v-for="(item,id) in allocationdata">
          <td>{{item.projectNum}}</td>
          <td>{{item.projectNam}}</td>
          <td>{{item.distributableValue}}</td>
          <td>{{item.currentDistributionRatio}}%</td>
          <td>{{item.currentDistributableValue}}</td>
          <td>{{item.personnel}}</td>
          <td>{{item.distributionRatio}}%</td>
          <td>{{item.distributionOutput}}</td>
        </tr>
      </tbody>
    </table>
    <!-- 分页 -->
    <div class="allocationpaging">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :current-page.sync="currentPage3"
        :page-size.sync="pageSize"
        layout="prev, pager, next"
        :total="allocationdata.length"
      ></el-pagination>
    </div>

    <!-- 更改产值分配弹窗 -->
    <el-dialog :visible.sync="allocationdialogVisible">
      <dialogallcation :message="emit"></dialogallcation>
    </el-dialog>
  </div>
</template>


<script>
import dialogallcation from "../components/dialogallcation";
// import $ from "jquery";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  components: {
    dialogallcation: dialogallcation
  },
  data() {
    return {
      allocationdialogVisible: false,
      // 项目编号
      projectNum: "",
      // 产值分配数组
      changeallocationdata: [],
      // 分页
      currentPage3: 1,
      pageSize: 10,
      shujudata: [],
      allocationdata: [],
      // 传参
      emit: "",
      resetObj: [], //项目名
      resetPer: [], //人员
      value1: "",
      value2: "",
      totalObj: [],
      yuanarr: [], //人物数据
      isset: false,
      objarr: [], //项目数据
      isset2: false
    };
  },
  watch: {
    value1(v) {
      //清空第一个值
      if (this.value1 == "") {
        this.currentPage3 = 1;
        console.log("清空第一个值");
        if (this.value2 == "") {
          //都为空
          this.filt(this.totalObj);
        } else {
          let obj = this.totalObj.filter(
            res => res.personnel.trim() == this.value2
          );
          this.filt(obj);
        }
        return;
      }

      //同时查
      if (this.value2 != "") {
        console.log("同时查");
        console.log(this.value2);
        let obj = this.totalObj.filter(
          res => res.personnel.trim() == this.value2
        );
        let obj2 = obj.filter(res => res.projectNam.trim() == v);
        this.filt(obj2);
        return;
      }
      //单查
      if (this.value2 == "") {
        console.log("单查" + v);
        console.log(this.totalObj);
        let obj = this.totalObj.filter(res => res.projectNam.trim() == v);
        console.log(obj);
        this.filt(obj);
        return;
      }
    },
    value2(v) {
      this.currentPage3 = 1;
      //清空第二个值
      if (this.value2 == "") {
        console.log("清空第一个值");
        if (this.value1 == "") {
          //都为空
          this.filt(this.totalObj);
        } else {
          let obj = this.totalObj.filter(
            res => res.projectNam.trim() == this.value1
          );
          this.filt(obj);
        }
        return;
      }

      //同时查
      if (this.value1 != "") {
        console.log("同时查");
        console.log(this.value1);
        let obj = this.totalObj.filter(
          res => res.projectNam.trim() == this.value1
        );
        let obj2 = obj.filter(res => res.personnel.trim() == v);
        this.filt(obj2);
        return;
      }
      //单查
      if (this.value1 == "") {
        console.log("单查" + v);
        console.log(this.totalObj);
        let obj = this.totalObj.filter(res => res.personnel.trim() == v);
        console.log(obj);
        this.filt(obj);
        return;
      }
    }
  },
  created() {
    this.$store.commit("set_active", "allocation");
  },
  methods: {
    out() {
      let et = XLSX.utils.table_to_book(document.getElementById("outtable")); //此处传入table的DOM节点
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        if (this.value1 == "" && this.value2 == "") {
          FileSaver.saveAs(
            new Blob([etout], {
              type: "application/octet-stream"
            }),
            "total.xlsx"
          ); //trade-publish.xlsx 为导出的文件名
        } else {
          FileSaver.saveAs(
            new Blob([etout], {
              type: "application/octet-stream"
            }),
            `${this.value1 + this.value2}.xlsx`
          ); //trade-publish.xlsx 为导出的文件名
        }
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    },
    filt(obj) {
      this.allocationdata = obj;
      this.shujudata = this.allocationdata.slice(
        (this.currentPage3 - 1) * this.pageSize,
        this.currentPage3 * this.pageSize
      );
      this.changeallocationdata = this.shujudata;
    },
    //查询所有产值分配数据
    allocation() {
      this.$axios
        .post(this.baseurl + "/pv/selNum", {
          projectNum: this.projectNum,
          phone: this.$store.state.phone
        })
        .then(res => {
          this.totalObj = res.data;
          //   去重
          //   ++++++++++++++++++++++++++
          let project = [];
          let person = [];
          res.data.forEach(v => {
            let per = v.projectNam.trim();
            let name = v.personnel.trim();
            project.push(per);
            person.push(name);
          });
          this.resetObj = new Set(project);
          this.resetPer = new Set(person);
          let arr1 = [];
          let arr2 = [];
          this.resetObj.forEach(v => {
            arr1.push({ value: v });
          });
          this.resetObj = arr1;
          this.resetPer.forEach(v => {
            arr2.push({ value: v });
          });
          this.resetPer = arr2;
          //   ++++++++++++++++++++++++++++++++++
          this.allocationdata = res.data;
          this.shujudata = this.allocationdata.slice(
            (this.currentPage3 - 1) * this.pageSize,
            this.currentPage3 * this.pageSize
          );
          this.changeallocationdata = this.shujudata;
        });
    },
    // 分页按钮
    handleCurrentChange() {
      this.shujudata = this.allocationdata.slice(
        (this.currentPage3 - 1) * this.pageSize,
        this.currentPage3 * this.pageSize
      );
      console.log(this.shujudata);
      this.changeallocationdata = this.shujudata;
      // this.allocation();
    },
    // 更改产值分配
    changeallocation(a) {
      this.allocationdialogVisible = true;
      this.emit = a;
    }
  },
  mounted() {
    this.projectNum = this.$route.query.projectNum;
    this.allocation();
    this.$em.$on("close", () => {
      this.allocation();
    });
  }
};
</script>

<style>
.allocation {
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 5px #283879;
}
.detailbuttonmin {
  width: 200px;
  height: 40px;
}
.mianbao {
  width: 100%;
  height: 4%;
  display: flex;
  align-items: center;
}
.el-breadcrumb__inner {
  color: white !important;
}
.allocationmain {
  width: 100%;
  /* height: 90%; */
  overflow: auto;
}
.allocationpaging {
  width: 100%;
  height: 6%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.allocationmain::-webkit-scrollbar {
  width: 5px;
  background-color: #e6eaf0;
}
.allocationmain::-webkit-scrollbar-thumb {
  background-color: #13396b;
}
.allocationtable {
  width: 100%;
  border: 1.5px solid #6b79a8;
  text-align: center;
  margin-top: 0.2%;
}
.allocationtable tr th {
  height: 55px;
  color: white;
  font-size: 16px;
}
.allocationtable tr td {
  height: 50px;
  font-size: 15px;
  color: #00e1fd;
  width: 10%;
}
.allocationtable tr:hover th {
  background: #000c3b;
}
.allocationtable tr:hover {
  background: #05326d;
}
.allocationtable tr:hover td {
  color: gold;
}
.allocationbutton {
  width: 90%;
  height: 80%;
  line-height: 0px !important;
  padding: 0px !important;
  background: #2364a0 !important;
}
.allocationbutton:hover {
  color: gold !important;
}
.clec1 {
  width: 200px !important;
  border: 1px solid #354892;
  margin-right: 20px;
}
</style>