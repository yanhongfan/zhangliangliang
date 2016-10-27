(function () {
    function animate(ele, target, duration, callback) {
        var effectLinear = function (t, b, c, d) {
            return b + t / d * c;
        };
        var time=0;
        var begin={};
        var change={};
        for(var key in target){
            begin[key]=utils.css(ele,key);
            change[key]=target[key]-begin[key];
        }
        var interVal=10;
        ele.timer&&window.clearInterval(ele.timer);
        ele.timer=window.setInterval(function(){
            time+=10;
            if(time>=duration){
                window.clearInterval(ele.timer);
                utils.css(ele,target);
                if(typeof callback=="function"){
                    callback.call(ele);
                }
                return
            }
            for(var key in change){
                if(change[key]){
                    var val=effectLinear(time,begin[key],change[key],duration);
                    utils.css(ele,key,val);
                }
            }
        },interVal);
    }
    window.animate=animate;
})();

