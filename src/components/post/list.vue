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
        Post
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
      Title: <input type="text" v-model="title"/> <button v-if="edit_id > 0" @click="onEditOk">Edit Ok</button><br/>
      Body:<input type="text" v-model="body"/>
      <button @click="newPost">Add</button><br/>
      <button @click="clearPosts">Clear All</button>
      <button @click="downPosts(60)">Download</button>
      <button @click="uploadStart">Upload</button>
      <p>
        <input type="file" ref="inputfile"/>
        <button @click="uploadTestPost($refs.inputfile)">Upload A file post</button>
        <button @click="readFile">Read packed file</button>
      </p>

      <ul v-for="p in posts">
        <li>{{p.title}} <button @click="onEdit(p.id)">Edit</button> <button @click="delPosts([p.id])">Del</button></li>
      </ul>
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
    Loading
  } from 'quasar'
  import { mapState, mapActions } from 'vuex'
  export default {
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon
    },
    data () {
      return {
        title: 'New Title',
        body: 'New content',
        edit_id: 0
      }
    },
    computed: {
      ...mapState({
        posts: state => state.post.posts
      })
    },
    methods: {
      newPost () {
        // Important: donot use data/computed, because it should return a new object
        let p = {
          userId: 1,
          title: this.title,
          body: this.body
        }
        this.addPost(p)
        this.edit_id = 0
      },
      onEdit (id) {
        this.edit_id = id
        this.title = id
        this.posts.some((p) => {
          if (p.id === id) {
            this.title = p.title
            this.body = p.body
            return true
          }
        })
      },
      onEditOk () {
        if (this.edit_id > 0) {
          let p = {
            userId: 1,
            id: this.edit_id,
            title: this.title,
            body: this.body
          }
          this.editPost(p)
          this.edit_id = 0
        }
      },
      uploadStart () {
        if (this.posts.length) {
          let opt = {
            message: 'Uploading ' + this.posts.length + ' posts.'
          }
          Loading.show(opt)
          this.uploadPosts(this.uploadNotify)
        }
      },
      uploadNotify (num) {
        console.log(num)
        if (Loading.isActive()) {
          let opt = {
            message: 'Uploading ' + num + ' posts.'
          }
          Loading.show(opt)
        }
        if (num === 0) {
          Loading.hide()
        }
      },
      readFile () {
        var txt = ''
        var xmlhttp = new XMLHttpRequest()
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
            txt = xmlhttp.responseText
            console.log(txt)
          }
        }
        xmlhttp.open('GET', '/statics/abc.txt', true)
        xmlhttp.send()
      },
      ...mapActions([
        'addPost',
        'delPosts',
        'editPost',
        'clearPosts',
        'downPosts',
        'uploadPosts',
        'uploadTestPost'
      ])
    }
  }
</script>

<style>
</style>
