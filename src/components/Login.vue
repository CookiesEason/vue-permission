<template>
  <div class="login-box">
    <el-row>
      <el-col :span="8" class="head">
        <span class="title">PermissionAdmin</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input id="name" v-model="form.username" placeholder="请输入帐号">
          <template slot="prepend">帐号</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input id="password" v-model="form.password" type="password" placeholder="请输入密码">
          <template slot="prepend">密码</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-button id="login" style="width:100%" @click="login" type="primary">登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        'username': '',
        'password': ''
      }
    }
  },
  methods: {
    login () {
      const _this = this
      console.log(_this.form)
      this.axios.get('/api/user/login', {
        params: _this.form
      }).then((res) => {
        console.log(res)
        if (res.data.ret) {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$router.push({path: '/user'})
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
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .login-box {
    margin-top:10%;
    margin-left:40%;
  }
  .head {
    height: 30px;
  }
  .title{
    margin: 0 auto;
    height: 30px;
    line-height: 30px;
    text-align: center;
    display: block;
    font-weight: 300;
    font-size: 30px;
  }
</style>
