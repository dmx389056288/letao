//读取本地本地储存的历史记录,读取的json字符串
//本地储存了键名为search_list的数据

  /*
  * 功能分析:
  * 功能1: 搜索历史记录渲染
  * 功能2: 清空搜索历史
  * 功能3: 删除单条历史记录
  * 功能4: 添加搜索历史记录
  * */

$(function(){
	//读取本地数据，为json字符串
	renderHistory()
	// 获取本地localstorage
	function getHistroy(){
	var jsonStr = localStorage.getItem('search_list')||'[]';
		//将字符串转换为数组
	var arr = JSON.parse(jsonStr)
		return arr
	}
	//渲染历史记录
	function renderHistory(){
		var arr =getHistroy()
		//模版引擎渲染
		var htmlStr = template('search-tpl',{list:arr});
		$('.lt-history').html(htmlStr)
	}
	
	//清空搜索历史记录
	$('.lt-history').on('click','.lt-clear',function(){
		mui.confirm("你确定要清除历史记录吗？","温馨提示",["取消","确定"],function(e){
			if(e.index===1){
				localStorage.removeItem('search_list')
				renderHistory()
			}
		})
	})
	
	//删除单条历史记录
	$('.lt-history').on('click','.btn-delete',function(){
			var index = $(this).data("index")
			var arr = getHistroy()
			arr.splice(index,1)
			//转为json字符串，存到本地
			localStorage.setItem( "search_list",JSON.stringify(arr))
			renderHistory()
		})
		
		//添加搜索历史记录
		$('.btn-search').on("click",function(){
			var txt = $("input").val().trim()
		
			//将拿到的内容添加到localStorage
			var arr= getHistroy()
			// 进行非空判断
			if(txt===''){
				mui.toast("请输入搜索的内容")
				return;
			}
			
			//如果在追加前发现有重复，删除重复
			var index = arr.indexOf(txt)  //重复显示重复位置，不重复为-1
			if(index!=-1){
				arr.splice(index,1)
			}
			//历史搜索最多展示十个
			if(arr.length>=10){
				arr.pop()
			}
			arr.unshift(txt)
			localStorage.setItem("search_list",JSON.stringify(arr))
			renderHistory()
			
			//清空输入框
			$("input").val('')
			// 跳转到搜索结果列表页
			location.href="searchList.html?key="+txt;
		})
})