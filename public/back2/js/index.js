/**
 * Created by 54721 on 2018/10/31.
 */
$(function() {

  // 柱状图
  // 基于准备好的dom，初始化echarts实例
  var leftChart = echarts.init(document.querySelector(".echarts_left"));

  // 指定图表的配置项和数据
  var option1 = {
    // 大标题
    title: {
      text: '2017年注册人数'
    },
    // 提示框组件
    tooltip: {},
    // 图例, 用于解释说明的
    legend: {
      data:['人数', '销量']
    },
    // x轴
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    // y轴的刻度是根据数据自动生成的
    yAxis: {},
    series: [{
      name: '人数',
      // type: 设置图表的类型   bar 柱状图  line 折线图 pie 饼图
      type: 'bar',
      data: [500, 202, 360, 1000, 800, 600]
    },
    {
      name: '销量',
      type: 'bar',
      data: [1500, 1202, 1360, 600, 400, 700]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  leftChart.setOption(option1);




  // 基于准备好的dom，初始化echarts实例
  var rightChart = echarts.init(document.querySelector(".echarts_right"));

  // 指定图表的配置项和数据
  var option2 = {
    title : {
      text: '热门品牌销售',
      subtext: '2017年6月',
      x:'center',

      // 标题样式
      textStyle: {
        // 颜色
        color: "red",
        // 字体大小
        fontSize: 25
      }
    },
    // 提示框组件
    tooltip : {
      // 在饼图中, 鼠标滑到数据上时, 显示提示框
      trigger: 'item',
      // 配置提示框文本
      // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    // 图例
    legend: {
      // 控制图例的方向,  vertical垂直,  horizontal 水平的
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','阿迪王','李宁']
    },
    // 系列
    series : [
      {
        name: '访问来源',
        type: 'pie',
        // 配置圆的大小
        radius : '55%',
        // 圆心坐标
        center: ['50%', '60%'],
        data:[
          {value:335, name:'耐克'},
          {value:310, name:'阿迪'},
          {value:234, name:'新百伦'},
          {value:135, name:'阿迪王'},
          {value:1548, name:'李宁'}
        ],
        // 阴影效果
        itemStyle: {
          emphasis: {
            shadowBlur: 100,
            shadowOffsetX: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  rightChart.setOption(option2);










})
