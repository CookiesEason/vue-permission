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
            <el-breadcrumb-item :to="{ path: '/aclModule' }">权限模块管理</el-breadcrumb-item>
          </el-breadcrumb>
          <br>
          <el-container style="min-height: 600px">
            <el-aside>
              <acl-modules></acl-modules>
            </el-aside>
            <el-main style="padding: 0 20px">
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
import AclModules from './components/AclModules'
export default {
  name: 'AclManage',
  components: {
    HeaderComponent,
    NavComponent,
    AclModules
  }
}
</script>

<style scoped>

</style>
