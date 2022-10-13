<template>
  <div class="login" v-show="loginShow">
    <i class="iconfont icon-guanbi" @click="closeLoginShow"></i>
    <i class="iconfont icon-xiaolian"></i>
    <!--    账号密码-->
    <div class="input">
      <div>
        <i class="iconfont icon-shouji"></i>
      </div>
      <input type="text" placeholder="请输入手机号" class="input1" v-model="phone">
      <p><i class="iconfont icon-mima"></i> <input type="password" placeholder="请输入密码" class="input2"
                                                   v-model="password" @keyup.enter="Login"></p>
    </div>

    <p class="blue">
      <input type="checkbox" id="cc">
      <label for="cc">自动选择</label>
      <span style="color: #0086b3;margin-left: 50px;cursor: pointer">忘记密码</span>
      <span style="color: darkgrey;margin-left: 10px  ">丨</span>
      <span style="color: #0086b3;margin-left: 10px;cursor: pointer">验证码登录</span>
    </p>

    <button class="btn" @click="Login">登录</button>
    <u>注册</u>
    <!--四个登录-->
    <div class="icon">
      <i class="iconfont icon-icon_vx"></i>
      <i class="iconfont icon-QQ"></i>
      <i class="iconfont icon-xinlangweibo"></i>
      <i class="iconfont icon-duanxin"></i>
    </div>

    <p class="text"><input type="checkbox" id="ok" required><label for="ok">同意</label>
      <span>《服务条款》</span>
      <span>《隐私政策》</span>
      <span>《儿童隐私政策》</span>
    </p>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { Toast } from 'vant'

export default {
  name: 'login',
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['loginShow'])
  },
  methods: {
    Login: async function () {
      let res = await this.$store.dispatch('getPhone', {
        phone: this.phone,
        password: this.password
      })
      let y = document.getElementById('ok').checked
      console.log(y)
      if (y) {
        if (res.data.code === 200) {
          console.log(res.data.profile)
          // this.$store.commit('updateToken', res.data.token)
          this.updateToken(res.data.token)
          this.updateMaster(res.data.profile)
          this.closeLoginShow()
          window.history.go()
          y = false
        } else {
          Toast('账号或密码错误')
        }
      } else {
        Toast('请先勾选《服务条款》《隐私政策》《儿童隐私政策》')
      }
    },
    ...mapMutations(['closeLoginShow', 'updateMaster', 'updateToken'])
  },
  mounted () {
  }
}
</script>

<style scoped>
.login {
  z-index: 10000;
  position: fixed;
  left: 500px;
  top: 30px;
  width: 350px;
  height: 500px;
  background-color: white;
  box-shadow: 0 0 10px grey;
  border-radius: 5px;
  text-align: center;
}

.icon-guanbi {
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 15px;
}

.icon-xiaolian {
  font-size: 80px;
  color: red;
  position: absolute;
  left: calc(50% - 40px);
  top: 40px;
}

.input {
  position: absolute;
  top: 150px;
  left: 40px;
  text-align: center;
  border: 1px solid darkgrey;
  border-radius: 5px;
}

.input div {
  height: 45px;
  width: 80px;
  position: absolute;
}

.input1 {
  margin-left: 80px;
  width: 170px;
  padding: 10px;
  border: none;
  border-left: 1px solid darkgrey;
}

.input2 {
  padding: 10px 10px 10px 30px;
  width: 230px;
  text-align: left;
  border: none;
  border-top: 1px solid darkgrey;
}

.icon-shouji {
  font-size: 24px;
  position: absolute;
  left: 3px;
  top: 8px;
}

.icon-mima {
  position: absolute;
  font-size: 20px;
  margin-left: 8px;
  margin-top: 13px;
}

.blue {
  position: absolute;
  top: 265px;
  left: 40px;
  font-size: 14px;
}

.btn {
  color: white;
  font-weight: bold;
  position: absolute;
  padding: 10px 100px;
  top: 310px;
  left: calc(50% - 115px);
  background-color: red;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #d50707;
}

u {
  cursor: pointer;
  position: absolute;
  top: 360px;
  margin-left: -15px;
}

.icon {
  width: 230px;
  /*color: white;*/
  display: flex;
  position: absolute;
  left: calc(50% - 115px);
  top: 410px;
}

.icon i {
  color: white;
  font-size: 23px;
  flex: 1;
}

.icon i:before {
  cursor: pointer;
  padding: 7px;
  border-radius: 50%;
}

.icon i:first-child:before {
  background-color: #04c004;
}

.icon i:nth-child(2):before {
  background-color: dodgerblue;
}

.icon i:nth-child(3):before,
.icon i:last-child:before {
  background-color: red;
}

.text {
  font-size: 13px;
  position: absolute;
  bottom: 20px;
  left: 22px;
  color: darkgrey;
}

.text span {
  cursor: pointer;
  color: #0086b3;
}
</style>
<style>
.van-toast--text {
  z-index: 10000 !important;
  margin-left: 40px !important;
}
</style>
