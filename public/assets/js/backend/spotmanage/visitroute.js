define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function() {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'spotmanage/visitroute/index' + location.search,
                    add_url: 'spotmanage/visitroute/add',
                    edit_url: 'spotmanage/visitroute/edit',
                    del_url: 'spotmanage/visitroute/del',
                    multi_url: 'spotmanage/visitroute/multi',
                    // import_url: 'spotmanage/visitroute/import',
                    table: 'visitroute',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        { checkbox: true },
                        // {field: 'id', title: __('Id')},
                        // {field: 'admin_id', title: __('Admin_id')},
                        // {field: 'spotare_id', title: __('Spotare_id')},
                        { field: 'routeame', title: __('Routeame'), operate: false },
                        { field: 'spotare.areaname', title: __('所属景区'), operate: false },
                        { field: 'linelength', title: __('Linelength'), operate: false },
                        { field: 'burncalories', title: __('Burncalories'), operate: false },
                        { field: 'nearbyspot', title: __('Nearbyspot'), operate: false },
                        { field: 'allspot', title: __('Allspot'), operate: false },
                        { field: 'expecthours', title: __('Expecthours'), operate: false },
                        { field: 'admin.nickname', title: __('Admin.nickname'), operate: false },
                        { field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function() {
            $("#btn-import-file").data("upload-success", function(data, ret) {
                debugger
                var me = $(this);
                var refresh = function(name) {
                    var data = {};
                    var textarea = $("textarea[name='" + name + "']", $("form"));
                    var container = $(".fieldlist[data-name='" + name + "']");
                    var template = container.data("template");
                    $.each($("input,select,textarea", container).serializeArray(), function(i, j) {
                        var reg = /\[(\w+)\]\[(\w+)\]$/g;
                        var match = reg.exec(j.name);
                        if (!match)
                            return true;
                        match[1] = "x" + parseInt(match[1]);
                        if (typeof data[match[1]] == 'undefined') {
                            data[match[1]] = {};
                        }
                        data[match[1]][match[2]] = j.value;
                    });
                    var result = template ? [] : {};
                    $.each(data, function(i, j) {
                        if (j) {
                            if (!template) {
                                if (j.key != '') {
                                    result[j.key] = j.value;
                                }
                            } else {
                                result.push(j);
                            }
                        }
                    });
                    textarea.val(JSON.stringify(result));
                };

                debugger
                Fast.api.ajax({
                    url: "spotmanage/spot/importline",
                    data: { file: data.url },
                    loading: false
                }, function(result) {
                    if (result && result.length > 0) {
                        for (let i = 0; i < result.length; i++) {
                            var item = result[i];
                            var container = me.closest(".fieldlist");
                            var tagName = container.data("tag") || "dd";
                            var index = container.data("index");
                            var name = container.data("name");
                            var template = container.data("template");
                            var data = container.data();

                            index = index ? parseInt(index) : 0;
                            container.data("index", index + 1);
                            // row = row ? row : {};
                            var vars = { index: index, name: name, data: data, row: item };
                            var html = template ? Template(template, vars) : Template.render(Form.config.fieldlisttpl, vars);
                            $(html).insertBefore($(tagName + ":last", container));
                            me.trigger("fa.event.appendfieldlist", me.closest(tagName).prev());

                            // var forminLineFirst = $(".fieldlist .form-inline:first");
                            // forminLineFirst.find("input[name='" + name + "[" + index + "][key]']").trigger("change");
                            // Form.events.fieldlist($("form"));
                            // Form.api.bindevent(this);
                        }
                        refresh(container.data("name"));
                    }
                    return false;
                }, function(message) {
                    return false;
                });
            });
            $("#btn-import-file").data("upload-error", function(data, ret) {});
            Controller.api.bindevent();
        },
        edit: function() {

            $("#btn-import-file").data("upload-success", function(data, ret) {
                var me = $(this);
                var refresh = function(name) {
                    var data = {};
                    var textarea = $("textarea[name='" + name + "']", $("form"));
                    var container = $(".fieldlist[data-name='" + name + "']");
                    var template = container.data("template");
                    $.each($("input,select,textarea", container).serializeArray(), function(i, j) {
                        var reg = /\[(\w+)\]\[(\w+)\]$/g;
                        var match = reg.exec(j.name);
                        if (!match)
                            return true;
                        match[1] = "x" + parseInt(match[1]);
                        if (typeof data[match[1]] == 'undefined') {
                            data[match[1]] = {};
                        }
                        data[match[1]][match[2]] = j.value;
                    });
                    var result = template ? [] : {};
                    $.each(data, function(i, j) {
                        if (j) {
                            if (!template) {
                                if (j.key != '') {
                                    result[j.key] = j.value;
                                }
                            } else {
                                result.push(j);
                            }
                        }
                    });
                    textarea.val(JSON.stringify(result));
                };
                Fast.api.ajax({
                    url: "spotmanage/spot/importline",
                    data: { file: data.url },
                    loading: false
                }, function(result) {
                    if (result && result.length > 0) {
                        for (let i = 0; i < result.length; i++) {
                            var item = result[i];
                            var container = me.closest(".fieldlist");
                            var tagName = container.data("tag") || "dd";
                            var index = container.data("index");
                            var name = container.data("name");
                            var template = container.data("template");
                            var data = container.data();
                            index = index ? parseInt(index) : 0;
                            container.data("index", index + 1);
                            // row = row ? row : {};
                            var vars = { index: index, name: name, data: data, row: item };
                            var html = template ? Template(template, vars) : Template.render(Form.config.fieldlisttpl, vars);
                            $(html).insertBefore($(tagName + ":last", container));
                            me.trigger("fa.event.appendfieldlist", me.closest(tagName).prev());
                        }
                        refresh(container.data("name"));
                    }
                    return false;
                }, function(message) {
                    return false;
                });
            });

            $("#btn-import-file").data("upload-error", function(data, ret) {

            });


            Controller.api.bindevent();
        },
        api: {
            bindevent: function() {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});