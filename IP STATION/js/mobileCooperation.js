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
	var defaultHeight = 667,docHeight = document.documentElement.clientHeight,offsetNum = docHeight/defaultHeight
	controller = new ScrollMagic.Controller()
	var thisOffSet = docHeight > 818?100:0;
	var offIndexNum = docHeight > defaultHeight ? 90*offsetNum:100
	function setAdvantageAnimation(){
		$('#cooperList li').each((index)=>{
			if(index !== 0){
				"var cooperList" + (index + 1) + "=" + new ScrollMagic.Scene({triggerElement: "#item_li" + (index + 1), duration: 300 ,offset: -(thisOffSet + index*offIndexNum)})
					.setTween("#item_box" + (index + 1), 0.5, {opacity:1})
					.addIndicators()
					.addTo(controller);
			}
			
		})
	}
	setAdvantageAnimation()