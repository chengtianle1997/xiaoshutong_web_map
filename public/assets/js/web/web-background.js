// map.on('dragging', showInfoDragging);
// map.on('dragend', showInfoDragend);
var imageLayer;
var map;

var cache_allOverlays;
var cache_imageLayer;

var viewModel = {
    spots: ko.observableArray([]),
    footSpots: ko.observableArray([]),
    spotTypes: ko.observableArray([]),
    lines: ko.observableArray([])
};

$(function() {
    debugger
    var value = $("#spotarea_id").val();
    var idValue = request("id");
    if (!$.isNullOrEmpty(idValue)) {
        value = parseInt(idValue);
    }
    loadData(value);


    // 显示隐藏marker
    $('.spot-display-btn').click(function() {

        if (cache_allOverlays) {
            cache_allOverlays.forEach(function(item, index) {
                item.show();
                cache_allOverlays = undefined;
            });
        } else {
            cache_allOverlays = map.getAllOverlays('marker');
            cache_allOverlays.forEach(function(item, index) {
                item.hide();
            });
        }
    });

    $('.map-display-btn').click(function() {
        if (cache_imageLayer) {
            imageLayer.show();
            cache_imageLayer = null;
        } else {
            cache_imageLayer = imageLayer;
            imageLayer.hide();
        }
    });
})

function request(strParame) {
    var args = new Object();
    var query = location.search.substring(1);

    var pairs = query.split("&"); // Break at ampersand
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[argname] = value;
    }
    return args[strParame];
}

var footSpots;
var result_spotTypes;
var result_spots;
var result_spotarea;
var result_line;
var totalCnt;
var currentIndex = 0;

function loadData(id) {
    currentIndex = 0;
    // var gps = [116.3, 39.9];
    // AMap.convertFrom(gps, 'gps', function(status, result) {
    //     debugger
    //     if (result.info === 'ok') {
    //         var lnglats = result.locations; // Array.<LngLat>
    //     }
    // });
    // var num = Number("31.775046939800000");
    var url = "/api/spot/getSpotInfo?id=" + id;
    $.get(url, function(result) {

        var data = result.data;
        // imageLayer.setImageUrl(data.spotarea.svgfile);
        result_spotarea = data.spotarea;
        result_spots = data.spot;
        result_spotTypes = data.type;
        result_line = data.line;

        totalCnt = result_spots.length + 3;
        convertfrom(currentIndex);
    });
}

function convertfrom(index) {
    var lng, lat;
    if (index == 0) {
        var centerlnglat = result_spotarea.centerlnglat;
        var centerlnglatArray = centerlnglat.split(',');
        lng = Number(centerlnglatArray[0]);
        lat = Number(centerlnglatArray[1]);

    } else if (index == 1) {
        var southwestlnglat = result_spotarea.southwestlnglat;
        var southwestlnglatArray = southwestlnglat.split(',');
        lng = Number(southwestlnglatArray[0]);
        lat = Number(southwestlnglatArray[1]);
    } else if (index == 2) {

        var northeastlnglat = result_spotarea.northeastlnglat;
        var northeastlnglatArray = northeastlnglat.split(',');
        lng = Number(northeastlnglatArray[0]);
        lat = Number(northeastlnglatArray[1]);
    } else {
        var current_spot = result_spots[index - 3];
        var lnglat = current_spot.lnglat;
        var lnglatArray = lnglat.split(',');
        lng = Number(lnglatArray[0]);
        lat = Number(lnglatArray[1]);
    }

    var gps = [lng || 0, lat || 0];

    AMap.convertFrom(gps, 'gps', function(status, result) {
        if (result.info === 'ok') {
            var location = result.locations; // Array.<LngLat>

            var result_lng = location[0].lng;
            var result_lat = location[0].lat;
            if (currentIndex == 0) {
                result_spotarea.result_centerlng = result_lng;
                result_spotarea.result_centerlat = result_lat;
            } else if (currentIndex == 1) {
                result_spotarea.result_southwestlng = result_lng;
                result_spotarea.result_southwestlat = result_lat;
            } else if (currentIndex == 2) {
                result_spotarea.result_northeastlng = result_lng;
                result_spotarea.result_northeastlat = result_lat;
            } else {
                var current_spot = result_spots[currentIndex - 3];
                current_spot.result_lng = result_lng;
                current_spot.result_lat = result_lat;
            }

            if (currentIndex < totalCnt - 1) {
                convertfrom(++currentIndex);
            } else {
                initData();
            }
        }
    });
}

