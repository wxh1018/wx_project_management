<template>
  <div class="addtable">
    <!-- 主要 -->
    <div class="addtablemain">
      <table class="addtabletable" border="1">
        <tr>
          <td width="10%">项目地区</td>
          <td colspan="2">
            <v-distpicker
              :province="province1"
              :city="city1"
              :area="area1"
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
    <div class="addtablebutton">
      <el-button class="addtablebuttonmin" type="primary" @click="submit">提交项目</el-button>
      <el-button class="addtablebuttonmin" type="primary" @click="derive">项目导出</el-button>
    </div>

    <!-- 导出表格 -->
    <table id="example" style="display:none">
      <tr>
        <td>项目地区</td>
        <td>项目类型</td>
        <td>项目编号</td>
        <td>项目名称</td>
      </tr>
      <tr>
        <td>{{this.site}}</td>
        <td>{{this.addtabletype}}</td>
        <td>{{this.addtablenumber}}</td>
        <td>{{this.addtablename}}</td>
      </tr>
      <tr>
        <td>合同签订情况</td>
        <td>合同额(万元)</td>
        <td>收款(万元)</td>
        <td>收款比例(%)</td>
        <td
          colspan="2"
        >{{(this.contractamount == "" || this.gathering == "")?"":(this.gathering/this.contractamount).toFixed(2)}}</td>
      </tr>
      <tr>
        <td>{{this.addtableconclude}}</td>
        <td>{{this.contractamount}}</td>
        <td>{{this.gathering}}</td>
        <td>{{(this.contractamount == "" || this.gathering == "")?"":(this.gathering/this.contractamount).toFixed(2)}}</td>
      </tr>
      <tr>
        <td colspan="2">分包合同额(万元)</td>
        <td>净合同额(万元)</td>
        <td>奖励系数</td>
        <td colspan="2">可分配产值(万元)</td>
      </tr>
      <tr>
        <td>{{this.subpackage}}</td>
        <td>{{this.contractamount-this.subpackage}}</td>
        <td>{{(this.award == "")?"1":this.award}}</td>
        <td>{{(this.award == "")?(this.contractamount-this.subpackage)*1:(this.contractamount-this.subpackage)*this.award}}</td>
      </tr>
      <tr>
        <td colspan="2">履约证明或节点证明</td>
        <td>分管负责人</td>
        <td>项目负责人</td>
        <td>参与人员</td>
      </tr>
      <tr>
        <td>{{this.prove}}</td>
        <td>{{this.branchedpassage}}</td>
        <td>{{this.item}}</td>
        <td>{{this.participation}}</td>
      </tr>
      <tr>
        <td>录入时间</td>
        <td>说明</td>
      </tr>
      <tr>
        <td colspan="3">{{this.time}}</td>
        <td colspan="3">{{this.suggest}}</td>
      </tr>
      <tr>
        <td>工作大纲</td>
        <td>初步成果</td>
        <td>中间成果</td>
        <td>最终成果</td>
      </tr>
      <tr>
        <td>{{workingOutline}}</td>
        <td>{{firstFruits}}</td>
        <td>{{resultsAmong}}</td>
        <td>{{finalResult}}</td>
      </tr>
    </table>
  </div>
</template>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script>
import VDistpicker from "v-distpicker";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  components: { VDistpicker },
  data() {
    return {
      province1: "",
      city1: "",
      area1: "",
      // //工作大纲
      workingOutline: "",
      // //初步成果 ;
      firstFruits: "",
      // //中间成果
      resultsAmong: "",
      // //最终成果
      finalResult: "",
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
          value: "胡斌"
        },
        {
          value:'陈忠兵'
        },
        {
          value:'陈飞'
        },
        {
          value:'丁振强'
        },
        {
          value:'陈晨'
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
    },
    person() {
      return this.$store.state.person.person;
    }
  },
  created() {
    this.getdata();
  },
  methods: {
    getdata() {
      //获取负责人的数据
      this.branchedpassageoptions = this.person.分管负责人.map(v => {
        return { value: v.name };
      });
      this.itemoptions = this.person.项目负责人.map(v => {
        return { value: v.name };
      });
      let arr = [];
      arr = this.person.参与人员.map(v => {
        return { value: v.name };
      });
      for (let i = 0; i < arr.length; i++) {
        let s = arr[i].value.replace(/\s/g, "");
        for (let j = i + 1; j < arr.length - i; j++) {
          let e = arr[j].value.trim(/\s/, "");
          if (s == e) {
            arr.splice(j, 1);
          }
        }
      }
      this.participationoptions = arr;
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
            date: this.time,
            schedule: this.explain,
            questionsSuggestions: this.suggest,
            remark: this.remark,
            phone: this.$store.state.phone,
            workingOutline: this.workingOutline,
            firstFruits: this.firstFruits,
            resultsAmong: this.resultsAmong,
            finalResult: this.finalResult
          })
          .then(res => {
            console.log(res);
            if (res.data.msg == "保存成功") {
              this.$message({
                message: "项目提交成功",
                type: "success"
              });
              this.participation = [];
              this.workingOutline = "";
              this.firstFruits = "";
              this.resultsAmong = "";
              this.finalResult = "";
              this.site = "";
              this.addtabletype = "";
              this.addtablenumber = "";
              this.addtablename = "";
              this.addtableconclude = "";
              this.contractamount = "";
              this.gathering = "";
              this.subpackage = "";
              this.award = "";
              this.awarddata = "";
              this.prove = "";
              this.branchedpassage = "";
              this.item = "";
              this.participation = "";
              this.explain = "";
              this.suggest = "";
              this.remark = "";
              this.standardtime = "";
              this.ifaward = "";
              this.province1 = "";
              this.city1 = "";
              this.area1 = "";
              this.$emit("clo");
            }
          });
      }
    },
    // 导出按钮
    derive() {
      let et = XLSX.utils.table_to_book(document.getElementById("example")); //此处传入table的DOM节点
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
          `项目${this.addtablename}.xlsx`
        ); //trade-publish.xlsx 为导出的文件名
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
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
