;(function(){
	//使用表单验证插件
	$("#form").bootstrapValidator({
		
		feedbackIcons:{
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },

		fields:{
			username:{
				validators:{
					notEmpty:{
						message:"用户名不为空"
					},
					stringLength:{
						min:2,
						max:6,
						message:"用户名长度2-6位"
					},
					callback:{
						message:"用户名不存在"
					}
				}
			},
			password:{
				validators:{
					notEmpty:{
						message:"密码不能为空"
					},
					stringLength:{
						min:6,
						max:12,
						message:"密码长度为6-12位"
					},
					callback:{
						message:"密码错误"
					}
				}
			}
		}
		
	})
	
	//注册表单验证成功事件
	$("#form").on("success.form.bv",function(e){
		//阻止表单的默认提交
		e.preventDefault();
		// 使用ajax提交
		$.ajax({
			type:'POST',
			url:"/employee/employeeLogin",
			data:$("#form").serialize(),
			dataType:'json',
			success:function(info){
				if(info.error===1000){
					$("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
				};
				if(info.error===1001){
					$("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback")
				};
				if(info.success){
					location.href="index.html"
				}
				
			}
		})
	})
	
	//重置表单信息
	$("[type='reset']").on("click",function(){
		$("#form").data("bootstrapValidator").resetForm(true);
	})
})();

