<template>
  <div class="wrap">
    <div class="addtablemain_market">
      <table class="market_add" border="1">
        <tr>
          <td>项目地区</td>
          <td width="30%">
            <v-distpicker @selected="onChangeselected"></v-distpicker>
          </td>
          <td>项目类型</td>
          <td>
            <el-select v-model="projectType" placeholder="请选择">
              <el-option v-for="item in addtabletypeoptions" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </td>
          <td>项目名称</td>
          <td>
            <el-input v-model="projectName" placeholder="请输入"></el-input>
          </td>
        </tr>
        <tr>
          <td>是否开跟踪号</td>
          <td>
            <el-select v-model="trackingNumber" placeholder="请选择">
              <el-option
                v-for="item in addtableconcludeoptions"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>预期合同额(万元)</td>
          <td>
            <el-input v-model="contractAmount" placeholder="请输入"></el-input>
          </td>
          <td>价值等级</td>
          <td>
            <el-select v-model="valueLevel" placeholder="请选择">
              <el-option v-for="item in proveoptions" :key="item.value" :value="item.value"></el-option>
            </el-select>
          </td>
        </tr>
        <tr>
          <td>跟踪负责人</td>
          <td>
            <el-select v-model="principal" placeholder="请选择">
              <el-option
                v-for="item in branchedpassageoptions"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </td>
          <td>信息来源</td>
          <td colspan="3">
            <el-input type="textarea" v-model="informationSource" placeholder="请输入信息来源"></el-input>
          </td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="5">
            <el-input type="textarea" v-model="remark" placeholder="请输入备注信息"></el-input>
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
    <table id="example" style="display:none"></table>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import $ from "jquery";
export default {
  data() {
    return {
      // 地址
      address: "",
      // 项目类型
      projectType: "",
      // 项目名称
      projectName: "",
      // 预期合同额
      contractAmount: "",
      // 是否开跟踪号
      trackingNumber: "",
      // 跟踪负责人
      principal: "",
      // 信息来源
      informationSource: "",
      // 价值等级
      valueLevel: "",
      // 备注
      remark: "",
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
          value: "否"
        },
        {
          value: "是(中设)"
        },
        {
          value: "是(纬信)"
        }
      ],
      // 履约证明或节点证明
      proveoptions: [
        {
          value: "高"
        },
        {
          value: "中"
        },
        {
          value: "低"
        }
      ],
      // 分管负责人
      branchedpassageoptions: [
        {
          value: "丁振强"
        }
      ],
      // 项目负责人
      itemoptions: [],
      // 参与人员
      participationoptions: []
    };
  },
  components: {
    VDistpicker
  },
  computed: {
    time() {
      return this.base.GetTime();
    },
    phone() {
      return this.$store.state.phone;
    },
    person() {
      //跟踪负责人
      return this.$store.state.person.person.参与人员;
    }
  },
  watch: {},
  created() {},
  mounted() {
    let arr = this.person.map(v => {
      return { value: v.name.trim() };
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
    this.branchedpassageoptions = arr;
  },
  methods: {
    // 选择地区
    onChangeselected(a) {
      this.address = a.province.value + "-" + a.city.value + "-" + a.area.value;
    },
    // 提交按钮
    submit() {
      let params = {
        address: this.address,
        projectType: this.projectType,
        projectName: this.projectName,
        contractAmount: this.contractAmount,
        trackingNumber: this.trackingNumber,
        principal: this.principal,
        informationSource: this.informationSource,
        valueLevel: this.valueLevel,
        remark: this.remark,
        phone: this.phone
      };
      if (this.address == "") {
        this.base.warn(this, "请填写项目地区");
        return;
      }
      if (this.projectType == "") {
        this.base.warn(this, "请填写项目类型");
        return;
      }
      if (this.projectName == "") {
        this.base.warn(this, "请填写项目名称");
        return;
      }
      if (this.trackingNumber == "") {
        this.base.warn(this, "请选择是否开跟踪号");
        return;
      }
      if (this.contractAmount == "") {
        this.base.warn(this, "请填写预期合同额");
        return;
      }
      if (this.valueLevel == "") {
        this.base.warn(this, "请选择价值等级");
        return;
      }
      if (this.principal == "") {
        this.base.warn(this, "请选择跟踪负责人");
        return;
      }
      this.$axios.post(this.baseurl + "/market/insert", params).then(data => {
        if (data.status == 200) {
          this.base.suc(this, data.data);
          this.$emit("close");
          this.$store.dispatch("get_totalData");
          this.$router.push("/market");
        }
      });
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
<style scoped>
.wrap {
  width: 100%;
  height: 500px;
  /* border: 1px solid red; */
  position: relative;
}
.addtablemain_market {
  width: 100%;
  height: 95%;
  overflow: hidden;
  background: #000c3b;
}
.market_add {
  width: 100%;
  height: 100%;
  border: 1.5px solid #6b79a8;
  text-align: center;
}
.market_add tr td {
  font-size: 17px;
  color: #00e1fd;
  padding: 0 10px;
  box-sizing: border-box;
}
.addtablebutton {
  width: 20%;
  height: 8%;
  margin-left: 40%;
  margin-top: 1%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  bottom: -100px;
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