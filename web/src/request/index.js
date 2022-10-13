import axios from 'axios'
import { Toast } from 'vant'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000
})
// 在发请求之前拦截 -- showLoading
service.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 在成功后拦截 -- hideLoading
service.interceptors.response.use(function (response) {
  Toast.clear()

  return {
    ...response,
    aaa: 'kerwin'
  }
}, function (error) {
  Toast.clear()
  return Promise.reject(error)
})

export default service
