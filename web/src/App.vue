<template>
  <div :style="{width:width}">
    <headTab></headTab>
    <headTabOne></headTabOne>
    <slideBar></slideBar>
    <footTab></footTab>
    <listDiv></listDiv>
    <loginDetail></loginDetail>
    <login></login>
    <music-detail></music-detail>
    <router-view class="god">
    </router-view>
  </div>
</template>
<script>
import headTab from '@/mycomponents/footTab.vue'
import headTabOne from '@/mycomponents/headTabOne'
import footTab from '@/mycomponents/headTab.vue'
import listDiv from '@/mycomponents/listDiv'
import slideBar from '@/mycomponents/slideBar'
import login from '@/mycomponents/login'
import loginDetail from '@/mycomponents/loginDetail'
import musicDetail from '@/mycomponents/musicDetail'
import Vant from 'vant'
import Vue from 'vue'
import 'vant/lib/index.css'
import { mapMutations, mapState } from 'vuex'
// import 'vant/lib/index.less'

Vue.use(Vant)
export default {
  data () {
    return {
      // height: '0px',
      width: '0px'
    }
  },
  computed: {
    ...mapState(['listShow'])
  },
  mounted () {
    // this.height = document.documentElement.clientHeight
    this.width = document.documentElement.clientWidth
    document.addEventListener('click', (e) => {
      const listClose = document.querySelector('.listClose')
      const box = document.querySelector('.box')
      if (this.listShow) {
        if (!listClose.contains(e.target) && !box.contains(e.target)) {
          this.closeList(false)
        }
      }
    })
  },
  methods: {
    ...mapMutations(['closeList'])
  },
  components: {
    headTab,
    footTab,
    slideBar,
    musicDetail,
    headTabOne,
    listDiv,
    login,
    loginDetail
  }
}
</script>
<style lang="scss">
[v-clock] {
  display: none !important;
}

::-webkit-scrollbar {
  display: none;
}

.block1 {
  position: relative;
  top: -60px;
  right: 150px;
  margin-bottom: 100px;
}

.god {
  //background-color: red;
  z-index: 100;
  position: absolute;
  top: 70px;
  left: 170px;
  height: 100%;
  width: 1222px;
  //overflow: hidden;
}

.little-god {
  padding-bottom: 10px;
  z-index: 4001;
  height: 45px;
  line-height: 25px;
  width: 100%;
  //margin-top: -20px;
  margin-left: 15px;
  display: flex;
  float: left;
  position: sticky;
  top: 70px;
  background: white;

  span {
    cursor: pointer;
  }
}

li {
  list-style: none;
}

* {
  user-select: none;
  margin: 0;
  padding: 0;
}

//body, html {
//  width: 100%;
//  height: 100%;
//}
</style>