function initData() {
    var spotTypes = new Array();
    var spots = new Array();
    if (result_spotTypes && result_spotTypes.length > 0) {
        for (i = 0; i < result_spotTypes.length; i++) {
            var current_spotType = result_spotTypes[i];
            spotTypes.push({
                type: current_spotType.id,
                name: current_spotType.typename,
                icon: current_spotType.typeimage,
                selectedicon: current_spotType.typeselectedimage
            })
        }
    }

    if (result_spots && result_spots.length > 0) {
        for (i = 0; i < result_spots.length; i++) {
            var current_spot = result_spots[i];
            var current_spottype = result_spotTypes.find(function(item) {
                return item.id == current_spot.spottype_id;
            });
            spots.push({
                id: current_spot.id,
                type: current_spot.spottype_id,
                name: current_spot.spotname,
                icon: current_spottype.spotimage,
                lng: current_spot.result_lng,
                lat: current_spot.result_lat,
                navigation: current_spot.navigationjson,
                voice: current_spot.voicefile,
                backgroudimage: current_spot.backgroudimage,
                introduction: current_spot.spotintroduce
            })
        }
    }
    if (spotTypes && spotTypes.length > 0) {
        for (i = 0; i < spotTypes.length; i++) {
            var item = spotTypes[i];
            if (i == 0) {
                item.selected = true;
            } else {
                item.selected = false;
            }
        }
    }
    var firstType = spotTypes[0];
    footSpots = spots.where(function(item) {
        if (item.type == firstType.type) {
            return true;
        }
    });

    // imageLayer.setImageUrl(result_spotarea.svgfile);
    // imageLayer.setBounds(new AMap.Bounds(
    //     [result_spotarea.result_southwestlng, result_spotarea.result_southwestlat], [result_spotarea.result_northeastlng, result_spotarea.result_northeastlat]
    // ));
    loadMap();
    // map.setCenter([result_spotarea.result_centerlng, result_spotarea.result_centerlat]);
    viewModel.spots(spots);
    viewModel.footSpots(footSpots);
    viewModel.spotTypes(spotTypes);
    viewModel.lines(result_line);
    ko.applyBindings(viewModel);
    loadFirstType();
}



function loadMap() {

    document.title = result_spotarea.areaname;
    imageLayer = new AMap.ImageLayer({
        url: result_spotarea.svgfile,
        bounds: new AMap.Bounds(
            [result_spotarea.result_southwestlng, result_spotarea.result_southwestlat], [result_spotarea.result_northeastlng, result_spotarea.result_northeastlat]
        ),
        zooms: [15, 20]
    });
    map = new AMap.Map('container', {
        resizeEnable: true,
        center: [result_spotarea.result_centerlng, result_spotarea.result_centerlat],
        zoom: 17,
        layers: [
            new AMap.TileLayer(), // 可注释,不显示其他,只显示景区信息
            imageLayer
        ]
    });
    map.on('click', onMapClick);
    map.on('dragstart', onDragstart);
    map.clearMap(); // 清除地图覆盖物
}

function onMapClick(e) {
    if (polyline) {
        polyline.hide();
    }
    if (startMarker) {
        startMarker.hide();
    }
    closeInfoWindow();
}

function closeInfoWindow() {
    infoWindow.close();
}

function onDragstart() {
    smallSpeach();
}

function loadFirstType() {
    var spotTypes = viewModel.spotTypes();
    var firstType = spotTypes[0];
    loadSpot(firstType.type);
}

