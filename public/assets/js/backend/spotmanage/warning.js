define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function() {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'spotmanage/warning/index' + location.search,
                    add_url: 'spotmanage/warning/add',
                    edit_url: 'spotmanage/warning/edit',
                    del_url: 'spotmanage/warning/del',
                    multi_url: 'spotmanage/warning/multi',
                    import_url: 'spotmanage/warning/import',
                    table: 'warning',
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
                        { field: 'id', title: __('Id'), operate: false },
                        // {field: 'admin_id', title: __('Admin_id')},
                        // {field: 'spotare_id', title: __('Spotare_id')},
                        // {field: 'spottype_id', title: __('Spottype_id')},
                        { field: 'spotname', title: __('Spotname'), operate: 'LIKE' },
                        { field: 'spotare.areaname', title: __('所属景区'), operate: 'LIKE' },
                        { field: 'spottype.typename', title: __('景点类别'), operate: 'LIKE' },
                        // { field: 'lnglat', title: __('Lnglat'), operate: false },
                        // { field: 'voiceradius', title: __('Voiceradius'), operate: false },
                        // { field: 'lng', title: __('Lng'), operate: 'BETWEEN' },
                        // { field: 'lat', title: __('Lat'), operate: 'BETWEEN' },
                        // { field: 'backgroudimage', title: __('Backgroudimage'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image },
                        // { field: 'navigation', title: __('Navigation'), operate: 'LIKE' },
                        // { field: 'voicefile', title: __('Voicefile'), operate: false },
                        // { field: 'statusdata', title: __('Statusdata'), searchList: { "normal": __('Statusdata normal'), "service": __('Statusdata service') }, formatter: Table.api.formatter.normal },
                        { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false, operate: false, formatter: Table.api.formatter.datetime },
                        { field: 'updatetime', title: __('Updatetime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false, operate: false, formatter: Table.api.formatter.datetime },
                        { field: 'admin.nickname', title: __('Admin.nickname'), operate: 'LIKE' },
                        { field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate }
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function() {
            Controller.api.bindevent();
        },
        edit: function() {
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