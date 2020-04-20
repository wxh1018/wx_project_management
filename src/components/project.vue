<template>
  <div class="project">
    <!-- 头部面包屑 -->
    <div class="mianbao">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>项目管理 ></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 中部主要 -->
    <div class="projectmain">
      <!-- 头部添加按钮 -->
      <div class="addbutton">
        <el-button type="primary" class="addproject" @click="add()">+ 添加项目</el-button>
        <el-select
          v-model="fg_val"
          class="ipt5"
          clearable
          filterable
          @change="find_fg"
          placeholder="查找分管负责人"
        >
          <el-option
            v-for="item in fg_data"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select
          v-model="xm_val"
          class="ipt5"
          clearable
          filterable
          @change="find_xm"
          placeholder="查找项目负责人"
        >
          <el-option
            v-for="item in xm_data"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- <el-button type="primary" class="addproject" @click="find_xm">查找项目负责人</el-button> -->

        <!-- <el-button type="primary" class="addproject" @click="find_fg">查找分管负责人</el-button> -->
      </div>
      <!-- 表格 -->
      <div class="projecttable">
        <table border="1" class="tabledata">
          <tr>
            <th>项目编号</th>
            <th>项目名称</th>
            <th>分管负责人</th>
            <th>项目负责人</th>
            <th>录入时间</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in allproject" :key="index">
            <td>{{item.projectNum}}</td>
            <td>{{item.projectNam}}</td>
            <td>{{item.responsiblePerson}}</td>
            <td>{{item.projectLeader}}</td>
            <td>{{item.date}}</td>
            <td class="lasttd">
              <!-- <el-button type="primary" class="operationbutton" @click="detail(item.id)">查看详情</el-button>
              <el-button type="primary" class="operationbutton" @click="Update(item.id)">更新项目</el-button>-->
              <el-button type="primary" class="operationbutton" @click="detailUpdate(item.id)">查看更改</el-button>
              <el-button
                type="primary"
                class="operationbutton"
                @click="Progress_tracking(item.id)"
              >进度跟踪</el-button>

              <el-button type="primary" class="operationbutton" @click="distribution(item.id)">产值分配</el-button>
              <el-button
                type="primary"
                class="operationbutton"
                @click="delet({id:item.id,projectNum:item.projectNum})"
              >删除项目</el-button>
            </td>
          </tr>
          <tr v-if="this.allproject.length == 0">
            <td colspan="9">暂无数据</td>
          </tr>
        </table>
      </div>
      <!-- 分页 -->
      <div class="paging">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :current-page.sync="currentPage3"
          :page-size.sync="pageSize"
          layout="prev, pager, next"
          :total="allproject1.length"
        ></el-pagination>
      </div>
    </div>

    <!-- 添加项目弹窗 -->
    <el-dialog :visible.sync="adddialogVisible">
      <Addtable v-on:clo="clo"></Addtable>
    </el-dialog>

    <!-- 更新项目弹窗 -->
    <el-dialog :visible.sync="UpdatedialogVisible">
      <Update v-on:up="up" :message="emit"></Update>
    </el-dialog>
    <!-- 进度跟踪弹窗 -->
    <el-dialog :visible.sync="Progress">
      <Progress v-on:up="up" :message="emit"></Progress>
    </el-dialog>

    <!-- 产值分配弹窗 -->
    <el-dialog class="tan" :visible.sync="distributiondialogVisible">
      <Distribution :message="emit" v-on:close1="close1"></Distribution>
    </el-dialog>
  </div>
</template>

