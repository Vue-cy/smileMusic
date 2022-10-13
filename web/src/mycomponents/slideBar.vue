<template>
  <div class="big">
    <div class="space"></div>
    <div class="slide">
      <ul>
        <div class="black_music">
          <router-link to="/first" custom v-slot="{navigate,isActive}">
            <li @click="navigate" :class="isActive?'cy':''">
              <span>发现音乐</span>
            </li>
          </router-link>
        </div>
        <div class="grey_music">
          <li class="grey">我的音乐</li>
          <router-link to="/seventh" custom v-slot="{navigate,isActive}">
            <li @click="navigate" :class="isActive?'cy1':''">
              <i class="iconfont icon-aixin"></i>
              <span>我喜欢的音乐</span>
              <i class="iconfont icon-huaban" style="font-size: 20px;margin-left: 20px"></i>
            </li>
          </router-link>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
// import BetterScroll from 'better-scroll'

export default {
  data () {
    return {
      height: '0'
    }
  },
  name: 'slideBar',
  mounted () {
    console.log('侧边栏' + document.getElementsByClassName('big')[0].clientWidth)
  }
}
</script>
<style scoped lang="scss">
.cy {
  font-weight: bold;
  font-size: 18px;
  background-color: #ffefb4;
}

.cy1 {
  background-color: #dedfe1;
}

.grey {
  color: grey;
  font-size: 15px;
  cursor: default;
}

.grey_music {
  font-size: 14px;
}

span {
  margin-left: 10px;
}

::-webkit-scrollbar {
  display: none;
}

.slide {
  border-right: 1.5px solid rgba(169, 169, 169, 0.2);
  height: 488px;
  position: relative;
  overflow: auto;
}

//侧边栏
li {
  border-radius: 10px;
  cursor: pointer;
  width: 174px;
  margin: 5px;
  text-indent: 10px;
  line-height: 47px;
  height: 47px;
  background-color: white;
}

.space {
  height: 70px;
  background-color: greenyellow;
  width: 100%;
}

.big {
  position: fixed;
}
</style>