//构建自定义信息窗体
var infoWindow = new AMap.InfoWindow({
    anchor: 'bottom-center',
    content: '',
});


var markerArray;

function loadSpot(type) {
    markerArray = new Array();
    map.clearMap(); // 清除地图覆盖物
    var spots = viewModel.spots();
    var spotArray = spots.where(function(item) {
        if (item.type == type) {
            return true;
        }
        return false;
    });
    if (spotArray && spotArray.length > 0) {
        spotArray.forEach(function(spot) {
            var marker = new AMap.Marker({
                map: map,
                icon: new AMap.Icon({
                    size: new AMap.Size(25, 30), //图标大小
                    image: spot.icon
                }),
                position: [spot.lng, spot.lat],
                offset: new AMap.Pixel(-12.5, -30),
                clickable: true,
                extData: spot
            });

            var markerContent = '' +
                '<div class="spot spot' + spot.id + '">' +
                '<div class="spot-name ">' + spot.name + '</div>' +
                '</div>';

            marker.setLabel({
                content: markerContent, //设置文本标注内容
                direction: 'top' //设置文本标注方位
            });

            AMap.event.addListener(marker, 'click', function(e) {
                var result = e.target.getExtData();
                console.log(result);
                var infoWindowContent = '';
                if (!$.isNullOrEmpty(result.voice)) {
                    infoWindowContent =
                        '<div>' + result.name + '</div>' +
                        '<p>纬度：' + result.lat + '</p>' +
                        '<p>精度：' + result.lng + '</p>' +
                        '</div>';
                } else {
                    infoWindowContent =
                        '<div class="spot-info-name">' + result.name + '</div>' +
                        '<div class="spot-info-btn-single">' +
                        '<div class="spot-navigation" onclick="spotNavigation(' + result.id + ')" >' +
                        '<img src="/assets/img/spot-info-navigation.png">' +
                        '<p>导航</p>' +
                        '</div>' +
                        '</div>';
                }
                infoWindow.setContent(infoWindowContent);
                infoWindow.open(map, e.target.getPosition());
                var position = e.target.getPosition();
                map.setCenter(position);
            });
            markerArray.push(marker);
        });
        var firstSpot = spotArray[0];
        map.setCenter([firstSpot.lng, firstSpot.lat]);

        // loadLine();
    }
}

$(document).on("click", ".shade", function(e) {
    e.preventDefault();
    var me = $(this);
    me.addClass("hidden");
    closeSlideBottom();
    return false;
});
$(document).on("click", ".foot-discovery", function(e) {
    e.preventDefault();
    closeSlideBottom();
    $("#discoveryPanel").addClass("show");
    $(".shade").removeClass("hidden");
    showShade();
    smallSpeach();
    return false;
});

$(document).on("click", ".foot-spot", function(e) {
    e.preventDefault();
    closeSlideBottom();
    $("#spotPanel").addClass("show");
    showShade();
    smallSpeach();
    return false;
});

$(document).on("click", ".foot-line", function(e) {
    e.preventDefault();
    closeSlideBottom();
    $("#linePanel").addClass("show");
    showShade();
    smallSpeach();
    return false;
});

function spotSpeech(id) {
    closeInfoWindow();
    var spot = getSpot(id);
    var voice = spot.voice;
    if (!$.isNullOrEmpty(voice)) {
        $(".speach-name").text(spot.name);
        $(".player-bg-img").attr("src", spot.backgroudimage);
        $("#speachAudio").attr("src", spot.voice);
        showAndPlaySpeach();
    }
}

var navigationArray = new Array();
var currentLineIndex = 0;
var lineTotalCnt = 0;
var navigationResultArray = new Array();

function spotNavigation(id) {
    navigationArray = new Array();
    currentLineIndex = 0;
    lineTotalCnt = 0;
    navigationResultArray = new Array();
    closeInfoWindow();
    var spot = getSpot(id);
    var navigation = spot.navigation;

    if (!$.isNullOrEmpty(navigation)) {
        navigationArray = navigation.replaceAll("\"", "").replaceAll("{", "").replaceAll("}", "").split(',');
        lineTotalCnt = navigationArray.length;
        convertline(currentLineIndex);
    }
}

