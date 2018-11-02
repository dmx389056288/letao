/**
 * Created by 54721 on 2018/10/29.
 */



$(function() {

  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $('#form').bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },


    // 配置校验字段, 要先给 input 设置 name
    fields: {
      // 配置 用户名校验
      username: {
        // 配置校验规则
        validators: {
          // 非空校验
          notEmpty: {
            // 非空提示
            message: "用户名不能为空"
          },

          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6位"
          },

          // 用以配置 ajax 回调的提示
          callback: {
            message: "用户名不存在"
          }
        }
      },

      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }

  });




  /*
  * 2. 登录功能
  *    表单校验插件会在表单提交时进行校验, 如果希望通过 ajax 提交
  *    可以注册表单校验成功事件, 在事件中, 阻止默认的跳转提交, 通过 ajax 进行提交
  * */
  $('#form').on("success.form.bv", function( e ) {

    e.preventDefault();

    // console.log( "阻止了默认的提交" );

    // 通过 ajax 进行提交
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      // 表单序列化
      data: $('#form').serialize(),
      dataType: 'json',
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          // 跳转到首页
          location.href = "index.html";
        }

        if ( info.error === 1000 ) {
          // 提示用户名不存在
          // alert( info.message );
          // 调用插件实例方法, 更新校验状态成失败
          // updateStatus
          // 参数1: 校验字段
          // 参数2: 校验状态  NOT_VALIDATED未校验, VALIDATING校验中, INVALID校验失败 or VALID成功
          // 参数3: 配置校验规则, 用于配置提示信息
          $("#form").data("bootstrapValidator").updateStatus( "username", "INVALID", "callback")
        }

        if ( info.error === 1001 ) {
          // 密码错误
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }
      }
    })

  })


  /*
  * 3. 重置功能完成
  *    reset 按钮, 本身就可以重置表单内容
  * */
  $('[type="reset"]').click(function() {
    // 调用实例的方法, 重置校验状态和内容
    // resetForm 传true, 内容和校验状态都重置
    //           不传true, 只重置校验状态
    $('#form').data("bootstrapValidator").resetForm();
  })


})