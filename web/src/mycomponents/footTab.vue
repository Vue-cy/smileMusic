<template>
  <div class="foottab">

    <audio :src="`https://music.163.com/song/media/outer/url?id=${list[index].songId}.mp3 `" ref="audio"
           preload="auto" @ended="next"></audio>

    <!--左边部分-->
    <!--    下拉之后-->
    <div style="height: 80px;overflow: hidden;width: 400px">
      <div style="display: flex;flex-direction: column;height: 200px;margin-top: -80px"
           :class="leftShow ?'allLeft':'allLeft1'">
        <div class="hideLeft" :class="{one:!leftShow}">
          <i class="iconfont icon-xiangxia1" style="font-size: 22px;margin-left: 20px;margin-top: -2px"
             @click="downDetail"
             title="收起音乐详情页"></i>
          <div class="hideRight">
            <i class="iconfont icon-aixin" @click="todo_heart" :class="isHidden ?'icon-aixin1':'icon-aixin'"
               style="font-size: 16px"></i>
            <i class="iconfont icon-tianjia"></i>
            <i class="iconfont icon-xiazai-wenjianxiazai-07"></i>
            <i class="iconfont icon-fenxiang"></i>
          </div>
        </div>
        <!--下拉之前-->
        <div>
          <div class="img_one" style="cursor: pointer" @click="getmusicDetail">
            <img :src="list[index].picUrl" class="img1">
            <i class="iconfont icon-xiangshang"></i>
          </div>
          <div class="left" style="display: flex">
            <div>
              <p class="music_name">
                {{ list[index].name }}
              </p>
              <p class="music_actor">{{ list[index].actor }}</p>
            </div>
            <i class="iconfont icon-aixin" @click="todo_heart" :class="isHidden ?'icon-aixin1':'icon-aixin'"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="listClose">
      <div class="middle">
        <div class="buttons">
          <i class="iconfont icon-category" @click="change" :class="addClass"></i>
          <i class="iconfont icon-24gl-previous" @click="goplay(-1)"></i>
          <!--        <i class="iconfont icon-bofang" @click="playSong" :class="isbtnShow ?'icon-zanting1':'icon-bofang'"></i>-->
          <i class="iconfont icon-bofang" @click="playSong" v-if="isbtnShow"></i>
          <i class="iconfont icon-zanting1" @click="playSong" v-else></i>
          <i class="iconfont icon-24gl-next" @click="goplay(1)"></i>
          <i class="iconfont icon-cibiaoquanyi"></i>
        </div>

        <!--      进度条-->
        <div class="block">
          <span class="duration_time">{{ list[index].dt | musicTime }}</span>
          <span class="current_time">{{ nowTime * 1000 |musicTime }}</span>
          <el-slider :value="(nowTime*1000)" :show-tooltip="false"
                     :max="list[index].dt"></el-slider>

        </div>
      </div>

      <!--   底部右边五个图标 -->
      <div class="right">
        <i class="iconfont icon-biaozhun"></i>
        <i class="iconfont icon-ziyuanldpi"></i>
        <i class="iconfont icon-24gl-volumeCross" @click="mute1" @mouseenter="voiceShow=true"
           @mouseleave="voiceShow=false"
           :class="voiceSize ?'icon-shengyin':'icon-24gl-volumeCross'"></i>
        <el-badge is-dot class="item"><i class="iconfont icon-renwu-tuandui"></i></el-badge>
        <i class="iconfont icon-bofangliebiao" @click="toggleListShow"></i>
      </div>
      <!--    音量-->
      <template>
        <div class="block1" v-show="voiceShow" @mouseenter="voiceShow=true" @mouseleave="voiceShow=false">
          <el-slider
            :show-tooltip="false"
            class="vx"
            v-model="value"
            vertical
            height="80px">
          </el-slider>
        </div>
      </template>
    </div>
    <!--    播放列表-->

  </div>
</template>
<script>
import { Toast } from 'vant'
import { mapMutations, mapState } from 'vuex'
import Vue from 'vue'
import moment from 'moment/moment'
// import axios from 'axios'

