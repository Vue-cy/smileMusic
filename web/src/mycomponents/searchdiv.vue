<template>
  <div>
    <div class="searchDiv">
      <router-link to="/searchDetail/one">
        <i class="iconfont icon-sousuo" style="position: relative;left: 28px" @click="search"></i>
      </router-link>
      <input type="text" placeholder="左边" @focus="isShow=true" class="search" id="search"
             v-model="value" @input="searchHot" @keyup.enter="search">
    </div>
    <!--    <Searchdiv v-if="isShow" id="search_div" ref="show"></Searchdiv>-->

    <!--  总的框-->
    <div class="font" v-if="isShow" id="search_div">

      <!--      热搜部分-->
      <div v-show="oldShow">
        <div class="history" v-if="false">
      <span>
        搜索历史 <i class="iconfont icon-shanchu"></i>
      </span>
        </div>

        <div v-if="true">
          <p class="hot_search">热搜榜</p>
          <ul>
            <li class="hot_li" v-for="(data,index) in datalist" :key="index">
              <span class="hot_number" :class="index<3 ?'red':''">{{ index + 1 }}</span>
              <div class="hot_div">
                <p class="nono"><span class="name" :class="index<3 ?'black':''">{{ data.searchWord }}</span>
                  <span class="hot_number2">{{ data.score }}</span>
                  <i v-show="index===0" class="hot_character">HOT</i>
                </p>
                <p class="content">{{ data.content }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--输入搜索弹出-->
      <ul v-show="searchShow" class="suggestion">
        <span class="grey">
          <i class="iconfont icon-sousuo"></i>
          猜你想搜
        </span>
        <li v-for="(it,index) in actorsName.slice(0,10)" :key="index">
          <span v-html="set(it.ar[0].name,searchValue)"></span> <span v-html="set(it.name ,searchValue)"></span>
        </li>
        <span class="grey">
        <i class="iconfont icon-yinle"></i>
          单曲
        </span>
        <li v-for="(it,index) in suggestionSongsList" :key="index">
          <span v-html="set(it.name,searchValue)"></span> <span v-html="set(it.artists[0].name,searchValue)"></span>
        </li>
        <span class="grey">
          <i class="iconfont icon-geshou"></i>
          歌手
        </span>
        <li v-for="(it,index) in suggestionArtistsList" :key="index">
          <span v-html="set(it.name,searchValue)"></span>
        </li>
        <span class="grey">
          <i class="iconfont icon-zhuanji"></i>
          专辑
        </span>
        <li v-for="(it,index) in suggestionAlbumList" :key="index">
          <span v-html="set(it.name,searchValue)"></span> <span v-html="set(it.artist.name,searchValue)"></span>
        </li>
        <span class="grey">
          <i class="iconfont icon-gedan"></i>
          歌单
        </span>
        <li v-for="(it,index) in suggestionPlaylistList" :key="index">
          <span v-html="set(it.name,searchValue)"></span>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import service from '@/request'

export default {
  data () {
    return {
      value: '',
      oldShow: true,
      isShow: false,
      searchShow: false,
      datalist: [],
      suggestionArtistsList: {},
      suggestionAlbumList: [],
      suggestionSongsList: [],
      suggestionPlaylistList: [],
      actorsName: [],
      content: false
    }
  },
  watch: {},
  computed: {
    ...mapState(['searchValue', 'searchEnter', 'musicShow'])
  },
  methods: {
    set (x, y) {
      return x.replace(y, `<span style="color: rgb(80,125,175)">${this.searchValue}</span>`)
    },
    searchHot (e) {
      const x = document.getElementsByClassName('font')[0]
      if (!e.target.value) {
        x.style.width = '350px'
        this.oldShow = true
        this.searchShow = false
      } else {
        this.getSearchValue(e.target.value)
        x.style.width = '420px'
        this.oldShow = false
        this.searchShow = true
        // 搜索的几个分类
        service({
          url: `/search/suggest?keywords=${this.searchValue}`
        }).then(res => {
          this.suggestionAlbumList = res.data.result.albums
          this.suggestionArtistsList = res.data.result.artists
          this.suggestionSongsList = res.data.result.songs
          this.suggestionPlaylistList = res.data.result.playlists
        })
        service({
          url: `/search?keywords=${this.searchValue}`
        }).then(res => {
          this.actorsName = res.data.result.songs
        })
      }
    },
    search () {
      this.isShow = false
      this.$router.push('/searchDetail/one')
      this.updateSearchEnter(this.value)
    },
    ...mapMutations(['getSearchValue', 'updateSearchEnter', 'updateMusicShow'])
  },
  mounted () {
    service({
      url: '/search/hot/detail'
    }).then(res => {
      this.datalist = res.data.data
    })
    // 关闭搜索页
    document.addEventListener('click', (e) => {
      const searchDiv = document.getElementById('search_div')
      const search = document.getElementById('search')
      if (searchDiv) {
        if (!searchDiv.contains(e.target) && !search.contains(e.target)) {
          this.isShow = false
        }
      }
    })
  }
}
</script>
<style lang="scss" scoped>

.suggestion {

  span {
    margin-top: 10px;
  }

  li {
    padding: 5px 0;
    text-indent: 40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.grey {
  color: grey;
  font-size: 18px;
}

.blue_character {
  color: rgb(80, 125, 175);
}

.blue_search {
  padding: 10px;
}

.history, .hot_search {
  font-size: 20px;
  margin-top: 20px;
  color: grey;

  i {
    vertical-align: bottom;
    font-size: 25px;
  }
}

.icon-shanchu:hover {
  color: black;
}

ul {
  display: flex;
  flex-direction: column;
}

.hot_li {
  background-color: white;
  height: 55px;
  width: 100%;
}

ul :hover {
  background-color: #dedfe1;
}

.hot_div {
  color: grey;
  margin-left: 44px;

  p {
    margin-top: 5px;
  }

  .name {
    color: black;
  }

  .black {
    color: black;
    font-weight: bold;
  }

  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.hot_number2 {
  margin-left: 10px;
  color: darkgrey;
}

.hot_number {
  //background-color: pink;
  width: 50px;
  height: 55px;
  line-height: 55px;
  color: darkgrey;
  float: left;
}

.red {
  color: red;
}

.hot_character {
  color: red;
  font-weight: bold;
  margin-left: 10px;
}

.font {
  overflow: auto;
  margin-top: -15px;
  box-shadow: 0 0 10px grey;
  text-indent: 20px;
  z-index: 2030;
  left: 250px;
  top: 5.725rem;
  position: fixed;
  background-color: white;
  width: 350px;
  height: 450px;
  transition: 1s;
  border-radius: 10px;
}

.lit {
  width: 100%;
  height: 100%;
}

input::-webkit-input-placeholder {
  color: #d0c8c8;
}

.searchDiv {
  margin-left: -20px;
  height: 70px;
  line-height: 70px;
}

.search {
  padding-left: 33px;
  text-align: left;
  border: none;
  color: white;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  width: 120px;
  height: 30px;
}

.search::placeholder {
  color: darkgrey;
  font-size: 14px;
}
</style>
