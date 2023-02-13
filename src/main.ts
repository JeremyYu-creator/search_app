import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import pinia from './stores'
import piniaPersist from "pinia-plugin-persist";
const pinia = createPinia(); // 声明pinia在main.ts里调用，并添加了可持续化
pinia.use(piniaPersist);

import App from './App.vue'
import router from './router'

// import './assets/main.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
