if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError("this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}
$(function() {
    $.extend(String.prototype, {
        equals: function(str) {
            return this == str;
        },
        contains: function(searchstr) {
            return this.indexOf(searchstr) != -1;
        },
        startWith: function(str) {
            var reg = new RegExp("^" + str);
            return reg.test(this);
        },
        endWith: function(str) {
            var reg = new RegExp(str + "$");
            return reg.test(this);
        },
        toDate: function() {
            return new Date(Date.parse(this.replace(/-/g, "/")));
        },
        formatDateTime: function() {
            return this._formatDate("yyyy-MM-dd hh:mm:ss");
        },
        formatDateMinute: function() {
            return this._formatDate("yyyy-MM-dd hh:mm");
        },
        formatDate: function() {
            return this._formatDate("yyyy-MM-dd");
        },
        _formatDate: function(format) {
            var str = this;
            if (this && this.length > 0) {
                if (str.indexOf("T") > 0) {
                    str = str.replace("T", " ");
                }
                str = str.toDate();
                return str.format(format);
            }
            return "";
        },
        replaceAll: function(searchValue, replaceValue) {
            var reg = new RegExp(searchValue, "g");
            return this.replace(reg, replaceValue);
        },
        isInt: function() {
            var reg = /^(0|\+?[1-9][0-9]*)$/;
            return reg.test(this);
        },
        isDecimal: function() {
            var reg = /^(([0-9]+)|([0-9]+\.[0-9]{1,2}))$/;
            return reg.test(this);
        },
        format: function(args) {
            var result = this;
            if (arguments.length > 0) {
                if (arguments.length == 1 && typeof(args) == "object") {
                    for (var key in args) {
                        if (args[key] != undefined) {
                            var reg = new RegExp("({" + key + "})", "g");
                            result = result.replace(reg, args[key]);
                        }
                    }
                } else {
                    for (var i = 0; i < arguments.length; i++) {
                        if (arguments[i] != undefined) {
                            var reg = new RegExp("({[" + i + "]})", "g");
                            result = result.replace(reg, arguments[i]);
                        }
                    }
                }
            }
            return result;
        },
        formatNumber: function(decimals, dec_point, thousands_sep) {
            var number = this;
            number = (number + '').replace(/[^0-9+-Ee.]/g, '');
            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
                dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return '' + Math.floor((n * k).toFixed()) / k;
                };
            s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.');
            var re = /(-?\d+)(\d{3})/;
            console.log(s)
            while (re.test(s[0])) {
                s[0] = s[0].replace(re, "$1" + sep + "$2");
            }
            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                s[1] += new Array(prec - s[1].length + 1).join('0');
            }
            return s.join(dec);
        },
        formatMoney: function() {
            return this.formatNumber(2)
        }
    })

    $.extend(Array.prototype, {
        contains: function(elem) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == elem) {
                    return true;
                }
            }
            return false;
        },
        containsWithKey: function(elem, key) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][key] == elem[key]) {
                    return true;
                }
            }
            return false;
        },
        containsWithFunc: function(func) {
            for (var i = 0; i < this.length; i++) {
                if (func(this[i])) {
                    return true;
                }
            }
            return false;
        },
        getIndexWithKey: function(elem, key) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][key] == elem[key]) {
                    return i;
                }
            }
            return -1;
        },
        removeWithKey: function(key, value) {
            for (var i = 0; i < this.length; i++) {
                if (this[i][key] == value) {
                    var item = this[i];
                    this.splice(i, 1);
                    return item;
                }
            }
        },
        joinKeyWith: function(key, seperate) {
            var array = [];
            for (var i = 0; i < this.length; i++) {
                array.push(this[i][key])
            }
            return array.join(seperate);
        },
        joinDisplayWith: function(value, key, display, seperate, sourceseperate) {
            seperate = seperate || ",";
            sourceseperate = sourceseperate || ",";
            var array = [];
            if (value) {
                var valueArr = value.split(sourceseperate);
                for (var i = 0; i < valueArr.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (valueArr[i] == this[j][key]) {
                            array.push(this[j][display]);
                            break;
                        }
                    }
                }
            }
            return array.join(seperate);
        },
        remove: function(item, all) {
            var result, isType = Object.prototype.toString,
                i, len, start, hasLast = arguments[2];
            start = 0, len = this.length;
            for (i = start; i < len;) {
                var isPass = true,
                    inx;
                if (!hasLast) {
                    inx = i;
                } else {
                    inx = len - 1;
                }
                if (isType.call(item) == '[object Array]') {
                    for (var ii = 0, iimax = item.length; ii < iimax; ii++) {
                        if (this[inx] === item[ii]) {
                            isPass = false;
                            break;
                        }
                    }
                } else if (this[inx] === item) {
                    isPass = false;
                }
                if (!isPass) {
                    result = true;
                    this.splice(inx, 1);
                    if (!all) {
                        break;
                    }
                } else if (!hasLast) {
                    len = this.length;
                    i++;
                } else {
                    len--;
                }
            }
            return result ? this : void 0;
        },
        pushAll: function(data) {
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    this.push(data[i]);
                }
            }
        },
        find: function(func) {
            var arr = this;
            for (var i = 0; i < arr.length; i++) {
                if (func(arr[i])) {
                    return arr[i];
                }
            }
        },
        where: function(func) {
            var arr = this;
            var r = [];
            for (var i = 0; i < arr.length; i++) {
                if (func(arr[i])) {
                    r.push(arr[i]);
                }
            }
            return r;
        },
        insert: function(index, elem) {
            this.splice(index, 0, elem);
        }
    })

    $.extend(Date.prototype, {
        format: function(fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份 
                "d+": this.getDate(), //日 
                "h+": this.getHours(), //小时 
                "m+": this.getMinutes(), //分 
                "s+": this.getSeconds(), //秒 
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                "S": this.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        },
        getDateDiff: function() {
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var halfamonth = day * 15;
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - this;
            if (diffValue < 0) {
                //若日期不符则弹出窗口告之  
                return "结束日期不能小于开始日期！";
            }
            var monthC = diffValue / month;
            var weekC = diffValue / (7 * day);
            var dayC = diffValue / day;
            var hourC = diffValue / hour;
            var minC = diffValue / minute;
            if (monthC >= 1) {
                result = parseInt(monthC) + " 个月前";
            } else if (weekC >= 1) {
                result = parseInt(weekC) + " 周前";
            } else if (dayC >= 1) {
                result = parseInt(dayC) + " 天前";
            } else if (hourC >= 1) {
                result = parseInt(hourC) + " 小时前";
            } else if (minC >= 1) {
                result = parseInt(minC) + " 分钟前";
            } else
                result = "刚刚发表";
            return result;
        },
        toISOString: function() {
            function pad(n) { return n < 10 ? '0' + n : n }
            return this.getUTCFullYear() + '-' +
                pad(this.getUTCMonth() + 1) + '-' +
                pad(this.getUTCDate()) + 'T' +
                pad(this.getUTCHours()) + ':' +
                pad(this.getUTCMinutes()) + ':' +
                pad(this.getUTCSeconds()) + '.' +
                pad(this.getUTCMilliseconds()) + 'Z';
        },
        addHours: function(hours) {
            var tempDate = new Date(this.valueOf() + 60 * 60 * 1000 * hours);
            return tempDate;
        }
    })

    $.extend({
        showSuccess: function(text, callback) {
            var layer = $.getRootLayer();
            var index = layer.alert(text, {
                icon: 1,
                shade: 0.3,
                time: 0
            }, function() {
                if (callback) {
                    callback();
                }
                layer.close(index);
            });
        },
        showError: function(text, callback) {
            if (text) {
                var layer = $.getRootLayer();
                var index = layer.alert(text, {
                    icon: 2,
                    shade: 0.3,
                    time: 0
                }, function() {
                    if (callback) {
                        callback();
                    }
                    layer.close(index);
                });
            } else {
                if (callback) {
                    callback();
                }
            }
        },
        showWarning: function(text, callback) {
            var layer = $.getRootLayer();
            var index = layer.alert(text, {
                icon: 5,
                shade: 0.3,
                time: 0
            }, function() {
                if (callback) {
                    callback();
                }
                layer.close(index);
            });
        },
        showAlert: function(text) {
            $.showWarning(text);
        },
        showConfirm: function(text, callback, yesText, cancelText) {
            yesText = yesText || '确定';
            cancelText = cancelText || '取消';
            var index = $.getRootLayer().confirm(text, {
                btn: [yesText, cancelText] //按钮
            }, function() {
                callback(true);
                $.getRootLayer().close(index);
            }, function() {
                callback(false);
                $.getRootLayer().close(index);
            });
        },
        showConfirm2: function(text, callback, yesText, cancelText, closeText) {
            yesText = yesText || '确定';
            cancelText = cancelText || '取消';
            closeText = closeText || '关闭';
            var index = $.getRootLayer().confirm(text, {
                btn: [yesText, cancelText, closeText] //按钮
            }, function() {
                callback(true);
                $.getRootLayer().close(index);
            }, function() {
                callback(false);
                $.getRootLayer().close(index);
            }, function() {
                $.getRootLayer().close(index);
            });
        },
        showPrompt: function(text, value, func) {
            $.getRootLayer().prompt({
                title: text,
                value: value
            }, function(pass, index) {
                var result = func(pass);
                if (result != false) {
                    $.getRootLayer().close(index);
                }
            });
        },
        showLoading: function(text) {
            if (!text) {
                text = '加载中';
            }
            return $.getRootLayer().msg(text, {
                icon: 16,
                shade: 0.3,
                time: 0
            });
        },
        showPrev: function(src, start) {
            start = start || 0;
            if (src) {
                var photos = [];
                src.split(";").forEach(function(e) {
                    photos.push({
                        src: e
                    })
                });
                var data = {
                    "title": "图册",
                    "start": start,
                    "data": photos
                }
                try {
                    $.getRootLayer().photos({
                        photos: data,
                        anim: 5,
                        shade: 0.4
                    });
                } catch (e) {
                    var result = {
                        src: window.location.origin + src,
                        type: "preview"
                    }
                    window.parent.postMessage(result, '*')
                }
            }
        },
        showMessage: function(text, callback) {
            var index = $.getRootLayer().alert(text, {
                icon: 3,
                shade: 0.3,
                time: 0
            }, function() {
                if (callback) {
                    callback();
                }
                $.getRootLayer().close(index);
            });
        },

        closeLoading: function(index) {
            $.getRootLayer().close(index);
        },
        checkLogin: function() {
            return true;
        },
        formatDateTime: function(date) {
            if (date)
                return date.formatDateTime();
            return "";
        },
        formatDateMinute: function(date) {
            if (date)
                return date.formatDateMinute();
            return "";
        },
        formatDate: function(date) {
            if (date)
                return date.formatDate();
            return "";
        },
        formatNumber: function(number, decimals) {
            if (!isNaN(number) && number != null)
                return number.toString().formatNumber(decimals);
            return "";
        },
        formatMoney: function(number) {
            if (!isNaN(number) && number != null)
                return number.toString().formatMoney();
            return "";
        },
        formatPercent: function(number) {
            if (!isNaN(number) && number != null)
                return number.toString() + '%';
            return "";
        },
        nullOrEmptyDefault: function(val, str) {
            if (!val || val == "" || $.trim(val) == "")
                return str;
            else
                return val;
        },
        numberValidate: function(obj) {
            var tempValue = obj.value;
            tempValue = tempValue.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
            tempValue = tempValue.replace(/^\./g, ""); //验证第一个字符是数字
            tempValue = tempValue.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
            tempValue = tempValue.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            tempValue = tempValue.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
            obj.value = tempValue;
        },
        isNullOrEmpty: function(val) {
            if (val === undefined || val === "" || $.trim(val) === "" || val === null)
                return true;
            else
                return false;
        },
        keepOneDecimalFull: function(num) {
            var result = parseFloat(num);
            if (isNaN(result)) {
                //alert("传递参数错误,请检查!");
                return 0;
            }
            result = Math.round(num * 100) / 100;
            var s_x = result.toString();
            var pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0) {
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 1) {
                s_x += '0';
            }
            return s_x;
        },
        keepTwoDecimalFull: function(num) {
            var result = parseFloat(num);
            if (isNaN(result)) {
                //alert("传递参数错误,请检查!");
                return 0;
            }
            result = Math.round(num * 100) / 100;
            var s_x = result.toString();
            var pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0) {
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 2) {
                s_x += '0';
            }
            return s_x;
        },
        conditionJudge: function(condition, trueValue, falseValue) {
            var isTrue = $.parseBool(condition.toString());
            if (isTrue) {
                return trueValue;
            }
            return falseValue;
        },

        loadingPost: function(url, parameter, callback, contentType) {
            if ($.checkLogin()) {
                var layerIndex = $.showLoading();
                var successFunc = function(data) {
                    $.closeLoading(layerIndex);
                    if (data.success) {
                        if (callback != null) {
                            callback(data);
                        } else {
                            if (data.info) {
                                $.alert(data.info, function() {
                                    $.loadUrlOrRefresh(data.url)
                                });
                            } else {
                                $.loadUrlOrRefresh(data.url)
                            }
                        }
                    } else {
                        if (data.errorType == "5") {
                            //打开自定义流程界面
                            var array = data.errorText.split("|");
                            var url = "/CommonAudit/CustomSubmit";
                            url = $.updateUrlParam(url, "id", array[0]);
                            url = $.updateUrlParam(url, "opController", array[1]);
                            url = $.updateUrlParam(url, "operate", array[2]);
                            url = $.updateUrlParam(url, "defineID", array[3]);
                            var idx = $(this).formLink({
                                url: url,
                                callback: callback
                            })
                        } else if (data.errorText) {
                            $.showWarning(data.errorText, function() {
                                $.loadUrl(data.url)
                            });
                        } else {
                            $.loadUrl(data.url)
                        }
                    }
                }
                var errorFunc = function(result, errorStatus, errorText) {
                    $.closeLoading(layerIndex);
                    $.showError(errorText);
                    if (callback != null) {
                        callback({
                            success: false
                        });
                    }
                }
                $.ajax({
                    url: url,
                    type: "post",
                    data: parameter,
                    dataType: "json",
                    contentType: contentType,
                    success: successFunc,
                    error: errorFunc
                })
            }
        },
        loadingGet: function(url, parameter, callback) {
            var layerIndex = $.showLoading();
            url = $.updateUrl(url);
            $.get(url, parameter, function(data) {
                $.closeLoading(layerIndex);
                if (callback != null) {
                    callback(data);
                } else {
                    if (data.success) {
                        if (data.info) {
                            $.alert(data.info, function() {
                                $.loadUrlOrRefresh(data.url)
                            });
                        } else {
                            $.loadUrlOrRefresh(data.url)
                        }
                    } else {
                        if (data.error) {
                            $.alert(data.error, function() {
                                $.loadUrl(data.url)
                            });
                        } else {
                            $.loadUrl(data.url)
                        }
                    }
                }
            }).error(function(result, errorStatus, errorText) {
                $.closeLoading(layerIndex);
                $.showError(errorText);
            });
        },
        get2: function(url, data, callback) {
            url = $.updateUrl(url);
            return $.get(url, data, callback).error(function(result, errorStatus, errorText) {
                if (result.readyState != 0) {
                    $.showError(errorText);
                }
            });

        },
        post2: function(url, data, callback) {
            return $.post(url, data, callback).error(function(result, errorStatus, errorText) {
                $.showError(errorText);
            });
        },
        loadUrlOrRefresh: function(url) {
            if (url) {
                window.location.href = url;
            } else {
                window.location.href = $.updateUrl(window.location.href)
            }
        },
        loadUrl: function(url) {
            if (url) {
                window.location.href = url;
            }
        },
        openUrl: function(url, target) {
            if (url) {
                if (!target) {
                    target = "_blank";
                }
                window.open(url, target);
            }
        },
        openDownload: function(url, name) {
            if (url) {
                var link = document.createElement('a')
                link.style.display = 'none'
                link.href = url;
                link.target = "_blank";
                if (name) {
                    link.setAttribute(
                        'download',
                        name
                    )
                }
                document.body.appendChild(link)
                link.click()
            }
        },
        openUrlWithTarget: function(url, target) {
            if (url && target) {
                window.open(url, target);
            }
        },
        openMainUrl: function(url, target) {
            $(window.top.document.getElementById("iframecontent")).attr("src", url);
            $.getRootLayer().closeAll();
        },
        updateUrl: function(url, key) {
            var key = (key || 'timestamp') + '='; //默认是"t"
            var reg = new RegExp(key + '\\d+'); //正则：t=1472286066028
            var timestamp = +new Date();
            if (url.indexOf(key) > -1) { //有时间戳，直接更新
                return url.replace(reg, key + timestamp);
            } else { //没有时间戳，加上时间戳
                if (url.indexOf('\?') > -1) {
                    var urlArr = url.split('\?');
                    if (urlArr[1]) {
                        return urlArr[0] + '?' + key + timestamp + '&' + urlArr[1];
                    } else {
                        return urlArr[0] + '?' + key + timestamp;
                    }
                } else {
                    if (url.indexOf('#') > -1) {
                        return url.split('#')[0] + '?' + key + timestamp + location.hash;
                    } else {
                        return url + '?' + key + timestamp;
                    }
                }
            }
        },
        updateUrlParam: function(url, key, value) {
            var params = "";
            if (url.indexOf("?") >= 0) {
                params = url.substring(url.indexOf("?") + 1);
                url = url.substring(0, url.indexOf("?"));
            }
            if (params.indexOf('#') > -1) {
                params = params.substring(0, params.indexOf('#'));
            }
            if (params) {
                params = params.split('&');
            } else {
                params = [];
            }
            var flag = false;
            for (var i = 0; i < params.length; i++) {
                if (params[i].startWith(key + "=")) {
                    params[i] = key + "=" + (value || "");
                    flag = true;
                    break;
                }
            }
            if (!flag)
                params.push(key + "=" + (value || ""));
            url = url + "?" + params.join("&");
            return url;
        },
        formLinkCore: function(url, callback) {
            var me = $(this);
            var config = {
                width: 300,
                height: 300,
                cancel: function(index, lay) {
                    var cancelCallback = me.data("cancel-callback");
                    var cancelConfirmText = me.data("cancel-confirm-text");
                    if (cancelCallback) {
                        if (cancelConfirmText) {
                            $.showConfirm(cancelConfirmText, function(result) {
                                if (result) {
                                    $.getRootLayer().close(index);
                                    var func = window[cancelCallback];
                                    if (func) {
                                        func.call(me);
                                    }
                                }
                            })
                        } else {
                            $.getRootLayer().close(index);
                            var func = window[cancelCallback];
                            if (func) {
                                func.call(me);
                            }
                        }
                        return false;
                    } else {
                        return true;
                    }

                }
            }
            if (typeof url == "string") {
                config.url = url;
                config.callback = callback;
            } else {
                $.extend(config, url);
            }
            var windowCacheKey;
            if (config.url) {
                windowCacheKey = "window_" + (config.url.indexOf("?") > 0 ? config.url.substring(0, config.url.indexOf("?")) : config.url);
                var cache = localStorage.getItem(windowCacheKey);
                if (cache) {
                    var array = cache.split(",");
                    config.width = array[0];
                    config.height = array[1];
                }
            }
            var buttonFunction = function(index, lay, buttonIndex) {
                var flag = false;
                var text = this.btn[buttonIndex];
                if (config.callback && text != "关闭") {
                    flag = config.callback.call(me, index, lay, buttonIndex);
                }
                if (flag) {
                    $.getRootLayer().close(index);
                } else if (text == "关闭") {
                    var result = config.cancel.call(this, index, lay);
                    if (result) {
                        $.getRootLayer().close(index);
                    }
                }
                return flag;
            }
            currFormLink = $(this);
            try {
                var index = $.getRootLayer().open({
                    type: 2,
                    title: "　",
                    fixed: true,
                    maxmin: true,
                    shadeClose: false,
                    skin: 'layui-layer-rim', //加上边框
                    area: [config.width + "px", config.height + "px"],
                    content: config.url,
                    btn: ["", "", "", "", "关闭"],
                    btn2: function(index, lay) {
                        buttonFunction.call(this, index, lay, 1);
                        return false;
                    },
                    btn3: function(index, lay) {
                        buttonFunction.call(this, index, lay, 2);
                        return false;
                    },
                    btn4: function(index, lay) {
                        buttonFunction.call(this, index, lay, 3);
                        return false;
                    },
                    btn5: function(index, lay) {
                        buttonFunction.call(this, index, lay, 4);
                        return false;
                    },
                    yes: function(index, lay) {
                        buttonFunction.call(this, index, lay, 0);
                        return false;
                    },
                    cancel: function(index, lay) {
                        buttonFunction.call(this, index, lay, 4);
                        return false;
                    },
                    success: function(lay) {
                        var win = $.getRootWindow();
                        var frame = lay.find("iframe")[0];
                        try {
                            var title = frame.contentWindow.document.title;
                            lay.find(".layui-layer-title").text(title);
                            var windowConfig = frame.contentWindow.$("#windowConfig");
                            if (windowConfig.length > 0) {
                                var width = windowConfig.data("width");
                                var height = windowConfig.data("height");
                                if (windowCacheKey) {
                                    localStorage.setItem(windowCacheKey, width + "," + height);
                                }

                                var isfull = windowConfig.data("isfull");
                                var windowButtons = windowConfig.data("windowbuttons");
                                var windowButtonsArray = [];
                                if (windowButtons) {
                                    windowButtonsArray = windowButtons.split(",");
                                }
                                if (windowButtonsArray.length > 0) {
                                    lay.find(".layui-layer-btn").css("display", "block");
                                    var windowSkin = windowConfig.data("windowskin");
                                    if (windowSkin) {
                                        lay.find(".layui-layer-btn").addClass(windowSkin);
                                    }
                                    lay.find(".layui-layer-btn a").each(function(index) {
                                        if (windowButtonsArray.length > index + 1)
                                            $(this).text(windowButtonsArray[index]);
                                        else if ($(this).text() != "关闭")
                                            $(this).css("display", "none");
                                    })
                                }
                                var left = $(win).width() / 2 - width / 2;
                                var top = ($(win).height()) / 2 - height / 2 + $(win).scrollTop();
                                lay.width(width);
                                lay.height(height);
                                $(frame).height(height - (windowButtonsArray.length ? 98 : 0));
                                lay.css("left", left);
                                lay.css("top", top);
                                if (isfull && isfull == 1) {
                                    layer.full(index);
                                }
                                frame.contentWindow.$(".btn-confirm").click(function(e) {
                                    e.preventDefault();
                                    config.callback.call(this, index, lay, $(this).data("index"));
                                })
                            }
                            var cusWindowTool = frame.contentWindow.$("#cusWindowTool");
                            if (cusWindowTool.length > 0) {
                                var div = $("<div class='cus-window-tool'/>");
                                div.append(cusWindowTool);
                                lay.find(".layui-layer-btn").append(div);
                            }
                            if (windowConfig.data("autoclose")) {
                                $.getRootLayer().close(index);
                            }
                        } catch (e) {
                            frame.contentWindow.postMessage("", '*')
                        }

                    }
                });
            } catch (e) {
                var result = {
                    type: "open",
                    url: config.url
                }
                window.parent.postMessage(result, '*')
            }
        },
        noTitleLink: function(url) {
            var me = $(this);
            var width = me.data("width") || 300;
            var height = me.data("height") || 300;
            var url = me.attr("href");
            var config = {
                type: 2,
                title: false,
                area: [width + "px", height + "px"],
                content: url
            };
            $.getRootLayer().open(config);
        },
        closeCurrentFormLink: function(i) {
            if (currFormLinkFormIndex >= 0) {
                currFormLinkFormResult = i;
                $.getRootLayer().close(currFormLinkFormIndex);
                currFormLinkFormIndex = -1;
                currFormLink = null;
            }
        },
        loadScript: function(url, callback) {
            $scripts = $("script");
            var flag = false;
            $scripts.each(function() {
                if (url == $(this).attr("src")) {
                    flag = true;
                }
            })
            if (flag) {
                //临时处理，防止同一个页面多个form 加载未完成就执行
                setTimeout(function() {
                    callback();
                }, 100);
            } else {
                var script = document.createElement("script");
                script.type = "text/javascript";
                if (typeof(callback) != "undefined") {
                    if (script.readyState) {
                        script.onreadystatechange = function() {
                            if (script.readyState == "loaded" || script.readyState == "complete") {
                                script.onreadystatechange = null;
                                callback();
                            }
                        };
                    } else {
                        script.onload = function() {
                            callback();
                        };
                    }
                }
                script.src = url;
                document.body.appendChild(script);
            }
        },
        loadCss: function(url, callback) {
            $links = $("link");
            var flag = false;
            $links.each(function() {
                if (url == $(this).attr("href")) {
                    flag = true;
                }
            })
            if (flag) {
                callback();
            } else {
                var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                document.body.appendChild(link);
                setTimeout(function() {
                    callback();
                }, 100);
            }
        },
        loadAssets: function(config, callback) {
            var array = [];
            if (config.css)
                for (var i = 0; i < config.css.length; i++) {
                    array.push(config.css[i]);
                }
            if (config.scripts)
                for (var i = 0; i < config.scripts.length; i++) {
                    array.push(config.scripts[i]);
                }
            if (array.length > 0) {
                var index = 0;
                var loadFunc = function() {
                    var item = array[index];
                    var callbackFunc = function() {
                        index++;
                        if (index < array.length) {
                            loadFunc()
                        } else if (callback) {
                            callback();
                        }
                    }
                    if (item.endWith(".css")) {
                        $.loadCss(item, callbackFunc)
                    } else {
                        $.loadScript(item, callbackFunc)
                    }
                }
                loadFunc();
            }
        },
        renderByParams: function(key, params) {
            if (params) {
                for (var i = 0; i < params.length; i++) {
                    if (params[i]["ID"] == key) {
                        return params[i]["Name"];
                    }
                }
            }
            return key;
        },
        template: function(template, d) {
            if (template) {
                var a = template.replace(new RegExp(/\{\{([^}]+)\}\}/g), function(match, field, index, text) {
                    return eval(field);
                });
                return a.replace(/undefined/g, "").replace(/null/g, "")
            }
            return "";
        },
        getRootWindow: function() {
            var win = window;
            if (win.parent != window) {
                win = win.parent;
            }
            return win;
        },
        getRootLayer: function() {
            var lay = layer;
            var win = window;
            while (win.parent && win.parent != win) {
                win = window.parent;
                lay = win.layer;
            }
            return lay;
        },
        getAbsolutePosition: function(obj) {
            position = new Object();
            position.x = 0;
            position.y = 0;
            var tempobj = obj;
            while (tempobj != null && tempobj != document.body) {
                position.x += tempobj.offsetLeft + tempobj.clientLeft;
                position.y += tempobj.offsetTop + tempobj.clientTop;
                tempobj = tempobj.offsetParent
            }
            position.x += document.body.scrollLeft;
            position.y += document.body.scrollTop;
            return position;
        },
        checkIE: function() {
            if (navigator.userAgent.indexOf("MSIE") > 0) {
                if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
                    return 6;
                }
                if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
                    return 7;
                }
                if (navigator.userAgent.indexOf("MSIE 8.0") > 0 && !window.innerWidth) { //这里是重点，你懂的
                    return 8;
                }
                if (navigator.userAgent.indexOf("MSIE 9.0") > 0) {
                    return 9;
                }
            }
            return 9;
        },
        renderHead: function(head) {
            if (head) {
                return head;
            }
            return "/Assets/Images/default-head.png";
        },
        renderImg: function(img, ext) {
            if (img) {
                return img;
            }
            if (ext == ".cou") {
                return "/Assets/Images/default-cou.jpg";
            }
            return "/Assets/Images/default-picture.png";
        },
        renderResStateClass: function(finishState) {
            if (finishState == "2") {
                return "finished";
            } else if (finishState == "1") {
                return "progressing";
            } else {
                return "notstart";
            }
        },
        renderResStateText: function(finishState) {
            if (finishState == "2") {
                return "已完成";
            } else if (finishState == "1") {
                return "学习中";
            } else {
                return "未学习";
            }
        },
        fileSize: function(size) {
            var suffix = "B";
            var size2 = size;
            if (size2 > 1024) {
                suffix = "KB";
                size2 /= 1024;
            }
            if (size2 > 1024) {
                suffix = "MB";
                size2 /= 1024;
            }
            if (size2 > 1024) {
                suffix = "GB";
                size2 /= 1024;
            }
            return Math.round(size2, 2) + " " + suffix;
        },
        getChineseNumber: function(number) {
            var chineseNumber = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "拾"];
            return chineseNumber[number - 1];
        },
        parseBool: function(value) {
            if (value == "true" || value == "True") {
                return true;
            }
            return false;
        },
        parseJsonString: function(value) {
            if (typeof(value) == "string") {
                var val = value ? JSON.parse(value.replace(/\'/g, "\"").replaceAll("&quot;", "\"").replace(/\r\n/g, '').replace(/\n/, "").replace(/\n/g, "\\n").replace(/\r/g, "\\r")) : [];
                return val;
            }
            return value || [];
        },
        getDateDiffs: function(days) {
            var tag = "";
            if (days < 0) {
                tag = "剩";
                days = -days;
            }
            var yearLevelValue = 365;
            var monthLevelValue = 31;
            var year = parseInt((parseInt(days)) / yearLevelValue);
            var month = parseInt((days - year * yearLevelValue) / monthLevelValue);
            var day = parseInt(days - year * yearLevelValue - month * monthLevelValue);
            var result = "";
            if (year != 0) result = result + year + "年";
            if (month != 0) result = result + month + "月";
            if (year == 0)
                result = result + day + "天";
            return tag + result;
        },
        dateAdd: function(interval, number, date) {
            date = new Date(date);
            switch (interval) {
                case "y":
                    {
                        var year = date.getFullYear() + number;
                        date.setFullYear(year);
                        return date;
                    }
                case "q":
                    {
                        date.setMonth(date.getMonth() + number * 3);
                        return date;
                    }
                case "m":
                    {
                        date.setMonth(date.getMonth() + number);
                        return date;
                    }
                case "w":
                    {
                        date.setDate(date.getDate() + number * 7);
                        return date;
                    }
                case "d":
                    {
                        date.setDate(date.getDate() + number);
                        return date;
                    }
                case "h":
                    {
                        date.setHours(date.getHours() + number);
                        return date;
                    }
                case "m":
                    {
                        date.setMinutes(date.getMinutes() + number);
                        return date;
                    }
                case "s":
                    {
                        date.setSeconds(date.getSeconds() + number);
                        return date;
                    }
                default:
                    {
                        date.setDate(d.getDate() + number);
                        return date;
                    }
            }
        }
    })
})