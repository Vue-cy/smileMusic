import Vue from 'vue'
import Vuex from 'vuex'
import { getLogin, getMusicLyric } from '@/request/api/home'
// import list from '@/playlist/list'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        master: state.master,
        token: state.token
      }
    }
  })],
  state: {
    list: [{
      songId: 29816860,
      picUrl: 'https://p3.music.126.net/OX7OzqN8IFfvUBNIYQkokg==/109951163460407776.jpg',
      name: 'brave heart',
      dt: 252000, // 总时间
      actor: '宮崎歩'
    }],
    extra: {},
    playList: {
      songId: 29816860,
      picUrl: 'https://p3.music.126.net/OX7OzqN8IFfvUBNIYQkokg==/109951163460407776.jpg',
      name: 'brave heart',
      dt: 252000, // 总时间
      actor: '宮崎歩'
    },
    // 当前时间
    nowTime: 0,
    number: 'one',
    count: 11,
    isbtnShow: true, // 播放，暂停按钮
    ok: false,
    musicDetailShow: false,
    lyricList: {},
    index: 0,
    leftShow: false, // 底部下拉图片的变换,
    drawer: false,
    voice: '', // 音量
    searchList: [],
    searchValue: '',
    searchEnter: '', // 回车获得的搜索值
    listShow: false, // 歌曲列表
    loginShow: false,
    loginDetailShow: false,
    musicShow: false,
    master: [],
    token: '',
    loveId: ''
  },
  mutations: {
    updatebtnShow (state, value) {
      state.isbtnShow = value
    },
    // 传歌曲的信息
    playMusic (state, value) {
      state.ok = !state.ok
      state.playList.songId = value.id
      state.playList.picUrl = value.al.picUrl
      state.playList.dt = value.dt
      state.playList.actor = value.ar[0].name
      state.playList.name = value.name
    },
    listPlayMusic (state, value) {
      state.index = value
    },
    updateCurrentTime (state, value) {
      state.nowTime = value
    },
    deleteCurrentTime (state) {
      state.nowTime = 0
    },
    deleteList (state) {
      state.list = []
    },
    updateList (state) {
      state.list.unshift(state.playList)
      state.extra = state.playList
      state.playList = {}
      // console.log(state.list)
    },
    toggleDetail (state, value) {
      state.musicDetailShow = value
    },
    getLyric (state, it) {
      state.lyricList = it
    },
    updateIndex (state, value) {
      state.index = value
    },
    updateLeftShow (state, it) {
      state.leftShow = it
    },
    updateVoice (state, it) {
      state.voice = it
    },
    getSearchList (state, it) {
      state.searchList = it
    },
    getSearchValue (state, value) {
      state.searchValue = value
    },
    toggleListShow (state) {
      state.listShow = !state.listShow
    },
    closeList (state, value) {
      state.listShow = value
    },
    updateSearchEnter (state, value) {
      state.searchEnter = value
    },
    openLoginShow (state) {
      state.loginShow = true
    },
    closeLoginShow (state) {
      state.loginShow = false
    },
    toggleLoginDetailShow (state) {
      state.loginDetailShow = !state.loginDetailShow
    },
    closeLoginDetailShow (state) {
      state.loginDetailShow = false
    },
    updateMusicShow (state, value) {
      state.musicShow = value
    },
    updateMaster (state, it) {
      state.master = it
    },
    updateToken (state, it) {
      state.token = it
      localStorage.setItem('token', state.token)
    },
    deleteToken (state, it) {
      state.token = ''
    },
    updateLoveId (state, it) {
      state.loveId = it
    }
  },
  actions: {
    getLyric: async function (context, value) {
      const res = await getMusicLyric(value)
      context.commit('getLyric', res.data.lrc)
    },
    getPhone: async function (context, value) {
      const res = await getLogin(value)
      return res
    }

  },
  modules: {}
})
