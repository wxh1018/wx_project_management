<template>
  <div class="detail">
    <!-- 主要 -->
    <div class="detailmain">
      <table class="detailtable" border="1">
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
          <td colspan="2">{{this.ratio*100}}</td>
        </tr>
        <tr>
          <td colspan="2">分包合同额(万元)</td>
          <td>{{this.subpackage}}</td>
          <td>净合同额(万元)</td>
          <td>{{this.jing}}</td>
          <td>奖励系数</td>
          <td>{{this.award}}</td>
          <td colspan="2">可分配产值(万元)</td>
          <td>{{this.ifaward}}</td>
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

    <!-- 按钮 -->
    <div class="detailbutton">
      <el-button class="detailbuttonmin" type="primary" @click="detailbutton()">项目导出</el-button>
    </div>

    <!-- 导出表格 -->
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
        <td>{{this.ratio}}</td>
        <td>{{this.subpackage}}</td>
        <td>{{this.jing}}</td>
        <td>{{this.award}}</td>
        <td>{{this.ifaward}}</td>
        <td>{{this.prove}}</td>
        <td>{{this.branchedpassage}}</td>
        <td>{{this.item}}</td>
        <td>{{this.participation}}</td>
        <td>{{this.standardtime}}</td>
        <td>{{this.explain}}</td>
        <td>{{this.suggest}}</td>
        <td>{{this.remark}}</td>
      </tr>
      <!-- <tr>
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
        <td colspan="2">{{this.ratio}}</td>
      </tr>
      <tr>
        <td colspan="2">分包合同额(万元)</td>
        <td>{{this.subpackage}}</td>
        <td>净合同额(万元)</td>
        <td>{{this.jing}}</td>
        <td>奖励系数</td>
        <td>{{this.award}}</td>
        <td colspan="2">可分配产值(万元)</td>
        <td>{{this.ifaward}}</td>
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
      </tr>-->
    </table>
  </div>
</template>

<script>
// import $ from 'jquery'
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  props: ["message"],
  data() {
    return {
      id: "",
      site: "",
      addtabletype: "",
      addtablenumber: "",
      addtablename: "",
      addtableconclude: "",
      contractamount: "",
      gathering: "",
      ratio: "",
      subpackage: "",
      jing: "",
      award: "",
      ifaward: "",
      prove: "",
      branchedpassage: "",
      item: "",
      participation: "",
      standardtime: "",
      explain: "",
      suggest: "",
      remark: ""
    };
  },
  methods: {
    detail() {
      this.$axios
        .post("http://gu.free-http.svipss.top/ps/selOne", {
          id: this.id
        })
        .then(res => {
          (this.site = res.data[0].address),
            (this.addtabletype = res.data[0].projectType),
            (this.addtablenumber = res.data[0].projectNum),
            (this.addtablename = res.data[0].projectNam),
            (this.addtableconclude = res.data[0].contractSigning),
            (this.contractamount = res.data[0].contractAmount),
            (this.gathering = res.data[0].collection),
            (this.ratio = res.data[0].collectionRatio),
            (this.subpackage = res.data[0].amountSubcontract),
            (this.jing = res.data[0].netValueOf),
            (this.award = res.data[0].bonusCoefficient),
            (this.ifaward = res.data[0].distributableValue),
            (this.prove = res.data[0].performanceCertificate),
            (this.branchedpassage = res.data[0].responsiblePerson),
            (this.item = res.data[0].projectLeader),
            (this.participation = res.data[0].participant),
            (this.standardtime = res.data[0].date),
            (this.explain = res.data[0].schedule),
            (this.suggest = res.data[0].questionsSuggestions),
            (this.remark = res.data[0].remark);
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
    }
  },
  watch: {
    message(v) {
      this.id = v;
      this.detail();
    }
  },
  mounted() {
    this.$em.$on("upda", () => {
      this.detail();
    });
    this.id = this.message;
    this.detail();
    // this.$axios.post("http://119.3.210.185:8920/ps/selOne",{
    //     id:this.id
    // }).then(res=>{
    //     this.site = res.data[0].address,
    //     this.addtabletype = res.data[0].projectType,
    //     this.addtablenumber = res.data[0].projectNum,
    //     this.addtablename = res.data[0].projectNam,
    //     this.addtableconclude = res.data[0].contractSigning,
    //     this.contractamount = res.data[0].contractAmount,
    //     this.gathering = res.data[0].collection,
    //     this.ratio = res.data[0].collectionRatio,
    //     this.subpackage = res.data[0].amountSubcontract,
    //     this.jing = res.data[0].netValueOf,
    //     this.award = res.data[0].bonusCoefficient,
    //     this.ifaward = res.data[0].distributableValue,
    //     this.prove = res.data[0].performanceCertificate,
    //     this.branchedpassage = res.data[0].responsiblePerson,
    //     this.item = res.data[0].projectLeader,
    //     this.participation = res.data[0].participant,
    //     this.standardtime = res.data[0].date,
    //     this.explain = res.data[0].schedule,
    //     this.suggest = res.data[0].questionsSuggestions,
    //     this.remark = res.data[0].remark
    // })
  }
};
</script>

<style>
.detail {
  width: 100%;
  height: 100%;
}
.detailmain {
  width: 100%;
  height: 95%;
  overflow: hidden;
  background: #000c3b;
}
.detailtable {
  width: 100%;
  height: 100%;
  border: 1.5px solid #6b79a8;
  text-align: center;
}
.detailtable tr td {
  font-size: 17px;
  color: #00e1fd;
  width: 10%;
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
.detailbuttonmin {
  height: 80%;
  line-height: 0 !important;
  background: #10193f !important;
}
.detailbuttonmin:hover {
  background: #202e63 !important;
  color: gold !important;
}
</style>
