<template>
  <!-- 管理员登录界面-->
  <div>
    <span style="color: #606266; font-size: 70px; font-weight: bold">INet管理员登录</span>
    <br/><br/><br/><br/>
    <div>
      <!-- 账号输入框 -->
      账号：<el-input
        placeholder="请输入账号"
        v-model="idNumber"
        style="width: 400px"
        clearable>
      </el-input>
      <br/><br/><br/>
      <!-- 密码输入框 -->
      密码：<el-input
        placeholder="请输入密码"
        v-model="password"
        style="width: 400px"
        show-password
        clearable>
      </el-input>
      <br/><br/><br/>
      <!-- 登录按钮 -->
      <el-button type="info" style="width: 100px" @click="logIn">登录</el-button>
    </div>
  </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          idNumber: 'admin',
          password: 'admin',
        }
      },
      methods: {
        /**
         * 登录用户后传给后端账号密码，并显示信息框
         * @author LYJ
         * @date 2020-09-25
         * @param null
         * @return null
         */
        logIn() {
          this.$http.post("http://47.104.249.85:8085/NetWorkDisk/register/login",{
            Account: this.idNumber,
            Cipher: this.password,
          }).then(result=>{
            console.log(result)
            let code = result.data.code
            if (code === 100) {
              this.$message.success(result.data.information.msg);
              localStorage.setItem("token",result.data.information.token);
              window.location.href = "http://localhost:8080/#/administrator"
            } else if(code === 101) {
              this.$message.error(result.data.information.msg);
            } else if(code === 103) {
              this.$message.error(result.data.information.msg);
            } else {
              this.$message.error(result.data.information.msg);
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
