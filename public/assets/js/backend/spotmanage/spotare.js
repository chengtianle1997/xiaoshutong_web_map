define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function() {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'spotmanage/spotare/index' + location.search,
                    add_url: 'spotmanage/spotare/add',
                    edit_url: 'spotmanage/spotare/edit',
                    del_url: 'spotmanage/spotare/del',
                    multi_url: 'spotmanage/spotare/multi',
                    import_url: 'spotmanage/spotare/import',
                    table: 'spotare',
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
                        // { field: 'admin_id', title: __('Admin_id') },
                        { field: 'areaname', title: __('Areaname'), operate: 'LIKE' },
                        { field: 'svgfile', title: __('Svgfile'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image },
                        // { field: 'handimage', title: __('Handimage'), operate: false, events: Table.api.events.image, formatter: Table.api.formatter.image },
                        { field: 'city', title: __('City'), operate: 'LIKE' },
                        // { field: 'centerlng', title: __('Centerlng'), operate: 'BETWEEN' },
                        // { field: 'centerlat', title: __('Centerlat'), operate: 'BETWEEN' },
                        // {field: 'southwestlng', title: __('Southwestlng'), operate:'BETWEEN'},
                        // {field: 'southwestlat', title: __('Southwestlat'), operate:'BETWEEN'},
                        // {field: 'northeastlng', title: __('Northeastlng'), operate:'BETWEEN'},
                        // {field: 'northeastlat', title: __('Northeastlat'), operate:'BETWEEN'},
                        // { field: 'centerlnglat', title: __('Centerlnglat'), operate: 'LIKE' },
                        // { field: 'southwestlnglat', title: __('Southwestlnglat'), operate: 'LIKE' },
                        // { field: 'northeastlnglat', title: __('Northeastlnglat'), operate: 'LIKE' },
                        { field: 'linkman', title: __('Linkman'), operate: 'LIKE' },
                        { field: 'linkphone', title: __('Linkphone'), operate: 'LIKE' },
                        { field: 'openinghours', title: __('Openinghours'), operate: 'LIKE', operate: false },
                        { field: 'address', title: __('Address'), operate: 'LIKE', operate: false },
                        { field: 'createtime', title: __('Createtime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false, operate: false, formatter: Table.api.formatter.datetime },
                        { field: 'updatetime', title: __('Updatetime'), operate: 'RANGE', addclass: 'datetimerange', autocomplete: false, operate: false, formatter: Table.api.formatter.datetime },
                        { field: 'admin.nickname', title: __('Admin.nickname'), operate: 'LIKE' },
                        {
                            field: 'operate',
                            title: __('Operate'),
                            table: table,
                            events: Table.api.events.operate,
                            // buttons: [{
                            //     name: 'addtabs',
                            //     title: __('景区地图管理'),
                            //     classname: 'btn btn-xs btn-warning btn-addtabs',
                            //     icon: 'fa fa-list',
                            //     url: 'spotmanage/manage?id={id}'
                            // }],
                            formatter: Table.api.formatter.operate
                        }
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
        manage: function() {
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