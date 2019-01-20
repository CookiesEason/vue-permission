<template>
  <el-tabs value="first" type="card">
    <el-tab-pane label="角色与权限" name="first">
      <acl-role v-bind:acls="acls" v-bind:roleId="role.id" v-bind:checkedNames="checkedNames"></acl-role>
    </el-tab-pane>
    <el-tab-pane label="角色与用户" name="second">
      <user-role v-bind:selectedUsers="selectedUsers" v-bind:unSelectedUsers="unSelectedUsers" v-bind:roleId="role.id"></user-role>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AclRole from './aclRoleUser/AclRole'
import UserRole from './aclRoleUser/UserRole'
export default {
  name: 'AclRoleUser',
  components: {
    AclRole,
    UserRole
  },
  data () {
    return {
      acls: [],
      checkedNames: [],
      selectedUsers: [],
      unSelectedUsers: [],
      values: []
    }
  },
  props: ['role'],
  methods: {
    getAcls () {
      const _this = this
      this.axios.get('/api/sys/role/roleTree', {
        params: {
          'roleId': _this.role.id
        }
      }).then((res) => {
        if (res.data.ret) {
          console.log(res.data.data)
          _this.acls = res.data.data
          _this.transferTree(_this.acls)
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    getRoleUsers () {
      const _this = this
      this.axios.get('/api/sys/role/user', {
        params: {
          'roleId': _this.role.id
        }
      }).then((res) => {
        if (res.data.ret) {
          _this.selectedUsers = res.data.data.selectedUsers
          _this.unSelectedUsers = res.data.data.unSelectedUsers
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 转换树
    transferTree (data) {
      for (let aclsKey in data) {
        if (data[aclsKey].acls != null) {
          if (data[aclsKey].acls.length > 0) {
            for (let index in data[aclsKey].acls) {
              const acl = data[aclsKey].acls[index]
              data[aclsKey].aclModules.push(acl)
              if (acl.checked) {
                this.checkedNames.push(acl.name)
              }
            }
          }
          this.transferTree(data[aclsKey].aclModules)
        }
      }
    }
  },
  watch: {
    role (data) {
      console.log(data)
      this.checkedNames = []
      this.getAcls()
      this.getRoleUsers()
    }
  }
}
</script>

<style scoped>

</style>
