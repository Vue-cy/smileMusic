<template>
  <div>
    <!--    播放列表-->

    <el-drawer
      :withHeader="false"
      :modal="false"
      visible.sync="{drawer}"
      :with-header="false">
      <div class="content">
        <div class="content_top">
          <h2>当前播放</h2>
          <div class="content_grey">
            <span>总0首</span>
            <span style="margin-left: 165px"><i class="iconfont icon-wenjianjia"></i>收藏全部</span>
            <span style="color: #0086b3" @click="deleteList">清空列表</span>
          </div>
        </div>
        <!--        抽屉的播放列表-->
        <div class="content_bottom">
          <!--          没有歌曲的时候-->
          <div class="space" v-show=false>
            <p>你还没有添加任何歌曲</p>
            <p style="margin-top: 20px">去首页 <u style="color: black;cursor:pointer">发现音乐</u></p>
          </div>

          <!--          有歌曲-->
          <div style="background-color: red;width: 100%;height: 300px">
            <ul>
              <li v-for="(it,index) in list" :key="index">
                {{ it.name }}
                {{ it.actor }}
                {{ it.dt |musicTime }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'musicList',
  computed: {
    ...mapState(['drawer'])
  }
}
</script>
<style lang="scss" scoped>
.content {
  text-indent: 20px;

  .content_top {
    text-indent: 20px;
    border-bottom: 1px solid darkgrey;
    padding-bottom: 10px;

    h2 {
      margin-top: 10px;
    }

    .content_grey {
      margin-top: 10px;
      color: darkgrey;
      display: flex;
    }

  }

  .content_bottom {

    .space {
      position: absolute;
      top: 250px;
      left: 120px;
      align-content: center;
      color: darkgrey;
      background-color: red;
      width: 100%;
      height: 100%;
    }

  }
}
</style>
