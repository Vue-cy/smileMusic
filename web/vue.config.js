const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8080,
    proxy: 'http://localhost:4000'
  },
  transpileDependencies: true,
  lintOnSave: false // 关闭语法检查
})
