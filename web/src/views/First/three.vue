<template>
  <div>
    <el-pagination
      layout="prev, pager, next"
      :total="listTotal"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      @next-click="currentPage+1"
      @prev-click="currentPage-1"
      page-size="15">
    </el-pagination>
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
import service from '@/request'

export default {
  name: 'three',
  data () {
    return {
      songlist: [],
      play: false,
      index1: '',
      listTotal: 50,
      before: '',
      currentPage: ''
    }
  },
  mounted () {
    service({
      url: '/top/playlist'
    }).then(res => {
      this.songlist = res.data.playlists
      this.songlist.length = 15
    })
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`${val}`)
      if (val === 1) {
        service({
          url: '/top/playlist'
        }).then(res => {
          this.songlist = res.data.playlists
          this.songlist.length = 15
        })
      } else {
        // console.log(this.currentPage)
        service({
          url: '/top/playlist'
        }).then(res => {
          this.before = res.data.playlists[(this.currentPage - 1) * 14].updateTime
          // console.log(this.before)
        })
        service({
          url: `/top/playlist?before=${this.before}&limit=15`
        }).then(res => {
          this.songlist = res.data.playlists
          this.songlist.length = 15
        })
      }
    },
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
  }
}
</script>

<style scoped>
.box {
  position: relative;
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
}

.little_box span {
  color: rgb(51, 51, 51);
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
}

.play_count i {
  color: white;
}

.play_count span {
  color: white;
}

.next {
  position: relative;
  margin-left: 20px;
}

.space {
  background: pink;
  width: 100%;
  height: 70px;
  position: relative;
  top: 400px;
}
</style>
<style>
.el-pagination {
  margin-left: 370px !important;
}
</style>
