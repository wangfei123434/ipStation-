//手机pc切换
function goPAGE() {
	if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		window.location.href="mobileIndex.html"
	}
	else {
		return false	
	}
}
goPAGE();

var interleaveOffset = 0.5;
var bannerFuns = document.querySelector('.banner-funs')
var docWidth,defaultW = 1920, windSize;
var mySwiper = new Swiper('.swiper-container', {
	loop: true,
	autoplay: {
		delay: 4000,
	},
	speed: 700,	
	watchSlidesProgress: true,
	on: {
		slideChange: function(swiper){
			docWidth = document.documentElement.clientWidth || document.body.clientWidth;
			windSize = docWidth / defaultW * 16
			if(swiper.realIndex == 0){
				bannerFuns.style.transform =
				"translate3d(" + 996/16*windSize + "px," + 399/16*windSize + "px,0)";
			}else if(swiper.realIndex == 1){
				bannerFuns.style.transform =
				"translate3d(" + 1200/16*windSize + "px," + 399/16*windSize + "px,0)"; 
			}else{
				bannerFuns.style.transform =
				"translate3d(" + 300/16*windSize + "px," + 399/16*windSize + "px,0)"; 
			}
		},
		resize: function(swiper){
			docWidth = document.documentElement.clientWidth || document.body.clientWidth;
			windSize = docWidth / defaultW * 16
			if(swiper.realIndex == 0){
				bannerFuns.style.transform =
				"translate3d(" + 996/16*windSize + "px," + 399/16*windSize + "px,0)";
			}else if(swiper.realIndex == 1){
				bannerFuns.style.transform =
				"translate3d(" + 1200/16*windSize + "px," + 399/16*windSize + "px,0)"; 
			}else{
				bannerFuns.style.transform =
				"translate3d(" + 300/16*windSize + "px," + 399/16*windSize + "px,0)"; 
			}
		}

	},
	// // 如果需要分页器
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		bulletClass: 'my-bullet',
		bulletActiveClass: 'my-bullet-active'
	},
})

// 热门商品切换 
let hotData = {
	tabArrImg:[],
	tabArr:[],
	tabListDataId:[],
	productListImg:[],
	productBg:[]
}

let indexProTabStr = "";

let newData = [];

let indexNewsLeftStr = "",indexNewsRightStr = "";

function getIndexData() {
	$.ajax({
		type: "get",
		url: "https://gate.wanou1.com/baby-wechat/websideHotgoods/findList",
		dataType: "json",
		data: {},
		async: false,
		success: function(res) {
			for(let i = 0;i < res.length;i ++){
				hotData.tabArr.push(res[i].tabName)
				hotData.tabListDataId.push(res[i].id)
				hotData.tabArrImg.push(res[i].hideStyle.split(','))
				hotData.productListImg.push(res[i].styles.split(",").filter(val => val != ""))
				hotData.productBg.push(res[i].hideStyle.split(','))
			}
		},
	});


	$.ajax({
		type: "get",
		url: "https://gate.wanou1.com/baby-wechat/websideMedia/findList",
		dataType: "json",
		data: {},
		async: false,
		success: function(res) {
			newData = res
		},
	});
}
getIndexData()



let proOnIndex;
$("body").on("click",'.index_pro_tab_ul li',function () {
	if($(this).hasClass('disable')){
		return false
	}
	$('.index_pro_tab_ul li').removeClass('disable');
	$(this).addClass('disable');
	proOnIndex = $(this).index();
	$('.index_product_list li').each(function(e){
		setTimeout(function(){
			$('.index_product_list li').eq(e).html(`<img class="fadeIn" src="${hotData.productListImg[proOnIndex][e]}" >`)
		},e*200)
	})
	$('#productBg').html(`<li><img src="${hotData.productBg[proOnIndex][0]}" ></li>`)
	$('.index_product_list li img').removeClass('bounceIn bounceInOut')
})


function setIndexData(){
	// 设置热门产品
	for(let j = 0;j < hotData.tabArr.length;j ++){
		indexProTabStr += `
			<li data-id="${hotData.tabListDataId[j]}">
				<img src="${hotData.tabArrImg[j]}" alt="">
				<p>${hotData.tabArr[j]}</p>
			</li>
		`
	}
	$('#proTabUl').html(indexProTabStr);
	$("#proTabUl li").eq(0).addClass('disable')
	for(let i = 0;i < hotData.productListImg[0].length;i ++){
		$('#productList li').eq(i).html(`<img src="${hotData.productListImg[0][i]}" >`);
	}
	$('#productBg').html(`<li><img src="${hotData.productBg[0][0]}" ></li>`)

	// 设置新闻相关

	for(let i = 0;i < newData.length;i ++){
		if(i == 0){
			indexNewsLeftStr += `
				<a href="${newData[0].link}">
					<img src="${newData[0].image}" alt="">
					<div class="gard_bg">
						<div class="gard_text">
							<div class="gard_date">${newData[0].releaseDate.slice(5, 10)}</div>
							<div class="gard_title">${newData[0].title}</div>
							<div class="gard_content">${newData[0].content}</div>
							<div class="gard_go">learn more</div>
						</div> 
					</div>
				</a>
			`
		}else{
			indexNewsRightStr += `
				<div>
					<a href="${newData[i].link}">
						<img src="${newData[i].image}" alt="">
						<div class="gard_bg">
							<div class="gard_text">
								<div class="gard_date">${newData[i].releaseDate.slice(5, 10)}</div>
								<div class="gard_title">${newData[i].title}</div>
								<div class="gard_content">${newData[i].content}</div>
								<div class="gard_go">learn more</div>
							</div> 
						</div>
					</a>
				</div>
			`
		}
		
	}
	$('#indexNewsGardLeft').html(indexNewsLeftStr)
	$('#indexNewsGardRight').html(indexNewsRightStr)




}
setIndexData()


// 视频按钮
$("#video_btn").click(function() {
	$("video")[0].play();
	$(this).hide()

})
$("video").click(function() {
	$("#video_btn").show()
	this.pause()
	return false
})
$("video").on("timeupdate", function() {
	if (this.paused) {
		$("#video_btn").show()
		$(this).attr("controls", "controls")
	} else {
		$("#video_btn").hide()
		$(this).removeAttr("controls")
	}
})

// funs鼠标事件
$('.index_funs_dot li').hover(function(){
	$('.index_funs_bg').show()
	var index = $(this).index();
	console.log(index)
	$('.index_funs_bg li').eq(index).show().siblings().hide();
},function(){
	$('.index_funs_bg').hide()
})

// product鼠标事件
$('.index_product_top').hover(function(){
	$('.index_pro_tab').addClass('active');
	$('.index_pro_title_black').addClass('bounce');
	$('.index_pro_tab_ul').addClass('bounceUp');
	$('.index_pro_title_white').addClass('bounceDown');
	$('.index_pro_title_white').removeClass('bounce');
},function(){
	$('.index_pro_tab').removeClass('active');
	$('.index_pro_title_black').removeClass('bounce');
	$('.index_pro_tab_ul').removeClass('bounceUp');
	$('.index_pro_title_white').addClass('bounce');
	$('.index_pro_title_white').removeClass('bounceDown');
})
$("body").on("mouseout",'.index_product_list li',function () {
	$('.index_product_list li').removeClass('bounceInOut')
	$('.index_product_list li').eq($(this).index()).addClass('bounceInOut')
})



