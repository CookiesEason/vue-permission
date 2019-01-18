<template>
  <div>
    <el-dialog title="添加模块" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="上级模块" :label-width="formLabelWidth">
          <el-tree :data="aclModules" node-key="id" :props="defaultProps" show-checkbox ref="treeForm" check-strictly
                   @check-change="handleClick">
              <span class="custom-tree-node" slot-scope="{ node, aclModules }">
                <span>{{ node.label }}</span>
              </span>
          </el-tree>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch :active-value=1 :inactive-value=0 v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item label="顺序" :label-width="formLabelWidth">
          <el-input v-model="form.seq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAclModules">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑模块" :visible.sync="dialogUpdateVisible">
      <el-form :model="form">
        <el-form-item label="上级模块" :label-width="formLabelWidth">
          <el-tree :data="aclModules" node-key="id" :props="defaultProps" show-checkbox ref="treeForm" check-strictly
                   @check-change="handleClick">
              <span class="custom-tree-node" slot-scope="{ node, aclModules }">
                <span>{{ node.label }}</span>
              </span>
          </el-tree>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch :active-value=1 :inactive-value=0 v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item label="顺序" :label-width="formLabelWidth">
          <el-input v-model="form.seq" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAclModules">确 定</el-button>
      </div>
    </el-dialog>
    <h1 style="width: 200px;font-size: 16px">权限模块列表
      <i class="el-icon-circle-plus-outline" @click="clearForm();dialogFormVisible = true"></i>
    </h1>
    <el-tree :data="aclModules" :props="defaultProps" node-key="id" @node-click="handleNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <i
                class="el-icon-edit"
                style="margin-left: 10px"
                @click="readAclModule(node);dialogUpdateVisible = true">
              </i>
              <i
                class="el-icon-delete"
                style="margin-left: 10px"
                @click="removeAclModule(node, data)">
              </i>
            </span>
          </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'AclModules',
  data () {
    return {
      aclModules: [],
      defaultProps: {
        children: 'aclModules',
        label: 'name'
      },
      form: {
        id: '',
        parentId: 0,
        name: '',
        seq: '',
        status: 1,
        remark: ''
      },
      dialogFormVisible: false,
      dialogUpdateVisible: false,
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.getAclModules()
  },
  methods: {
    getAclModules () {
      const _this = this
      this.axios.get('/api/sys/aclModule/tree').then((res) => {
        _this.aclModules = res.data.data
        console.log(_this.aclModules)
      }).catch((res) => {
        console.log(res)
      })
    },
    addAclModules () {
      console.log('添加')
      const _this = this
      this.axios.get('/api/sys/aclModule/save', {
        params: _this.form
      }).then((res) => {
        console.log(res)
        if (res.data.ret) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          _this.dialogFormVisible = false
          _this.getAclModules()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    updateAclModules () {
      console.log('更新')
      const _this = this
      this.axios.get('/api/sys/aclModule/update', {
        params: _this.form
      }).then((res) => {
        console.log(res)
        if (res.data.ret) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          _this.dialogUpdateVisible = false
          _this.getAclModules()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    removeAclModule (node, data) {
      // 暂时没实现
      console.log('删除AclModule的ID:' + node.data.id)
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    readAclModule (node) {
      this.dialogUpdateVisible = true
      this.$nextTick(() => {
        this.form.id = node.data.id
        this.form.parentId = node.data.parentId
        this.form.name = node.data.name
        this.form.seq = node.data.seq
        this.form.remark = node.data.remark
        this.form.status = node.data.status
        this.$refs.treeForm.setChecked(node.parent.data.id, true)
      })
    },
    handleClick (data, parent, children) {
      if (parent) {
        this.$refs.treeForm.setCheckedNodes([data])
      }
      this.form.parentId = this.getCheckedNodes()
    },
    getCheckedNodes () {
      const list = this.$refs.treeForm.getCheckedNodes()
      if (list.length > 0) {
        return list[0].id
      }
      return 0
    },
    clearForm () {
      this.form.id = ''
      this.form.parentId = 0
      this.form.name = ''
      this.form.status = ''
      this.form.seq = ''
      this.form.remark = ''
    },
    handleNodeClick (data, node) {
      this.sendData(data, node)
    },
    sendData (data, node) {
    }
  }
}
</script>

<style scoped>

</style>
