auto.waitFor();
var height = device.height;
var width = device.width;
toast("\n设备宽" + width + "\n" + "设备高" + height + "\n" + "手机型号" + device.model + "\n安卓版本" + device.release)
setScreenMetrics(width, height);

var x1 = 402;    //滑动起始位置的x轴坐标
var y1 = 1433;   //滑动起始位置的y轴坐标
var x2 = 587;    //滑动结束位置的x轴坐标
var y2 = 768;    //滑动结束位置的y轴坐标
var times = 2;   //滑动的次数

autoRun();

function autoRun() {

    //全部任务就包括文章浏览与视频浏览
    var options = ["文章浏览", "视频浏览","全部任务"];
    var i = dialogs.select("请选择一个选项", options);
    //综合栏目里面的前三个文章来源,我这是人民日报,新华社,求是网,可以自己定义
    let articleSource = ["人民日报","新华社","求是网"];
    // let articleIndex = 0;
    let articleCount = 10;

    if(i >= 0){
        toast("您选择的是" + options[i]);
        switch (options[i]) {
            case "文章浏览":
                articleControl(0,articleCount);
                break;
            case "视频浏览":
                videoControl();
                break;
            case "全部任务":
                articleControl(0,articleCount);
                videoControl();
                break;
        }
    }else{
        toast("您取消了选择");
    }

    toast('全部完毕');

    /**
     * 文章操作
     * @param {number} articleIndex 文章来源
     * @param {number} articleCount 文章数量
     */
    function articleControl(articleIndex,articleCount) {
        sleep(random(3, 4) * 1000);
        click('综合',0);
        sleep(2000);
        
        //如果综合栏目里,前面的文章太多找不到来源定位,下滑一次
        if(textContains(articleSource[articleIndex]).find().length < 0){
            swipe(width/2,deviceY,width/2,deviceY-(rectHeight*2),500);
        }

        click(articleSource[articleIndex],0);
        sleep(random(3, 4) * 1000);

        let textArea = idEndsWith("general_card_title_id").find();
        console.log(textArea);
        console.log("文章个数:" + textArea.length);
        let articleNum = textArea.length <= articleCount ? textArea.length : articleCount ;
        console.log("浏览次数:" + articleNum);
        // return false;
        for (let i = 0; i < articleNum; i++) {
            sleep(random(3, 4) * 1000);
            if(!textArea[i]){break;};
            log(textArea[i].text());
            click(textArea[i].text(),0);
            sleep(random(3, 4) * 1000);
            downControll(x1, y1, x2, y2, 1687, 10);
            sleep(random(1, 2) * 1000);
            swipe(0, 1037, 500, 1037, 500);
            sleep(random(1, 2) * 1000);
            toast("准备下一次");
            sleep(random(1, 2) * 1000);
        }
        swipe(0, 1037, 500, 1037, 500);
        sleep(random(1, 2) * 1000);

        if(textArea.length < articleCount){
            toast("文章未够");
            sleep(random(3, 4) * 1000);
            toast("下一篇文章来源");
            articleControl(articleIndex + 1,articleCount - textArea.length);
        }

    }

    /**
     * 视频操作,取电视台,根据当天是星期几而看的卫视组
     */
    function videoControl() {
        sleep(random(3, 4) * 1000);
        let tvIndex = getDowDay();
        //下面两个数字可适当根据手机屏幕自行调整
        let deviceY = height - 280;//为滚动电视台底部起点
        let rectHeight = 370;//一行电视台元素的高度

        sleep(random(3, 4) * 1000);
        toast("电视台");
        click('电视台');
        sleep(random(1, 2) * 1000);
        toast("看电视");
        click('看电视');
        sleep(random(1, 2) * 1000);
        toast("地方台");
        click('地方台');
        sleep(random(1, 2) * 1000);

        for (let i = 1; i < tvIndex; i++) {
            sleep(random(1, 2) * 1000);
            console.log("滑动" + i + "次");
            sleep(random(1, 2) * 1000);
            swipe(width/2,deviceY,width/2,deviceY-(rectHeight*2),500);
        }

        sleep(random(3, 4) * 1000);

        //卫视列表
        let tvList = [
            ["北京卫视","天津卫视","河北卫视","山西卫视","内蒙古卫视","内蒙古蒙语卫视"],
            ["辽宁卫视","吉林卫视","黑龙江卫视","东方卫视","江苏卫视","浙江卫视"],
            ["安徽卫视","东南卫视","江西卫视","山东卫视","河南卫视","湖北卫视"],
            ["湖南卫视","广东卫视","广西卫视","海南卫视","重庆卫视","四川卫视"],
            ["康巴卫视","贵州卫视","云南卫视","西藏卫视","西藏藏语卫视","陕西卫视"],
            ["甘肃卫视","青海卫视","青海安多卫视","宁夏卫视","新疆卫视","兵团卫视"],
            ["海峡卫视","南方卫视","厦门卫视","深圳卫视","延边卫视","山东教育卫视"]
        ]

        // for (let j = 0; j < tvList[tvIndex - 1].length; j++) {
        //     toast('点击' + tvList[tvIndex - 1][j]);
        //     console.log(tvList[tvIndex - 1][j]);
        //     console.log(textContains(tvList[tvIndex - 1][j]).find().length);
        //     sleep(random(1, 2) * 1000);
        // }

        // return false;
        for (let j = 0; j < tvList[tvIndex - 1].length; j++) {
            toast('点击' + tvList[tvIndex - 1][j]);
            sleep(random(1, 2) * 1000);
            click(tvList[tvIndex - 1][j],0);
            sleep(random(60,75) * 1000);
        }
        swipe(0, 1037, 500, 1037, 500);
    }
}

