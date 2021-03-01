<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:86:"/home/wwwroot/map.weihangnetwork.com/public/../application/index/view/index/index.html";i:1609904377;}*/ ?>
<!DOCTYPE html>
<html>

<head>
    <title></title>
    <meta content="telephone=no" name="format-detection">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <meta name="x5-orientation" content="portrait">
    <meta name="screen-orientation" content="portrait">
    <meta name="full-screen" content="yes">
    <script src="https://webapi.amap.com/maps?v=1.4.15&key=974d88b88a97af93a9114c609b1b88e4"></script>
    <script crossorigin="anonymous" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" src="https://lib.baomitu.com/jquery/3.5.1/jquery.min.js"></script>
    <script src="/assets/js/web/common.js"></script>
    <script src="/assets/js/web/knockout-3.5.1.js"></script>
    <link rel="stylesheet" href="/assets/css/web.css" />
    <script>
        if (!navigator.cookieEnabled) {
            if (navigator.userAgent.indexOf('Safari') != -1) {
                alert('请允许cookie存储（设置-Safari-阻止Cookie：不阻止）');
            } else {
                alert('请允许cookie存储');
            }
        }
        (function(doc, win) {
            var docEl = doc.documentElement;
            var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
            var recalc = function() {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if (clientWidth >= 640) {
                    docEl.style.fontSize = 256 / 3 + 'px';
                } else {
                    docEl.style.fontSize = 50 * (clientWidth / 375) + 'px';
                }
            };
            if (doc.addEventListener) {
                win.addEventListener(resizeEvt, recalc, false);
                doc.addEventListener('DOMContentLoaded', recalc, false);
            }
        })(document, window);
    </script>
</head>

<body>
    <div class="shade hidden"></div>
    <div id="container"></div>
    <!--底部菜单-->
    <div class="select-foot main-btn show">
        <div class="foot-discovery active">
            <span>发现</span>
        </div>
        <div class="foot-spot active">
            <span>景点</span>
        </div>
        <div class="foot-line active">
            <span>游玩线路</span>
        </div>
    </div>
    <audio id="speachAudio" src="/assets/mp3/1.mp3" data-index="22"></audio>

    <div class="left-bottom-btns main-btn show">
        <div class="location-btn" onclick="getLocat()"></div>
    </div>
    <div class="vip-btn main-btn" onclick="showVipBlock();"></div>

    <!-- ===================右侧弹框======================= -->
    <div id="setUpPanel" class="slide-right" style="touch-action: none;">
        <div class="slide-right-option">
            <div class="autoplay_block">自动播放<input id="speechBtn" type="checkbox" checked class="al-toggle-button" data-flow="34"> </div>
            <div class="custom_block"><a id="custom_a" href="tel:4006270230">联系客服</a> </div>
        </div>
    </div>
    <!-- ===================头部弹窗======================= -->
    <!-- 播放器弹框 -->
    <div id="playerPanel" class="slide-top">
        <div class="speach-info">
            <div class="player-bg"><img class="player-bg-img" src="/assets/img/2020031709551201.jpg"></div>
            <div class="player-control">
                <div class="player-switch"></div>
                <div class="player-current">00:00</div>
                <div class="player-schedule">
                    <div class="player-bar">
                        <div></div>
                    </div>
                    <div class="player-indicator"></div>
                </div>
                <div class="player-duration">00:00</div>
                <div class="player-toggle"></div>
            </div>
            <p class="speach-name"></p>
            <div class="player-close"></div>
        </div>
    </div>

    <!-- 景点详情弹框 -->
    <div id="spotInfoPanel" class="popup hidden">
        <div class="main">
            <div class="spot-info-title">
                <div class="attraction-name"></div>
                <button id="closeSpotInfoPanel"></button>
            </div>
            <div class="spot-info-content">
                <div class="scroll">
                    <div class="spot-info-detail">
                        <img class="spot-info-detail-img">
                        <div class="spot-info-detail-content"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- ===================底部弹框======================= -->
    <!-- 发现 -->
    <div id="discoveryPanel" class="slide-bottom">
        <div class="discovery-list" data-bind="foreach:{ data: spotTypes,
                as:
                'item' }">
            <div class="discovery" data-bind="click:discoveryClick.bind(item)">
                <div data-bind="ifnot: item.selected">
                    <img class="icon icon0 icon-original" data-bind="attr:{'src':item.icon}" />
                    <img class="icon icon0 icon-selected hidden" data-bind="attr:{'src':item.selectedicon}" />
                    <p class="name" data-bind="text:item.name"></p>
                </div>
                <div data-bind="if: item.selected">
                    <img class="icon icon0 icon-original hidden" data-bind="attr:{'src':item.icon}" />
                    <img class="icon icon0 icon-selected" data-bind="attr:{'src':item.selectedicon}" />
                    <p class="name" data-bind="text:item.name"></p>
                </div>
            </div>
        </div>
    </div>
    <!--景点列表-->
    <div id="spotPanel" class="slide-bottom">
        <div class="spot-title border-bottom">
            <div data-bind="text: '景区景点列表('+ footSpots().length +')'"></div>
            <input type="search" placeholder="景点名称/关键词" oninput="searchChange(this.value)">
        </div>
        <div class="spot-content scroll">
            <ul class="spot-list" data-bind="foreach:{ data: footSpots, as:
                    'item' }">
                <li class="spot-item border-bottom">
                    <div class="spot-item-left">
                        <img data-bind="attr:{'src':item.backgroudimage},click:showSpotInfo.bind(item)">
                    </div>
                    <div class="spot-item-right">
                        <div class="spot-item-name" data-bind="text:item.name"></div>
                    </div>
                    <div class="spot-btn" data-bind="click:goToSpot.bind(item)">前往</div>
                </li>
            </ul>
        </div>
    </div>
    <!--游玩路线-->
    <div id="linePanel" class="slide-bottom">
        <div class="line-title slide-bottom-title border-bottom">游玩路线</div>
        <div class="line-content slide-bottom-content scroll">
            <div class="line-list" data-bind="foreach:{ data: lines, as:
                'item' }">
                <div class="line border-bottom">
                    <div class="route-name" data-bind="text:item.routeame"></div>
                    <div class="route-distance" data-bind="text:'总计'+ item.linelength"></div>
                    <div class="route-time" data-bind="text:'预计用时'+ item.expecthours"></div>
                    <div class="route-btn" data-bind="attr:{'id': 'line-' + item.id},click:goToLine.bind(item)"></div>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="/assets/js/web/web.js"></script>

</html>