// 渲染左侧菜单栏
$(function(){
	
	$.ajax({
		type:'get',
		url:"/category/queryTopCategory",
		dataType:'json',
		success:function(info){
			console.log(info)
			//通过模版引擎渲染数据
			var htmlStr = template("category-left",info)
			$(".lt-category-left ul").html(htmlStr)
			renderRight(info.rows[0].id)
		}
	})
	
	//给左侧菜单栏注册点击事件
	$(".lt-category-left ul").on('click','a',function(){
		var id = $(this).data('id')
		renderRight(id)
	})
	//渲染作右侧
	function renderRight(id){
		$.ajax({
			type:'get',
			url:"/category/querySecondCategory",
			data:{id:id},
			dataType:'json',
			success:function(info){
				console.log(info)
				
				var htmlStr = template("category-right",info)
				$(".lt-category-right ul").html(htmlStr)
				
			}
		})
	}
	
})