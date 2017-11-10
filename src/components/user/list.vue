<template>
  <!-- Configure "view" prop for QLayout -->
  <q-layout>
    <q-toolbar slot="header">
      <!-- opens drawer below
      <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
        <i>menu</i>
      </button>
      -->
      <q-toolbar-title>
        User
      </q-toolbar-title>
    </q-toolbar>

    <!-- Navigation Tabs
    <q-tabs slot="navigation">
      <q-route-tab slot="title" icon="view_quilt" to="/layout/about" replace hide="icon" label="About" />
      <q-route-tab slot="title" icon="view_day" to="/layout/toolbar" replace hide="icon" label="Toolbar" />
      <q-route-tab slot="title" icon="view_day" to="/layout/tabs" replace label="Tabs" />
      <q-route-tab slot="title" icon="input" to="/layout/drawer" replace label="Drawer" />
    </q-tabs>
    -->

    <!-- Left Side Panel
    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>Essential Links</q-list-header>
        <q-item>
          <q-item-side icon="school" />
          <q-item-main label="Docs" sublabel="quasar-framework.org" />
        </q-item>
        <q-item>
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item>
          <q-item-side icon="chat" />
          <q-item-main label="Gitter Channel" sublabel="Quasar Lobby" />
        </q-item>
        <q-item>
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
      </q-list>
    </div>
    -->

    <!-- Right Side Panel
    <div slot="right">
      ...
    </div>
    -->

    <router-view />
    <div class="layout-padding">
      <q-data-table
        :data="table"
        :config="config"
        :columns="columns"
        @refresh="refresh"
        @rowclick="rowClick"
      >
        <!-- 为'message'列设置自定义 renderer  -->
        <template slot="col-msg" slot-scope="cell">
          <span class="light-paragraph">{{cell.data}}</span>
        </template>
        <!-- 为'action'列设置自定义 renderer 显示带有自定义行为的按钮 -->
        <template slot='col-action' slot-scope='cell'>
          <!--需要解决按钮高度超高<q-btn color="primary" @click='doSomethingMethod(cell.row.id)'>View</q-btn>-->
        </template>
        <!-- 当用户选择一行或多行时，自定义 renderer -->
        <template slot="selection" slot-scope="selection">
          <q-btn color="primary" @click="changeMessage(selection)">
            <i>edit</i>
          </q-btn>
          <q-btn color="primary" @click="deleteRow(selection)">
            <i>delete</i>
          </q-btn>
        </template>
      </q-data-table>
      <q-alert
        color="amber"
        icon="warning"
        :actions="[{label: 'Snooze', handler: () => {
          doSomethingMethod('123')
        }}]"
      >
        Some cool message for your users.
      </q-alert>
    </div>

    <!-- Footer
    <q-toolbar slot="footer">
      ...
    </q-toolbar>
    -->
  </q-layout>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QDataTable,
    QAlert
  } from 'quasar'
  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QDataTable,
      QAlert
    },
    data () {
      return {
        config: {
          rowHeight: '50px',
          // title: '用户列表(User Table)',
          noHeader: false,
          // refresh: true,
          // columnPicker: true,
          leftStickyColumns: 1,
          // "minHeight", "maxHeight" or "height" are important(Me: not including header/footer)
          bodyStyle: {
            // maxHeight: '500px' // if empty, the height is auto
          },
          responsive: false,
          pagination: {
            rowsPerPage: 15,
            options: [5, 10, 15, 30, 50]
          },
          // selection: 'multiple', // or 'single'
          messages: {
            noData: '<i>warning</i> No data available to show.',
            noDataAfterFiltering: '<i>warning</i> No results. Please refine your search terms.'
          },
          labels: {
            columns: '列',
            allCols: '所有列',
            rows: '行',
            selected: {
              singular: '选中一项.',
              plural: '选中多项.'
            },
            clear: '清空',
            search: '查找',
            all: '所有'
          }
        },
        table,
        columns: [
          {
            label: 'Id',
            field: 'id',
            width: '40px',
            filter: false,
            sort: true,
            type: 'number'
          },
          {
            label: 'Date',
            field: 'date',
            width: '80px',
            // (可选) Column CSS style
            style: {color: '#ff09fa'},
            // (可选) Column CSS classes
            classes: 'bg-primary',
            filter: false,
            // (可选) 这个列可以排序(Sortable)吗?
            // 注意:如果设为 true, 那么还要指定 type 属性，来告知如何排序
            sort: true,
            // 如果开启 sort 属性, type 指定排序类型
            // 可用这些值: "string", "number", "date", "boolean"
            type: 'date',
            // (可选) 为这列使用一个格式器(formatter)
            // 把这列原始数据转换为(transforms)另一种格式
            format (value, row) {
              return new Date(value).toLocaleString()
              // return (new Date()).Format('yyyy-M-d h:m:s') can't use
            }
          },
          {
            label: 'Message',
            field: 'msg',
            width: '80px',
            filter: false,
            sort: true,
            type: 'string'
          },
          {
            label: 'Action',
            field: 'action',
            width: '40px',
            filter: false,
            sort: false,
            type: 'string'
          }
        ]
      }
    },
    methods: {
      refresh (done) {
        this.timeout = setTimeout(() => {
          done()
        }, 2000)
      },
      doSomethingMethod (param) {
        alert(param)
      },
      rowClick (row) {
        console.log('clicked on a row', row)
      }
    }
  }

  var table = [
    {
      id: 1019,
      date: '2016-10-21',
      msg: 'This is message 1',
      action: ''
    },
    {
      id: 1012,
      date: '2017-10-18',
      msg: 'That was message 2',
      action: ''
    },
    {
      id: 1013,
      date: '2017-10-28',
      msg: 'Recall message 3',
      action: ''
    },
    {
      id: 1013,
      date: '2017-10-28',
      msg: 'Recall message 3',
      action: ''
    },
    {
      id: 1013,
      date: '2017-10-28',
      msg: 'Recall message 3',
      action: ''
    }
  ]

  // Date.prototype.Format = function (fmt) { // author: meizz
  //   var o = {
  //     'M+': this.getMonth() + 1, // 月份
  //     'd+': this.getDate(), // 日
  //     'h+': this.getHours(), // 小时
  //     'm+': this.getMinutes(), // 分
  //     's+': this.getSeconds(), // 秒
  //     'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
  //     'S': this.getMilliseconds() // 毫秒
  //   }
  //   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  //   for (var k in o) {
  //     if (new RegExp('(' + k + ')').test(fmt)) {
  //       fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  //     }
  //   }
  //   return fmt
  // }
</script>

<style>
</style>
