define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function() {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'spotmanage/spottype/index' + location.search,
                    add_url: 'spotmanage/spottype/add',
                    edit_url: 'spotmanage/spottype/edit',
                    del_url: 'spotmanage/spottype/del',
                    multi_url: 'spotmanage/spottype/multi',
                    import_url: 'spotmanage/spottype/import',
                    table: 'spottype',
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
                        { field: 'typename', title: __('Typename'), operate: 'LIKE' },
                        { field: 'typeimage', title: __('Typeimage'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image },
                        { field: 'typeselectedimage', title: __('Typeselectedimage'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image },
                        { field: 'spotimage', title: __('Spotimage'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image },
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