function convertline(index) {
    var lng, lat;
    var current = navigationArray[index];
    var lnglat = current;
    var lnglatArray = lnglat.split(':');
    lng = Number(lnglatArray[0]);
    lat = Number(lnglatArray[1]);

    var gps = [lng || 0, lat || 0];
    AMap.convertFrom(gps, 'gps', function(status, result) {
        if (result.info === 'ok') {
            var location = result.locations; // Array.<LngLat>
            var result_lng = location[0].lng;
            var result_lat = location[0].lat;

            navigationResultArray.push({
                lng: result_lng,
                lat: result_lat
            });

            if (currentLineIndex < lineTotalCnt - 1) {
                convertline(++currentLineIndex);
            } else {
                loadLine();
            }
        }
    });
}

// var lineArr = [
//     [119.976181, 31.772218],
//     [119.976208, 31.772382],
//     [119.976203, 31.772642],
//     [119.975124, 31.772993]
// ];

var polyline;
var startMarker;

function loadLine() {
    if (polyline) {
        polyline.hide();
    }
    if (startMarker) {
        startMarker.hide();
    }

    // 创建一个 Icon
    var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3)
    });


    var lineArr = new Array();
    if (navigationResultArray && navigationResultArray.length > 0) {
        for (i = 0; i < navigationResultArray.length; i++) {
            var item = navigationResultArray[i];
            lineArr.push(new AMap.LngLat(item.lng, item.lat));
        }
    }
    var position = lineArr[0];
    if (polyline) {
        polyline.setPath(lineArr);
        startMarker.setPosition(position);
    } else {
        // 绘制轨迹
        polyline = new AMap.Polyline({
            map: map,
            path: lineArr,
            zIndex: 9999,
            showDir: true,
            strokeColor: "#28F", //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6, //线宽
            strokeStyle: "dashed" //线样式
        });
        // 将 icon 传入 marker
        startMarker = new AMap.Marker({
            map: map,
            position: position,
            icon: startIcon,
            offset: new AMap.Pixel(-13, -30)
        });
    }
    polyline.show();
    startMarker.show();
    map.setFitView();
}

function getSpot(id) {
    var spots = viewModel.spots();
    var spot = spots.find(function(item) {
        return item.id == id;
    });
    return spot;
}

function discoveryClick(item, event) {
    var type = item.type;
    $(".discovery-list").find(".icon-selected").each(function(e) {
        var me = $(this);
        if (!me.hasClass("hidden")) {
            me.addClass("hidden");
        }
    });

    $(".discovery-list").find(".icon-original").each(function(e) {
        var me = $(this);
        if (me.hasClass("hidden")) {
            me.removeClass("hidden");
        }
    });
    var me = $(event.currentTarget);
    me.find(".icon-original").addClass("hidden");
    me.find(".icon-selected").removeClass("hidden");
    loadSpot(type);
    closeBottom();
}

function closeBottom() {
    closeSlideBottom();
    closeShade();
}

function closeSlideBottom() {
    $(".slide-bottom").each(function() {
        if ($(this).hasClass("show")) {
            $(this).removeClass("show");
        }
    });
}

function closeShade() {
    $(".shade").addClass("hidden");
}

function showShade() {
    $(".shade").removeClass("hidden");
}

var speachAudio, playerPanel, playerIndicator, playerCurrent, playerDuration, playerSchedule, playerSwitch, playerToggle, playerClose, playerProcess, speachName, kwidth, currentWidth, isTouch;

function initAudio() {

    speachAudio = $("#speachAudio")[0];
    playerPanel = $("#playerPanel");
    playerIndicator = $(".player-indicator");
    playerCurrent = $(".player-current");
    playerDuration = $(".player-duration");
    playerSchedule = $(".player-schedule");
    playerSwitch = $(".player-switch");
    playerToggle = $(".player-toggle");
    playerClose = $(".player-close");
    playerProcess = $(".player-bar>div");
    speachName = $(".speach-name");
    kwidth = playerSchedule.width();
    isTouch = false;
}

