/**
 * Created by 54721 on 2018/11/2.
 */

// 通过 .mui-scroll-wrapper 类, 选中元素, 进行区域滚动初始化
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006,
  indicators: false, //是否显示滚动条
});


// 复用的解析地址栏参数的方法
function getSearch( k ) {
  // 获取地址栏参数
  var str = location.search; // ?key=%E9%B9%8F&age=18&desc=%E5%B8%85

  // 转码成中文
  str = decodeURI( str );   // "?key=鹏&age=18&desc=帅"

  // slice(start, end);
  // 从start开始, 截取到end结束, 包含start, 不包含end
  // 如果不传 end, 表示截取到最后
  // 去掉 ?
  str = str.slice(1);     // "key=鹏&age=18&desc=帅"

  // 根据 & 分割
  var arr = str.split( "&" );   // ["key=鹏", "age=18", "desc=帅"]

  var obj = {};
  // 遍历数组
  arr.forEach(function( v, i ) { // v => "age=18"   i 下标
    var key = v.split("=")[0];  // age
    var value = v.split("=")[1]; // 18
    // 中括号 和 . 语法的区别在于, 中括号可以解析里面的变量
    obj[ key ] = value;
  })

  return obj[ k ];
}