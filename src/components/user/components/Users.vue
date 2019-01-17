<template>
    <div>
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="所在部门" :label-width="formLabelWidth">
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
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.mail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.telephone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-form-item>
              <el-switch on-text="有效" off-text="失效" v-model="form.status"></el-switch>
            </el-form-item>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑用户" :visible.sync="dialogUpdateVisible">
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
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.mail" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.telephone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-form-item>
              <el-switch on-text="有效" off-text="失效" v-model="form.status"></el-switch>
            </el-form-item>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUser">确 定</el-button>
        </div>
      </el-dialog>
      <h1 style="width: 100px;font-size: 16px">用户列表
        <i class="el-icon-circle-plus-outline" style="margin-left: 10px" @click="getDepts();dialogFormVisible = true"></i>
      </h1>
      <el-table
        border
        v-loading="loading"
        style="width: 100%"  :data="users">
        <el-table-column
          prop="username"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="dept"
          label="所属部门"
          width="120">
          <template slot-scope="scope">
            {{dept.name}}
          </template>
        </el-table-column>
        <el-table-column
          prop="mail"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系方式">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status ? 'success' : 'danger'"
              disable-transitions>{{tag[scope.row.status]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger" @click="handleDelete(scope.$index, scope.row, users)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          :currentPage = currentPage
          @current-change="handleCurrentChange"
          :page-size=pageSize
          layout="total, prev, pager, next"
          :total=total>
        </el-pagination>
      </div>
    </div>
</template>

<script>
import bus from '../../../assets/eventBus'
export default {
  name: 'Users',
  data () {
    return {
      dept: Object,
      deptNode: Object,
      depts: [],
      defaultProps: {
        children: 'depts',
        label: 'name'
      },
      form: {
        deptId: '',
        id: '',
        name: '',
        telephone: '',
        mail: '',
        status: '',
        remark: ''
      },
      users: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tag: ['失效', '正常'],
      loading: false,
      dialogFormVisible: false,
      dialogUpdateVisible: false,
      formLabelWidth: '120px'
    }
  },
  mounted () {
    const _this = this
    bus.$on('DeptNode', function (data) {
      _this.deptNode = data
    })
    bus.$on('DeptInfo', function (data) {
      _this.loading = true
      _this.dept = data
      _this.currentPage = 1
      _this.handleCurrentChange(1)
    })
    this.getDepts()
  },
  methods: {
    list (deptId, pageNo) {
      const _this = this
      this.axios.get('/api/sys/user/list', {
        params: {
          'deptId': deptId,
          'pageNo': pageNo
        }
      }).then((res) => {
        _this.total = res.data.data.total
        _this.users = res.data.data.data
        _this.loading = false
      }).catch((res) => {
        console.log(res)
      })
    },
    getDepts () {
      const _this = this
      this.axios.get('/api/sys/dept/tree').then((res) => {
        _this.depts = res.data.data
        console.log(_this.depts)
      }).catch((res) => {
        console.log(res)
      })
    },
    addUser () {
      const _this = this
      if (_this.form.status) {
        _this.form.status = 1
      } else {
        _this.form.status = 0
      }
      this.axios.get('/api/sys/user/save', {
        params: _this.form
      }).then((res) => {
        if (res.data.ret) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          _this.dialogFormVisible = false
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    updateUser () {
      const _this = this
      if (_this.form.status) {
        _this.form.status = 1
      } else {
        _this.form.status = 0
      }
      this.axios.get('/api/sys/user/update', {
        params: _this.form
      }).then((res) => {
        if (res.data.ret) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          if (_this.form.status) {
            _this.form.status = true
          } else {
            _this.form.status = false
          }
          _this.dialogUpdateVisible = false
          _this.list(_this.form.deptId, _this.currentPage)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.loading = true
      this.list(this.dept.id, val)
    },
    handleClick (data, parent, children) {
      if (parent) {
        this.$refs.treeForm.setCheckedNodes([data])
      }
      this.form.deptId = this.getCheckedNodes()
      console.log(this.form.deptId)
    },
    getCheckedNodes () {
      const list = this.$refs.treeForm.getCheckedNodes()
      if (list.length > 0) {
        return list[0].id
      }
      return 0
    },
    handleEdit (index, row) {
      this.dialogUpdateVisible = true
      const _this = this
      this.$nextTick(() => {
        this.$refs.treeForm.setChecked(_this.deptNode.data.id, true)
      })
      this.form.deptId = row.deptId
      this.form.id = row.id
      this.form.name = row.username
      this.form.telephone = row.telephone
      this.form.mail = row.mail
      this.form.remark = row.remark
      if (row.status) {
        this.form.status = true
      } else {
        this.form.status = false
      }
      console.log(index, row)
    },
    handleDelete (index, row, users) {
      console.log('删除操作暂时没实现')
      users.splice(index, 1)
      this.total = this.total - 1
    }
  }
}
</script>

<style scoped>
  .block{
    text-align: center;
  }
</style>