Vue.filter('musicTime', (time) => {
  return moment(time).format('mm:ss')
})
export default {
  data () {
    return {
      isHidden: false,
      drawer: false,
      value: 80,
      voiceShow: false,
      value3: 0,
      isShow: false,
      heart: false,
      song: '',
      percentTime: 0,
      dialog: false,
      isChange: false,
      percent: 0,
      voiceSize: true,
      i: 0
    }
  },
  updated () {
    this.$store.dispatch('getLyric', this.list[this.index].songId)
  },
  components: {},
  computed: {
    ...mapState(['isbtnShow', 'list', 'nowTime', 'ok', 'playList', 'extra', 'index', 'leftShow', 'voice', 'listShow'])
  },
  watch: {
    // id一旦改变就自动播放
    list () {
      this.deleteCurrentTime()
      this.$refs.audio.autoplay = true
      this.updatebtnShow(false)
      this.updateTime()
    },
    // 改变音量
    value () {
      if (!this.value) {
        this.voiceSize = false
      } else {
        this.voiceSize = true
      }
      const audioPlayer = this.$refs.audio
      audioPlayer.volume = this.value / 100
    },
    nowTime () {
      const x = this.index
      if (this.nowTime * 1000 >= this.list[this.index].dt) {
        if (x === this.list.length) {
          this.updateIndex(0)
        } else {
          this.updateIndex(x + 1)
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('getLyric', this.list[this.index].songId)
    document.addEventListener('keyup', (event) => {
      event.preventDefault()
      if (event.keyCode === 32) {
        if (this.$refs.audio.paused) {
          this.$refs.audio.play()
          this.updatebtnShow(false)
          this.updateTime()
        } else {
          this.$refs.audio.pause()
          this.updatebtnShow(true)
          clearInterval(this.interval)
        }
      }
    })
  },
  methods: {
    addClass () {
      switch (this.i) {
        case 0 :
          return 'icon-category'
        case 1:
          return 'icon-liebiaoxunhuan'
      }
    },
    change () {
      if (this.i === 0) {
        this.i = 1
        alert('1111')
      } else if (this.i === 1) {
        alert('2222')
        this.i = 2
      } else if (this.i === 2) {
        alert('33333')
        this.i = 3
      } else if (this.i === 3) {
        alert('44444')
        this.i = 0
      }
    },
    // 上一首、下一首
    next () {
      this.$refs.audio.onEnded(() => {
        this.updateIndex(this.index + 1)
      })
    },
    goplay (it) {
      let x = this.index + it
      if (x < 0) {
        x = this.list.length - 1
      } else if (x === this.list.length) {
        x = 0
      }
      this.updateIndex(x)
      this.updatebtnShow(false)
    },
    todo_heart () {
      if (this.isHidden === false) {
        Toast('已添加到我喜欢的音乐')
      } else {
        Toast('取消喜欢成功')
      }
      this.isHidden = !this.isHidden
    },
    playSong () {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updatebtnShow(false)
        this.updateTime()
      } else {
        this.$refs.audio.pause()
        this.updatebtnShow(true)
        clearInterval(this.interval)
      }
      // this.$refs.audio.play()
    },
    updateTime () {
      this.interval = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 100)
    },
    // 详情页上下拉
    getmusicDetail () {
      this.toggleDetail(true)
      this.updateLeftShow(true)
    },
    downDetail () {
      this.toggleDetail(false)
      this.updateLeftShow(false)
    },
    // 静音
    mute1 () {
      if (this.voiceSize) {
        this.$refs.audio.volume = 0
        this.value = 0
      } else {
        this.value = 80
        this.$refs.audio.volume = this.voice / 100
      }
      this.voiceSize = !this.voiceSize
    },
    ...mapMutations(['updatebtnShow', 'updateIndex', 'updateCurrentTime', 'deleteCurrentTime',
      'deleteList', 'toggleDetail', 'updateLeftShow', 'updateVoice', 'toggleListShow', 'closeList'])
  }
}
</script>
<style lang="scss" scoped>
.listClose {
  width: 70%;
  height: 100%;
}

.item {
  margin-top: -5px;
}

.icon-xiangshang {
  display: none;
  position: absolute;
  font-size: 35px;
  color: white;
  left: 30px;
  top: 95px;
}

.img_one:hover .img1 {
  filter: blur(2px);
}

.img_one:hover .icon-xiangshang {
  display: block;
}

.drawer {
  width: 100%;
  height: 1000px;
  background-color: pink;
}

.foottab {
  //overflow: hidden;
  z-index: 3000;
  bottom: 0;
  border-top: 1px solid rgba(169, 169, 169, 0.4);
  width: 100%;
  height: 69px;
  background-color: white;
  position: fixed;
  display: flex;
}

.img1 {
  //margin: 5px;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-top: 4px;
  margin-left: 15px;
  float: left;
}

.allLeft {
  //height: 200px;
  transition: 1s;
  transform: translateY(80px)
}

.allLeft1 {
  transition: 1s;
  transform: translateY(0)
}

.hideLeft {
  height: 80px;
  line-height: 80px;
  vertical-align: bottom;
  display: flex;

  i {
    cursor: pointer;
    font-size: 25px;
  }
}

.hideRight {
  margin-top: -5px;
  margin-left: 40px;

  i {
    vertical-align: middle;
    padding: 10px;
    margin-left: 10px;
    font-size: 16px;
    border-radius: 50%;
    border: 1px solid darkgrey;
  }
}

.left {
  padding: 8px;
  height: 100%;

  p {
    font-size: 16px;
    margin-left: 10px;
  }

  .music_name {
    margin-top: 3px;
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .music_actor {
    margin-top: 3px;
    font-size: 14px;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.icon-aixin, .icon-aixin1 {
  margin-left: 3px;
  margin-top: 2px;
  font-size: 24px;
  vertical-align: middle;
}

.middle {
  position: absolute;
  left: 465px;
  align-items: center;
}

.buttons {
  margin-left: 90px;
  margin-top: 14px;

  i {
    margin-left: 24px;
    cursor: pointer;
    font-size: 17px;
  }
}

.buttons i:not(:nth-child(3)):hover {
  color: red;
}

//中间五个图标
.buttons .icon-zanting1, .buttons .icon-bofang {
  padding: 10px;
  background-color: #e9e9ec;
  border-radius: 50px;
}

.icon-zanting1:hover, .icon-bofang:hover {
  background: #bfbfc2;
}

.block {
  position: relative;
  left: 57px;
}

.duration_time {
  color: darkgrey;
  position: relative;
  left: 320px;
  top: 8px;
}

.current_time {
  width: 20px;
  color: darkgrey;
  position: relative;
  right: 100px;
  top: 8px;
}

.right {
  position: absolute;
  right: 15px;
  margin-top: 25px;

  i {
    cursor: pointer;
    margin-left: 25px;
    font-size: 20px;
  }
}

.block1 {
  position: absolute;
  top: -100px;
  right: 132px;
}

.block1:after {
  content: '';
  width: 0;
  height: 0;
  border: 7px solid;
  border-color: white transparent transparent;
  position: absolute;
  left: 8px;
  top: 119px;
  text-shadow: 0 0 5px darkgrey;
}

.el-button--primary {
  color: black;
  background-color: white;
  border: none;
}

.icon-aixin1 {
  color: red;
}

.cc {
  background-color: red;
}
</style>

<style>
.el-drawer__container {
  height: 89% !important;
  overflow: hidden !important;
}

.van-toast .van-toast--text .van-toast--middle {
  z-index: 10000 !important;
}

.qq {
  position: absolute !important;
  right: 0 !important;
  top: 0 !important;
  width: 30% !important;
}

.van-toast--html, .van-toast--text {
  padding: 15px !important;
  font-size: 20px !important;
}

.el-button {
  padding: 0 !important;
}

.el-drawer__open .el-drawer.rtl, .el-drawer.ltr, .el-drawer.rtl {
  height: 588px !important;
  position: absolute !important;
}

.el-drawer__container {
  background: pink !important;
}

.el-drawer__wrapper {
  background: red !important;
}

.el-slider__runway {
  position: absolute !important;
  top: 17px !important;
  margin: 0 !important;
}

/*进度条拉出来的样式*/
.el-slider__bar {
  background-color: red !important;
}

/*进度头子*/
.el-slider__button-wrapper .el-tooltip {
  width: 5px !important;
  height: 5px !important;
  border: none !important;
  background-color: red !important;
}

.el-slider:hover .el-tooltip {
  width: 15px !important;
  height: 15px !important;
}

.vx .el-slider__runway {
  border: 1px solid rgba(169, 169, 169, 0.4);
  background-color: white;
  padding: 10px;
  box-shadow: 0 5px 5px grey;
}

.vx .el-slider__button {
  margin-left: 21px;
}
</style>
