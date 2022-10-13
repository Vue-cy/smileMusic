<template>
  <div>
    <ul style="margin-top: 30px">
      <li v-for="(data,index) in datalist" :Key="index">
        <video :src="data.coverUrl" controls></video>
      </li>
    </ul>
  </div>
</template>
<script>
import service from '@/request'

export default {
  name: 'four',
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    service({
      url: `/search?keywords=${this.searchValue}&type=1014`
    }).then(res => {
      console.log(res.data.result)
      this.datalist = res.data.result.videos
    })
  }
}
</script>

<style scoped>

</style>
