export default {
  activePosts (state) {
    return state.posts.filter(function (d) {
      if (d.title.length > 1) {
        return d
      }
    })
  },
  blockedPosts (state) {
    return state.posts.filter(function (d) {
      if (d.title.length <= 1) {
        return d
      }
    })
  }
}
