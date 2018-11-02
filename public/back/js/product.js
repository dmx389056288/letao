$(function(){
	var currentPage = 1;
	var pageSize = 3;
	var picArr = []; //用于存储上传的图片路径
	render()
	function render(){
		$.ajax({
			type:"get",
			url:"/product/queryProductDetailList",
			data:{
				page:currentPage,
				pageSize:pageSize
			},
			dataType:"json",
			success:function(info){
				console.log(info)
				
				//模版引擎渲染数据
				var htmlStr = template("productTpl",info)
				$('tbody').html(htmlStr)
				// 分页
				$("#paginator").bootstrapPaginator({
				  bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
				  currentPage:currentPage,//当前页
				  totalPages:Math.ceil(info.total/info.size),//总页数
				  size:"small",//设置控件的大小，mini, small, normal,large
				  onPageClicked:function(event, originalEvent, type,page){
					//为按钮绑定点击事件 page:当前点击的按钮值
					currentPage = page
					render()
				  }
				});
			}
		});
	}
	
	//点击添加分类显现模态框
	$("#addBtn").click(function(){
		$("#addModal").modal('show')
			
		//获取二级分类渲染到下拉框
		$.ajax({
			type:'get',
			url:'/category/querySecondCategoryPaging',
			data:{
				page:1,
				pageSize:100
			},
			dataType:'json',
			success:function(info){
				console.log(info)
				//模版引擎渲染
				var htmlStr = template('secDown',info)
				$(".dropdown-menu").html(htmlStr)
			}	
		})
	})
	
	//点击下拉菜单中的a，注册点击事件，将值赋值给button
	$('.dropdown-menu').on('click','a',function(){
		var str =  $(this).text()
		$("#dropdownText").text(str)
		//将a的id赋值给隐藏域，进行表单验证
		var id = $(this).data('id')
		$('[name="brandId"]').val(id)
		
		$("#form").data("bootstrapValidator").updateStatus('brandId','VALID')
	})
	//图片上传
	$("#fileupload").fileupload({
      dataType:"json",
      //e：事件对象
      //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
      done:function (e, data) {
        console.log(data.result)
		var picObj = data.result;
		var picUrl = picObj.picAddr;
		//向数组的最前面添加数据
		picArr.push(picObj)
		// 把图片添加到盒子的子元素的最前面
		$("#imgBox").prepend("<img src = '"+picUrl+"'>")
		
		//限制只能上传三张图片
		if(picArr.length>3){
			//删除最后一张图片
			picArr.pop()
			$("#imgBox img:last-of-type").remove()
		}
		// 如果上传满了三张图片,手动进行表单效验成功
		if(picArr.length===3){
			$("#form").data('bootstrapValidator').updateStatus('picStatus','VALID')
			}
		},
	});
	//表单效验
	$("#form").bootstrapValidator({
		 // 配置对隐藏域也进行校验
		    excluded: [],
		
		    // 配置图标
		    feedbackIcons: {
		      valid: 'glyphicon glyphicon-ok',   // 校验成功
		      invalid: 'glyphicon glyphicon-remove',   // 校验失败
		      validating: 'glyphicon glyphicon-refresh'  // 校验中
		    },
		
		fields:{
			proName:{
				validators:{
					notEmpty:{
						message:'商品名称不能为空'
					}
				}
				
			},
			brandId:{
				validators:{
					notEmpty:{
						message:'请选择二级分类'
					}
				}
				
			},
			proDesc:{
				validators:{
					notEmpty:{
						message:'商品描述不能为空'
					}
				}
			},
			num:{
				validators:{
					notEmpty:{
						message:'商品库存不能为空'
					},
					regexp:{
						regexp:/^^[1-9]\d*$/,
						message: '库存格式要求是非零开头的数字'
					}
				}
			},
			size:{
				validators:{
					notEmpty:{
						message:'商品尺码不能为空'
					},
					regexp: {
						regexp: /^\d{2}-\d{2}$/,
						message: '尺码格式必须是 xx-xx 的格式, 例如: 32-40'
					}
				}
			},
			oldPrice:{
				validators:{
					notEmpty:{
						message:'商品原价不能为空'
					}
				}
			},
			price:{
				validators:{
					notEmpty:{
						message:'商品现价不能为空'
					}
				}
			},
			picStatus: {
				validators: {
					notEmpty: {
						message: "请上传3张图片"
					}
				}
			}
		}
	})
	
	
	//表单成功效验
	$("#form").on("success.form.bv",function(e){
		//阻止表单默认提交，使用ajax提交
		e.preventDefault()
		//拼接需要传给后台的参数
		var params = $('#form').serialize();  
		params +="&picAddr1="+picArr[0].picAddr+"&picName1="+picArr[0].picName
		params +="&picAddr2="+picArr[1].picAddr+"&picName2="+picArr[1].picName
		params +="&picAddr3="+picArr[2].picAddr+"&picName3="+picArr[2].picName
		$.ajax({
			type:'post',
			url:'/product/addProduct',
			data:params,
			dataType:'json',
			success:function(info){
				console.log(info)
				if(info.success){
					//添加成功，关闭模态框
					$("#addModal").modal('hide')
					//重新渲染页面第一页
					currentPage = 1;
					render()
					//重置模态框个表单内容
					$("#form").data('bootstrapValidator').resetForm(true)
					
					//重置下拉菜单和图片隐藏域内容
					$("#dropdownText").text("请选择二级分类")
					$("#imgBox img").remove()
				}
			}
		})
	})
})
