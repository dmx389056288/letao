//配置禁用小菊花
NProgress.configure({ showSpinner: false });
//ajax请求开始发生时
$(document).ajaxStart(function(){
	// 开启进度条
	NProgress.start();
})
// ajax请求结束时
$(document).ajaxStop(function(){
	//结束进度条
	NProgress.done()
});

$(function(){
	//切换二级菜单的显示于隐藏
	$(".nav .category").on("click",function(){
		$(this).next().stop().slideToggle()
	})
	$(".main-header .pull-left").on("click",function(){
		$(".lt-aside").toggleClass('hidemenu')
		$(".lt-main").toggleClass('hidemenu')
		$('.main-header').toggleClass('hidemenu')
	})
	
	//点击退出按钮退出当前登录
	$(".main-header .pull-right").on("click",function(){
		$('#logoutModal').modal("show")
		//退出登录
		$("#logouBtn").on("click",function(){
			$.ajax({
				type:"get",
				url:"/employee/employeeLogout",
				dataType:"json",
				success:function(info){
					
					if(info.success){
						location.href="login.html"
					}
				}
			})
		})
	})
	
});

