$(function(){
	
	var currentId;//当前修改用户的id
	var isDelete;//获取当前状态码
	var currentPage = 1;//全局的页码
	var pageSize = 5 ;//每一页的码数
	//获取数据，渲染到页面
	//先渲染一次页面
	render()
	function render(){
		$.ajax({
		type:'get',
		url:"/user/queryUser",
		data:{
			page:currentPage,
			pageSize:pageSize
		},
		dataType:'json',
		success:function(info){
			console.log(info)
			//模版引擎渲染页面
			var htmlStr = template('tmp',info)
			$('tbody').html(htmlStr)
			//分页插件配置
			$("#paginator").bootstrapPaginator({
			  bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
			  currentPage:info.page,//当前页
			  totalPages:Math.ceil(info.total/info.size),//总页数
			  size:"small",//设置控件的大小，mini, small, normal,large
			  onPageClicked:function(event, originalEvent, type,page){
				//为按钮绑定点击事件 page:当前点击的按钮值
				//将点击的页码值赋值给全局的页码
				currentPage = page 
				// 根据全局页码值渲染页面
				render()
			  }
			});
			
		}
	})
	}
	
	
	//操作注册点击事件，事件委托
	$('tbody').on('click','.btn',function(){
		$('#userModal').modal('show')
		//获取当前点击的id
		currentId=$(this).parent().data('id')
		//获取当前点击的状态
		isDelete = $(this).hasClass('btn-danger')?0:1,
		$('#submitBtn').on('click',function(){
			
			$.ajax({
				type:'post',
				url:'/user/updateUser',
				data:{
					id:currentId,
					isDelete:isDelete
				},
				dataType:'json',
				success:function(info){
					//隐藏模态框
					$('#userModal').modal('hide')
					//重新渲染页面
					render()
				}
			})
		})
	})
});