function closeSpeach() {
    playerPanel.removeClass("show");
    playerPanel.removeClass("small");
    speachAudio.pause();
    // 处理当前时间,进度条
    playerProcess.css('width', '0%');
    playerIndicator.css('left', '0%');
    playerCurrent.html("00:00");
}

function showAndPlaySpeach() {
    playerPanel.addClass("show");
    if (playerPanel.hasClass("small")) {
        playerPanel.removeClass("small");
    }
    speachAudio.play();
}

function showSpeach() {
    playerPanel.addClass("show");
}

function smallSpeach() {
    if (playerPanel.hasClass("show")) {
        playerPanel.addClass("small");
    }
}

var audio = initAudio();

// 当视频可以进行播放的时候触发oncanplay
speachAudio.oncanplay = function() {
    // 获取视频的总时长,结果以秒作为单位
    var duration = speachAudio.duration;
    // 计算 时 分 秒
    var time = getTime(duration);
    playerDuration.html(time);
    playerSwitch.addClass("playing");
}

// 当视频在播放的时候，会触发ontimeupdate
speachAudio.ontimeupdate = function(event) {
    var currentTime = speachAudio.currentTime;
    if (isTouch != true) {
        var time = getTime(currentTime);
        playerCurrent.html(time);
        var width = currentTime / speachAudio.duration * 100;
        playerProcess.css('width', width + '%');
        playerIndicator.css('left', width + '%');
    }
}

speachAudio.onended = function(event) {
    closeSpeach();
};

playerSwitch.click(function() {
    if (speachAudio.paused) {
        speachAudio.play();
        playerSwitch.addClass("playing");
    } else {
        speachAudio.pause();
        playerSwitch.removeClass("playing");
    }
});

playerToggle.click(function() {
    if (playerPanel.hasClass("small")) {
        playerPanel.removeClass("small");
    } else {
        playerPanel.addClass("small");
    }
});

playerClose.click(function() {
    closeSpeach();
});

playerSchedule.click(function(event) {
    var me = $(this);
    if (event.target.className == "player-indicator") {
        return event.stopPropagation();
    }
    // 获取点击的位置
    var progress = event.offsetX;
    // 获取进度条的总长度
    var progressWidth = me.width();
    // 设置当前播放进度条的宽度
    var width = progress / progressWidth;

    playerProcess.css('width', width * 100 + '%');
    playerIndicator.css('left', width * 100 + '%');
    speachAudio.currentTime = speachAudio.duration * width;
});

playerIndicator.on({
    touchstart: function() {
        isTouch = true;
    },
    touchmove: function(event) {
        if (isTouch) {
            var b = event.originalEvent.targetTouches[0].pageX - playerSchedule[0].offsetLeft;
            if (b > kwidth)
                b = kwidth;
            if (b < 0)
                b = 0;
            currentWidth = b / kwidth;
            playerProcess.css('width', currentWidth * 100 + '%');
            playerIndicator.css('left', currentWidth * 100 + '%');

            var time = getTime(currentWidth * speachAudio.duration);
            playerCurrent.html(time);
        }
        event.stopPropagation();
    },
    touchend: function(event) {
        if (isTouch) {
            speachAudio.currentTime = speachAudio.duration * currentWidth;
            isTouch = false;
            if (speachAudio.paused) {
                speachAudio.play();
                playerSwitch.addClass("playing");
            }
        }
    }
})


// 封装时间转换函数
function getTime(time) {
    // let hour = Math.floor(time / 3600);
    var min = Math.floor(time % 3600 / 60);
    var sec = Math.floor(time % 60);
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    return min + ':' + sec
}


$(document).on("click", "#closeSpotInfoPanel", function(e) {
    e.preventDefault();
    $("#spotInfoPanel").addClass("hidden");
    return false;
});

function showSpotInfo(item, event) {
    $(".attraction-name").text(item.name);
    $(".spot-info-detail-img").attr("src", item.backgroudimage);
    $(".spot-info-detail-content").text(item.introduction);
    $("#spotInfoPanel").removeClass("hidden");
}

