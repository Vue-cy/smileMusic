<template>
  <div class="headTab" v-cloak>
    <!--    详情页拉起后的下拉按钮-->
    <transition name="down">
      <i class="iconfont icon-xiangxia1" @click="closeDetail" v-show="musicDetailShow"></i>
    </transition>

    <div class="left-right" style="margin-left: 280px;margin-right: 20px">
      <i class="iconfont icon-back" @click="to_back"></i>
      <i class="iconfont icon-more" @click="to_more" style="margin-left: 10px"></i>
    </div>

    <Searchdiv class="cc">
      <slot></slot>
    </Searchdiv>
    <div class="makefeng" style="margin-left: 20px">
      <i class="iconfont icon-maikefeng cy"></i>
    </div>

    <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="" class="headImg">
    <div class="img">
      <div style="cursor: pointer;font-size: 12px" @click="indexLogin"
           class="name">未登录
      </div>
      <i class="iconfont icon-xiangxia3 " @click="indexLogin"></i>
    </div>
    <div class="right">
      <i class="iconfont icon-pifu"></i>
      <i class="iconfont icon-shezhi"></i>
      <i class="iconfont icon-duanxin"></i>
      <!--      <i class="iconfont icon-fenge" style="color:grey" disabled></i>-->
      <span>|</span>
      <i class="iconfont icon-zuixiaohua1"></i>
      <i class="iconfont icon-MINIMIZE" @click="click" title="最小化" v-if="big"></i>
      <i class="iconfont icon-zuidahua" @click="click" title="最大化" v-else></i>
      <i class="iconfont icon-guanbi"></i>
    </div>

  </div>
</template>
<script>
// import axios from 'axios'
import Searchdiv from '@/mycomponents/searchdiv'
import { mapMutations } from '_vuex@2.0.0@vuex'
import { mapState } from 'vuex'
import screenfull from 'screenfull'
import { Toast } from '_vant@2.0.0@vant'
// import {ref} from 'vue'

export default {
  data () {
    return {
      big: false
    }
  },
  methods: {
    indexLogin () {
      if (localStorage.getItem('token')) {
        this.toggleLoginDetailShow()
      } else {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 200
        })
        setTimeout(() => {
          this.openLoginShow()
        }, 200)
      }
    },
    click () {
      this.big = !this.big
      if (!screenfull.isEnabled) {
        this.$message({
          message: 'ok',
          type: 'aaaa'
        })
        return false
      }
      screenfull.toggle()
    },
    change () {
      this.isFullscreen = screenfull.isFullscreen
    },
    init () {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    to_back () {
      window.history.back()
    },
    to_more () {
      window.history.forward()
    },
    closeDetail () {
      this.toggleDetail()
      this.updateLeftShow(false)
    },
    ...mapMutations(['toggleDetail', 'updateLeftShow', 'openLoginShow', 'toggleLoginDetailShow'])
  },
  mounted () {
    console.log(this.master)
    let x = document.querySelector('.headImg')
    let y = document.querySelector('.name')
    if (this.master.length === 0) {
      y.innerText = '未登录'
      x.src = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    } else {
      x.src = `${this.master.avatarUrl}`
      y.innerText = this.master.nickname
    }
    // this.init()
    // console.log(this.$store.state.name)
  },
  components: {
    Searchdiv
  },

  computed: {
    ...mapState(['musicDetailShow', 'master'])
  },
  watch: {
    master () {
      let x = document.querySelector('.headImg')
      let y = document.querySelector('.name')
      if (this.master.length === 0) {
        y.innerText = '未登录'
        x.src = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      } else {
        x.src = `${this.master.avatarUrl}`
        y.innerText = this.master.nickname
      }
    }
  }
}
</script>
<style lang="scss" scoped>
[v-clock] {
  display: none;
}

.cc {
  position: fixed;
  z-index: 2022;
  top: 0;
  left: 370px;
}

img {
  z-index: 2000;
  cursor: pointer;
  color: white;
  position: fixed;
  left: 830px;
  line-height: 70px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-top: 17px;
}

.img {
  z-index: 2000;
  color: white;
  position: fixed;
  left: 870px;
  height: 70px;
  line-height: 70px;
}

.icon-xiangxia3 {
}

.name {
  margin-left: 5px;
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-xiangxia1 {
  font-size: 25px;
  top: 8px;
  position: absolute;
  left: 60px;
  cursor: pointer;
}

.down-enter-active {
  animation: up 2s;
}

@keyframes up {
  0% {
    opacity: 0
  }
  100% {
    opacity: 1;
  }
}

.down-leave-active {
  transition: 0.1s;
}

.icon {
  text-indent: 1.55rem;
  color: white;
  height: 100%;
  float: left;
}

i {
  font-size: 30px;
  height: 70px;
  line-height: 70px;
}

.left-right, .makefeng {
  color: rgb(189, 186, 186);
  height: 70px;
  line-height: 70px;

  i {
    font-size: 22px;
    padding: 5px;
    background: rgba(100, 100, 100, 0.2);
    border-radius: 3.125rem;
  }
}

.icon-back:hover,
.icon-more:hover,
.icon-maikefeng:hover {
  color: white;
}

.left-right {
  z-index: 2022;
  position: fixed;
  top: 0;
  height: 70px;
  line-height: 70px;
  margin-left: 4rem;
}

.makefeng {
  z-index: 2022;
  position: fixed;
  top: 0;
  left: 510px;
}

.right {
  z-index: 2022;
  position: fixed;
  display: flex;
  width: 300px;
  height: 70px;
  right: 0;
  top: 0;
  vertical-align: center;

  i {
    cursor: pointer;
    color: white;
    font-size: 20px;
    flex: 1;
  }

  span {
    position: absolute;
    color: rgb(170, 171, 176);
    //flex: 1;
    font-size: 20px;
    top: 20px;
    left: 135px;

  }
}

.icon-xiangxia3 {
  position: relative;
  font-size: 0.01px;
  cursor: pointer;
  z-index: 10000;
  margin-left: 64px;
  bottom: 73px;
}

.right i:hover {
  text-shadow: 0 0 10px white;
}
</style>
<style>
.van-toast--default {
  z-index: 10000 !important;
  margin-left: 40px !important;
}
</style>
