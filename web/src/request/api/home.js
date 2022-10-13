import service from '@/request'
import axios from 'axios'

// 获取歌词
export function getMusicLyric (data) {
  return axios({
    method: 'GET',
    url: `http://localhost:3000/lyric?id=${data}`
  })
}

// 搜索
export function getLogin (data) {
  return service({
    method: 'GET',
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}
