<template>
  <div class="update">
    <!-- 主要 -->
    <div class="updatemain">
      <table class="updatetable" border="1">
        <tr>
          <td>项目地区</td>
          <td colspan="2">
            <v-distpicker
              :province="province"
              :city="city"
              :area="area"
              @selected="onChangeselected"
            ></v-distpicker>
          </td>
          <td>项目类型</td>
          <td>
            <el-select v-model="addtabletype" placeholder="请选择">
              <el-option v-for="item in addtabletypeoptions" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </td>
          <td>项目编号</td>
          <td>
            <el-input v-model="addtablenumber" placeholder="请输入"></el-input>
          </td>
          <td>项目名称</td>
          <td colspan="2">
            <el-input v-model="addtablename" placeholder="请输入"></el-input>
          </td>
        </tr>
        <tr>
          <td>合同签订情况</td>
          <td colspan="2">
            <el-select v-model="addtableconclude" placeholder="请选择">
              <el-option
                v-for="item in addtableconcludeoptions"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>合同额(万元)</td>
          <td>
            <el-input v-model="contractamount" placeholder="请输入"></el-input>
          </td>
          <td>收款(万元)</td>
          <td>
            <el-input v-model="gathering" placeholder="请输入"></el-input>
          </td>
          <td>收款比例(%)</td>
          <td
            colspan="2"
          >{{(this.contractamount == "" || this.gathering == "")?"0":(this.gathering/this.contractamount).toFixed(2)*100}}</td>
        </tr>
        <tr>
          <td colspan="2">分包合同额(万元)</td>
          <td>
            <el-input v-model="subpackage" placeholder="请输入"></el-input>
          </td>
          <td>净合同额(万元)</td>
          <td>{{(this.contractamount == "" || this.subpackage == "")?this.contractamount:this.contractamount-this.subpackage}}</td>
          <td>奖励系数</td>
          <td>
            <el-input v-model="award" placeholder="1"></el-input>
          </td>
          <td colspan="2">可分配产值(万元)</td>
          <td>{{(this.award == "")?(this.contractamount-this.subpackage)*1:(this.contractamount-this.subpackage)*this.award}}</td>
        </tr>
        <tr>
          <td colspan="2">履约证明或节点证明</td>
          <td colspan="2">
            <el-select v-model="prove" placeholder="请选择">
              <el-option v-for="item in proveoptions" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </td>
          <td>分管负责人</td>
          <td>
            <el-select v-model="branchedpassage" placeholder="请选择">
              <el-option
                v-for="item in branchedpassageoptions"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>项目负责人</td>
          <td>
            <el-select v-model="item" placeholder="请选择">
              <el-option v-for="item in itemoptions" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </td>
          <td>参与人员</td>
          <td>
            <div class="per">
              <el-select v-model="participation" visible-change="change" multiple placeholder="请选择">
                <el-option
                  v-for="item in participationoptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.value"
                ></el-option>
              </el-select>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2">录入时间</td>
          <td colspan="2">
            {{time}}
            <!-- <el-date-picker
              v-model="time"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              @change="changetime()"
            ></el-date-picker>-->
          </td>
          <td colspan="6">
            <el-input type="textarea" v-model="explain" placeholder="请输入说明"></el-input>
          </td>
        </tr>
        <!-- <tr>
          <td colspan="2">问题及建议</td>
          <td colspan="8">
            <el-input type="textarea" v-model="suggest" placeholder="请输入问题及建议"></el-input>
          </td>
        </tr>
        <tr>
          <td colspan="2">备注</td>
          <td colspan="8">
            <el-input type="textarea" v-model="remark" placeholder="请输入备注信息"></el-input>
          </td>
        </tr>-->
        <tr>
          <td colspan="10">总体任务计划</td>
        </tr>
        <tr>
          <td colspan="5">阶段</td>
          <td colspan="5">预期时间</td>
        </tr>
        <tr>
          <td colspan="5">工作大纲</td>
          <td colspan="5">
            <el-date-picker
              v-model="workingOutline"
              type="date"
              placeholder="选择日期"
              @change="changetime()"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td colspan="5">初步成果</td>
          <td colspan="5">
            <el-date-picker
              v-model="firstFruits"
              type="date"
              placeholder="选择日期"
              @change="changetime()"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td colspan="5">中间成果</td>
          <td colspan="5">
            <el-date-picker
              v-model="resultsAmong"
              type="date"
              placeholder="选择日期"
              @change="changetime()"
            ></el-date-picker>
          </td>
        </tr>
        <tr>
          <td colspan="5">最终成果</td>
          <td colspan="5">
            <el-date-picker
              v-model="finalResult"
              type="date"
              placeholder="选择日期"
              @change="changetime()"
            ></el-date-picker>
          </td>
        </tr>
      </table>
    </div>

    <!-- 按钮 -->
    <div class="bottombtn">
      <button @click="anserupdate()">确认更新</button>
      <button @click="detailbutton()">项目导出</button>
      <!-- <div>
        <el-button class="updatebuttonmin" type="primary" @click="anserupdate()">确认更新</el-button>
      </div>
      <div>
        <el-button class="detailbuttonmin" type="primary" @click="detailbutton()">项目导出</el-button>
      </div>-->
    </div>

    <table id="detailexample" style="display:none">
      <tr>
        <td>项目地区</td>
        <td>项目类型</td>
        <td>项目编号</td>
        <td>项目名称</td>
        <td>合同签订情况</td>
        <td>合同额(万元)</td>
        <td>收款(万元)</td>
        <td>收款比例(%)</td>
        <td>分包合同额(万元)</td>
        <td>净合同额(万元)</td>
        <td>奖励系数</td>
        <td>可分配产值(万元)</td>
        <td>履约证明或节点证明</td>
        <td>分管负责人</td>
        <td>项目负责人</td>
        <td>参与人员</td>
        <td>时间进度</td>
        <td>说明</td>
        <td>问题及建议</td>
        <td>备注</td>
      </tr>
      <tr>
        <td>{{this.site}}</td>
        <td>{{this.addtabletype}}</td>
        <td>{{this.addtablenumber}}</td>
        <td>{{this.addtablename}}</td>
        <td>{{this.addtableconclude}}</td>
        <td>{{this.contractamount}}</td>
        <td>{{this.gathering}}</td>
        <td>{{(this.contractamount == "" || this.gathering == "")?"0":(this.gathering/this.contractamount).toFixed(2)*100}}</td>
        <td>{{this.subpackage}}</td>
        <td>{{(this.contractamount == "" || this.subpackage == "")?this.contractamount:this.contractamount-this.subpackage}}</td>
        <td>{{this.award}}</td>
        <td>{{(this.award == "")?(this.contractamount-this.subpackage)*1:(this.contractamount-this.subpackage)*this.award}}</td>
        <td>{{this.prove}}</td>
        <td>{{this.branchedpassage}}</td>
        <td>{{this.item}}</td>
        <td>{{this.participation}}</td>
        <td>{{this.lasttime}}</td>
        <td>{{this.explain}}</td>
        <td>{{this.suggest}}</td>
        <td>{{this.remark}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
// import $ from "jquery";
import VDistpicker from "v-distpicker";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  components: { VDistpicker },
  props: ["message"],
  data() {
    return {
      // //工作大纲
      workingOutline: "",
      // //初步成果 ;
      firstFruits: "",
      // //中间成果
      resultsAmong: "",
      // //最终成果
      finalResult: "",
      province: "",
      city: "",
      area: "",
      id: "",
      // 定义项
      // 地区拼接
      site: "",
      // 项目类型
      addtabletype: "",
      // 项目编号
      addtablenumber: "",
      // 项目名称
      addtablename: "",
      // 合同签定情况
      addtableconclude: "",
      // 合同额
      contractamount: "",
      // 收款
      gathering: "",
      // 分包合同额
      subpackage: "",
      // 奖励系数
      award: "",
      // 奖励系统默认
      awarddata: "1",
      // 履约证明或节点证明
      prove: "",
      // 分管负责人
      branchedpassage: "",
      // 项目负责人
      item: "",
      // 参与人员
      participation: [],
      // 选择日期
      time: "",
      // 说明
      explain: "",
      // 问题及建议
      suggest: "",
      // 备注
      remark: "",
      // 解析后时间
      standardtime: "",
      // 奖励系数是否为空
      ifaward: "",

      // 数组
      // 项目类型数组
      addtabletypeoptions: [
        {
          value: "综合交通类"
        },
        {
          value: "公共客运类"
        },
        {
          value: "货运物流类"
        },
        {
          value: "枢纽咨询类"
        },
        {
          value: "城市交通类"
        },
        {
          value: "其他"
        }
      ],
      // 合同签订情况
      addtableconcludeoptions: [
        {
          value: "未签"
        },
        {
          value: "已签(中设)"
        },
        {
          value: "已签(纬信)"
        }
      ],
      // 履约证明或节点证明
      proveoptions: [
        {
          value: "无"
        },
        {
          value: "有(已确定产值)"
        },
        {
          value: "有(未确定产值)"
        }
      ],
      // 分管负责人
      branchedpassageoptions: [
        {
          value: "丁振强"
        }
      ],
      // 项目负责人
      itemoptions: [
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
        }
      ],
      // 参与人员
      participationoptions: [
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
      lasttime: ""
    };
  },
  created() {
    this.getdata();
  },
  computed: {
    person() {
      return this.$store.state.person.person;
    }
  },
  methods: {
    // 项目负责人
    getdata() {
      this.branchedpassageoptions = this.person.分管负责人.map(v => {
        return { value: v.name };
      });
      this.itemoptions = this.person.项目负责人.map(v => {
        return { value: v.name };
      });
      this.participationoptions = this.person.参与人员.map(v => {
        return { value: v.name };
      });
    },
    // 导出按钮
    detailbutton() {
      let et = XLSX.utils.table_to_book(
        document.getElementById("detailexample")
      ); //此处传入table的DOM节点
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
          `${this.addtablename}.xlsx`
        ); //trade-publish.xlsx 为导出的文件名
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    },
    // 选择地区
    onChangeselected(a) {
      //    console.log(a);
      this.site = a.province.value + "-" + a.city.value + "-" + a.area.value;
    },
    // 时间切换
    changetime() {
      var date = new Date(this.time);
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
      this.lasttime = this.standardtime;
    },
    // 修改按钮
    anserupdate() {
      //    console.log(this.participation);
      if (this.award == "") {
        this.award = this.awarddata;
        this.ifaward = (this.contractamount - this.subpackage) * this.awarddata;
      } else if (this.award !== "") {
        this.ifaward = (this.contractamount - this.subpackage) * this.award;
      }

      if (this.site == "") {
        this.$message({
          message: "请选择项目地区",
          type: "error"
        });
      } else if (this.addtabletype == "") {
        this.$message({
          message: "请选择项目类型",
          type: "error"
        });
      } else if (this.addtablenumber == "") {
        this.$message({
          message: "请输入项目编号",
          type: "error"
        });
      } else if (this.addtablename == "") {
        this.$message({
          message: "请输入项目名称",
          type: "error"
        });
      } else if (this.addtableconclude == "") {
        this.$message({
          message: "请选择合同签订情况",
          type: "error"
        });
      } else if (this.contractamount == "") {
        this.$message({
          message: "请输入合同额",
          type: "error"
        });
      } else if (this.gathering == "") {
        this.$message({
          message: "请输入收款",
          type: "error"
        });
      } else if (this.subpackage == "") {
        this.$message({
          message: "请输入分包合同额",
          type: "error"
        });
      } else if (this.prove == "") {
        this.$message({
          message: "请选择履历证明或节点证明",
          type: "error"
        });
      } else if (this.branchedpassage == "") {
        this.$message({
          message: "请选择分管负责人",
          type: "error"
        });
      } else if (this.item == "") {
        this.$message({
          message: "请选择项目负责人",
          type: "error"
        });
      } else if (this.participation == "") {
        this.$message({
          message: "请选择参与人员",
          type: "error"
        });
      } else if (this.explain == "") {
        this.$message({
          message: "请输入说明",
          type: "error"
        });
      } else {
        this.standardtime = this.time;
        this.participation = this.participation.join(",");
        let params = {
          id: this.id,
          address: this.site,
          projectType: this.addtabletype,
          projectNum: this.addtablenumber,
          projectNam: this.addtablename,
          contractSigning: this.addtableconclude,
          contractAmount: this.contractamount,
          collection: this.gathering,
          collectionRatio: (this.gathering / this.contractamount).toFixed(2),
          amountSubcontract: this.subpackage,
          netValueOf: this.contractamount - this.subpackage,
          bonusCoefficient: this.award,
          distributableValue: this.ifaward,
          performanceCertificate: this.prove,
          responsiblePerson: this.branchedpassage,
          projectLeader: this.item,
          participant: this.participation,
          date: this.standardtime,
          schedule: this.explain,
          questionsSuggestions: this.suggest,
          remark: this.remark,
          phone: this.$store.state.phone,
          workingOutline: this.workingOutline,
          firstFruits: this.firstFruits,
          resultsAmong: this.resultsAmong,
          finalResult: this.finalResult
        };
        this.$axios.post(this.baseurl + "/ps/update", params).then(res => {
          if (res.data.msg == "OK") {
            this.$message({
              message: "项目修改成功",
              type: "success"
            });
          }
          let arr = this.participation;
          this.participation = arr.split(",");
          this.$emit("up");
        });
      }
    },
    change() {
      //    console.log(1);
    },
    // 默认数据
    update() {
      this.participation = [];
      this.$axios
        .post(this.baseurl + "/ps/selOne", {
          id: this.id
        })
        .then(res => {
          console.log(res);
          this.site = res.data[0].address;
          let arr = this.site.split("-");
          this.province = arr[0];
          this.city = arr[1];
          this.area = arr[2];
          this.addtabletype = res.data[0].projectType;
          this.addtablenumber = res.data[0].projectNum;
          this.addtablename = res.data[0].projectNam;
          this.addtableconclude = res.data[0].contractSigning;
          this.contractamount = res.data[0].contractAmount;
          this.gathering = res.data[0].collection;
          this.subpackage = res.data[0].amountSubcontract;
          this.award = res.data[0].bonusCoefficient;
          this.prove = res.data[0].performanceCertificate;
          this.branchedpassage = res.data[0].responsiblePerson;
          this.item = res.data[0].projectLeader;
          let obj = res.data[0].participant;
          this.participation = obj.split(",");
          this.time = res.data[0].date;
          this.lasttime = res.data[0].date;
          this.explain = res.data[0].schedule;
          this.suggest = res.data[0].questionsSuggestions;
          this.remark = res.data[0].remark;
          this.workingOutline = res.data[0].workingOutline;
          this.firstFruits = res.data[0].firstFruits;
          this.resultsAmong = res.data[0].resultsAmong;
          this.finalResult = res.data[0].finalResult;
        });
    }
  },
  watch: {
    message(v) {
      this.id = v;
      this.update();
    }
  },
  mounted() {
    // 默认数据
    this.id = this.message;
    this.update();
  }
};
</script>

