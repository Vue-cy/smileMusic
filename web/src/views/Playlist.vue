<template>
  <div>
    <div class="top">
      <img :src="detail.coverImgUrl" class="img1">
      <div class="top_right">
        <p style="height: 27px;line-height: 27px ">
          <span style="color: red;border: 1px solid red;font-size: 13px;vertical-align: middle">歌单</span>
          <span style="font-size: 24px;margin-left: 10px;font-weight: bold;vertical-align: middle">
            {{ detail.name }}</span></p>
        <p>
          <img :src="detail.creator.avatarUrl"
               style="width: 20px;height: 20px;border-radius: 50px;vertical-align: middle" class="hand">
          <span style="color: #0086b3;margin-left: 10px" class="hand">{{ detail.creator.nickname }}  </span>
          <span style="margin-left: 5px">{{ detail.createTime  | timefilter }}创建</span>
        </p>
        <!--        右半中间四个按钮-->
        <p style="margin: 10px 0;vertical-align: bottom">
          <button class="btn1"><i class="iconfont icon-bofang"></i>播放全部<i class="iconfont icon-tianjia1"></i>
          </button>
          <button class="btn2"><i class="iconfont icon-wenjianjia"></i>收藏({{ detail.subscribedCount }})</button>
          <button class="btn2"><i class="iconfont icon-fenxiang"></i>分享({{ detail.shareCount }})</button>
          <button class="btn2"><i class="iconfont icon-xiazaidaoru"></i>下载全部</button>
        </p>

        <p>标签: <span v-for="(item,index) in detail.tags" :key="index" style="color: #0086b3" class="hand">{{
            item
          }}  </span></p>
        <p><span>歌曲: {{ detail.trackCount }} </span> <span>播放:{{ detail.playCount |playCount }}</span></p>
        <p class="synopsis" :class="{hidden:show}">简介: {{ detail.description }}
        </p>
        <i class="iconfont icon-xiangxia1" @click="show=!show" :class="show?'icon-xiangxia1':'icon-xiangshang'"></i>
      </div>
    </div>

    <div class="list">
      <van-tabs v-model="active" sticky style="margin-top: 30px;margin-left: 25px">

        <van-tab title="歌曲列表">
          <el-table
            header-align="right"
            empty-text="暂无"
            ref="singleTable"
            :data="songname"
            stripe
            highlight-current-row
            @current-change="handleCurrentChange"
            @row-dblclick="music"
            :row-class-name="rowIndex"
            style="width: 100%">
            <el-table-column
              width="60"
              :index="getIndex"
              type="index"
            >
            </el-table-column>
            <el-table-column
              width="120"
              prop=""
            >
              <span><i class="iconfont icon-shengyin"></i></span>
            </el-table-column>
            <el-table-column
              label="操作"
              property=""
              width="390"
              class-name="cc">
                 <span>
                             <i class="iconfont icon-aixin" @click="todo_heart"
                                :class="isShow ?'icon-aixin1':'icon-aixin'" style="font-size: 20px;z-index: 10">
                             </i><i class="iconfont icon-xiazaidaoru" style="margin-left: 10px;font-size: 20px"></i>
                           </span>
            </el-table-column>
            <el-table-column
              property="name"
              label="标题"
              width="180"
              class-name="text1"
              style="color: black">
            </el-table-column>
            <el-table-column
              property="ar[0].name"
              label="歌手"
              width="180">
              <template slot-scope="{row}">{{ row.ar[0].name || '未知' }}</template>
            </el-table-column>
            <el-table-column
              property="alia[0]"
              label="专辑"
              width="250"
              class-name="text">
              <template slot-scope="{row}">{{ row.alia[0] || '暂无' }}</template>
            </el-table-column>
            <el-table-column
              property="dt"
              label="时间"
              min-width="100">
              <template slot-scope="scope">{{ scope.row.dt | musicTime }}</template>
            </el-table-column>
          </el-table>
        </van-tab>
        <van-tab>
          <template #title>评论({{ detail.commentCount }})</template>
          <input type="text" class="inputOne" autofocus>
          <div class="inputIcon">
            <i class="iconfont icon-xiaolian"></i>
            <span>@</span>
            <span>#</span>
          </div>
          <a href="" class="inputA">评论</a>
          <p style="margin-left: 30px">精彩评论</p>
          <ul class="comment">
            <li v-for="(data,index) in man" :key="index" style="padding: 20px;border-bottom: 1px solid darkgrey">
              <img :src="data.user.avatarUrl" alt="">
              <div class="content">
                <p><span style="color:#0086b3">{{ data.user.nickname }}：</span> {{ data.content }}</p>
                <p style="color: darkgrey;margin-top: 10px">{{ data.timeStr |timefilter }} {{
                    data.time | hourTime
                  }}</p>
              </div>
              <p class="right"><i class="iconfont icon-dianzan"></i> {{ data.likedCount }}
                <span>丨</span>
                <i class="iconfont icon-fenxiang"></i>
                <span>丨</span>
                <i class="iconfont icon-jianyi"></i>
              </p>
            </li>
          </ul>
        </van-tab>

        <van-tab title="收藏者">
          <div class="name">
            <li v-for="(data,index) in people" :key="index">
              <img :src="data.avatarUrl" alt="">
              <div>{{ data.nickname }}</div>
            </li>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="space"></div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Vue from 'vue'
