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

    var options = ["文章浏览", "视频浏览"];
    var i = dialogs.select("请选择一个选项", options);


    if(i >= 0){
        toast("您选择的是" + options[i]);
        switch (options[i]) {
            case "文章浏览":
                articleControl();
                break;
            case "视频浏览":
                videoControl();
                break;
        }
    }else{
        toast("您取消了选择");
    }

    toast('全部完毕');


    function articleControl() {
        sleep(random(3, 4) * 1000);
        if(textEndsWith("要闻").find().length > 0){
            click('要闻',0);
            sleep(2000);
            click('新思想',0);
            sleep(2000);
        }
        
        let textArea = idEndsWith("general_card_title_id").find();
        console.log(textArea);
        console.log("文章个数:" + textArea.length);
        // return false;
        for (let i = 0; i < 10; i++) {
            sleep(random(3, 4) * 1000);
            if(!textArea[i]){break;};
            log(textArea[i].text());
            // click("2020-", i);
            // textArea[i].click();
            click(textArea[i].text(),0);
            sleep(random(3, 4) * 1000);
            downControll(x1, y1, x2, y2, 1687, 10);
            swipe(0, 1037, 500, 1037, 500);
            sleep(random(1, 2) * 1000);
            toast("准备下一次");
            sleep(random(1, 2) * 1000);
        }
    }

    function videoControl() {
        // sleep(random(3, 4) * 1000);
        // click('电视台');
        // sleep(random(3, 4) * 1000);
        // click('看电视');
        // sleep(random(3, 4) * 1000);
        // click('中央广播电视总台');
        pointList = [
            [205, 1289],
            [562, 1289],
            [896, 1289],
            [205, 1540],
            [562, 1540],
            [896, 1540],
            [205, 1813],
            [562, 1813]
        ]
        for (let j = 0; j < pointList.length; j++) {
            toast('点击第' + (j + 1) + '个');
            sleep(random(1, 2) * 1000);
            click(pointList[j][0], pointList[j][1]);
            sleep(random(15, 20) * 1000);
        }
    }



    
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