<template>
  <div v-show="loginDetailShow" class="index">
    <div class="top">
      <div class="box">
        <p>{{ dynamic }}</p>
        <p>动态</p>
      </div>
      <div class="box">
        <p>{{ attention }}</p>
        <p>关注</p>
      </div>
      <div class="box">
        <p>{{ fans }}</p>
        <p>粉丝</p>
      </div>
    </div>
    <div class="bottom" @click="closeMore">
      <i class="iconfont icon-tuichu" style="font-size: 25px;font-weight: bold;vertical-align: bottom"></i>
      <span style="margin-left: 10px">退出登录</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'
import { Toast } from 'vant'

Toast.setDefaultOptions({ duration: 1200 })

export default {
  name: 'loginDetail',
  data () {
    return {
      dynamic: '',
      attention: '',
      fans: ''
    }
  },
  computed: {
    ...mapState(['loginDetailShow', 'master'])
  },
  mounted () {
    axios.get(`http://localhost:3000/user/follows?uid=${this.master.userId}`)
      .then(res => {
        this.attention = res.data.follow.length
      })
    axios.get(`http://localhost:3000/user/followeds?uid=${this.master.userId}`)
      .then(res => {
        this.fans = res.data.followeds.length
      })
    axios.get(`http://localhost:3000/user/event?uid=${this.master.userId}`)
      .then(res => {
        this.dynamic = res.data.events.length
      })
    //  关闭登录详情页
    document.addEventListener('click', (e) => {
      const index = document.querySelector('.index')
      if (this.loginDetailShow) {
        // if (!index.contains(e.target)) {
        //   this.closeLoginDetailShow()
        // }
      }
    })
  },
  methods: {
    closeMore () {
      this.closeLoginDetailShow()
      localStorage.clear()
      this.updateMaster('')
      this.deleteToken()
      this.$router.push('/first/one')
      window.history.go()
    },
    ...mapMutations(['closeLoginDetailShow', 'updateMaster', 'deleteToken'])
  }
}
</script>

<style scoped>
.index {
  position: absolute;
  left: 770px;
  top: 80px;
  z-index: 4000;
  width: 300px;
  height: 350px;
  background: white;
  box-shadow: 0 0 10px darkgrey;
  border-radius: 5px;
}

.top {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box p:first-child {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

.bottom {
  cursor: pointer;
  position: absolute;
  width: 100%;
  bottom: 20px;
  left: 10px;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
}

.bottom:hover {
  background: rgba(169, 169, 169, 0.2);
}
</style>
