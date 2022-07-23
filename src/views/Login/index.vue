<template>
  <div class="login-container">
    <div class="form-card">
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item class="btu-item">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  created () { },
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名格式不正确', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3-8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户名格式不正确', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3-8之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.loginForm.resetFields()
    },
    async login () {
      try {
        await this.$refs.loginForm.validate()
        this.$message.success('登录成功')
        try {
          const res = await login(this.loginForm)
          // 把token存到vuex中，并持久化
          this.$store.commit('login/setToken', res.data.data.token)
          this.$router.push('/home/users')
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        this.$message.error('登录表单校验失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.login-container {
  width: 100vw;
  height: 100vh;
  background-color: #2b4b6a;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-card {
    width: 450px;
    height: 220px;
    background-color: #fff;
    padding: 30px 15px;
    box-sizing: border-box;

    .btu-item {
      text-align: right;
    }
  }
}
</style>
