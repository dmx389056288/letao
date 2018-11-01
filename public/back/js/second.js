$(function(){
	//获取数据渲染到页面
	var currentPage = 1;//当前页码数
	var pageSize = 5;//每一页的数据
	//页面开始先渲染一次
	render()
	function render(){
		
	$.ajax({
		type:'get',
		url:'/category/querySecondCategoryPaging',
		data:{
			page:currentPage,
			pageSize:pageSize
		},
		dataType:'json',
		success:function(info){
			console.log(info)
			//模版引擎渲染数据
			var htmlStr = template("secondTmp",info)
			$('tbody').html(htmlStr)
			
			//分页
			
			$("#pagintor").bootstrapPaginator({
			  bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
			  currentPage:info.page,//当前页
			  totalPages:Math.ceil(info.total/info.size),//总页数
			  size:"small",//设置控件的大小，mini, small, normal,large
			  onPageClicked:function(event, originalEvent, type,page){
				//为按钮绑定点击事件 page:当前点击的按钮值
				currentPage = page
				render()
			  }
			});
		}
	})
	}
	
	//点击显示模态框
	$("#addBtn").on('click',function(){
		$('#addModal').modal('show')
		
	//动态渲染选择一级分类里面的数据
	$.ajax({
		type:'get',
		url:'/category/queryTopCategoryPaging',
		data:{page:1,
			pageSize:100},
		dataType:'json',
		success:function(info){
			console.log(info)
			var htmlStr = template('dropdownTpl',info)
			$(".dropdown-menu").html(htmlStr)
		}
	})
		
	})
	
	//给ul里面的a设置点击事件，点击后将a的文本添加给btn
	$('.dropdown-menu').on('click','a',function(){
		var txt = $(this).text()
			$('#dropdownText').text(txt)
			//获取a的id，传给id的隐藏域
			var id = $(this).data('id')
			
			$('[name="categoryId"]').val(id);
			
			// 对隐藏域进行效验，进行成功效验
			$('#form').data("bootstrapValidator").updateStatus('categoryId','VALID')
			
	})
	//配置文件上传插件
	$("#fileupload").fileupload({
      dataType:"json",
      //e：事件对象
      //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
      done:function (e, data) {
		var src = data.result.picAddr
		$("#addModal img").attr('src',src)
		
		//设置个隐藏域
		$("[name='brandLogo']").val(src)
      },
	  
	});
	
	//表单效验
	$("#form").bootstrapValidator({
		// 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
		// 对任意配置了的 input 都进行校验
		excluded: [],
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',   // 校验成功
			invalid: 'glyphicon glyphicon-remove',   // 校验失败
			validating: 'glyphicon glyphicon-refresh'  // 校验中
		},
		fields:{
			//一级分类
			categoryId:{
				validators:{
					notEmpty:{
						message:'请选择一级分类'
					}
				}
			},
			brandName:{
				validators:{
					notEmpty:{
						message:'请选择二级分类'
					}
				}
			},
			brandLogo:{
				validators:{
					notEmpty:{
						message:'请上传图片'
					}
				}
			}
		}
	})
	//注册表单效验成功事件，阻止默认的表单提交，通过ajax提交
	$("#form").on("success.form.bv",function(e){
		e.preventDefault();
		$.ajax({
			type:'post',
			url:"/category/addSecondCategory",
			data:$("#form").serialize(),
			dataType:'json',
			success:function(info){
				console.log(info)
				if(info.success){
					//上传成功
					//关闭模态框
					$('#addModal').modal('hide')
					//重新渲染第一页
					currentPage = 1;
					render()
					
					//重置表单内容
					$("#form").data("bootstrapValidator").resetForm(true)
					
					// img和下拉菜单不是表单元素,需要手动重置
					$("#dropdownText").text("请选择一级分类")
					
					$("#imgBox img").attr("src","images/none.png")
				}
			}
		})
	})
})