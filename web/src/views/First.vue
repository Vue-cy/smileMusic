<template>
  <div>
    <div class="little-god">
      <router-link to="/first/one" custom v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive?'cy':''" style="margin-left: 37px">
          <span>个性推荐</span>
        </li>
      </router-link>
      <router-link to="/first/three" custom v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive?'cy':''">
          <span>歌单</span>
        </li>
      </router-link>
      <router-link to="/first/four" custom v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive?'cy':''">
          <span>排行榜</span>
        </li>
      </router-link>
      <router-link to="/first/five" custom v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive?'cy':''">
          <span>歌手</span>
        </li>
      </router-link>
      <router-link to="/first/six" custom v-slot="{navigate,isActive}">
        <li @click="navigate" :class="isActive?'cy':''">
          <span>最新音乐</span>
        </li>
      </router-link>
    </div>
    <router-view class="section"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'first',
  data () {
    return {
      active: 1
    }
  },
  compoter: {
    ...mapState(['number'])
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.section {
  margin: 35px 37px 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 40px;
}

li {
  opacity: 0.8;
  margin: 10px;
}

li:hover {
  opacity: 1;
}

.cy {
  font-weight: bold;
  font-size: 19px;

  span {
    padding-bottom: 5px;
    border-bottom: 5px solid red;
  }
}

</style>
