import Vue from 'vue';
import Vuex from 'vuex';
import keepAlive from './modules/keep-alive';

Vue.use(Vuex);
const VueInstance = new Vue();

// 获取储存在本地的用户信息
const localUser = JSON.parse(localStorage.getItem('user')) || {};
// 获取储存在本地的搜索历史
const localSearchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

const store = new Vuex.Store({
  modules: {
    keepAlive,
  },
  state: {
    // 底部菜单栏当前值
    bottomNavIndex: 1,
    // 用户信息
    user: { ...localUser },
    // 搜索历史
    searchHistory: [...localSearchHistory],
  },
  mutations: {
    setBottomNavIndex(state, idx) {
      state.bottomNavIndex = idx;
    },
    setUser(state, obj) {
      state.user = { ...state.user, ...obj };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    clearUser(state, force) {
      const { user: { refresh, cuid } } = state;
      if (force) {
        state.user = { cuid };
      } else {
        state.user = { refresh, cuid };
      }
      localStorage.setItem('user', JSON.stringify(state.user));
      console.log(`clear user ${force ? 'force' : ''}`);
    },
    setSearchHistory(state, str) {
      const idx = state.searchHistory.indexOf(str);
      if (idx > -1) {
        state.searchHistory.splice(idx, 1);
      }
      state.searchHistory.unshift(str);
      localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory));
    },
    clearSearchHistory(state) {
      state.searchHistory = [];
      localStorage.setItem('searchHistory', JSON.stringify(state.searchHistory));
    },
  },
  actions: {
    updateUserByToken({ commit }) {
      return VueInstance.$http('get', VueInstance.$APIURL.info, { showErrTips: false }).then(({
        data: {
          luckyValue,
          totalLucky,
          balance,
          headurl,
          nick,
          phone,
          refresh,
        },
      }) => commit('setUser', {
        luckyValue,
        totalLucky,
        balance,
        headurl,
        nick,
        phone,
        refresh,
      })).catch(() => { });
    },
  },
});

export default store;
