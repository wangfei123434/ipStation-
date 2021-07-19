// nav导航
	var flag = false;
	$("#header_right").click(function(){
		$("#line").hide()
		$("#line").css("height",0)
		$("#onLine").hide()
		$("#onLine").css("opacity",0)
		if(!flag){
			$(this).addClass('active')
			$("#nav").stop().animate({"right":"0%"})
			
		}else{
			$(this).removeClass('active')
			$("#nav").stop().animate({"right":"-80%"})
		}
		flag = !flag
	})
	
	$("#onLine_li").click(function(){
		// $("#onLine").toggle();
		$("#line").css("display","block")
		$("#onLine").css("display","block")
		$("#line").animate({height:"1.8rem"})
		$("#onLine").animate({opacity:1}) 
		
	})
	
	let newsArr = []
	let newsStr = ""
	function getNewsDataFn() {
		$.ajax({
			type: "POST",
			url: `https://gate.wanou1.com/baby-wechat/websideNews/findPage`,
			dataType: "json",
			data: {},
			async: false,
			success: function(res) {
				console.log("媒体新闻res", res)
				newsArr = res.list
			},
		});
		for (let i = 0; i < newsArr.length; i++) {
			newsStr +=
				        `
							<div class="list_item">
								<a href="${newsArr[i].link}">
									<div class="item_pic">
										<img src="${newsArr[i].image}" >
									</div>
									<p class="title">${newsArr[i].title}</p>
									<p class="myDate">${newsArr[i].releaseDate.slice(5, 10)}</p>
								</a>
							</div>
						`
			$("#newsList").html(newsStr)
		}
	}
	getNewsDataFn()