import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import { stoPosts } from 'src/api/storage'

const state = stoPosts.get() || {
  posts: [
    // {
    //   userId: 1,
    //   id: 1,
    //   title: 'Sample 1',
    //   body: 'Content 1'
    // }
  ],
  newid: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}
