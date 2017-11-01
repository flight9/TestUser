var root = 'https://jsonplaceholder.typicode.com'

import axios from 'axios'
export default {
  addPost: ({commit}, param) => commit('ADDPOST', param),
  editPost: ({commit}, param) => commit('EDITPOST', param),
  delPosts: ({commit}, array) => commit('DELPOSTS', array),
  clearPosts: ({commit}) => commit('CLEARPOSTS'),
  downPosts: ({commit}, param) => {
    axios.get(root + '/posts')
      .then((response) => {
        console.log(response.status)
        let posts = response.data.slice(0, param)
        commit('DOWNPOSTS', posts)
      })
  },
  // Create new post(NOT update)
  uploadPosts: ({commit, state, dispatch}, cbNotify) => {
    if (state.posts.length > 0) {
      let post = state.posts[0] // get first
      let data = {
        userId: post.userId,
        title: post.title,
        body: post.body
        // id: 3 # let server return new id
      }
      axios.post(root + '/posts', data)
        .then((response) => {
          console.log(response)
          commit('DELPOSTS', [post.id])
          cbNotify(state.posts.length)
          dispatch('uploadPosts', cbNotify) // 递归(recursion)
        })
        .catch((error) => {
          console.log(error)
          cbNotify(0)
        })
    }
  },
  uploadTestPost: ({commit}, param) => {
    var formData = new FormData()
    var image = new Image()
    // image won't work, especially when image produced at runtime, We have to User Cordova to get this file uploaded.
    // formData here only support the image from input control in form, eg: replace image with this.$refs.input.files[0]
    image.src = require('statics/JasonBourne5.jpg')
    formData.append('file', image)
    formData.append('name', 'hello world!')
    axios.post('http://posttestserver.com/post.php?dir=example', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function (e) {
        // let percentage = Math.round((e.loaded * 100) / e.total) || 0
        // console.log(e, percentage)
      }
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }
}
