import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
// 目前不必使用 vue-router
// import Router from 'vue-router'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

import { fabric } from 'fabric'

// import Vuex from 'vuex'
import App from './App'
import store from './vuex/store'
// import routes from './routes'

import { customize } from './utils/container/canvas-list/custom'

import '../common/initial.css'
 
Vue.use(Electron)
Vue.use(Resource)
// Vue.use(Router)
Vue.use(ElementUI)
// Vue.use(Vuex)
Vue.use(iView)
Vue.config.debug = true

// debug log，调试使用
window.log = console.log.bind(console)

// 序列化和反序列化
customize()

// const router = new Router({
//   scrollBehavior: () => ({ y: 0 }),
//   routes
// })
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    render: h => h(App)
})