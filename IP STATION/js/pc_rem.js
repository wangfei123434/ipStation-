function setRem() {
	let clientWidth = document.documentElement.clientWidth || document.body.clientWidth
	let html = document.querySelector("html")
	let defaultW = 1920
	let size = clientWidth / defaultW * 16
	if(size<9.85833){
		size = 9.85833
	}
	html.style.fontSize = size + "px"
}
setRem()
window.onresize = function() {
	// window.location.reload()
	setRem()
}


window.onload=function(){
	let header = document.getElementById("p_header")
	
	if(!header){
		return
	}
	let headerT = header.clientHeight
	let activeImg = document.getElementById("activeImg")
	window.onscroll = function(e) {
		let scrollT = document.documentElement.scrollTop||document.body.scrollTop ;
		if (scrollT > headerT) {
			header.className = "p_header xid"
			header.style.display = "block"
		} else {
			header.className = "p_header"
		}
	};
}