<style>
.update {
  width: 100%;
  height: 100%;
}
.updatemain {
  width: 100%;
  height: 95%;
  overflow: hidden;
  background: #000c3b;
}
.updatetable {
  width: 100%;
  height: 100%;
  border: 1.5px solid #6b79a8;
  text-align: center;
}
.updatetable tr td {
  font-size: 17px;
  color: #00e1fd;
  width: 10%;
}
.bottombtn {
  display: flex;
  justify-content: center;
  height: 100px;
  align-items: center;
}
.bottombtn button {
  width: 120px;
  height: 40px;
  border: 1px solid #409eff;
  background: #202e63;
  color: white;
  outline: none;
  margin: 0 20px;
  cursor: pointer;
  border-radius: 5px;
}
.updatebutton {
  width: 20%;
  height: 8%;
  margin-left: 40%;
  margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.updatebuttonmin {
  height: 80%;
  line-height: 0 !important;
  background: #10193f !important;
}
.updatebuttonmin:hover {
  background: #202e63 !important;
  color: gold !important;
}

.el-textarea__inner {
  padding: 0px 5px !important;
  border-radius: 0 !important;
  background: #000c3b !important;
  border: none !important;
  color: white !important;
}
.el-input__inner {
  background: none !important;
  color: #fff !important;
  border: 1px solid #000c3b !important;
}
.per {
  width: 100%;
  height: 60px;
  overflow: auto;
  /* border: 1px solid red; */
}
.per::-webkit-scrollbar {
  display: none;
}
.detailbutton {
  width: 20%;
  height: 8%;
  margin-left: 40%;
  margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
