<template>
  <div>
    <el-transfer :data="unSelected" v-model="values" :titles="titles"></el-transfer>
    <el-button round type="primary" style="float: right" @click="change">保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'UserRole',
  props: ['selectedUsers', 'unSelectedUsers', 'roleId'],
  data () {
    return {
      unSelected: [],
      values: [],
      titles: ['选择用户', '选中用户']
    }
  },
  methods: {
    generateData () {
      for (let i = 0; i < this.unSelectedUsers.length; i++) {
        this.unSelected.push({
          key: this.unSelectedUsers[i].id,
          label: this.unSelectedUsers[i].username
        })
      }
      for (let i = 0; i < this.selectedUsers.length; i++) {
        this.unSelected.push({
          key: this.selectedUsers[i].id,
          label: this.selectedUsers[i].username
        })
        this.values.push(this.selectedUsers[i].id)
      }
    },
    change () {
      const _this = this
      this.axios.get('/api/sys/role/changeUsers', {
        params: {
          'roleId': _this.roleId,
          'userIds': _this.values.toString()
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
    }
  },
  watch: {
    selectedUsers (data) {
      this.unSelected = []
      this.values = []
      this.generateData()
    }
  }
}
</script>

<style scoped>

</style>
