/**
 * Created by 54721 on 2018/10/31.
 */
$(function() {
  var currentPage = 1;  // 全局的页码
  var pageSize = 5;  // 每页多少条

  var currentId; // 当前修改的用户 id
  var isDelete; // 修改的状态

  render();

  // 一进入页面, 发送 ajax 请求, 获取用户列表, 通过 模板引擎渲染
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        // 通过模板引擎渲染
        // var htmlStr = template( "模板id", "数据对象")
        // 在模板中可以使用传入的数据对象的属性
        var htmlStr = template("tmp", info);

        // 渲染到页面中
        $('tbody').html( htmlStr );

        // 配置分页插件
        $('#paginator').bootstrapPaginator({
          // 配置版本号
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ) ,
          // 当前页
          currentPage: info.page,
          // 页码点击事件
          onPageClicked: function( a, b, c, page ) {
            //console.log( page );
            // 请求对应页码的 数据, 进行渲染
            currentPage = page;
            // 根据 currentPage 加载对应数据, 进行渲染
            render();
          }
        });
      }
    });
  }


  // 什么时候用事件委托?
  // 1. 元素是动态生成的
  // 2. 批量注册事件, 效率高

  // 点击启用禁用按钮, 显示模态框 (使用事件委托)
  $('tbody').on("click", ".btn", function() {

    // 显示模态框
    $('#userModal').modal("show");

    // 获取父元素 td 中存储的 data-id
    currentId = $(this).parent().data("id");

    // 获取启用还是禁用, 根据按钮的类来判断
    // 禁用 ? 0 : 1;
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });

  // 点击模态框确定按钮, 进行修改用户状态
  $('#submitBtn').click(function() {

    // 发送 ajax 请求
    $.ajax({
      type: "POST",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        // 关闭模态框
        $('#userModal').modal("hide");

        // 页面重新渲染当前页
        render();
      }
    })
  })

})
