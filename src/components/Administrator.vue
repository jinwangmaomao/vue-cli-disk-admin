<template>
  <!-- 管理员界面 -->
  <div>
    <!-- 标题栏 -->
    <el-header style="text-align: right; height: 90px; line-height: 140px">
        <el-dropdown>
        <div><el-avatar :size="50">管理员</el-avatar></div>
          <el-dropdown-menu slot="dropdown" class="dropdown" style="text-align: center">
            <a @click="exit"><el-dropdown-item>退出登录</el-dropdown-item></a>
          </el-dropdown-menu>
        </el-dropdown>
    </el-header>
    <!-- 搜索框 -->
    <el-input
      placeholder="请输入内容"
      v-model="input"
      style="margin: 10px auto; width: 300px"
      clearable>
    </el-input>
    <el-button type="primary" plain icon="el-icon-search" @click="searchName"></el-button>
    <!-- 用户列表 -->
    <el-table
      :data="tableData.records"
      style="width: 100%">
      <!-- 用户头像列 -->
      <el-table-column
        label="头像"
        width="400%">
        <template slot-scope="scope">
          <el-col :span="12">
            <div class="demo-basic--circle">
              <div class="block"><el-avatar :size="50" :src="scope.row.userIcon"></el-avatar></div>
            </div>
          </el-col>
        </template>
      </el-table-column>
      <!-- 用户名称列 -->
      <el-table-column
        label="用户名"
        width="400%">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <!-- 用户操作列 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            @click="reset(scope.row.userId)">重置用户密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      :page-size="tableData.size"
      layout="prev, pager, next"
      :total="tableData.total"
      style="margin-top: 5%">
    </el-pagination>
  </div>
</template>

<script>
    export default {
      name: "Administrator",
      data() {
        return {
          tableData: [],
          input: "",
        }
      },
      methods: {
        /**
         * 搜索用户
         * @author LYJ
         * @date 2020-09-25
         * @param null
         * @return null
         */
        searchName() {
          var ken = localStorage.getItem("token")
          this.$http.get("http://47.104.249.85:8085/NetWorkDisk/register/index",{
            params: {
              Token: ken,
              Search: this.input,
            }
          }).then(result=>{
            console.log(result.data.information.records)
            this.tableData = result.data.information
          })
        },
        /**
         * 分页
         * @author LYJ
         * @date 2020-09-25
         * @param
                number: 点击后的页数
         * @return null
         */
        changePage(number) {
            var ken = localStorage.getItem("token")
            console.log(number)
            this.pagination = number
            this.$http.get("http://47.104.249.85:8085/NetWorkDisk/type/list",{
              params: {
                token: ken,
                pagination: this.pagination,
              }
            }).then(result=>{
              console.log(result.data)
              this.tableData = result.data.information
            })
        },
        /**
         * 重置密码
         * @author LYJ
         * @date 2020-09-25
         * @param
                userId: 用户的序号
         * @return null
         */
        reset(userId) {
          var ken = localStorage.getItem("token")
          console.log(userId)
          this.$http.put("http://47.104.249.85:8085/NetWorkDisk/register/reset",{
            Token: ken,
            UserId: userId
          }).then(result=>{
            console.log(result)
            let code = result.data.code
            if (code === 100) {
              this.$message.success(result.data.information);
            } else if(code === 101) {
              this.$message.error(result.data.information);
            } else if(code === 103) {
              this.$message.error(result.data.information);
            } else {
              this.$message.error(result.data.information);
            }
          })
        },
        /**
         * 退出登录
         * @author LYJ
         * @date 2020-09-25
         * @param
                null
         * @return null
         */
        exit() {
          window.location.href = "http://localhost:8080/#/"
        },
        /**
         * 将数据库中的用户信息渲染到页面上
         * @author LYJ
         * @date 2020-09-25
         * @param
                null
         * @return null
         */
        addObject() {
          console.log(localStorage.getItem("token"))
          var ken = localStorage.getItem("token")
          this.$http.get("http://47.104.249.85:8085/NetWorkDisk/register/index",{
            params: {
              Token: ken
            }
          }).then(result=>{
            console.log(result.data.information)
            this.tableData = result.data.information
          })
        }
      },
      created() {
        this.addObject();
      }
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    margin-top: -6%;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .dropdown {
    margin-top: -5%;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
