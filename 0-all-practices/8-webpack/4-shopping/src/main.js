// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Routers from './router/index'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import './assets/css/style.css'

import productData from './product.js'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

// 配置路由
const RouterConfig = {
  mode: 'history',
  routes: Routers
}

const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

const store = new Vuex.Store({
  state: {
    productList: [],
    cartList: []
  },
  getters: {
    brands: state => {
      const brands = state.productList.map(item => {
        return item.brand
      })
      return getFilterArray(brands)
    },
    colors: state => {
      const colors = state.productList.map(item => {
        return item.color
      })
      return getFilterArray(colors)
    }
  },
  mutations: {
    // 添加商品列表
    setProductList (state, data) {
      this.state.productList = data
    },
    addCart (state, id) {
      const isAdded = state.cartList.find((item) => {
        return item.id === id
      })

      if (isAdded) {
        isAdded.count++
      } else {
        state.cartList.push({
          id: id,
          count: 1
        })
      }
    },
    editCartCount (state, params) {
      const item = state.cartList.find(item => {
        return item.id === params.id
      })

      item.count += params.count
    },
    deleteCart (state, id) {
      const index = state.cartList.findIndex(item => {
        return item.id === id
      })

      state.cartList.splice(index, 1)
    },
    emptyCart (state) {
      state.cartList = []
    }
  },
  actions: {
    // 请求商品列表
    getProductList (context) {
      // 真实环境掉接口
      setTimeout(() => {
        context.commit('setProductList', productData)
      }, 500)
    },
    buy (context) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('emptyCart')
          resolve()
        }, 500)
      })
    }
  }
})

// 数组排重
function getFilterArray (array) {
  const res = []
  const json = {}
  for (let i = 0; i < array.length; i++) {
    const _self = array[i]
    if (!json[_self]) {
      res.push(_self)
      json[_self] = 1
    }
  }
  return res
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
