<template>
  <div class="Statistical">
    <!-- 头部面包屑 -->
    <div class="mianbao">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>统计分析 ></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 中部主要 -->
    <div class="Statisticalmain">
      <div class="each">
        <div class="left">
          <div id="leftech"></div>
        </div>
        <div class="right">
          <div id="type"></div>
        </div>
      </div>
      <div id="map1">
        <h1>项目分布总览</h1>
        <div id="map2"></div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <!-- 项目负责人统计 -->
        <div id="left"></div>
      </div>
      <!-- 项目地区统计 -->
      <div id="rightech"></div>
      <div>
        <!-- <el-select v-model="value2" class="clec1" placeholder="项目名称">
          <el-option v-for="item in projectData" :key="item.value" :value="item.value"></el-option>
        </el-select>-->
        <el-select v-model="value1" class="clec1" placeholder="人员名称">
          <el-option v-for="item in personData" :key="item.value" :value="item.value"></el-option>
        </el-select>
        <!-- 产值分配人员统计 -->
        <div id="per"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=3979bd1efdf1182fb532b2b6ad46a8f0&plugin=AMap.Geocoder"></script>
<script>
var map = null;
import * as Api from "../api/api";
export default {
  data() {
    return {
      Totaldata: [],
      personData: [],
      projectData: [],
      value1: "",
      value2: "",
      bili: [], //分配比例
      leftproName: [], //项目名称
      value: [], //分配产值r
      geoCoordMap: [
        // { name: "保障房配套道路（泰山西路）", value: [118.711937, 32.145821] }
      ],
      city_value: [] //项目地区统计
    };
  },
  created() {
    this.$store.commit("set_active", "Statistical");
    this.getData();
    this.$store.dispatch("get_pro_data");
  },
  mounted() {
    // this.rightEach();
    this.creatmap();
    this.personal();
    this.type();
    this.type1();
  },
  computed: {
    TotalData() {
      return this.$store.state.pro_data;
    },
    pro_type() {
      return this.$store.state.pro_type;
    },
    pro_person() {
      return this.$store.state.person.person;
    },
    phone() {
      return this.$store.state.phone;
    }
  },
  watch: {
    value1(v) {
      this.leftproName = [];
      this.bili = [];
      console.log(this.TotalData);
      let obj = this.Totaldata.filter(res => (res.personnel).trim() == v);
      console.log(obj);
      obj.forEach(v => {
        this.leftproName.push(v.projectNam);
        this.bili.push(v.currentDistributionRatio);
      });
      this.leftEch();
    },
    value2(v) {
      this.value = [];
      let obj = this.Totaldata.filter(res => res.projectNam == v);
      obj.forEach(v => {
        this.value.push({
          value: v.distributionRatio,
          name: v.personnel
        });
      });
      // this.rightEach();
    },
    TotalData(v) {
      console.log("总数据", v);
      let city = v.map(v => {
        let index = v.address.indexOf("市");
        let ci = v.address.substring(index - 2, index + 1);
        return ci;
      });
      city = [...new Set(city)];
      //每个城市项目的数量
      const value = () => {
        let arr = [];
        city.forEach(n => {
          let length = v.filter(r => {
            let index = r.address.indexOf("市");
            let ci = r.address.substring(index - 2, index + 1);
            return ci == n;
          }).length;
          arr.push(length);
        });
        return arr;
      };
      this.city_value = [city, value()];
      this.area();
    },
    pro_type(v) {
      this.type();
    },
    pro_person(v) {
      //负责人
    }
  },
  methods: {
    getData() {
      this.$axios
        .post(this.baseurl + "/pv/selNum", {
          projectNum: this.projectNum,
          phone: this.$store.state.phone
        })
        .then(data => {
          console.log(data);
          data.data.forEach(v => {
            this.personData.push(v.personnel.trim());
            this.projectData.push(v.projectNam.trim());
          });
          console.log(data.data);
          this.Totaldata = data.data;
          this.leftEch();
          this.personData = new Set(this.personData);
          this.projectData = new Set(this.projectData);
          let arr = [];
          let arr2 = []; //项目
          this.personData.forEach(v => {
            arr.push({ value: v });
          });
          this.projectData.forEach(v => {
            arr2.push({ value: v });
          });
          this.personData = arr;
          this.projectData = arr2;
          this.value1 = this.personData[0].value;
          this.value2 = this.projectData[0].value;
        });
    },
    //项目类型数量占比
    type() {
      var myChart = this.$ech.init(document.getElementById("leftech"));
      this.echar.bing(myChart, this.pro_type, "项目占比", "项目类型数量占比");
    },
    //项目类型总金额占比
    type1() {
      var myChart = this.$ech.init(document.getElementById("type"));
      this.$axios
        .post(this.baseurl + "/ps/findContractAmountsum", { phone: this.phone })
        .then(data => {
          let res = data.data;
          res.sort((a, b) => b.sum - a.sum);
          let x = res.map(v => v.projectType);
          let y = res.map(v => v.sum);
          let obj = {
            dom: myChart,
            datax: x,
            value: y,
            x_text: "项目类型",
            y_text: "项目总金额(万)",
            title: "项目类型总金额占比",
            max: 10000,
            min: 0
          };
          this.echar.zhu(obj);
        });
    },
    //项目地区统计
    area() {
      var myChart = this.$ech.init(document.getElementById("rightech"));
      let value = this.city_value[1];
      let city = this.city_value[0];
      const sort_arr = () => {
        let arr = [];
        value.forEach((v, id) => {
          arr.push({ name: city[id], value: v });
        });
        arr.sort((a, b) => {
          return b.value - a.value;
        });
        let city_value = [];
        let x = [];
        let val = [];
        arr.forEach(v => {
          x.push(v.name);
          val.push(v.value);
        });
        return (city_value = [x, val]);
      };
      console.log(sort_arr());
      let obj = {
        dom: myChart,
        datax: sort_arr()[0],
        value: sort_arr()[1],
        x_text: "城市名称",
        y_text: "项目数量",
        title: "项目地区统计"
      };
      this.echar.zhu(obj);
      this.creatmsg();
    },
    //产值分配人员统计
    leftEch() {
      let data = [];
      this.bili.forEach((v, i) => {
        data.push({ name: this.leftproName[i], value: v });
      });
      var myChart = this.$ech.init(document.getElementById("per"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>项目:{b},分配比例:{c}% <br/>(单个占比{d}%)"
        },
        title: {
          text: "产值分配人员统计",
          left: "center",
          textStyle: {
            color: "red",
            fontSize: 18
          },
          // backgroundColor: "white",
          top: "2%"
        },
        series: [
          {
            radius: "66%",
            name: "项目占比",
            type: "pie",
            // radius: "55%",
            data: data,
            label: {
              show: true,
              formatter: "{b},比例{c}%",
              // position: "inside",
              verticalAlign: "middle",
              textStyle: {
                color: "white",
                fontSize: 20
              }
            }
          }
        ]
      });

      // myChart.setOption(option);
    },
    rightEach() {
      console.log(this.value);
      var myChart = this.$ech.init(document.getElementById("rightech"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            radius: "66%",
            name: "人员占比",
            type: "pie",
            // radius: "55%",
            data: this.value,
            label: {
              show: true,
              formatter: "{b}{c}%",
              // position: "inside",
              verticalAlign: "middle",
              textStyle: {
                color: "white",
                fontSize: 20
              }
            }
          }
        ]
      });
    },
    creatmap() {
      let that = this;
      map = new AMap.Map("map2", {
        zoom: 5, //级别
        zooms: [5, 13],
        zoomEnable: true,
        doubleClickZoom: true,
        // center: [118.815426, 32.194963]
        center: [107.145473, 35.056289]
      });
      map.setMapStyle("amap://styles/2e6afbd914a6e62acc0112b25c51897b");
    },
    creatmsg() {
      let value = this.city_value[1];
      let city = this.city_value[0];
      var arr = [];
      value.forEach((v, id) => {
        arr.push({ name: city[id], value: v });
      });
      this.getpoint(arr);
    },
    getpoint(arr) {
      let that = this;
      var geocoder = new AMap.Geocoder({
        city: "" //城市设为北京，默认：“全国”
      });
      let address = arr.map(v => v.name);
      let arr1 = [];
      geocoder.getLocation(address, function(status, result) {
        if (status === "complete" && result.geocodes.length) {
          console.log(result.geocodes);
          result.geocodes.forEach((res, id) => {
            console.log(res);
            // if (!res) {
            //   that.base.warn(that, "地图坐标获取失败");
            //   return;
            // }
            let lng = res.location.lng;
            let lat = res.location.lat;
            arr1.push({
              name: `${arr[id].name}的项目数量为${arr[id].value}`,
              value: [lng, lat]
            });
          });
          let markerContent = [];
          let lnglats = [];
          arr1.forEach(v => {
            markerContent.push(
              `<div class="custom-content-marker"><span>${v.name}</span><div class="jiantou"></div></div>`
            );
            lnglats.push([v.value[0], v.value[1]]);
          });
          // lnglats = [[118.820041, 32.014397]];
          let markers1 = [];
          for (var i = 0; i < lnglats.length; i++) {
            var marker = new AMap.Marker({
              position: lnglats[i],
              content: markerContent[i],
              offset: new AMap.Pixel(-30, -70),
              title: "项目名称"
            });
            markers1.push(marker);
          }
          map.add(markers1);
        } else {
          log.error("根据地址查询位置失败");
        }
      });
    },
    //项目负责人项目统计
    personal() {
      console.log(this.phone);
      Api.get_fuze({ phone: this.phone }).then(data => {
        let arr = data.data.map(v => {
          let obj = { name: `负责人${v.projectLeader}`, value: v.count };
          return obj;
        });
        var myChart = this.$ech.init(document.getElementById("left"));
        this.echar.bing(myChart, arr, "项目数", "项目负责人项目统计");
      });
    }
  }
};
</script>
<style>
.Statistical {
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 5px #283879;
  overflow: auto;
}
.Statistical::-webkit-scrollbar {
  width: 5px;
  background: white;
}
.Statistical::-webkit-scrollbar-thumb {
  width: 5px;
  background: #283879;
}
.bottom {
  height: 500px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
}
.bottom > div {
  height: 100%;
  width: 33%;
  position: relative;
}
#per {
  width: 100%;
  height: 400px;
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
.Statisticalmain {
  width: 100%;
  height: 96%;
  display: flex;
}
.Statisticalmain > div {
  flex: 1;
  padding: 10px;
}
.left,
.right {
  padding-left: 30px;
  box-sizing: border-box;
  width: 100%;
  height: 50%;
}
#leftech,
#type {
  width: 100%;
  height: 100%;
}
.each {
  flex: 1;
  height: 95%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
}
#map1 {
  flex: 1.2;
  width: 100%;
  height: 90%;
}
#map1 h1 {
  font-size: 20px;
  color: white;
  padding: 5px 20px;
  padding-top: 0;
  box-sizing: border-box;
}
#map2 {
  border-radius: 10px;
  border: 1px solid aqua;
  width: 100%;
  height: 100%;
}
/* 选择框 */
.clec1 {
  margin-bottom: 10px;
  border: 1px solid white;
}
#left {
  width: 100%;
  height: 100%;
}
</style>