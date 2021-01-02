<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
// import echarts from "echarts"
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
    }),
  },

  mounted() {
    this.reqCateList({istree:true});
  },
  watch: {
    list: {
      handler() {
        var myChart = require("echarts").init(document.getElementById("main"));

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "分类数量",
          },
          tooltip: {},
          legend: {
            data: ["数量"],
          },
          xAxis: {
            data: this.list.map(item=>item.catename),
          },
          yAxis: {},
          series: [
            {
              name: "分类数量",
              type: "line",
              data: this.list.map(item=>item.children?item.children.length:0)
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
#main {
  width: 600px;
  height: 400px;
  border: 1px solid red;
  margin: 50px auto;
}
</style>