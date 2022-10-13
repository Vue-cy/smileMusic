<template>
  <div class="box">
    <div class="top">
      <p style="font-size: 20px;font-weight: bold">搜索 {{ searchEnter }}</p>
      <p style="color: darkgrey;margin-top: 10px;font-size: 14px">你可能感兴趣</p>
      <!--      感兴趣的-->
      <div class="littleBox">
        该内容api未找到，敬请期待
      </div>
      <!--      选择单曲还是歌手-->
      <div class="select">
        <router-link to="/searchDetail/one" custom v-slot="{navigate,isActive}">
          <li @click="navigate" :class="isActive ?'cc':''">
            <span>单曲</span>
          </li>
        </router-link>
        <router-link to="/searchDetail/two" custom v-slot="{navigate,isActive}">
          <li @click="navigate" :class="isActive ?'cc':''">
            <span>歌手</span>
          </li>
        </router-link>
        <router-link to="/searchDetail/three" custom v-slot="{navigate,isActive}">
          <li @click="navigate" :class="isActive ?'cc':''">
            <span>专辑</span>
          </li>
        </router-link>
        <router-link to="/searchDetail/four" custom v-slot="{navigate,isActive}">
          <li @click="navigate" :class="isActive ?'cc':''">
            <span>视频</span>
          </li>
        </router-link>
        <router-link to="/searchDetail/three" custom v-slot="{navigate,isActive}">
          <li @click="navigate" :class="isActive ?'cc':''">
            <span>歌单</span>
          </li>
        </router-link>
        <router-link to="/searchDetail/three" custom v-slot="{navigate,isActive}">
          <li @click="navigate" :class="isActive ?'cc':''">
            <span>歌词</span>
          </li>
        </router-link>
        <router-link to="/searchDetail/three" custom v-slot="{navigate,isActive}">
          <li @click="navigate" :class="isActive ?'cc':''">
            <span>播客</span>
          </li>
        </router-link>
        <router-link to="/searchDetail/three" custom v-slot="{navigate,isActive}">
          <li @click="navigate" :class="isActive ?'cc':''">
            <span>声音</span>
          </li>
        </router-link>
        <router-link to="/searchDetail/three" custom v-slot="{navigate,isActive}">
          <li @click="navigate" :class="isActive ?'cc':''">
            <span>用户</span>
          </li>
        </router-link>
      </div>
    </div>
    <router-view class="section"></router-view>
    <div class="space"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SearchDetail',
  data () {
    return {}
  },
  computed: {
    ...mapState(['searchList', 'searchValue', 'searchEnter'])
  },
  created () {
    // this.$store.dispatch('getSearchValue', this.searchValue)
  },
  mounted () {
  }
}
</script>

<style scoped>

.box {
  margin-top: 20px;
  margin-left: 50px;
  width: 80%;
}

span {
  cursor: pointer;
}

.littleBox {
  margin-top: 10px;
  width: 100%;
  height: 80px;
  background-color: aqua;
}

.select {
  width: 800px;
  margin-top: 20px;
  display: flex;
  z-index: 4001;
  height: 25px;
  line-height: 25px;
  float: left;
  top: 70px;
  padding-bottom: 5px;
}

.select li {
  flex: 1;
}

.select span {
  padding-bottom: 5px;
}

.cc span {
  font-weight: bold;
  font-size: 20px;
  border-bottom: 2px solid red;
}

.section {
  width: 100%;
  position: absolute;
  margin-top: 50px;
}

.space {
  width: 100%;
  height: 69px;
  background-color: red;
  position: fixed;
  bottom: 0;
}
</style>
