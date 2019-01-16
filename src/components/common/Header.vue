<template>
  <div>
    <span style="font-size: 14px;">username</span>
    <el-dropdown>
      <i class="el-icon-arrow-down" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

</style>
