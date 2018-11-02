/**
 * Created by 54721 on 2018/11/1.
 */


$(function() {
  var currentPage = 1; // 当前页
  var pageSize = 5; // 每页多少条


  // 1. 发送ajax请求数据, 进行渲染
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template( "firstTpl", info );
        $('tbody').html( htmlStr );

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 当前页
          currentPage: info.page,
          // 绑定页码点击事件
          onPageClicked: function( a, b, c, page ) {
            // 点击时, 显示 page 页的数据
            // 更新当前页
            currentPage = page;
            render();
          }
        })
      }
    })
  };



  // 2. 点击添加按钮, 显示添加模态框
  $('#addBtn').click(function() {
    $('#addModal').modal("show");
  });



  // 3. 表单校验
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置需要校验的字段
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          notEmpty: {
            message: "请输入一级分类"
          }
        }
      }
    }
  });



  // 4. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax 提交
  $('#form').on("success.form.bv", function( e ) {
    // 阻止默认的提交
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log( info );
        // 关闭模态框
        $('#addModal').modal("hide");
        // 页面重新渲染第1页
        currentPage = 1;
        render();

        // 调用 resetForm 进行重置
        // resetForm(true) 传 true 表示内容和校验状态都重置
        $('#form').data("bootstrapValidator").resetForm( true );
      }
    })

  })


});
