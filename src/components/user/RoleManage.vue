<template>
  <el-container>
    <el-aside style="background: rgb(32, 34, 42);">
      <nav-component></nav-component>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; height: 20px">
        <header-component style="margin: 0 auto"></header-component>
      </el-header>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/role' }">维护角色与用户关系</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-container style="min-height: 600px">
          <el-aside>
            <roles v-bind:roles="roles" v-on:getRoles="getRoles" v-on:role="getRole"></roles>
          </el-aside>
          <el-main style="padding: 0 20px">
            <acl-role-user v-bind:role="role"></acl-role-user>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderComponent from '../common/Header'
import NavComponent from '../common/Nav'
import Roles from './components/Roles'
import AclRoleUser from './components/AclRoleUser'
export default {
  name: 'RoleManage',
  components: {
    HeaderComponent,
    NavComponent,
    Roles,
    AclRoleUser
  },
  data () {
    return {
      roles: [],
      role: ''
    }
  },
  mounted () {
    this.getRoles()
  },
  methods: {
    getRoles () {
      const _this = this
      this.axios.get('/api/sys/role/list', {
        params: _this.form
      }).then((res) => {
        if (res.data.ret) {
          console.log(res.data.data)
          _this.roles = res.data.data
          _this.loading = false
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    getRole (role) {
      this.role = role
    }
  }
}
</script>

<style scoped>

</style>
