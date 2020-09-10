export default {
  state: {
    // 缓存页面
    keepAlivePages: ['Main'],
  },
  mutations: {
    addKeepAlivePage(state, pages) {
      let arr = pages;
      if (typeof pages === 'string') {
        arr = [pages];
      }
      state.keepAlivePages = Array.from(new Set(state.keepAlivePages.concat(arr)));
    },
    removeKeepAlivePage(state, pages) {
      let arr = pages;
      if (typeof pages === 'string') {
        arr = [pages];
      }
      state.keepAlivePages = state.keepAlivePages.filter(page => !arr.includes(page));
    },
  },
};
