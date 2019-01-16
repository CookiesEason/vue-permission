<template>
    <div>
      <el-table
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属部门"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: 'Users'
}
</script>

<style scoped>

</style>
