<template>
  <div>
    <!--      中间两个按钮-->
    <p style="width: 100%;margin-top: 20px">
      <button class="btn1"><i class="iconfont icon-bofang"></i>播放全部<i class="iconfont icon-tianjia1"></i>
      </button>
      <button class="btn2"><i class="iconfont icon-xiazaidaoru"></i>下载全部</button>
    </p>
    <div class="listOne">
      <el-table
        :data="datalist"
        empty-text="暂无"
        ref="singleTable"
        stripe
        highlight-current-row
        @current-change="handleCurrentChange"
        @row-dblclick="music"
        :row-class-name="rowIndex"
        style="width: 100%">
        <el-table-column
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          width="120"
          prop=""
        >
          <span><i class="iconfont icon-shengyin"></i></span>
        </el-table-column>
        <el-table-column
          property=""
          label="操作"
          width="390"
          class-name="cc">
                 <span>
                             <i class="iconfont icon-aixin" @click="todo_heart"
                                :class="isShow ?'icon-aixin1':'icon-aixin'" style="font-size: 20px;z-index: 10">
                             </i><i class="iconfont icon-xiazaidaoru" style="margin-left: 10px;font-size: 20px"></i>
                           </span>
        </el-table-column>
        <el-table-column
          prop="name"
          label="音乐标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ar[0].name"
          label="歌手"
          width="180">
          <template slot-scope="{row}">{{ row.ar[0].name || '未知' }}</template>
        </el-table-column>
        <el-table-column
          prop="al.name"
          label="专辑"
          width="250">
          <template slot-scope="{row}">{{ row.al.name || '暂无' }}</template>
        </el-table-column>
        <el-table-column
          prop="dt"
          label="时长"
          min-width="100">
          <template slot-scope="scope">{{ scope.row.dt | musicTime }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import service from '@/request'
import { mapMutations, mapState } from 'vuex'
import { Toast } from 'vant'
import Vue from 'vue'
import moment from 'moment/moment'

Vue.filter('musicTime', (time) => {
  return moment(time).format('mm:ss')
})

export default {
  name: 'one',
  data () {
    return {
      datalist: [],
      isShow: false
    }
  },
  watch: {
    searchEnter () {
      service({
        url: `/search?keywords=${this.searchEnter}`
      }).then(res => {
        this.datalist = res.data.result.songs
      })
    }
  },
  mounted () {
    service({
      url: `/search?keywords=${this.searchEnter}`
    }).then(res => {
      this.datalist = res.data.result.songs
    })
  },
  computed: {
    ...mapState(['searchValue', 'list', 'index', 'searchEnter', 'musicShow'])
  },
  methods: {
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
      // console.log(index)
      this.$store.commit('playMusic', row)
      this.updateList()
      //  变为暂停按钮
      this.updatebtnShow(false)
    },
    ...mapMutations(['updateList', 'updatebtnShow', 'deleteCurrentTime', 'updateMusicShow'])
  }
}
</script>

<style scoped>
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
}

.icon-tianjia1 {
  margin-left: 20px;
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

.btn1:hover {
  background-color: #ea2020;
}

.btn2:hover {
  background-color: lightgray;
}
</style>
<style>
tr.current-row > td {
  background-color: rgb(229, 229, 229) !important;
}

/*替换索引*/
.listOne .red .el-table__cell:first-child {
  display: none !important;
}

.listOne .red .el-table__cell:nth-child(2) {
  display: block !important;
}

.listOne .el-table__cell:nth-child(2) {
  display: none;
}
</style>
