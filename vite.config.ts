import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8888,
    open: false, //自动打开 
    // base: "./ ", //生产环境路径
    proxy: { //配置接口的请求地址
      // '/api': {
      //   // 以 “/api” 开头的 代理到 下边的 target 属性 的值 中
      //   target: 'https://randomuser.me',
      //   changeOrigin: true, // 是否改变域名：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      //   ws: true, // 是否启用websockets
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
      '/api': {
        target: 'http://124.223.35.229/api',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // /chat/completions
    }
  }
})