<script>
import Addtable from "../components/addtable";
import Distribution from "../components/distribution";
import Progress from "../components/Progress_tracking";
import Update from "../components/Update";
export default {
  components: {
    Addtable,
    Progress,
    Distribution,
    Update
  },
  data() {
    return {
      Progress: false,
      adddialogVisible: false,
      distributiondialogVisible: false,
      detaildialogVisible: false,
      UpdatedialogVisible: false,
      // 传参参数
      emit: "",

      // 分页
      allproject: [],
      allproject1: [],
      currentPage3: 1,
      pageSize: 10,
      data: [],
      xm_data: [
        {
          value: "选项1"
        }
      ],
      fg_data: [
        {
          value: "选项1"
        }
      ],
      xm_val: "",
      fg_val: ""
    };
  },
  created() {
    this.$store.commit("set_active", "project");
    this.base.AddStyle(
      ".ipt5 input{border:1px solid white;} .ipt5{margin:0 10px}"
    );
  },
  methods: {
    // 查找项目负责人
    find_xm() {
      if (this.xm_val == "") {
        this.allproject = this.allproject1.slice(0, 10);
        return;
      }
      this.fg_val = "";
      this.allproject = this.allproject1.filter(
        v => v.projectLeader.trim() == this.xm_val
      );
    },
    // 查找分管负责人
    find_fg() {
      if (this.fg_val == "") {
        this.allproject = this.allproject1.slice(0, 10);
        return;
      }
      this.xm_val = "";
      this.allproject = this.allproject1.filter(
        v => v.responsiblePerson.trim() == this.fg_val
      );
    },
    //关闭产值分配弹窗
    close1() {
      this.distributiondialogVisible = false;
    },
    // 默认所有项目数据
    defaultproject() {
      this.$axios
        .post(this.baseurl + "/ps/menu", { phone: this.$store.state.phone })
        .then(res => {
          console.log(res);
          this.allproject1 = res.data;
          this.data = this.allproject1.slice(
            (this.currentPage3 - 1) * this.pageSize,
            this.currentPage3 * this.pageSize
          );
          this.allproject = this.data;
          //项目负责人
          var arr1 = [];
          var arr2 = [];
          res.data.forEach(v => {
            arr1.push(v.projectLeader.trim());
            arr2.push(v.responsiblePerson.trim());
          });
          arr1 = [...new Set(arr1)];
          arr2 = [...new Set(arr2)];
          this.xm_data = arr1.map(v => {
            return { value: v };
          });
          //分管负责人
          this.fg_data = arr2.map(v => {
            return { value: v };
          });
        });
    },
    // 点击跳分页
    handleCurrentChange() {
      this.defaultproject();
    },
    // 添加项目按钮
    add() {
      this.adddialogVisible = true;
    },
    // 查看更改
    detailUpdate(a) {
      // this.detaildialogVisible = true;
      this.UpdatedialogVisible = true;
      this.emit = a;
    },
    // 进度追踪
    Progress_tracking(a) {
      this.$store.commit("setPid", a);
      let obj = this.data.filter(v => v.id == a)[0];
      this.$store.commit("setthreeproject", obj);
      this.Progress = true;
      this.emit = a;
    },
    // // 查看详情
    // detail(a) {
    //   this.detaildialogVisible = true;
    //   this.emit = a;
    // },
    // 更新项目
    // Update(a) {
    //   this.UpdatedialogVisible = true;
    //   this.emit = a;
    // },
    // 产值分配按钮
    distribution(a) {
      this.distributiondialogVisible = true;
      this.emit = a;
      this.$em.$emit("updata");
    },
    //删除项目
    delet(a) {
      let _this = this;
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(1);
          // up();
          _this.$axios.post(this.baseurl + "/ps/del", a).then(data => {
            console.log(data);
            _this.defaultproject();
            _this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    clo() {
      console.log(2);
      this.adddialogVisible = false;
      this.defaultproject();
    },
    up() {
      console.log(1);
      this.defaultproject();
      this.$em.$emit("upda");
    }
  },
  mounted() {
    // 默认所有项目数据
    this.defaultproject();
    this.$em.$on("closeProgress", () => {
      this.Progress = false;
    });
  }
};
</script>

<style>
.el-dialog {
  width: 82% !important;
  height: 75% !important;
  border: 1px solid #fff;
  background: #000c3b !important;
}
.tan > div {
  margin-top: 5vh !important;
  height: 90% !important;
}
.el-dialog__header {
  padding: 0px 0px 15px !important;
}
.el-dialog__body {
  height: 85%;
}
.project {
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 5px #283879;
  overflow: hidden;
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
.projectmain {
  width: 100%;
  height: 96%;
}
.addbutton {
  width: 100%;
  height: 6%;
  display: flex;
  align-items: center;
}
.addproject {
  width: 9%;
  height: 85%;
  line-height: 0px !important;
  background: #2364a0 !important;
}
.addproject:hover {
  color: gold !important;
}
.projecttable {
  width: 100%;
  height: 87.7%;
  margin-top: 0.3%;
  overflow: auto;
}
.paging {
  width: 100%;
  height: 6%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #2364a0 !important;
}
.projecttable::-webkit-scrollbar {
  width: 5px;
  background-color: #e6eaf0;
}
.projecttable::-webkit-scrollbar-thumb {
  background-color: #13396b;
}
.tabledata {
  width: 100%;
  border: 1px solid #4c6f9c;
  text-align: center;
}
.tabledata tr:hover th {
  background: #000c3b;
}
.tabledata tr:hover {
  background: #05326d;
}
.tabledata tr:hover td {
  color: gold;
}
.tabledata tr th {
  height: 55px;
  color: white;
  font-size: 17px;
}
.tabledata tr td {
  height: 45px;
  font-size: 15px;
  color: #00e1fd;
}
.lasttd {
  width: 25%;
}
.operationbutton {
  width: 20%;
  height: 70%;
  line-height: 0px !important;
  padding: 0px !important;
  background: #2364a0 !important;
}
.operationbutton:hover {
  color: gold !important;
}
</style>