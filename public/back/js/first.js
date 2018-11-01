$(function(){
	var currentPage = 1;//当前页码
	var pageSize = 5;//每一页的条数
		
		render()
	function render(){
	$.ajax({
		type:'get',
		url:'/category/queryTopCategoryPaging',
		data:{
			page:currentPage,
			pageSize:pageSize
		},
		dataType:'json',
		success:function(info){
			// 模版引擎渲染数据
			console.log(info)
			var htmlStr = template('firstTmp',info)
			$('tbody').html(htmlStr)
			
			//分页
			$("#pagintor").bootstrapPaginator({
			  bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
			  currentPage:info.page,//当前页
			  totalPages:Math.ceil(info.total/info.size),//总页数
			  size:"small",//设置控件的大小，mini, small, normal,large
			  onPageClicked:function(event, originalEvent, type,page){
				//为按钮绑定点击事件 page:当前点击的按钮值
			  }
			});
			
		}
	})
	}
	
	
	$('#addBtn').on("click",function(){
		//点击显示模态框
		
		$("#addModal").modal('show')	
	})
	//表单验证
	$('#form').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',   // 校验成功
			invalid: 'glyphicon glyphicon-remove',   // 校验失败
			validating: 'glyphicon glyphicon-refresh'  // 校验中
		},
		fields:{
			categoryName:{
				validators:{
					notEmpty:{
						message:'分类不能为空'
					}
				}
			}
		}
	})
	
	//添加分类
	$('#form').on('success.form.bv',function(e){
		console.log(111)
		e.preventDefault()
		$.ajax({
			type:'post',
			url:'/category/addTopCategory',
			data:$('#form').serialize(),
			dataType:'json',
			success:function(info){
				//关闭模态框
				$("#addModal").modal('hide')
				//渲染页面
				currentPage=1
				render()
			}
		})
	})
	
});