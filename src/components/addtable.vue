<template>
  <div class="addtable">
    <!-- 主要 -->
    <div class="addtablemain">
      <table class="addtabletable" border="1">
        <tr>
          <td>项目地区</td>
          <td colspan="2">
            <v-distpicker @selected="onChangeselected"></v-distpicker>
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
          >{{(this.contractamount == "" || this.gathering == "")?"收款/合同额":(this.gathering/this.contractamount).toFixed(2)*100}}</td>
        </tr>
        <tr>
          <td colspan="2">分包合同额(万元)</td>
          <td>
            <el-input v-model="subpackage" placeholder="请输入"></el-input>
          </td>
          <td>净合同额(万元)</td>
          <td>{{(this.contractamount == "" || this.subpackage == "")?"":this.contractamount-this.subpackage}}</td>
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
              <el-select v-model="participation" placeholder="请选择" multiple>
                <el-option
                  v-for="item in participationoptions"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2">录入时间</td>
          <td colspan="2">
            <!-- <el-date-picker v-model="time" type="date" placeholder="选择日期" @change="changetime()"></el-date-picker> -->
            {{time}}
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
          <td colspan="5"><el-date-picker v-model="Work_outline" type="date" placeholder="选择日期" @change="changetime()"></el-date-picker></td>
        </tr>
        <tr>
          <td colspan="5">初步成果</td>
          <td colspan="5"><el-date-picker v-model="Preliminary_success" type="date" placeholder="选择日期" @change="changetime()"></el-date-picker></td>
        </tr>
        <tr>
          <td colspan="5">中间成果</td>
          <td colspan="5"><el-date-picker v-model="Intermediate_results" type="date" placeholder="选择日期" @change="changetime()"></el-date-picker></td>
        </tr>
        <tr>
          <td colspan="5">最终成果</td>
          <td colspan="5"><el-date-picker v-model="Final_result" type="date" placeholder="选择日期" @change="changetime()"></el-date-picker></td>
        </tr>
      </table>
    </div>

    <!-- 按钮 -->
    <div class="addtablebutton">
      <el-button class="addtablebuttonmin" type="primary" @click="submit">提交项目</el-button>
      <el-button class="addtablebuttonmin" type="primary" @click="derive">项目导出</el-button>
    </div>

    <!-- 导出表格 -->
    <table id="example" style="display:none">
      <tr>
        <td>项目地区</td>
        <td colspan="2">{{this.site}}</td>
        <td>项目类型</td>
        <td>{{this.addtabletype}}</td>
        <td>项目编号</td>
        <td>{{this.addtablenumber}}</td>
        <td>项目名称</td>
        <td colspan="2">{{this.addtablename}}</td>
      </tr>
      <tr>
        <td>合同签订情况</td>
        <td colspan="2">{{this.addtableconclude}}</td>
        <td>合同额(万元)</td>
        <td>{{this.contractamount}}</td>
        <td>收款(万元)</td>
        <td>{{this.gathering}}</td>
        <td>收款比例(%)</td>
        <td
          colspan="2"
        >{{(this.contractamount == "" || this.gathering == "")?"":(this.gathering/this.contractamount).toFixed(2)}}</td>
      </tr>
      <tr>
        <td colspan="2">分包合同额(万元)</td>
        <td>{{this.subpackage}}</td>
        <td>净合同额(万元)</td>
        <td>{{this.contractamount-this.subpackage}}</td>
        <td>奖励系数</td>
        <td>{{(this.award == "")?"1":this.award}}</td>
        <td colspan="2">可分配产值(万元)</td>
        <td>{{(this.award == "")?(this.contractamount-this.subpackage)*1:(this.contractamount-this.subpackage)*this.award}}</td>
      </tr>
      <tr>
        <td colspan="2">履约证明或节点证明</td>
        <td colspan="2">{{this.prove}}</td>
        <td>分管负责人</td>
        <td>{{this.branchedpassage}}</td>
        <td>项目负责人</td>
        <td>{{this.item}}</td>
        <td>参与人员</td>
        <td>{{this.participation}}</td>
      </tr>
      <tr>
        <td colspan="2">时间进度和说明</td>
        <td colspan="2">{{this.standardtime}}</td>
        <td colspan="6">{{this.explain}}</td>
      </tr>
      <tr>
        <td colspan="2">问题及建议</td>
        <td colspan="8">{{this.suggest}}</td>
      </tr>
      <tr>
        <td colspan="2">备注</td>
        <td colspan="8">{{this.remark}}</td>
      </tr>
    </table>
  </div>
