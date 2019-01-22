<template>
  <el-container>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确认要还原该条记录吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;recover()">确 定</el-button>
      </span>
    </el-dialog>
    <el-aside style="background: rgb(32, 34, 42);">
      <nav-component></nav-component>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; height: 20px">
        <header-component style="margin: 0 auto"></header-component>
      </el-header>
      <el-main style="min-height: 600px">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/log' }">权限更新记录管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <el-container style="min-height: 600px">
          <el-main style="padding: 0 20px">
            <el-row :gutter="20">
              <el-col :span="6">
                <span>类型：</span>
                <el-select v-model="searchLogParam.type" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-input v-model="searchLogParam.operator" placeholder="请输入操作者"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input v-model="searchLogParam.beforeSeq" placeholder="请输入操作前的值"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input v-model="searchLogParam.afterSeq" placeholder="请输入操作后的值"></el-input>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px" :gutter="20">
              <el-col :span="9">
                <el-date-picker
                  v-model="searchLogParam.rangeTime"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="find">查找</el-button>
              </el-col>
            </el-row>
            <el-table
              :data="logs"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="操作前的值">
                          <vue-json-pretty :data="pretty(props.row.oldValue)">
                          </vue-json-pretty>
                        </el-form-item>
                        <el-form-item label="操作后的值">
                          <vue-json-pretty :data="pretty(props.row.newValue)">
                          </vue-json-pretty>
                        </el-form-item>
                      </el-form>
                </template>
              </el-table-column>
              <el-table-column
                label="操作者"
                prop="operator">
              </el-table-column>
              <el-table-column
                label="操作类型">
                <template slot-scope="scope">
                  <el-tag :color="tagType[scope.row.type - 1]" style="color:#fff;">{{type[scope.row.type - 1]}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="操作时间"
                prop="operateTime">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="dialogVisible = true; setId(scope.row.id)">还原</el-button>
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
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty'
import HeaderComponent from '../common/Header'
import NavComponent from '../common/Nav'
export default {
  name: 'LogManage',
  components: {
    HeaderComponent,
    NavComponent,
    VueJsonPretty
  },
  mounted () {
    this.getLogs()
  },
  data () {
    return {
      logs: [],
      searchLogParam: {
        type: '',
        operator: '',
        beforeSeq: '',
        afterSeq: '',
        rangeTime: ''
      },
      options: [{
        value: '',
        label: '所有'
      }, {
        value: '1',
        label: '部门'
      }, {
        value: '2',
        label: '用户'
      }, {
        value: '3',
        label: '权限模块'
      }, {
        value: '4',
        label: '权限'
      }, {
        value: '5',
        label: '角色'
      }, {
        value: '6',
        label: '角色与权限'
      }, {
        value: '7',
        label: '角色与用户'
      }],
      type: ['部门', '用户', '权限模块', '权限',
        '角色', '角色与权限', '角色与用户'],
      tagType: ['#67c23a', '#409eff', '#909399', '#e6a23c', '#f56c6c', '#744f46', '#000'],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      recoverId: '',
      dialogVisible: false
    }
  },
  methods: {
    getLogs () {
      const _this = this
      this.axios.get('/api/sys/log/list', {
        params: {
          'pageNo': _this.currentPage,
          'type': _this.searchLogParam.type,
          'operator': _this.searchLogParam.operator,
          'beforeSeq': _this.searchLogParam.beforeSeq,
          'afterSeq': _this.searchLogParam.afterSeq,
          'fromTime': _this.searchLogParam.rangeTime == null ? '' : _this.searchLogParam.rangeTime[0],
          'toTime': _this.searchLogParam.rangeTime == null ? '' : _this.searchLogParam.rangeTime[1]
        }
      }).then((res) => {
        if (res.data.ret) {
          console.log(res.data.data)
          _this.logs = res.data.data.data
          _this.total = res.data.data.total
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    find () {
      console.log(this.searchLogParam)
      this.getLogs()
    },
    recover () {
      const _this = this
      this.axios.get('/api/sys/log/recover', {
        params: {
          'id': _this.recoverId
        }
      }).then((res) => {
        if (res.data.ret) {
          this.$message({
            message: '还原成功',
            type: 'success'
          })
          _this.getLogs()
        } else {
          this.$message.error(res.data.msg)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getLogs()
    },
    setId (id) {
      this.recoverId = id
    },
    pretty (str) {
      if (str !== '') {
        return JSON.parse(str)
      }
      return str
    }
  }
}
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .block{
    text-align: center;
  }
</style>
