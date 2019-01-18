import Vue from 'vue'
import Router from 'vue-router'
import userManage from '@/components/user/UserManage'
import login from '@/components/Login'
import aclManage from '@/components/user/AclManage'
import roleManage from '@/components/user/RoleManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'userManage',
      component: userManage
    },
    {
      path: '/aclModule',
      name: 'aclManage',
      component: aclManage
    },
    {
      path: '/role',
      name: 'roleManage',
      component: roleManage
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