</template>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script>
import VDistpicker from "v-distpicker";
export default {
  components: { VDistpicker },
  data() {
    return {
      Work_outline:'',//工作大纲
      Preliminary_success:'',//初步成果
      Intermediate_results:'',//中间成果
      Final_result:'',//最终成果
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
      participation: "",
      // 选择日期
      // time: "",
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
      ]
    };
  },
  computed: {
    time() {
      return this.base.GetTime();
    }
  },
  created() {
    this.getdata();
  },
  methods: {
    // 项目负责人
    getdata() {
      //获取负责人的数据
      let params = { phone: this.$store.state.phone };
      this.$axios.post(this.baseurl + "/ps/selRP", params).then(data => {
        //展示分管负责人 data.data;
        let arr = [];
        data.data.forEach(v => {
          arr.push({ value: v.person.trim() });
        });
        this.branchedpassageoptions = arr;
      });
      this.$axios.post(this.baseurl + "/ps/selPL", params).then(data => {
        //展示项目负责人itemoptions
        let arr = [];
        data.data.forEach(v => {
          arr.push({ value: v.person.trim() });
        });
        this.itemoptions = arr;
      });
      this.$axios.post(this.baseurl + "/ps/selPP", params).then(data => {
        //展示参与人员
        let arr = [];
        data.data.forEach(v => {
          arr.push({ value: v.person.trim() });
        });
        this.participationoptions = arr;
      });
    },
    // 选择地区
    onChangeselected(a) {
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
    },
    // 提交按钮
    submit() {
      console.log(this.standardtime);
      if (this.award == "") {
        this.award = this.awarddata;
        this.ifaward = (this.contractamount - this.subpackage) * this.awarddata;
      } else if (this.award !== "") {
        this.award = this.award;
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
      } else if (this.time == "") {
        this.$message({
          message: "请选择日期",
          type: "error"
        });
      } else if (this.explain == "") {
        this.$message({
          message: "请输入说明",
          type: "error"
        });
      } else {
        // if(typeof(this.participation))
        console.log(this.participation);
        if (typeof this.participation != "string") {
          let arr = this.participation.join(",");
          this.participation = arr;
        }
        this.$axios
          .post(this.baseurl + "/ps/saveProject", {
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
            phone: this.$store.state.phone
          })
          .then(res => {
            console.log(res);
            if (res.data.msg == "保存成功") {
              this.$message({
                message: "项目提交成功",
                type: "success"
              });
              this.participation = [];
              this.$emit("clo");
              //   setTimeout(function() {

              //     // location.reload();
              //   }, 1000);
            }
          });
      }
    },
    // 导出按钮
    derive() {
      $("#example").table2excel({
        // 不被导出的表格行的CSS class类
        exclude: ".noExl",
        // 导出的Excel文档的名称，（没看到作用）
        name: "Excel Document Name",
        // Excel文件的名称
        filename: "项目管理填写"
      });
      this.$message({
        message: "项目导出成功",
        type: "success"
      });
    },
    destroyed() {
      console.log(1);
      this.participation = [];
    }
  }
};
</script>

<style>
.addtable {
  width: 100%;
  height: 100%;
}
.addtablemain {
  width: 100%;
  height: 95%;
  overflow: hidden;
  background: #000c3b;
}
.addtabletable {
  width: 100%;
  height: 100%;
  border: 1.5px solid #6b79a8;
  text-align: center;
}
.addtabletable tr td {
  font-size: 17px;
  color: #00e1fd;
  width: 10%;
}
.addtablebutton {
  width: 20%;
  height: 8%;
  margin-left: 40%;
  margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.addtablebuttonmin {
  height: 80%;
  line-height: 0 !important;
  background: #10193f !important;
}
.addtablebuttonmin:hover {
  background: #202e63 !important;
  color: gold !important;
}
.distpicker-address-wrapper select {
  background: #000c3b !important;
  border: 1px solid #6b79a8 !important;
  border-radius: 0px !important;
  color: white !important;
  width: 31%;
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
}
</style>