function searchChange(value) {
    var resultArray = footSpots.where(function(item) {
        var name = item.name;
        if (name.contains(value)) {
            return true;
        }
    });
    if (!$.isNullOrEmpty(value)) {
        viewModel.footSpots(resultArray);
    } else {
        viewModel.footSpots(footSpots);
    }
}


function goToSpot(item, event) {
    loadFirstType();
    var currentMarker = markerArray.find(function(marker) {
        var extData = marker.getExtData();
        return item.id == extData.id;
        // return item.id == id;
    });

    if (currentMarker) {
        currentMarker.emit('click', { target: currentMarker });
        closeBottom();
    }
}



var lineArray = new Array();
var currentLine2Index = 0;
var line2TotalCnt = 0;
var lineResultArray = new Array();



function goToLine(item, event) {
    debugger
    var id = 'line-' + item.id;
    var line = $("#" + id);

    lineArray = new Array();
    currentLine2Index = 0;
    line2TotalCnt = 0;
    lineResultArray = new Array();

    $(".line-content").find(".route-btn").each(function(e) {
        var me = $(this);
        var temp_id = me.attr("id");
        if (me.hasClass("selected") && temp_id != id) {
            me.removeClass("selected");
        }
    });

    if (line.hasClass("selected")) {
        if (polyline2) {
            polyline2.hide();
        }
        if (startMarker2) {
            startMarker2.hide();
        }
        closeBottom();
        line.removeClass("selected");
    } else {
        var navigation = item.navigationjson;
        if (!$.isNullOrEmpty(navigation)) {
            lineArray = navigation.replaceAll("\"", "").replaceAll("{", "").replaceAll("}", "").split(',');
            line2TotalCnt = lineArray.length;
            convertline2(currentLine2Index);
            closeBottom();
            line.addClass("selected");
        }
    }
}

function convertline2(index) {
    var lng, lat;
    var current = lineArray[index];
    var lnglat = current;
    var lnglatArray = lnglat.split(':');
    lng = Number(lnglatArray[0]);
    lat = Number(lnglatArray[1]);

    var gps = [lng || 0, lat || 0];
    AMap.convertFrom(gps, 'gps', function(status, result) {
        if (result.info === 'ok') {
            var location = result.locations; // Array.<LngLat>
            var result_lng = location[0].lng;
            var result_lat = location[0].lat;

            lineResultArray.push({
                lng: result_lng,
                lat: result_lat
            });

            if (currentLine2Index < line2TotalCnt - 1) {
                convertline2(++currentLine2Index);
            } else {
                loadLine2();
            }
        }
    });
}

var polyline2;
var startMarker2;

function loadLine2() {
    debugger
    if (polyline2) {
        polyline2.hide();
    }
    if (startMarker2) {
        startMarker2.hide();
    }

    // 创建一个 Icon
    var startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3)
    });


    var lineArr = new Array();
    if (lineResultArray && lineResultArray.length > 0) {
        for (i = 0; i < lineResultArray.length; i++) {
            var item = lineResultArray[i];
            lineArr.push(new AMap.LngLat(item.lng, item.lat));
        }
    }
    var position = lineArr[0];
    if (polyline2) {
        polyline2.setPath(lineArr);
        startMarker2.setPosition(position);
    } else {
        // 绘制轨迹
        polyline2 = new AMap.Polyline({
            map: map,
            path: lineArr,
            zIndex: 9999,
            showDir: true,
            strokeColor: "#ff8c00", //线颜色
            // strokeOpacity: 1,     //线透明度
            strokeWeight: 6, //线宽
            // strokeStyle: "solid"  //线样式
        });
        // 将 icon 传入 marker
        startMarker2 = new AMap.Marker({
            map: map,
            position: position,
            icon: startIcon,
            offset: new AMap.Pixel(-13, -30)
        });
    }
    polyline2.show();
    startMarker2.show();
    map.setFitView();
}