//获取当前日期是星期几
function getDowDay(){
    let day = new Date();
    return day.getDay();
}

function backWoard() {

    if (textEndsWith("去关注").find().length <= 0 && textEndsWith("去逛逛").find().length <= 0) {
        toast("准备返回");
        sleep(random(3, 4) * 1000);
        swipe(0, 1037, 500, 1037, 500);
        // click(95,164);
        sleep(random(1, 2) * 1000);
        toast("准备下一次");
        sleep(random(1, 2) * 1000);
    }

    autoRun();
}

function bezier_curves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;
    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;

    tSquared = t * t;
    tCubed = tSquared * t;
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
};

//仿真随机带曲线滑动  
//qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,过程耗时单位毫秒
function downControll(qx, qy, zx, zy, time, times) {
    qx = qx ? qx : 402;    //滑动起始位置的x轴坐标
    qy = qy ? qy : 1433;   //滑动起始位置的y轴坐标
    zx = zx ? zx : 587;    //滑动结束位置的x轴坐标
    zy = zy ? zy : 768;    //滑动结束位置的y轴坐标
    time = time ? time : 1687;
    times = times ? times : 1;

    for (let s = 0; s < times; s++) {
        toast('下拉:' + (s + 1) + '次');
        sleep(random(2, 3) * 1000);
        var xxy = [time];
        var point = [];
        var dx0 = {
            "x": qx,
            "y": qy
        };

        var dx1 = {
            "x": random(qx - 100, qx + 100),
            "y": random(qy, qy + 50)
        };
        var dx2 = {
            "x": random(zx - 100, zx + 100),
            "y": random(zy, zy + 50),
        };
        var dx3 = {
            "x": zx,
            "y": zy
        };
        for (var i = 0; i < 4; i++) {

            eval("point.push(dx" + i + ")");

        };
        //log(point[3].x)

        for (let i = 0; i < 1; i += 0.08) {
            xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]

            xxy.push(xxyy);

        }

        //log(xxy);
        gesture.apply(null, xxy);
    }
};
