<template>
  <div>
    <el-dialog title="添加权限" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="所在权限模块" :label-width="formLabelWidth">
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
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="无" value="1"></el-option>
            <el-option label="菜单" value="2"></el-option>
            <el-option label="按钮" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="addAcl">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑权限" :visible.sync="dialogUpdateVisible">
      <el-form :model="form">
        <el-form-item label="所在权限模块" :label-width="formLabelWidth">
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
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="updateAcl">确 定</el-button>
      </div>
    </el-dialog>
    <h1 style="width: 100px;font-size: 16px">权限列表
      <i class="el-icon-circle-plus-outline" style="margin-left: 10px" @click="clearForm();dialogFormVisible = true"></i>
    </h1>
    <el-table
      border
      v-loading="loading"
      style="width: 100%"  :data="acls">
      <el-table-column
        prop="name"
        label="权限名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="dept"
        label="权限模块"
        width="120">
        <template slot-scope="scope">
          {{aclModule.name}}
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="100">
        <template slot-scope="scope">
        <el-tag
          type="info"
          disable-transitions>{{type[scope.row.type]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="url"
        label="URL"
        width="180">
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
        prop="seq"
        label="顺序">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button
            size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger" @click="handleDelete(scope.$index, scope.row, acls)">删除</el-button>
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
  name: 'Acls',
  data () {
    return {
      aclModule: Object,
      aclModuleNode: Object,
      acls: [],
      aclModules: [],
      defaultProps: {
        children: 'aclModules',
        label: 'name'
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      form: {
        id: '',
        aclModuleId: '',
        name: '',
        url: '',
        type: '',
        status: '',
        seq: '',
        remark: ''
      },
      loading: false,
      tag: ['失效', '正常'],
      options: [{
        value: 0,
        label: '无'
      }, {
        value: 1,
        label: '菜单'
      }, {
        value: 2,
        label: '按钮'
      }],
      type: ['无', '菜单', '按钮'],
      dialogFormVisible: false,
      dialogUpdateVisible: false,
      formLabelWidth: '120px'
    }
  },
  mounted () {
    const _this = this
    bus.$on('aclModuleNode', function (data) {
      _this.aclModuleNode = data
    })
    bus.$on('aclModuleInfo', function (data) {
      _this.aclModule = data
      _this.currentPage = 1
      _this.handleCurrentChange(1)
    })
    _this.getAclModules()
  },
  methods: {
    addAcl () {
      const _this = this
      this.axios.get('/api/sys/acl/save', {
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
    updateAcl () {
      const _this = this
      this.axios.get('/api/sys/acl/update', {
        params: _this.form
      }).then((res) => {
        if (res.data.ret) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          _this.dialogUpdateVisible = false
          _this.list(_this.form.aclModuleId, _this.currentPage)
          _this.clearForm()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    list (aclModuleId, pageNo) {
      const _this = this
      this.axios.get('/api/sys/acl/list', {
        params: {
          'aclModuleId': aclModuleId,
          'pageNo': pageNo
        }
      }).then((res) => {
        _this.total = res.data.data.total
        _this.acls = res.data.data.data
        console.log(_this.acls)
        _this.loading = false
      }).catch((res) => {
        console.log(res)
      })
    },
    getAclModules () {
      const _this = this
      this.axios.get('/api/sys/aclModule/tree').then((res) => {
        _this.aclModules = res.data.data
        console.log(_this.aclModules)
      }).catch((res) => {
        console.log(res)
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.loading = true
      this.list(this.aclModule.id, val)
    },
    handleClick (data, parent, children) {
      if (parent) {
        this.$refs.treeForm.setCheckedNodes([data])
      }
      this.form.aclModuleId = this.getCheckedNodes()
      console.log(this.form.aclModuleId)
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
        this.$refs.treeForm.setChecked(_this.aclModuleNode.data.id, true)
      })
      this.form.aclModuleId = row.aclModuleId
      this.form.id = row.id
      this.form.name = row.name
      this.form.url = row.url
      this.form.type = row.type
      this.form.seq = row.seq
      this.form.remark = row.remark
      this.form.status = row.status
      console.log(row.status)
      console.log(index, row)
    },
    handleDelete (index, row, acls) {
      console.log('删除操作暂时没实现')
      acls.splice(index, 1)
      this.total = this.total - 1
    },
    clearForm () {
      this.form.aclModuleId = ''
      this.form.id = ''
      this.form.name = ''
      this.form.url = ''
      this.form.type = ''
      this.form.seq = ''
      this.form.remark = ''
      this.form.status = ''
    }
  }
}
</script>

<style scoped>
  .block{
    text-align: center;
  }
</style>
