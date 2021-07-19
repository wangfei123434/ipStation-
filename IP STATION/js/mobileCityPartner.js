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