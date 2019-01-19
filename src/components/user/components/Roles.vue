<template>
  <div>
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch :active-value=1 :inactive-value=0 v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑角色" :visible.sync="dialogUpdateVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch :active-value=1 :inactive-value=0 v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRole">确 定</el-button>
      </div>
    </el-dialog>
    <h1 style="width: 160px;font-size: 16px">角色列表
      <i class="el-icon-circle-plus-outline" @click="clearForm ();dialogFormVisible = true"></i>
    </h1>
    <el-table
      ref="singleTable"
      v-loading="loading"
      highlight-current-row
      @current-change="handleCurrentChange"
      :data="roles"
      style="width: 242px;">
      <el-table-column
        prop="name"
        label="角色"
        width="140">
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" circle
                     @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" circle
                     @click="handleDelete(scope.$index, scope.row, roles)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Roles',
  data () {
    return {
      form: {
        id: '',
        name: '',
        remark: '',
        status: 1
      },
      dialogFormVisible: false,
      dialogUpdateVisible: false,
      formLabelWidth: '50px'
    }
  },
  props: ['roles', 'loading'],
  methods: {
    handleCurrentChange (val) {
      // 点击角色
      this.$emit('role', val)
    },
    addRole () {
      const _this = this
      this.axios.get('/api/sys/role/save', {
        params: _this.form
      }).then((res) => {
        if (res.data.ret) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          _this.dialogFormVisible = false
          this.$emit('getRoles', true)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    updateRole () {
      const _this = this
      this.axios.get('/api/sys/role/update', {
        params: _this.form
      }).then((res) => {
        if (res.data.ret) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          _this.dialogUpdateVisible = false
          this.$emit('getRoles', true)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    handleEdit (index, row) {
      this.dialogUpdateVisible = true
      this.form.id = row.id
      this.form.name = row.name
      this.form.remark = row.remark
      this.form.status = row.status
    },
    handleDelete (index, row, roles) {
      console.log('删除操作暂时没实现')
      this.roles.splice(index, 1)
      this.total = this.total - 1
    },
    clearForm () {
      this.form.id = ''
      this.form.name = ''
      this.form.remark = ''
      this.form.status = 1
    }
  }
}
</script>

<style scoped>

</style>
