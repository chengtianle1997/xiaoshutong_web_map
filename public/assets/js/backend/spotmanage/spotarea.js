define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function() {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'spotmanage/spotarea/index' + location.search,
                    add_url: 'spotmanage/spotarea/add',
                    edit_url: 'spotmanage/spotarea/edit',
                    del_url: 'spotmanage/spotarea/del',
                    multi_url: 'spotmanage/spotarea/multi',
                    import_url: 'spotmanage/spotarea/import',
                    table: 'spotarea',
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
                        { field: 'id', title: __('Id') },
                        // { field: 'admin_id', title: __('Admin_id') },
                        { field: 'areaname', title: __('Areaname'), operate: 'LIKE' },
                        { field: 'svgfile', title: __('svg文件'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image },
                        // { field: 'handimage', title: __('Handimage'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image },
                        { field: 'city', title: __('City'), operate: 'LIKE' },
                        { field: 'centerlng', title: __('Centerlng'), operate: 'BETWEEN' },
                        { field: 'centerlat', title: __('Centerlat'), operate: 'BETWEEN' },
                        // { field: 'southwestlng', title: __('Southwestlng'), operate: 'BETWEEN' },
                        // { field: 'southwestlat', title: __('Southwestlat'), operate: 'BETWEEN' },
                        // { field: 'northeastlng', title: __('Northeastlng'), operate: 'BETWEEN' },
                        // { field: 'northeastlat', title: __('Northeastlat'), operate: 'BETWEEN' },
                        // { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false, formatter: Table.api.formatter.datetime },
                        { field: 'updatetime', title: __('Updatetime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false, formatter: Table.api.formatter.datetime },
                        { field: 'admin.nickname', title: __('管理员'), operate: 'LIKE' },
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