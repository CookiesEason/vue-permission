import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: false
  },
  mutations: {
    // 登录
    login (state, user) {
      this.state.user = user
    },
    // 退出
    logout (state, user) {
      this.state.user = false
    }
  }
})
