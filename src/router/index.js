import Vue from 'vue'
import Router from 'vue-router'
import userManage from '@/components/user/UserManage'
import login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'userManage',
      component: userManage
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
