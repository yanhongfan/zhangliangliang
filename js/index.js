var banner = utils.getElesByClass('banner', document)[0];
var bannerInner = utils.getElesByClass('bannerInner', banner)[0];
var imgs = bannerInner.getElementsByTagName('img');
var focusList = utils.getElesByClass('focusList', banner)[0];
var lis = focusList.getElementsByTagName('li');
var leftBtn = utils.getElesByClass('left', banner)[0];
var rightBtn = utils.getElesByClass('right', banner)[0];
console.log(focusList);
//获取数据
;
(function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'data.txt?_=' + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (/^2\d{2}$/).test(xhr.status)) {
            window.data = utils.jsonParse(xhr.responseText);

        }
    }
    xhr.send(null);
})();
//绑定数据
;
(function bindData() {
    if (window.data) {
        var str = '';
        var strLis = '';
        for (var i = 0; i < data.length; i++) {
            var cutData = data[i];
            str += '<div><images src="" realSrc="' + cutData.src + '"/></div>';
            strLis += i == 0 ? '<li class="selected"></li>' : '<li></li>';
        }
        str += '<div><images src="" realSrc="' + data[0].src + '"/></div>';
        utils.css(bannerInner, 'width', (data.length + 1) * 1000);

        bannerInner.innerHTML = str;
        focusList.innerHTML = strLis;
    }
})();
//图片延迟加载
function allImagDeyload() {
    for (var i = 0; i < imgs.length; i++) {
        var curImg = imgs[i];
        var tempImg = new Image();
        tempImg.index = i;
        tempImg.src = curImg.getAttribute('realSrc');
        tempImg.onload = function () {
            imgs[this.index].src = this.src;
            imgs[this.index].style.display = 'block';
        }
    }
}

window.setTimeout(allImagDeyload, 300);
//实现自动轮播
var step = 0;
function autoMove() {

    if (step == 4) {
        step = 0;
        utils.css(bannerInner, 'left', -1000 * step);
    }
    step++;
    animate(bannerInner, {left: -1000 * step}, 500);
    console.log(step);
    focusAlign();

};
var timer = window.setInterval(autoMove, 2000);
//焦点绑定
function focusAlign() {
    for (var i = 0; i < lis.length; i++) {
        var stepTemp = 0;
        if (step == data.length) {
            stepTemp = 0;
        } else {
            stepTemp = step;
        }
        if (i === stepTemp) {
            lis[i].className = 'selected';

        } else {
            lis[i].className = '';
        }
    }
}
//鼠标悬停在图片上的时候需要停止播放
banner.onmouseover = function () {
    window.clearInterval(timer);
    leftBtn.style.display = rightBtn.style.display = 'block';

};
banner.onmouseout = function () {
    timer = window.setInterval(autoMove, 3000);
    leftBtn.style.display = rightBtn.style.display = 'none';
};
//点击左右按钮切换图片
leftBtn.onclick = function () {
    if(step==0){
        step=data.length;
        utils.css(bannerInner,'left',-1000*step);
    }
    step--;
    animate(bannerInner, {left: -1000 * step}, 500);
    focusAlign();
};
rightBtn.onclick=autoMove;
//点击焦点图片切换
(function bindEventForList(){
    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onclick=function(){
            step=this.index;
            animate(bannerInner,{left:-1000*step},500);
            focusAlign();
        }
    }

})();