import { Toast } from '_vant@2.12.2@vant'
import { mapMutations, mapState } from 'vuex'
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
Vue.filter('hourTime', (time) => {
  return moment(time).format('h:mm')
})
Vue.filter('musicTime', (time) => {
  return moment(time).format('mm:ss')
})

Vue.filter('album', (item) => {
  if (item === undefined) {
    item = '暂无'
  }
  return item
})
Vue.filter('indexfilter', (index) => {
  if (index < 10) {
    index = '0' + index
  }
  return index
})
Vue.filter('timefilter', (date) => {
  return moment(date).format('YYYY年MM月DD日')
})

export default {
  name: 'playlist',
  data () {
    return {
      isShow: false,
      detail: null,
      songs: [],
      songname: [],
      man: [],
      people: [],
      current: 0,
      show: true,
      name: '',
      idList: ''
    }
  },
  computed: {
    ...mapState(['isbtnShow', 'playList', 'list', 'index'])
  },
  methods: {
    getIndex (index) {
      if (index < 9) {
        return '0' + (index + 1)
      } else {
        return index + 1
      }
    },
    handleCurrentChange () {
    },
    rowIndex ({
      row,
      rowIndex
    }) {
      row.index = rowIndex
      if (this.list[this.index].songId === row.id) {
        return 'red'
      }
    },
    todo_heart () {
      if (this.isShow === false) {
        Toast('已添加到我喜欢的音乐')
      } else {
        Toast('取消喜欢成功')
      }
      this.isShow = !this.isShow
    },
    music (row, event, column) {
      this.deleteCurrentTime()
      //  变为暂停按钮
      this.updatebtnShow(false)
      this.$store.commit('playMusic', row)
      this.updateList()
    },
    ...mapMutations(['updatebtnShow', 'deleteCurrentTime', 'updateList', 'deletePlayList'])
  },
  mounted () {
    service({
      url: `/playlist/detail?id=${this.$route.params.id}`
    }).then(res => {
      // console.log(res.data)
      this.songname = res.data.playlist.tracks
      this.songs = res.data
      this.detail = res.data.playlist
      this.idList = res.data.playlist.trackIds.map(item => {
        return Number(item.id)
      })
    })
    service({
      url: `/comment/playlist?id=${this.$route.params.id}`
    }).then(res => {
      console.log(res.data.hotComments)
      this.man = res.data.hotComments
    })
    service({
      url: `/playlist/subscribers?id=${this.$route.params.id}`
    }).then(res => {
      console.log(res.data.subscribers)
      this.people = res.data.subscribers
    })
  }
}
</script>

<style scoped lang="scss">
.hand {
  cursor: pointer;
}

.icon-aixin1 {
  color: red;
}

.little-god {
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  width: 100%;
  margin-top: 20px;
  margin-left: 27px;
  display: flex;
  float: left;
  position: sticky;
}

.cy {
  border-bottom: 5px solid red;
}

