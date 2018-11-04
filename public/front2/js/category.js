/**
 * Created by 54721 on 2018/11/4.
 */

$(function() {


  // 1. 发送ajax, 请求左侧一级分类的数据, 进行渲染
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function( info ) {
      console.log( info );
      var htmlStr = template( "left_tpl", info );
      $('.lt_category_left ul').html( htmlStr );

      // 渲染第一个一级分类, 对应的二级分类
      renderById( info.rows[0].id );
    }
  });

  // 2. 给左侧 a 注册点击事件 (通过事件委托注册)
  $('.lt_category_left ul').on("click", "a", function() {

    // 获取 id
    var id = $(this).data("id");

    // 调用方法
    renderById( id );

    // 让自己加上 current 类, 让其他 a 移除 current
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");

  })


  // 根据一级分类的 id, 渲染二级分类
  function renderById( id ) {
    // 发送ajax, 请求对应二级分类的数据
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template( "right_tpl", info );
        $(".lt_category_right ul").html( htmlStr );
      }
    })
  }


})
