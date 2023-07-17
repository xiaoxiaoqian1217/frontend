import { createApp } from 'vue'
import io from 'socket.io-client'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 连接到信令服务
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')