.top {
  margin-top: 20px;
  margin-left: 45px;
  overflow: hidden;

  //上边右半部分
  .top_right {
    margin-left: 230px;
    margin-top: -10px;

    p {
      margin: 10px 0;
      font-size: 14px;
    }

    .btn2 {
      cursor: pointer;
      margin-left: 25px;
      background-color: white;
      border: 0.5px solid darkgrey;
      border-radius: 40px;
      font-size: 14px;
      height: 35px;
      line-height: 35px;
      padding: 0 10px;
    }

    .btn1 {
      cursor: pointer;
      color: white;
      background-color: red;
      border-radius: 40px;
      line-height: 35px;
      width: 145px;
      height: 35px;
      border: none;
      font-size: 15px;

      .icon-tianjia1 {
        margin-left: 20px;
      }
    }
  }

  .btn1:hover {
    background-color: #ea2020;
  }

  .btn2:hover {
    background-color: lightgray;
  }

  .img1 {
    width: 190px;
    height: 187px;
    border-radius: 10px;
    float: left;
  }

  .synopsis {
    width: 600px;
  }
}

.hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-xiangxia1, .icon-xiangshang {
  font-size: 22px;
  font-weight: bold;
  position: absolute;
  right: 140px;
  top: 190px;
}

.space {
  width: 100%;
  height: 80px;
  position: relative;
  bottom: 0;
}

.song {
  color: darkgrey;
  width: 100%;
  height: 30px;
}

.song:hover {
  background-color: rgba(208, 200, 200, 0.4);
}

.yes {
  background-color: pink;

  td:nth-child(2) {
    color: red;
  }
}

tr:nth-child(even) {
  background-color: rgba(208, 200, 200, 0.1);
}

td:nth-child(1) {
  padding-left: 60px;
}

.comment {
  width: 1000px;
  font-size: 14px;
  margin-left: 30px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    float: left;
  }
}

.inputOne {
  margin-top: 30px;
  text-align: left;
  padding-left: 5px;
  padding-bottom: 80px;
  margin-left: 30px;
  width: 1000px;
  border-radius: 5px;
  border: 2px solid darkgrey;
}

.inputIcon {
  margin-left: 30px;
  font-size: 25px;
  color: darkgrey;
}

.icon-xiaolian {
  cursor: pointer;
  font-size: 23px;
}

.inputIcon span {
  cursor: pointer;
  margin-left: 10px;
}

.inputA {
  z-index: 2000;
  position: relative;
  left: 980px;
  bottom: 20px;
  padding: 5px 10px;
  border: 1px solid darkgrey;
  color: darkgrey;
  border-radius: 20px;
}

.inputA:hover {
  background: rgba(169, 169, 169, 0.2);
}

.content {
  margin-left: 70px;
}

.right {
  position: absolute;
  left: 860px;
  font-size: 17px;
  color: grey;
  margin-top: -20px;
}

.right span {
  color: rgba(169, 169, 169, 0.4);
}

.right i {
  font-size: 18px;
  cursor: pointer;
}

.name {
  margin-left: 30px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.name img {
  width: 140px;
  height: 140px;
  border-radius: 50%;
}

.name li {
  width: 40%;
  display: flex;
  margin-top: 20px;
}

.name div {
  display: flex;
  margin-left: 20px;
  align-items: center;
}
</style>
<style>
.list table {
  margin-top: 10px !important;
}

th {
  font-weight: normal;
  padding: 3px !important;
}

td {
  padding: 7px !important;
}

tr.current-row > td {
  background-color: rgb(229, 229, 229) !important;
}

.cell {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}

/*替换索引*/
.list .red .el-table__cell:first-child {
  display: none !important;
}

.list .red .el-table__cell:nth-child(2) {
  display: block !important;
}

.list .el-table__cell:nth-child(2) {
  display: none;
}

/*调整表头偏移  */
.list .el-table th.el-table__cell > .cell {
  padding-left: 13px !important;
}

.van-tab__text--ellipsis {
  height: 22px;
}

.van-tabs__nav--line {
  margin-left: 20px;
  width: 300px !important;
}

.van-tab--active {
  font-weight: bold;
  font-size: 22px !important;
}

div .van-tab {
  font-size: 20px;
  padding: 0 !important;
}

/*!*歌名变色*!*/
/*.el-table__row :nth-child(3) {*/
/*  color: black !important;*/
/*}*/
</style>
