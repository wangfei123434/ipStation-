
(function () {
    var supportsOrientationChange = 'onorientationchange' in window ? 'orientationchange' : 'resize';
	console.log(supportsOrientationChange)
    function setRem() {
        var clientWidth = document.documentElement.clientWidth;
        var nowPX = clientWidth / 320 * 100;
        document.documentElement.style.fontSize = nowPX + 'px';
    }
    setRem();
    window.addEventListener('resize', function () {
        setRem();
    }, false);
})();
