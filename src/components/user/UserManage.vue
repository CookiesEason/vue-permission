<template>
  <div>
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
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
          </el-breadcrumb>
          <br>
          <el-container style="min-height: 600px">
            <el-aside>
              <depts></depts>
            </el-aside>
            <el-main style="padding: 0 20px">
              <users></users>
            </el-main>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderComponent from '../common/Header'
import NavComponent from '../common/Nav'
import Depts from './components/Depts'
import Users from './components/Users'
export default {
  name: 'UserManage',
  components: {
    HeaderComponent,
    NavComponent,
    Depts,
    Users
  }
}
</script>

<style scoped>
  *{
    margin: 0;
  }
</style>
