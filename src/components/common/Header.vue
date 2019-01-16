<template>
  <div>
    <span style="font-size: 14px;">{{username}}</span>
    <el-dropdown>
      <i class="el-icon-arrow-down" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logout()">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      'username': ''
    }
  },
  mounted () {
    this.info()
  },
  methods: {
    info () {
      const _this = this
      this.axios.get('/api/user/info').then((res) => {
        if (res.data.ret) {
          _this.username = res.data.data.username
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    logout () {
      this.axios.get('/api/user/logout').then((res) => {
        if (res.data.ret) {
          this.$message({
            message: '注销成功',
            type: 'success'
          })
          this.$router.push({path: '/login'})
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
