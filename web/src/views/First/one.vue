<template>
  <div class="one">
    <one-swiper>
    </one-swiper>
    <div class="next">
      <router-link to="/first/three" custom v-slot="{navigate,isActive}">
        <div class="recommend" @click="navigate" :class="isActive?'cy':''">
          推荐歌单 <i class="iconfont icon-more"></i>
        </div>
      </router-link>
    </div>

    <ul class="box">
      <li v-for="(data,index) in songlist" :key="index" class="little_box" @click="changePlaylist(data.id)">
        <img :src="data.coverImgUrl" alt="" class="song_img" @mouseenter="mouseEnter(index)" @mouseleave="mouseLeave">
        <span>{{ data.name }}</span>
        <transition name="bofang">
          <i class="iconfont icon-bofang" v-show="index===index1"></i>
        </transition>
        <span class="play_count"><i class="iconfont icon-24gl-play"></i> <span>{{ data.playCount | playCount }}</span> </span>
      </li>
    </ul>

    <div class="space"></div>
  </div>
</template>

<script>
import oneSwiper from '@/mycomponents/oneSwiper'
import Vue from 'vue'
import service from '@/request'

Vue.filter('playCount', (it) => {
  if (it < 10000) {
    return it
  } else if (it > 10000 && it < 100000000) {
    return (it / 10000).toFixed() + '万'
  } else {
    return (it / 100000000).toFixed + '亿'
  }
})

export default {
  name: 'one',
  data () {
    return {
      songlist: [],
      play: false,
      index1: ''
    }
  },
  mounted () {
    service({
      url: '/top/playlist'
    }).then(res => {
      this.songlist = res.data.playlists
      this.songlist.length = 10
    })
  },
  methods: {
    mouseEnter (index) {
      this.play = true
      this.index1 = index
    },
    mouseLeave () {
      this.play = false
      this.index1 = ''
    },
    changePlaylist (id) {
      this.$router.push({
        name: 'playlist',
        params: {
          id
        }
      })
    }
  },
  components: {
    oneSwiper
  }
}
</script>

<style scoped lang="scss">

.box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  margin-left: 10px;
  background-color: white;
  width: calc(86%);
  height: 400px;
  justify-content: space-around;
}

.little_box {
  position: relative;
  cursor: pointer;
  margin-bottom: 80px;
  width: 17%;
  height: 200px;

  span {
    color: rgb(51, 51, 51);
    //clear: both
  }

  .icon-bofang {
    position: absolute;
    z-index: 100;
    bottom: 37px;
    left: 135px;
    color: red;
    background-color: white;
    border-radius: 50px;
    font-size: 16px;
    padding: 8px;
  }

  img {
    border-radius: 5px;
    width: 100%;
    height: 180px;
  }
}

.bofang-enter-active {
  animation: one .5s;
}

.bofang-leave-active {
  animation: one .5s reverse;
}

@keyframes one {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.play_count {
  font-weight: bold;
  position: absolute;
  top: 5px;
  right: 5px;

  i {
    color: white;
  }

  span {
    color: white;
  }
}

.next {
  position: relative;
  margin-left: 20px;
}

.recommend {
  width: 128px;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
  font-size: 25px;
  color: black;

  i {
    margin-left: -5px;
    font-size: 25px;
  }
}

.recommend:hover {
  text-shadow: 0 0 10px #ece2e2;
}

.space {
  position: relative;
  height: 70px;
  background-color: pink;
  left: 0;
  bottom: -140px;
  width: 100%;
}
</style>
