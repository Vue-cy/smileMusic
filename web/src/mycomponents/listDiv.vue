<template>
  <transition name="list">
    <div v-show="listShow" class="box">
      <div class="content">
        <div class="content_top">
          <h3>当前播放</h3>
          <div class="content_grey">
            <span style="color: grey">总{{ list.length }}首</span>
            <span style="margin-left: 175px;cursor: pointer"><i class="iconfont icon-wenjianjia"></i>收藏全部</span>
            <span style="color: #0086b3;margin-left: 20px;cursor: pointer" @click="delList">清空列表</span>
          </div>
        </div>
        <!--        抽屉的播放列表-->
        <div class="content_bottom">
          <!--          没有歌曲的时候-->
          <div class="space" v-show="list.length===0">
            <p>你还没有添加任何歌曲</p>
            <p style="margin-top: 20px">去首页 <u style="color: black;cursor:pointer">发现音乐</u></p>
          </div>

          <!--          有歌曲-->
          <div style="width: 100%;height: 300px">
            <template>
              <el-table
                empty-text=" "
                :row-class-name="rowIndex"
                @row-dblclick="music"
                :highlight-current-row="true"
                :show-header="false"
                :data="list"
                stripe
                style="width: 100%">
                <el-table-column
                  prop=""
                  width="23">
                  <i class="iconfont icon-yinpin"/>
                </el-table-column>
                <el-table-column
                  prop="name"
                  width="190">
                </el-table-column>
                <el-table-column
                  prop="actor"
                  width="80">
                </el-table-column>
                <el-table-column
                  width="40">
                  <span><i class="iconfont icon-tianjiafujian" style="cursor: pointer"></i></span>
                </el-table-column>
                <el-table-column
                  prop="dt">
                  <template slot-scope="scope">{{ scope.row.dt | musicTime }}</template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'listDiv',
  computed: {
    ...mapState(['listShow', 'list', 'index', 'isbtnShow'])
  },
  mounted () {
  },
  methods: {
    rowIndex ({
      row,
      rowIndex
    }) {
      row.index = rowIndex
      if (this.index === rowIndex) {
        if (!this.isbtnShow) {
          return 'red1'
        } else {
          return 'red'
        }
      }
      return ''
    },
    delList () {
      this.deleteList()
    },
    music (row, event, column) {
      this.deleteCurrentTime()
      const index = row.index
      this.listPlayMusic(index)
      //  变为暂停按钮
      this.updatebtnShow(false)
    },
    ...mapMutations(['deleteList', 'updateList', 'updatebtnShow', 'deleteCurrentTime', 'listPlayMusic', 'closeList'])
  }
}
</script>

<style scoped>
.icon-yinpin {
  font-size: 12px;
  display: none;
}

.box {
  box-shadow: 0 0 10px grey;
  background: white;
  z-index: 2999;
  position: fixed;
  width: 400px;
  height: calc(100% - 69px);
  right: 0;
  top: 0;
  overflow: scroll;
}

.content {
  text-indent: 20px;
}

.content_top {
  text-indent: 20px;
  border-bottom: 1px solid darkgrey;
  padding-bottom: 10px;
}

.content_top h3 {
  margin-top: 10px;
}

.content_grey {
  font-size: 14px;
  margin-top: 15px;
  color: darkgrey;
}

li {

}

.space {
  position: absolute;
  top: 250px;
  left: 120px;
  align-content: center;
  color: darkgrey;
  width: 100%;
  height: 100%;
}

.list-enter-active {
  animation: show .5s;
}

.list-leave-active {
  animation: show .5s reverse;
}

@keyframes show {
  0% {
    transform: translateX(700px)
  }
  100% {
    transform: translateX(0)
  }
}
</style>
<style>
.el-table .red,
.el-table .red1 {
  color: red !important;
}

.el-table .red1 .icon-yinpin {
  display: block !important;
}
</style>
<style>
.cell {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
</style>
