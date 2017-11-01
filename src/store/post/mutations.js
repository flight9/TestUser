import * as type from './mutations_types.js'
import { stoPosts } from 'api/storage'

export default {
  [type.ADDPOST] (state, obj) {
    state.newid++
    obj.id = state.newid
    state.posts.unshift(obj)
    stoPosts.set(state)
  },
  [type.EDITPOST] (state, obj) {
    state.posts.some(function (d, index, theArray) {
      if (obj.id === d.id) {
        // Important: 这里不要 theArray[index] = obj，引用会改变，则 Vue 不能响应更新新内容
        Object.assign(theArray[index], obj)
        return true
      }
    })
    stoPosts.set(state)
  },
  [type.DELPOSTS] (state, obj) {
    if (obj instanceof Array) {
      obj.forEach(function (id) {
        state.posts.some(function (d, index, theArray) {
          if (id === d.id) {
            theArray.splice(index, 1)
            return true
          }
        })
      })
      stoPosts.set(state)
    }
  },
  [type.CLEARPOSTS] (state, obj) {
    state.posts = []
    state.newid = 0
    stoPosts.clear()
  },
  [type.DOWNPOSTS] (state, obj) {
    if (obj instanceof Array) {
      state.posts = obj
      state.newid = obj.length
      stoPosts.set(state)
    }
  }
}
