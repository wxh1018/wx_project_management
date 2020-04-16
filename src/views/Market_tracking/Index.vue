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
            <th>项目名称</th>
            <th>预期合同额</th>
            <th>是否开跟踪号</th>
            <th>跟踪负责人</th>
            <th width="25%">操作</th>
          </tr>
          <tr v-for="(item,index) in show_data" :key="index">
            <td>{{item.projectName}}</td>
            <td>{{item.contractAmount}}</td>
            <td>{{item.trackingNumber}}</td>
            <td>{{item.principal}}</td>
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
          <tr v-if="this.show_data.length == 0">
            <td colspan="9">此项目暂无产值分配</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 分页 -->
    <div class="paging">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :current-page.sync="currentPage3"
        :page-size.sync="pageSize"
        layout="prev, pager, next"
        :total="total_data.length"
      ></el-pagination>
    </div>
    <!-- 弹窗 -->
    <el-dialog :visible.sync="show_dialog" id="market_dialog">
      <router-view @close="close" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 地址
      // private String address;
      // // 项目类型
      // private String projectType;
      // // 项目名称
      // private String projectName;
      // // 预期合同额
      // private String contractAmount;
      // // 是否开跟踪号
      // private String trackingNumber;
      // // 跟踪负责人
      // private String principal;
      // // 信息来源
      // private String informationSource;
      // // 价值等级
      // private String valueLevel;
      // // 备注
      // private String remark;

      // // 手机号
      // private String phone;
      Progress: false,
      show_dialog: false, //添加项目
      // 分页
      currentPage3: 1,
      pageSize: 10,
      show_data: [] //展示的数据
    };
  },
  components: {},
  computed: {
    total_data() {
      return this.$store.state.market.totalData;
    }
  },
  watch: {
    show_dialog(v) {
      if (!v) {
        this.$router.push("/market");
      }
    },
    total_data(v) {
      //总数据
      console.log(v);
      this.mod_show_data(v);
    }
  },
  created() {
    this.$store.commit("set_active", "market");
  },
  mounted() {
    //获取数据
    this.$store.dispatch("get_totalData");
  },
  methods: {
    //关闭页面
    close() {
      this.show_dialog = false;
    },
    mod_show_data(v) {
      this.show_data = this.base.ChangePage(
        this.pageSize,
        this.currentPage3,
        v
      );
    },
    //点击分页
    handleCurrentChange() {
      this.show_data = this.base.ChangePage(
        this.pageSize,
        this.currentPage3,
        this.total_data
      );
    },
    //添加项目
    add() {
      this.show_dialog = true;
      this.$router.push("/market_add");
    },
    //查看更改
    detailUpdate(v) {
      this.$store.commit("set_edit_id", v);
      this.show_dialog = true;
      this.$router.push("/market_edit");
    },
    //进度跟踪
    Progress_tracking(id) {
      this.$store.commit("set_edit_id", id);
      this.show_dialog = true;
      this.$router.push("/market_schedule");
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
          this.$store.dispatch("delete_totalData").then(data => {
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
  box-sizing: border-box;
  position: relative;
}
market_dialog .el-dialog {
  width: 60% !important;
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
  position: absolute;
  bottom: 0;
  right: 0;
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
.distpicker-address-wrapper select {
  background: #000c3b !important;
  border: 1px solid #6b79a8 !important;
  border-radius: 0px !important;
  color: white !important;
  width: 31%;
}
</style>