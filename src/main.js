import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'

import * as echarts from 'echarts';

import vconsole from 'vconsole'
import './style/common.css'
import 'vant/es/toast/style'

window.showVconsole && new vconsole()

const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.use(store).use(router).mount('#app')
