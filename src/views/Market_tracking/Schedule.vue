<template>
  <div class="wrap">
    <button class="basebtn btn1" @click="addPro">添加进度更新</button>
    <!-- 总表 -->
    <table class="tab">
      <thead>
        <td width="4%">
          <div>序号</div>
        </td>
        <td width="12%">
          <div>项目名称</div>
        </td>
        <td width="10%">
          <div>跟踪负责人</div>
        </td>
        <td width="8%">
          <div>时间节点</div>
        </td>
        <td width="15%">
          <div>详细描述</div>
        </td>
        <td width="5%">
          <div>附件</div>
        </td>
        <td width="5%">
          <div>操作</div>
        </td>
      </thead>
      <tbody>
        <tr v-for="(item, id) in month_show_data" :key="id">
          <td>{{id+1}}</td>
          <td>
            <div class="tddiv">{{item.projectName}}</div>
          </td>
          <td>
            <div class="tddiv">{{item.principal}}</div>
          </td>
          <td>
            <div class="tddiv">{{item.date}}</div>
          </td>
          <td>
            <div class="tddiv detail">{{item.detail}}</div>
          </td>
          <td>
            <div class="view" @click="fileview(item.id)">查看</div>
          </td>
          <td class="btn">
            <!-- <button class="basebtn twobtn" @click="updateview(item.id)">更新</button> -->
            <button class="basebtn twobtn" @click="del(item.id)">删除</button>
          </td>
        </tr>
        <tr v-if="mon_data.length == []">
          <td colspan="10">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div class="up"></div>
    <!-- 分页器 -->
    <div class="allocationpaging">
      <el-pagination
        @current-change="changePage"
        background
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        layout="prev, pager, next"
        :total="mon_data.length"
      ></el-pagination>
    </div>
    <!-- 底部按钮 -->
    <div class="bottombtn">
      <div class="basebtn" @click="close">关闭页面</div>
      <div class="basebtn" @click="exportData">导出数据</div>
    </div>
    <!-- 添加进度 -->
    <el-dialog class="schedule_add" append-to-body :visible.sync="addShow">
      <table class="addpro">
        <tr>
          <td>项目名称</td>
          <td>
            <!-- <input v-model="add.projectName" type="text" /> -->
            <p>{{add.projectName}}</p>
          </td>
          <td>项目类型</td>
          <td>
            <!-- <input type="text" v-model="add.projectId" /> -->
            <p>{{add.projectType}}</p>
          </td>
        </tr>
        <tr>
          <td>跟踪负责人</td>
          <td>
            <!-- <input type="text" v-model="add.projectPerson" /> -->
            <p>{{add.principal}}</p>
          </td>
          <td>时间节点</td>
          <td>
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>详细描述</td>
          <td>
            <textarea name id cols="10" v-model="add.detail" rows="7"></textarea>
          </td>
          <td>附件上传</td>
          <td>
            <el-upload
              class="upload-demo"
              :action="upload_add"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handsuccess"
              :before-remove="beforeRemove"
              :before-upload="beforeUpload"
              :on-error="handError"
              multiple
              :limit="10"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">最多上传10个文件，且文件大小不超过5M</div> -->
            </el-upload>
          </td>
        </tr>
      </table>
      <button
        class="basebtn addprobtn"
        @click="sureadd"
        v-loading="loading"
        element-loading-text="提交中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >添加</button>
    </el-dialog>
    <!-- 更新进度 -->
    <el-dialog :visible.sync="updateShow" append-to-body>
      <table class="addpro">
        <tr>
          <td>项目名称</td>
          <td>
            <!-- <input v-model="add.projectName" type="text" /> -->
            <p>{{update.projectName}}</p>
          </td>
          <td>项目类型</td>
          <td>
            <!-- <input type="text" v-model="add.projectId" /> -->
            <p>{{update.projectType}}</p>
          </td>
        </tr>
        <tr>
          <td>跟踪负责人</td>
          <td>
            <p>{{update.principal}}</p>
          </td>
          <td>时间节点</td>
          <td>
            <!-- <el-date-picker v-model="date1" type="date" placeholder="选择日期" @change="changetime2()"></el-date-picker> -->
            <el-date-picker
              v-model="date1"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td>详细描述</td>
          <td>
            <textarea name id cols="10" v-model="update.detail" rows="7"></textarea>
          </td>
          <td>附件上传</td>
          <td>
            <el-upload
              class="upload-demo"
              :action="upload_add"
              :on-preview="handlePreview2"
              :on-remove="handleRemove2"
              :on-success="handsuccess2"
              :before-remove="beforeRemove2"
              :on-progress="handProgress2"
              :on-error="handError2"
              :before-upload="beforeUpload"
              multiple
              :limit="10"
              :on-exceed="handleExceed2"
              :file-list="fileList2"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只最多上传10个文件，且文件大小不超过5M</div> -->
            </el-upload>
          </td>
        </tr>
      </table>
      <button
        class="basebtn addprobtn"
        @click="sureupdata"
        v-loading="loading"
        element-loading-text="提交中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >确认更新</button>
    </el-dialog>
    <!-- 查看附件 -->
    <el-dialog :visible.sync="fileshow" append-to-body>
      <div class="fileshow">
        <p v-if="file.length == 0" class="nofile">暂无附件</p>
        <ul class="showfiles">
          <li v-for="(item, id) in file" :key="id">
            <p>文件名：{{item.name}}</p>
            <img class="bigimg" :src="item.url" alt />
            <br />文件地址：
            <a download="download" :href="item.url" target="_blank">点击下载</a>
            <!-- <div class="basebtn" @click="downloadFile(item.url)">下载文件</div> -->
          </li>
        </ul>
      </div>
    </el-dialog>
    <table id="totaltable" style="display:none">
      <tr>
        <td>序号</td>
        <td>项目名称</td>
        <td>项目编号</td>
        <td>跟踪负责人</td>
        <td>时间节点</td>
        <td>工作进度</td>
        <td>收款进度</td>
        <td>详细描述</td>
      </tr>
      <tr v-for="(item , id) in data" :key="id">
        <td>{{item.id}}</td>
        <td>{{item.projectNam}}</td>
        <td>{{item.projectNum}}</td>
        <td>{{item.projectLeader}}</td>
        <td>{{item.date}}</td>
        <td>{{item.jobSchedule}}</td>
        <td>{{item.collectionSchedule}}</td>
        <td>{{item.detail}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      month_show_data: "",
      tipmsg1: false,
      tipmsg2: false,
      customColors: [
        { color: "red", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#7bed9f", percentage: 100 }
      ],
      imageUrl: "",
      currentPage: 1, //当前页数
      pageSize: 10, //每页多少条
      data: [], //数据
      addShow: false, //添加进度更新
      updateShow: false, //更新页面
      loading: false,
      date: "", //添加时间
      date1: "", //更新的时间
      standardtime: "", //格式化添加时间
      standardtime2: "",
      add: {
        //添加的数据
        projectName: "", //projectNam
        projectType: "", //
        principal: "", //
        date: "", //
        detail: "" //detail
      },
      update: {
        //更新的数据
        projectName: "", //projectNam
        projectType: "", //
        principal: "", //
        date: "", //
        detail: "", //detail
        accessory: ""
      },
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
      fileList: [], //附件
      //更新附件
      fileList2: [
        {
          name: "QQ图片20200207154842.png",
          url: ""
        },
        {
          name: "food2.jpeg",
          url: ""
        }
      ],
      pId: "",
      fileArr: [],
      fileArr2: [],
      updataId: "", //更新项目id
      file: "", //查看附件文件
      fileshow: false //显示附件
    };
  },
  components: {},
  computed: {
    upload_add() {
      return this.baseurl + "/upload/add";
    },
    pid() {
      return this.$store.state.pId;
    },
    id() {
      return this.$store.state.market.edit_id;
    },
    phone() {
      return this.$store.state.phone;
    },
    //月报总数据
    mon_data() {
      return this.$store.state.market.mon_data;
    }
  },
  watch: {
    addShow() {
      this.fileList = [];
    },
    pid(v) {
      this.pId = v;
      console.log(this.pId);
      this.getData();
    },
    mon_data(v) {
      console.log(v);
      this.month_show_data = this.base.ChangePage(
        this.pageSize,
        this.currentPage,
        v
      );
    }
  },
  created() {
    this.changePage();
    this.getData();
  },
  mounted() {
    this.pId = this.$store.state.pId;
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
    getData() {
      let no_change = this.$store.getters.findmon_byid(this.id);
      console.log(no_change);
      this.add.projectName = no_change.projectName;
      this.add.projectType = no_change.projectType;
      this.add.principal = no_change.principal;

      this.$store.dispatch("get_mon_data").then(data => {
        this.changePage();
      });
    },
    //添加
    handsuccess(file, fileList) {
      this.base.suc(this, "上传成功");
      this.fileArr.push(fileList.name);
      this.fileArr.push(fileList.response);
    },
    handsuccess2(file, fileList2) {
      this.base.suc(this, "上传成功");
      console.log(file);
      this.fileList2.push({ name: fileList2.name, url: fileList2.response });
    },
    handleRemove2(file, fileList2) {
      console.log(fileList2);
      this.fileList2 = fileList2;
    },
    handlePreview2(file) {
      console.log(file);
    },
    // 文件上传时的钩子
    handProgress2(event, file, fileList) {
      console.log(event, file, fileList);
    },
    //上传失败
    handError2() {
      if (this.tipmsg2) {
        this.base.warn(this, "该文件大小超出10M，已取消上传");
        this.tipmsg2 = false;
      }
    },
    handError() {
      if (this.tipmsg1) {
        this.base.warn(this, "该文件大小超出10M，已取消上传");
        this.tipmsg1 = false;
      }
    },
    handleExceed2(files, fileList2) {
      this.$message.warning(
        `当前限制选择 10个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList2.length} 个文件`
      );
    },
    beforeUpload() {
      // console.log(file);
      // let size = file.size;
      // if (size > 1024 * 10) {
      // this.base.warn(this, "该文件超出10M,正在取消上传");
      // this.tipmsg1 = true;
      // return;
      // }
    },
    beforeRemove2(file, fileList2) {
      console.log(fileList2);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 10个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      console.log(fileList);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 5;
      console.log(123);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 5MB!");
      }
      return isJPG && isLt2M;
    },
    //添加进度更新
    addPro() {
      this.addShow = true;
    },
    changetime() {
      var date = new Date(this.date);

      var month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + (date.getMonth() + 1);
      }
      var day = date.getDate();
      if (day < 10) {
        day = "0" + date.getDate();
      }
      var date_value = date.getFullYear() + "-" + month + "-" + day;
      this.standardtime = date_value;
    },
    changetime2() {
      var date = new Date(this.date1);
      var month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + (date.getMonth() + 1);
      }
      var day = date.getDate();
      if (day < 10) {
        day = "0" + date.getDate();
      }
      var date_value = date.getFullYear() + "-" + month + "-" + day;
      this.standardtime2 = date_value;
    },
    //添加项目
    sureadd() {
      if (this.date == "") {
        this.base.warn(this, "请填写时间节点");
        return;
      }
      if (this.add.detail == "") {
        this.base.warn(this, "请填写详细描述");
        return;
      }
      // this.loading = true;
      this.add.accessory = this.fileArr.join(",");
      let params = {
        projectName: this.add.projectName,
        projectType: this.add.projectType,
        principal: this.add.principal,
        detail: this.add.detail,
        date: this.date,
        mId: this.id,
        phone: this.phone,
        accessory: this.add.accessory
      };
      console.log(params);
      this.$store.dispatch("add_mon_data", params).then(data => {
        this.base.suc(this, "提交成功");
      });
      this.add.detail = "";
      this.date = "";
      this.add.accessory = "";
      this.addShow = false;
      this.fileArr = [];
    },
    // 查看文件
    fileview(v) {
      let obj = this.mon_data.filter(res => res.id == v);
      let arr = obj[0].accessory.split(",");
      let arr2 = [];
      arr.forEach((v, i) => {
        if ((i + 1) % 2 == 0) {
          console.log(i);
          let obj = { name: arr[i - 1], url: `http://${arr[i]}` };
          arr2.push(obj);
        }
      });
      console.log(arr2);
      if (arr2.length == 0) {
        this.base.noti(this, "暂无附件");
      }
      this.file = arr2;
      this.fileshow = true;
    },
    // 下载文件
    downloadFile(v) {
      console.log(v);
    },
    //更新
    updateview(v) {
      this.updateShow = true;
      this.updataId = v;
      let obj = this.mon_data.filter(res => res.id == v);
      this.update.projectName = obj[0].projectName;
      this.update.principal = obj[0].principal;
      this.update.detail = obj[0].detail;
      this.update.projectType = obj[0].projectType;
      this.date1 = obj[0].date;
      let arr = obj[0].accessory.split(",");
      let arr2 = [];
      arr.forEach((v, i) => {
        if ((i + 1) % 2 == 0) {
          let obj = { name: arr[i - 1], url: `${arr[i]}` };
          arr2.push(obj);
        }
      });
      this.fileList2 = arr2;
    },
    //提交更新
    sureupdata() {
      console.log(this.update);
      let arr = [];
      this.fileList2.forEach(v => {
        arr.push(v.name);
        arr.push(v.url);
      });
      this.update.accessory = arr.join(",");
      let params = {
        projectName: this.update.projectName,
        principal: this.update.principal,
        detail: this.update.detail,
        projectType: this.update.projectType,
        date: this.date1,
        accessory: this.update.accessory,
        mId: this.id,
        id: this.updataId
      };
      this.$store.dispatch("update_mon", params).then(data => {
        console.log(data);
        if (data == "数据修改失败！") {
          this.base.warn(this, data);
        } else {
          this.base.suc(this, data);
        }
        this.updateShow = false;
      });
    },
    //删除
    del(i) {
      console.log(i);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("del_mon", { id: i }).then(data => {
            this.base.suc(this, "删除成功");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //换页按钮
    changePage() {
      this.month_show_data = this.base.ChangePage(
        this.pageSize,
        this.currentPage,
        this.mon_data
      );
    },
    close() {
      this.$emit("close");
      this.$router.push("/market");
    },
    //导出
    exportData() {
      let et = XLSX.utils.table_to_book(document.getElementById("totaltable")); //此处传入table的DOM节点
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([etout], {
            type: "application/octet-stream"
          }),
          `项目进度列表.xlsx`
        ); //trade-publish.xlsx 为导出的文件名
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
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
    }
  }
};
</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  /* border: 1px solid white; */
  position: relative;
}
.btn1 {
  position: absolute;
  top: -20px;
  left: -10px;
}
.tab {
  width: 100%;
  border: 1.5px solid #6b79a8;
  text-align: center;
  margin-top: 0.2%;
  position: relative;
  top: 30px;
}
.tab td {
  border: 1px solid #4c6f9c;
  height: 40px;
}
.tab thead {
  color: white;
  font-size: 17px;
  font-weight: 600;
}
.tab thead div {
  width: 100%;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.tab tbody {
  color: #00e1fd;
}
.tab tbody div {
  line-height: 40px;
}
.tab tbody div::-webkit-scrollbar {
  width: 2px;
}
.tab tbody div::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 1px;
}
.twobtn {
  width: 50px;
  display: inline-block;
  display: flex;
  height: 30px;
  align-items: center;
  justify-content: center;
}
.btn {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.allocationpaging {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 6%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
/* 底部按钮 */
.bottombtn {
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: -50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.addpro {
  width: 100%;
  border: 1.5px solid #6b79a8;
  text-align: center;
  margin-top: 0.2%;
  position: relative;
  top: 30px;
}
.addpro input {
  width: 100%;
  height: 100%;
  background: #000c3b;
  border: none;
  color: #00e1fd;
  font-size: 16px;
  text-align: center;
}
.addpro td {
  height: 100px;
  border: 1px solid #4c6f9c;
  color: white;
  font-size: 17px;
}
textarea {
  width: 100%;
  display: block;
  background: #000c3b;
  border: none;
  color: white;
  box-sizing: border-box;
  font-size: 16px;
  padding: 20px;
}
.addprobtn {
  position: relative;
  top: 50px;
  margin: 0 auto;
}
.tddiv {
  width: 100%;
  height: 100%;
  padding: 0 3px;
  box-sizing: border-box; /* overflow: auto; */
}
.detail {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.detail::-webkit-scrollbar {
  /* height: 5px; */
  display: none;
}
.tab tr:hover td {
  color: gold;
}
.tab tr:hover {
  background: #05326d;
}
.view {
  text-decoration: underline;
  cursor: pointer;
}
.showfiles {
  /* border: 1px solid red; */
}
.showfiles li {
  list-style: none;
  width: 100%;
  /* height: 100px; */
  margin-top: 30px;
  color: white;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.showfiles p {
  color: white;
}
.showfiles li img {
  height: 200px;
  margin-left: 150px;
}
.showfiles li a {
  color: #00e1fd;
}
.nofile {
  width: 100%;
  font-size: 20px;
  color: white;
}
.bigimg {
  transition: all 0.1s linear;
}
.bigimg:hover {
  transform: scale(3);
  transform-origin: left center;
}
.fileshow {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.fileshow::-webkit-scrollbar {
  width: 5px;
}
.fileshow::-webkit-scrollbar-thumb {
  width: 5px;
  border-radius: 5px;
  background: white;
}

.showfiles li:nth-child(1) img:hover {
  transform-origin: left top;
}
.showfiles li:nth-last-child(1) {
  margin-bottom: 100px;
}
.el-upload__tip {
  color: red !important;
}
</style>