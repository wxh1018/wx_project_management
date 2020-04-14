<template>
  <div class="wrap">
    <div class="mianbao">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>市场跟踪></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 中部主要 -->
    <div class="projectmain">
      <!-- 头部添加按钮 -->
      <div class="addbutton">
        <el-button type="primary" class="addproject" @click="add()">+ 添加市场信息</el-button>
      </div>
      <!-- 表格 -->
      <div class="projecttable">
        <table border="1" class="tabledata">
          <tr>
            <th>项目编号</th>
            <th>项目名称</th>
            <th>项目负责人</th>
            <th>录入时间</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in allproject" :key="index">
            <td>{{item.projectNum}}</td>
            <td>{{item.projectNam}}</td>
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
              <el-button
                type="primary"
                class="operationbutton"
                @click="delet({id:item.id,projectNum:item.projectNum})"
              >删除项目</el-button>
            </td>
          </tr>
          <tr v-if="this.allproject.length == 0">
            <td colspan="9">此项目暂无产值分配</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Progress: false,
      adddialogVisible: false,
      distributiondialogVisible: false,
      detaildialogVisible: false,
      UpdatedialogVisible: false,
      // 分页
      allproject: [1],
      allproject1: [],
      currentPage3: 1,
      pageSize: 10,
      data: []
    };
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.$store.commit("set_active", "market");
  },
  mounted() {},
  methods: {
    add() {
      this.adddialogVisible = true;
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
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  border: 1px solid white;
  box-sizing: border-box;
}
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
  width: 20%;
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