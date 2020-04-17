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
          <!-- <el-select v-model="value1" class="clec1" placeholder="人员名称">
            <el-option v-for="item in personData" :key="item.value" :value="item.value"></el-option>
          </el-select>-->
          <div id="leftech"></div>
        </div>
        <div class="right">
          <!-- <el-select v-model="value2" class="clec1" placeholder="项目名称">
            <el-option v-for="item in projectData" :key="item.value" :value="item.value"></el-option>
          </el-select>-->
          <div id="rightech"></div>
        </div>
      </div>
      <div id="map1">
        <h1>项目分布总览</h1>
        <div id="map2"></div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=3979bd1efdf1182fb532b2b6ad46a8f0&plugin=AMap.Geocoder"></script>
<script>
var map = null;
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
      ]
    };
  },
  created() {
    this.$store.commit("set_active", "Statistical");
    this.getData();
    this.$store.dispatch("get_pro_data");
  },
  mounted() {
    // this.leftEch();
    // this.rightEach();
    this.creatmap();
  },
  computed: {
    TotalData() {
      return this.$store.state.pro_data;
    },
    pro_type() {
      return this.$store.state.pro_type;
    }
  },
  watch: {
    value1(v) {
      this.leftproName = [];
      this.bili = [];
      let obj = this.Totaldata.filter(res => res.personnel == v);
      obj.forEach(v => {
        this.leftproName.push(v.projectNam);
        this.bili.push(v.distributionRatio);
      });
      // this.leftEch();
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
      let totalArr = []
      totalArr
    },
    pro_type(v) {
      this.type();
      this.area();
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
          this.Totaldata = data.data;
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
    //项目类型
    type() {
      var myChart = this.$ech.init(document.getElementById("leftech"));
      this.echar.bing(myChart, this.pro_type, "项目占比", "项目类型占比");
    },
    area() {
      var myChart = this.$ech.init(document.getElementById("rightech"));
      // let obj = {dom:myChart,datax,value,x_text:'城市名称',y_text:'项目名称',}
      this.echar.zhu(
        myChart,
        [1, 2, 3],
        [20, 30, 40],
        "项目占比",
        "项目地区统计"
      );
    },
    leftEch() {
      let data = [];
      this.bili.forEach((v, i) => {
        data.push({ name: this.leftproName[i], value: v });
      });
      console.log(data);
      var myChart = this.$ech.init(document.getElementById("leftech"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
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
      var option = {
        title: {
          text: "项目"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          right: "15%",
          bottom: "20%"
        },
        legend: {
          data: ["分配比例"],
          textStyle: {
            color: "#fff"
          }
        },
        xAxis: {
          data: this.leftproName,
          name: "项目名称",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 14
            },
            formatter: function(param) {
              console.log(param);
              if (param.length > 10) {
                param.slice(0, 10) + "...";
              }
              return param.split("").join("\n");
            }
          },
          axisLine: {
            lineStyle: {
              color: "#fff",
              type: "solid",
              width: "2"
            }
          }
        },
        yAxis: {
          max: 100,
          min: 0,
          name: "分配比例",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 18
            }
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "#fff",
              width: "2"
            }
          }
        },
        series: [
          {
            name: "分配比例",
            type: "bar",
            data: this.bili,
            label: {
              show: true,
              formatter: "{c}%",
              position: "inside",
              verticalAlign: "middle",
              textStyle: {
                color: "red",
                fontSize: 20
              }
            },
            itemStyle: {
              normal: {
                color: "#fff"
              }
            }
          }
        ]
      };

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
      var geocoder = new AMap.Geocoder({
        city: "" //城市设为北京，默认：“全国”
      });
      this.$axios
        .post(this.baseurl + "/pv/seladdress", {
          phone: this.$store.state.phone
        })
        .then(data => {
          console.log(data);
          let arr = [];
          let address = [];
          data.data.forEach(v => {
            address.push(v.address);
            geocoder.getLocation(address, function(status, result) {
              if (status === "complete" && result.geocodes.length) {
                console.log(result.geocodes);
                result.geocodes.forEach(res => {
                  var lnglat = res.location;
                  arr.push({
                    name: `${v.address}，${v.count}个项目`,
                    value: [lnglat.lng, lnglat.lat]
                  });
                });
                that.geoCoordMap = arr;
                that.creatmsg();
              } else {
                log.error("根据地址查询位置失败");
              }
            });
          });
        });
    },
    creatmsg() {
      let markerContent = [];
      let lnglats = [];
      this.geoCoordMap.forEach(v => {
        markerContent.push(
          `<div class="custom-content-marker"><span>${v.name}</span><div class="jiantou"></div></div>`
        );
        lnglats.push([v.value[0], v.value[1]]);
      });
      // let lnglats = [[118.820041, 32.014397]]
      let markers1 = [];
      for (var i = 0; i < lnglats.length; i++) {
        // console.log(lnglats[i]);
        var marker = new AMap.Marker({
          position: lnglats[i],
          content: markerContent[i],
          offset: new AMap.Pixel(-30, -70),
          title: "项目名称"
        });
        markers1.push(marker);
      }
      map.add(markers1);
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
  width: 10px;
  background: white;
}
.Statistical::-webkit-scrollbar-thumb {
  width: 10px;
  background: #283879;
}
.bottom {
  height: 500px;
  width: 100%;
  border: 1px solid red;
  box-sizing: border-box;
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
#rightech {
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
</style>