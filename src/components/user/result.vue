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
        Result for PM Reading Collect
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
        :config="tableConfig"
        :columns="tableColumns"
        @refresh="refresh"
        @rowclick="rowClick"
      >
        <template slot="col-npv" slot-scope="cell">
          {{getNPVLabel(cell.data)}}
        </template>
        <template slot='col-comment' slot-scope='cell'>
          {{cell.data ? 'C' : ''}}
        </template>
      </q-data-table>
      <q-modal ref="detailModal" :content-css="{padding: '30px', minWidth: '50vw'}">
        <h5>Detail Result</h5>
        <p>No. {{pm_no}}</p>
        <p>NPV: {{npv}}</p>
        <p>Reading: {{reading}}</p>
        <q-btn color="primary" @click="$refs.detailModal.close()">Close</q-btn>
      </q-modal>
    </div>

    <!-- Footer
    <q-toolbar slot="footer">
      ...
    </q-toolbar>
    -->
    <div>
    <div class="bg-grey-3 fixed-bottom row group generic-margin" slot="footer">
      <q-input class="col" v-model="val" stack-label="Reading" inverted color="amber" type="number" :after="[{icon: 'done', handler () {}}]" />
      <!--<q-input type="number" class="col-9"  value="0"/>-->
      <!--<q-btn class="col" color="faded">Hi</q-btn>-->
    </div>
    </div>
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
    QAlert,
    QModal,
    QInput
  } from 'quasar'
  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QDataTable,
      QAlert,
      QModal,
      QInput
    },
    data () {
      return {
        tableConfig,
        tableColumns,
        table,
        pm_no: '',
        npv: '',
        reading: 0,
        comment: ''
      }
    },
    methods: {
      refresh (done) {
        this.timeout = setTimeout(() => {
          done()
        }, 2000)
      },
      rowClick (row) {
        console.log('clicked on a row', row)
        this.pm_no = row.pm_no
        this.npv = this.getNPVLabel(row.npv, false)
        this.reading = row.reading
        this.$refs.detailModal.open()
      },
      getNPVLabel (npv, short = true) {
        var label = 'N/A'
        if (npv === 1) {
          label = short ? 'N' : 'Normal'
        }
        else if (npv === 2) {
          label = short ? 'P' : 'Peak'
        }
        else if (npv === 4) {
          label = short ? 'V' : 'Valley'
        }
        return label
      }
    }
  }

  var tableConfig = {
    rowHeight: '50px',
    title: false,
    noHeader: false,
    refresh: false,
    columnPicker: false,
    leftStickyColumns: 0,
    // "minHeight", "maxHeight" or "height" are important(Me: not including header/footer)
    bodyStyle: {
      height: '350px' // if empty, the height is auto
    },
    responsive: false,
    // pagination: {
    //   rowsPerPage: 10,
    //   options: [10]
    // },
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
  }

  var tableColumns = [
    {
      label: 'PM No',
      field: 'pm_no',
      width: '60px',
      filter: false,
      sort: true,
      type: 'string'
    },
    {
      label: 'NPV',
      field: 'npv',
      width: '20px',
      filter: false,
      sort: false,
      type: 'number'
    },
    {
      label: 'Reading',
      field: 'reading',
      width: '40px',
      filter: false,
      sort: false,
      type: 'number'
    },
    {
      // 应该只显示 有/无 状态
      label: 'Comment',
      field: 'comment',
      width: '20px',
      filter: false,
      sort: false,
      type: 'string'
    }
  ]

  var table = [
    {
      pm_no: 'PM-40183513',
      npv: 1,
      reading: '12345678.01',
      comment: ''
    },
    {
      pm_no: 'PM-40183521',
      npv: 2,
      reading: '37123.3',
      comment: ''
    },
    {
      pm_no: 'PM-40183522',
      npv: 4,
      reading: '22466.9',
      comment: 'broken'
    },
    {
      pm_no: 'PM-40183523',
      npv: 1,
      reading: '12369.6',
      comment: ''
    },
    {
      pm_no: 'PM-40183525',
      npv: 1,
      reading: '60337.5',
      comment: 'newpm'
    },
    {
      pm_no: 'PM-40183535',
      npv: 4,
      reading: '48768.1',
      comment: 'unknown'
    },
    {
      pm_no: 'PM-40183536',
      npv: 1,
      reading: '57578.5',
      comment: ''
    },
    {
      pm_no: 'PM-40183537',
      npv: 1,
      reading: '32372.4',
      comment: 'newpm'
    },
    {
      pm_no: 'PM-40183536',
      npv: 1,
      reading: '57578.5',
      comment: ''
    },
    {
      pm_no: 'PM-40183536',
      npv: 1,
      reading: '57578.5',
      comment: ''
    },
    {
      pm_no: 'PM-40183536',
      npv: 1,
      reading: '57578.5',
      comment: ''
    },
    {
      pm_no: 'PM-40183536',
      npv: 1,
      reading: '57578.5',
      comment: ''
    },
    {
      pm_no: 'PM-40183536',
      npv: 1,
      reading: '57578.5',
      comment: ''
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
