<template>
  <div>
    <el-tree
      node-key="name"
      :data="acls"
      :props="defaultProps"
      ref="treeForm"
      show-checkbox
      default-expand-all
      @check-change="handleCheckChange">
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <span style="display: block">
          {{ node.label }}
        </span>
      </div>
    </el-tree>
    <el-button round type="primary" v-if="acls.length > 0" style="float: right" @click="update">保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'AclRole',
  props: ['acls', 'roleId', 'checkedNames', 'checkedIds'],
  data () {
    return {
      aclIds: [],
      flag: false,
      defaultProps: {
        children: 'aclModules',
        label: 'name'
      }
    }
  },
  methods: {
    handleCheckChange (data, checked, indeterminate) {
      if (checked) {
        if (data.aclModuleId) {
          this.aclIds.push(data.id)
        }
      } else {
        if (data.aclModuleId) {
          this.removeByValue(this.aclIds, data.id)
        }
      }
    },
    update () {
      console.log(this.aclIds)
      const _this = this
      this.axios.get('/api/sys/role/changeAcls', {
        params: {
          'roleId': _this.roleId,
          'aclIds': _this.aclIds.toString()
        }
      }).then((res) => {
        if (res.data.ret) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    removeByValue (arr, val) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
          arr.splice(i, 1)
          break
        }
      }
    },
    setChecked () {
      console.log('选中：', this.checkedNames)
      this.$refs.treeForm.setCheckedKeys(this.checkedNames)
    }
  },
  watch: {
    acls (data) {
      this.setChecked()
      this.aclIds = []
      if (!this.flag) {
        for (let checkedIdsKey in this.checkedIds) {
          this.aclIds.push(this.checkedIds[checkedIdsKey])
        }
      }
      this.flag = true
    }
  }
}
</script>

<style scoped>

</style>
