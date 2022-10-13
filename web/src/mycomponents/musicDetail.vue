<template>
  <transition name="detail">
    <div class="musicDetail" v-show="musicDetailShow" v-cloak>
      <!--    左边音乐图片-->
      <img :src="list[index].picUrl" alt="" class="songPhoto" :class="{pp:isbtnShow}">
      <img src="../img/cd.png" alt="" class="cd">
      <img src="../img/needle-ab.png" alt="" class="needle" :class="isbtnShow ?'move1':'move2'">

      <div>

        <div class="font">
          <p style="font-size: 30px">{{ list[index].name }}</p>
          <p style="color: darkgrey;font-size: 15px">{{ list[index].actor }}-{{ list[index].name }}</p>
        </div>
        <div class="lyric" ref="music">
          <p v-for="(item,index) in lyric" :Key="index"
             :class="{active:((nowTime *1000>=item.time && nowTime *1000<item.pre )||item.pre===0)}">
            {{ item.lyr }}
          </p>
        </div>
      </div>

      <div class="space"></div>

    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
// import axios from 'axios'

export default {
  name: 'musicDetail',
  data () {
    return {}
  },
  watch: {
    nowTime: function () {
      const p = document.querySelector('p.active')
      if (p && p.offsetTop > 130) {
        this.$refs.music.scrollTop = p.offsetTop - 130
      }
    }
  },
  mounted () {
    const colorThief = new ColorThief()
    const img = document.querySelector('.songPhoto')
    const box = document.querySelector('.musicDetail')
    const getColorImg = () => {
      const color = colorThief.getColor(img)
      box.style.backgroundColor = `rgba(${color[0]},${color[1]},${color[2]},.8)`
      console.log(color)
    }

    // Make sure image is finished loading
    if (img.complete) {
      getColorImg()
    } else {
      img.addEventListener('load', function () {
        getColorImg()
      })
    }
  },
  methods: {},
  computed: {
    ...mapState(['extra', 'musicDetailShow', 'isbtnShow', 'lyricList', 'ok', 'nowTime', 'list', 'index']),
    lyric: function () {
      let arr
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          const min = item.slice(1, 3)
          const sec = item.slice(4, 6)
          let mill = item.slice(7, 10)
          let lyr = item.slice(11, item.length)
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          // console.log(min, sec, minl, lyr)
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9)
            lyr = item.slice(10, item.length)
            time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          }
          return {
            min,
            sec,
            mill,
            lyr,
            time
          }
        })
        arr.forEach((item, i) => {
          if (i === arr.length - 1) {
            item.pre = 0
          } else {
            item.pre = arr[i + 1].time
          }
        })
      }
      return arr
    }
  }
}
</script>

<style scoped>
.lyric {
  position: absolute;
  width: 400px;
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-left: 480px;
  margin-top: 150px;
  overflow: auto;
}

.font {
  width: 400px;
  height: 100px;
  margin-left: 480px;
  margin-top: 50px;
  position: absolute;
  margin-bottom: 30px;
  text-align: center;
}

.lyric p {
  margin-bottom: 12px;
}

.lyric p:first-child {
  margin-top: 100px;
}

.lyric p:last-child {
  margin-bottom: 300px;
}

.active {
  color: black;
  font-weight: bold;
  font-size: 20px;
}

.detail-enter-active {
  animation: show 0.5s
}

.detail-leave-active {
  animation: show .5s reverse;
}

@keyframes show {
  0% {
    transform: translateY(1000px)
  }
  100% {
    transform: translateY(0)
  }
}

.musicDetail {
  width: 100%;
  height: 89%;
  z-index: 2020;
  background-image: linear-gradient(to bottom, papayawhip, white 50%);
  position: fixed;
}

.top {
  height: 90px;
  width: 100%;
}

.cd {
  position: absolute;
  width: 260px;
  height: 260px;
  top: 150px;
  left: 130px;
}

.needle {
  position: absolute;
  left: 250px;
  top: 80px;
  width: 80px;
  height: 120px;
}

.move1 {
  position: absolute;
  transform-origin: 0 0;
  transform: rotate(-30deg);
  transition: 2s;
}

.move2 {
  position: absolute;
  transform-origin: 0 0;
  transform: rotate(0);
  transition: 2s;
}

.songPhoto {
  z-index: -1;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  position: absolute;
  top: 143px;
  left: 125px;
  border: 55px solid rgba(169, 169, 169, 0.4);
  animation: rotate 28s linear infinite;
}

.pp {
  animation-play-state: paused;
}

@keyframes rotate {
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }

}

.left-right, .icon-maikefeng {
  color: rgb(189, 186, 186);
  height: 5px;
}

.left-right, .icon-maikefeng i {
  background-color: rgb(218, 60, 60);
  /*border-radius: 3.125rem;*/
}

.icon-back:hover,
.icon-more:hover {
  color: white;
}

.icon-maikefeng:hover {
  color: white;
}

.left-right {
  height: 60px;
  line-height: 60px;
  margin-left: 4rem;
  width: 200px;
}

.right {
  position: absolute;
  display: flex;
  width: 300px;
  height: 100%;
  right: 0;
  vertical-align: center;
}

.right i {
  cursor: pointer;
  color: white;
  font-size: 24px;
  flex: 1;
}

.right span {
  position: absolute;
  color: rgb(170, 171, 176);
  font-size: 20px;
  top: 29px;
  left: 135px;
}

.right i:hover {
  text-shadow: 0 0 10px white;
}

.space {
  width: 100%;
  height: 69px;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
