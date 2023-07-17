import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as fs from 'fs'
import * as path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(`${path.resolve(__dirname, 'src')}/assets/localhost+2-key.pem`),
      cert: fs.readFileSync(`${path.resolve(__dirname, 'src')}/assets/localhost+2.pem`),
    },
  },
  plugins: [vue(), 
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
 ],
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 给含有中文的scss文件添加 @charset:UTF-8;
        charset: false,
        // 在全局中使用 index.scss中预定义的变量
        // additionalData: '@import "./src/styles/variable.scss";@import "./src/styles/element.scss";',
      },
    },
  }
})
