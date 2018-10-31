//页面一进来就判断登录状态是否登录
$.ajax({
	type:"get",
	url:"/employee/checkRootLogin",
	dataType:"json",
	success:function(info){
		if(info.error===400){
			location.href = "login.html";
		}
	}
})