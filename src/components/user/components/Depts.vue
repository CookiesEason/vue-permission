<template>
    <div>
      <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="上级部门" :label-width="formLabelWidth">
            <el-tree :data="depts" node-key="id" :props="defaultProps" show-checkbox ref="treeForm" check-strictly
                     @check-change="handleClick">
              <span class="custom-tree-node" slot-scope="{ node, depts }">
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
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
          <el-button type="primary" @click="addDept">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑部门" :visible.sync="dialogUpdateVisible">
        <el-form :model="form">
          <el-form-item label="上级部门" :label-width="formLabelWidth">
            <el-tree :data="depts" node-key="id" :props="defaultProps" show-checkbox ref="treeForm" check-strictly
                     @check-change="handleClick">
              <span class="custom-tree-node" slot-scope="{ node, depts }">
                <span>{{ node.label }}</span>
              </span>
            </el-tree>
          </el-form-item>
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
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
          <el-button type="primary" @click="updateDept">确 定</el-button>
        </div>
      </el-dialog>
      <h1 style="width: 100px;font-size: 16px">部门列表
        <i class="el-icon-circle-plus-outline" style="margin-left: 10px" @click="clearForm();dialogFormVisible = true"></i>
      </h1>
      <el-tree :data="depts" :props="defaultProps" node-key="id" @node-click="handleNodeClick">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <i
                class="el-icon-edit"
                style="margin-left: 10px"
                @click="readDept(node)">
              </i>
              <i
                class="el-icon-delete"
                style="margin-left: 10px"
                @click="removeDept(node, data)">
              </i>
            </span>
          </span>
      </el-tree>
    </div>
</template>

<script>
import bus from '../../../assets/eventBus'
export default {
  name: 'Dept',
  data () {
    return {
      depts: [],
      defaultProps: {
        children: 'depts',
        label: 'name'
      },
      form: {
        id: '',
        parentId: 0,
        name: '',
        seq: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogUpdateVisible: false,
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.getDepts()
    bus.$emit('Dept', this.depts)
  },
  methods: {
    getDepts () {
      const _this = this
      this.axios.get('/api/sys/dept/tree').then((res) => {
        if (res.data.ret) {
          _this.depts = res.data.data
          console.log(_this.depts)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    addDept () {
      console.log('添加')
      const _this = this
      this.axios.get('/api/sys/dept/save', {
        params: _this.form
      }).then((res) => {
        console.log(res)
        if (res.data.ret) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          _this.dialogFormVisible = false
          _this.getDepts()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    updateDept () {
      console.log('更新')
      const _this = this
      console.log(_this.form)
      this.axios.get('/api/sys/dept/update', {
        params: _this.form
      }).then((res) => {
        console.log(res)
        if (res.data.ret) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          _this.dialogUpdateVisible = false
          _this.getDepts()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    removeDept (node, data) {
      // 暂时没实现
      console.log('删除部门的ID:' + node.data.id)
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    readDept (node) {
      this.dialogUpdateVisible = true
      this.$nextTick(() => {
        this.form.id = node.data.id
        this.form.parentId = node.data.parentId
        this.form.name = node.data.name
        this.form.seq = node.data.seq
        this.form.remark = node.data.remark
        this.$refs.treeForm.setChecked(node.parent.data.id, true)
      })
    },
    handleClick (data, parent, children) {
      if (parent) {
        this.$refs.treeForm.setCheckedNodes([data])
      }
      this.form.parentId = this.getCheckedNodes()
      console.log(this.form.parentId)
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
      this.form.seq = ''
      this.form.remark = ''
    },
    handleNodeClick (data, node) {
      this.sendData(data, node)
    },
    sendData (data, node) {
      bus.$emit('DeptInfo', data)
      bus.$emit('DeptNode', node)
    }
  }
}
</script>

<style scoped>

</style>
