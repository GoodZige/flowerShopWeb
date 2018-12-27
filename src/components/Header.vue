<template>
  <div id="header">
    <el-dialog title="登录" :visible.sync="loginDialogVisible" width="30%" :before-close="handleLoginClose">
      <div>
        <el-input placeholder="请输入账号" v-model="login.username">
          <template slot="prepend">账号</template>
        </el-input>
      </div>
      <div style="margin-top:15px;margin-bottom:5px;">
        <el-input placeholder="请输入密码" v-model="login.password" type="password">
          <template slot="prepend">密码</template>
        </el-input>
      </div>
      <div id="forgetPassword"><a href="#">忘记密码</a></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="loginAction" ref="loginBtn" class="loginBtn">登 录</el-button>
        <el-button @click="registerDialogVisible = true;loginDialogVisible = false;" ref="registerLogin" class="registerBtn">注 册</el-button>
      </span>
    </el-dialog>

    <el-dialog title="注册" :visible.sync="registerDialogVisible" width="30%" :before-close="handleLoginClose">
      <div>
        <el-input placeholder="请输入账号" v-model="register.username">
          <template slot="prepend">账号</template>
        </el-input>
      </div>
      <div style="margin-top:15px;">
        <el-input placeholder="请输入密码" v-model="register.password" type="password">
          <template slot="prepend">密码</template>
        </el-input>
      </div>
      <div style="margin-top:15px;">
        <el-input placeholder="请输入密码" v-model="register.rePassword" type="password">
          <template slot="prepend">确认密码</template>
        </el-input>
      </div>
      <div style="margin-top:15px;">
        <el-input placeholder="请输入邮箱" v-model="register.email" type="email">
          <template slot="prepend">邮箱</template>
        </el-input>
      </div>
      <div style="margin-top:15px;">
        <el-radio-group v-model="register.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
          <el-radio label="保密">保密</el-radio>
        </el-radio-group>
      </div>
      <div style="margin-top:15px;">
        <el-input placeholder="验证码" v-model="register.check" type="text">
          <template slot="prepend">验证码</template>
          <el-button slot="append" id="sendCheckBtn" @click="sendCheck($event)" :disabled="isChecking">发送</el-button>
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="registerAction" ref="registerLogin" class="registerBtn">注 册</el-button>
      </span>
    </el-dialog>
    <div id="nav">
      <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="rgba(84,92,100, 0.6)" text-color="#fff" active-text-color="#fff">
        <img alt="" id="logo" src="../assets/logo.png">
        <span id="title">
          <font id="font1">Flower</font>
          <font id="font2">Shop</font>
        </span>
        <el-submenu class="userList" index="3" v-if="isAlive">
          <template slot="title"><img :src="faceUrl" class="face" alt="">
            <span class="username" v-text="userData.username"></span>
          </template>
          <el-menu-item index="3-1">我的订单</el-menu-item>
          <el-menu-item index="3-2">我的购物车</el-menu-item>
          <el-menu-item index="3-3">我的收货地址</el-menu-item>
          <el-menu-item index="3-4" @click="logoutAction">注销</el-menu-item>
        </el-submenu>
        <el-menu-item class="login" index="4" @click="loginDialogVisible = true" v-if="!isAlive">
          <img :src="faceUrl" class="face" alt="">
        </el-menu-item>
        <el-menu-item class="login" index="5" @click="loginDialogVisible = true" v-if="!isAlive">登录</el-menu-item>
        <el-menu-item class="login" index="6" @click="registerDialogVisible = true" v-if="!isAlive">注册</el-menu-item>
      </el-menu>
    </div>
    <div id="welcome">
      <span>Welcome to Flower Shop</span>
    </div>
  </div>

