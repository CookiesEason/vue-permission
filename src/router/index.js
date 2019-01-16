import Vue from 'vue'
import Router from 'vue-router'
import userManage from '@/components/user/UserManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'userManage',
      component: userManage
    }
  ]
})
