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
	
	
	var controller;
	var defaulH = 750,
	docH = document.documentElement.clientHeight,docW = document.documentElement.clientWidth;
	controller = new ScrollMagic.Controller()
	function setAdvantageAnimation(){
		for(var i = 2;i<5;i++){
			var thisOffSet = 0;
			if(docW<750){
				if(docH < 812){
					thisOffSet = i>2?300:140;
				}else{
					thisOffSet = i>2?350:50;
				}
				
			}else if(docW<992){
				thisOffSet = i>2?350:360;
			}else{
				thisOffSet = i>2?500:420;
			}
			
			"var advantage_" + i + "=" + new ScrollMagic.Scene({triggerElement: "#advantage_" + i, duration: 300 ,offset: -thisOffSet})
				.setTween("#ad_main"+ i , 0.3, {opacity:1})
				.addIndicators()
				.addTo(controller);
		}
	}
	setAdvantageAnimation()


	