</template>
<script>
export default {
  name: 'header1',
  data () {
    return {
      nav: 'this is nav',
      activeIndex: '1',
      activeIndex2: '1',
      loginDialogVisible: false,
      registerDialogVisible: false,
      login: {
        username: '',
        password: ''
      },
      register: {
        username: '',
        password: '',
        rePassword: '',
        email: '',
        check: '',
        sex: ''
      },
      isChecking: false,
      timer: null,
      userData: null,
      isAlive: false,
      faceUrl: require('../assets/face.png')
    }
  },
  created () {
    this.axios({
      method: 'get',
      url: '/api/user'
    }).then((response) => {
      var data = response.data
      if (data.code == 1) {
        this.userData = data.data
        console.log(this.userData)
      }
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleLoginClose (done) {
      done()
    },
    sendCheck (e) {
      var that = this
      if (!this.isChecking) {
        this.isChecking = true
        let time = 60
        e.target.innerHTML = '60s'
        this.timer = setInterval(function () {
          if (time > 0) {
            time -= 1
            e.target.innerHTML = time + 's'
          } else {
            that.isChecking = false
            console.log('now is' + that.isChecking)
            e.target.disabled = 'false'
            e.target.innerHTML = '发送'
            clearInterval(that.timer)
          }
        }, 1000)
        console.log(this.timer, this.isChecking, this.timer)
        this.axios({
          method: 'get',
          url: '/api/user/code',
          params: {
            email: this.register.email,
            type: 'REGISTER'
          }
        }).then((response) => {
          var data = response.data
          if (data.code == 1) {
            this.userData = data.data
            this.$message({
              message: '发送成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: data.msg,
              type: 'warning'
            })
          }
        })
      } else {

      }
    },
    loginAction () {
      var username = this.login.username
      var password = this.login.password
      if (username == '') {
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        })
      } else if (password == '') {
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
      } else {
        this.axios({
          method: 'post',
          url: '/api/user/login',
          data: {
            username: username,
            password: password
          }
        }).then((response) => {
          var data = response.data
          this.userData = data.data
          console.log(data)
          if (data.code == 1) {
            this.$message({
              message: '登陆成功,欢迎你，' + this.userData.username,
              type: 'success'
            })
            this.loginDialogVisible = false
          } else {
            this.$message.error('账号或密码错误')
            this.login.password = ''
          }
        })
      }
    },
    logoutAction () {
      this.axios({
        method: 'get',
        url: '/api/user/logout'
      }).then((response) => {
        this.$message({
          message: '注销成功！',
          type: 'success'
        })
        this.isAlive = false
        this.faceUrl = require('../assets/face.png')
      })
    },
    registerAction () {
      var username = this.register.username
      var password = this.register.password
      var rePassword = this.register.rePassword
      var email = this.register.email
      var check = this.register.check
      var sex = this.register.sex
      var headUrls = ['https://zone-1253231183.cos.ap-shanghai.myqcloud.com/4b802b43f0f948a49154eee55b729278!400x400.jpeg',
        'https://zone-1253231183.cos.ap-shanghai.myqcloud.com/7be89258bb4d4c81a3217fb37afe82dc!400x400.jpeg',
        'https://zone-1253231183.cos.ap-shanghai.myqcloud.com/8d2978b326244863b69560f9576ce489!400x400.jpeg',
        'https://zone-1253231183.cos.ap-shanghai.myqcloud.com/c85e2fa470524780a95df5a8a3ed4c4b!400x400.jpeg',
        'https://zone-1253231183.cos.ap-shanghai.myqcloud.com/f6f0d8f9abb445858cab6c92ce6a3bdb!400x400.jpeg'
      ]
      var headUrl = headUrls[Math.floor(Math.random() * (5 - 0 + 1)) + 0]
      this.axios({
        method: 'post',
        url: '/api/user/register',
        data: {
          username: username,
          password: password,
          email: email,
          code: check,
          sex: sex,
          headUrl: headUrl
        }
      }).then((response) => {
        var data = response.data
        if (data.code == 1) {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.registerDialogVisible = false
        } else {
          this.$message({
            message: data.msg,
            type: 'warning'
          })
        }
      })
    }
  },
  watch: {
    userData: {
      handler (newVal, oldVal) {
        console.log(newVal)
        console.log('handler:' + newVal + ' ' + oldVal, this.isAlive)
        this.isAlive = true
        this.faceUrl = newVal.headUrl
      }
    }
  }
}

</script>
<style>
  #header {
    background: url("../assets/bg.jpg") no-repeat 0px -140px;
    height: 800px;
  }

  #nav {
    width: 1000px;
    margin: 0 auto;
  }

  #title {
    float: left;
    line-height: 60px;
    font-family: "RBNo2";
    font-size: 30px;
    font-weight: bold;
    margin-right: 600px;
  }

  .face{
    width: 55px;
    border-radius:50%;
  }
  #font1 {
    color: rgb(114, 207, 66);
  }

  #font1 {
    color: rgb(114, 207, 66);
  }

  #font2 {
    color: rgb(177, 216, 158);
  }

  #logo {
    height: 50px;
    margin: 5px 10px;
    float: left;
  }

  .header li {
    float: right;
  }

  #welcome {
    height: 740px;
    line-height: 740px;
    font-family: "RBNo2";
    color: #ffd04b;
    font-size: 100px;
  }
  .el-dialog__footer{
    text-align: center;
  }
  .loginBtn{
    display: block;
    width: 80%;
    margin: 0 auto;
  }
  .registerBtn{
    display: block;
    width: 80%;
    margin: 10px auto 0 auto!important;
  }
  #forgetPassword{
    text-align: right;
  }
  #forgetPassword a{
    color: #303133;
    text-decoration: none;
  }
  #forgetPassword a:hover{
    text-decoration: underline;
  }
  .el-input-group__prepend{
    width: 60px!important;
  }
  #sendCheckBtn{
    width: 70px;
  }
  .userList {
    width: 200px;
  }
  .username{
    width: 30px;
    margin: 0 30px;
  }
</style>
