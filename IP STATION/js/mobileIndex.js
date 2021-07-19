// function goPAGE() {
// 	if ((navigator.userAgent.match(
// 			/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
// 		))) {
// 		console.log("Mobile")
// 		return false
// 	} else {
// 		window.location.href = "index.html"
// 		console.log("pc")
// 	}
// }
// goPAGE();


// nav导航
var flag = false;
var video, $output;
var scale = 0.25;
$output = $("#output");
video = $("#video").get(0);
$("#header_right").click(function() {
	$("#line").hide()
	$("#line").css("height", 0)
	$("#onLine").hide()
	$("#onLine").css("opacity", 0)
	if (!flag) {
		$(this).addClass('active')
		$("#nav").stop().animate({
			"right": "0%"
		})
		captureImage();
		video.style.opacity = "0"
		
		video.pause()
	} else {
		$(this).removeClass('active')
		$("#nav").stop().animate({
			"right": "-80%"
		})
		$('#output').html("")
		video.play()
		video.style.opacity = "1"
	}
	flag = !flag
})


function captureImage() {
	var canvas = document.createElement("canvas");
	canvas.width = video.videoWidth*0.25;
	canvas.height = video.videoHeight*0.25;
	canvas.getContext('2d')
	.drawImage(video, 0, 0, canvas.width, canvas.height);
	$('#output').append(canvas)
};




$("#onLine_li").click(function() {
	// $("#onLine").toggle();
	$("#line").css("display", "block")
	$("#onLine").css("display", "block")
	$("#line").animate({
		height: "1.8rem"
	})
	$("#onLine").animate({
		opacity: 1
	})

})

// 视频按钮
$("#video_btn").click(function() {
	// console.log("video_btn")

	$("video")[0].play();
	$(this).hide()

})

$("video").click(function() {
	$("#video_btn").show()
	this.pause()
	return false
})

$("video").on("timeupdate", function() {
	// console.log(this.paused)
	if (this.paused) {
		$("#video_btn").show()
		$(this).attr("controls", "controls")
	} else {
		$("#video_btn").hide()
		$(this).removeAttr("controls")
	}
})

// 热门商品
let hotData = []
let hotItemStr = "" //轮播图每一页
let itemImgStr = "" //轮播图每页里面的6张图
function getHotDataFn() {
	$.ajax({
		type: "get",
		url: `https://gate.wanou1.com/baby-wechat/websideHotgoods/findList`,
		dataType: "json",
		data: {},
		async: false,
		success: function(res) {
			// console.log("热门商品res", res)
			hotData = res
		},
	});
}
getHotDataFn()

function appendFun() {
	let smallImgArr = []
	let imgStr = ""
	let imgBgStr =""
	for (let i = 0; i < hotData.length; i++) {
		smallImgArr.push(hotData[i].styles.split(",").filter(val => val != ""))
		// console.log(smallImgArr[i])
		for (let j = 0; j < smallImgArr[i].length; j++) {
			imgStr +=
				`<img src="${(smallImgArr[i])[j]}" >
							`
		}
		hotItemStr +=
			`
					            <div class="swiper-slide">
								   <div class="hotItem">
								       ${imgStr}
								   </div>
								</div>
					        `
		imgStr = ""					
		imgBgStr += `<div class="swiper-slide">
								 <img src="${hotData[i].hideStyle}" >
								</div>" `
	}
	// console.log("hotData",hotData)
	// console.log("smallImgArr",smallImgArr)
	$("#swiper-wrapper").html(hotItemStr)
	
	$("#thumbs-swiper").html(imgBgStr)
	

	// 轮播图
	var galleryThumbs = new Swiper(' .swiper-container.gallery-thumbs', {
		slidesPerView: 1,
	    freeMode: true,
	    watchSlidesVisibility: true,
	    watchSlidesProgress: true,
		effect : 'fade',
		loop:true,
		fadeEffect: {
		   crossFade: true,
		}
	 });
	var galleryTop = new Swiper(' .swiper-container.gallery-top', {
	    navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	    },
	    controller: {
	        control: galleryThumbs,
	    },
		loop:true
	});
}
appendFun()

// 媒体新闻
let newsArr = []
let newsStr = ""

function getNewsDataFn() {
	$.ajax({
		type: "get",
		url: `https://gate.wanou1.com/baby-wechat/websideMedia/findList`,
		dataType: "json",
		data: {},
		async: false,
		success: function(res) {
			// console.log("媒体新闻res", res)
			newsArr = res
		},
	});
	for (let i = 0; i < newsArr.length; i++) {
		newsStr +=
			`
							<div class="list_item">
								<a href="${newsArr[i].link}">
									<img src="${newsArr[i].image}" >
									<p class="title">${newsArr[i].content}</p>
									<p class="myDate">${newsArr[i].releaseDate.slice(5, 10)}</p>
								</a>
							</div>
						`
		$("#newsList").html(newsStr)
	}
}
getNewsDataFn()

var isTouch = false
window.addEventListener('touchstart',function(){
	if(!isTouch){
		$('#video')[0].play()
	}else{
		return false
	}
	
})