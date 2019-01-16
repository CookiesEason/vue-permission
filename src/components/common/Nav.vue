<template>
  <div>
    <el-row class="tac">
      <el-col style="width: 300px;">
        <el-menu
          background-color="#20222A"
          text-color="#fff"
          active-text-color="#009688"
          default-active="1-1"
          class="el-menu-vertical-demo">
          <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1">用户管理</el-menu-item>
            <el-menu-item index="1-2">角色管理</el-menu-item>
            <el-menu-item index="1-3">权限管理</el-menu-item>
            <el-menu-item index="1-4-1">权限更新记录</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped>

</style>
