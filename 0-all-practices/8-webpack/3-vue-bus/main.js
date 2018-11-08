// import './style.css'
// document.getElementById('app').innerHTML = 'Hello webpack'

import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueBus from './vue-bus'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueBus)

// 路由配置
const Routers = [
    {
        path: '/index',
        meta: {
          title: '首页'
        },
        component: (resolve) => require(['./router/views/index.vue'], resolve)
    },
    {
        path: '/about',
        meta: {
            title: '关于'
        },
        component: (resolve) => require(['./router/views/about.vue'], resolve)
    },
    {
        path: '/user/:id',
        meta: {
            title: '个人主页'
        },
        component: (resolve) => require(['./router/views/user.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/index'
    }
]

const RouterConfig = {
    // 使用html5的History路由模式
    mode: 'history',
    routes: Routers
}

const router = new VueRouter(RouterConfig)
// 修改标题
router.beforeEach((to, from, next) => {
    // to 即将进入的路有对象
    // from 当前导航要离开的对象
    // next 调用该方法后才能进入下一个钩子
    window.document.title = to.meta.title
    next()
})

// 回到顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0)
})

// 使用localStorage来简易判断是否登录
// router.beforeEach((to, from, next) => {
//     if (window.localStorage.getItem('token')) {
//         next()
//     } else {
//         next('/login')
//     }
// })

// vuex 的配置
// 拆分可用 modules，详情请自行查询。
const store = new Vuex.Store({
    state: {
        count: 0, // 定义一个计数器，初始值为0，只能查看，不能直接修改
        list: [1, 5, 8, 10, 30, 50]
    },
    getters: {
        // 获取数组中小于10的数
        filteredList: state => {
            return state.list.filter(item => item < 10)
        },
        // getter 也可以依赖其他getter
        listCount: (state, getters) => {
            return getters.filteredList.length
        }
    },
    mutations: {
        // increment (state) {
        //     state.count++
        // },
        // increment (state, n = 1) {
        //     // state.count++
        //     state.count += n
        // },
        // 当一个参数不够用时，可以传入一个对象，无限扩展
        increment (state, params) {
            state.count += params.count
        },
        decrease (state) {
            state.count--
        }
    },
    // actions 可异步操作，actions里面提交mutations
    actions: {
        increment (context) {
            // context.commit('increment')
            context.commit({
                type: 'increment',
                count: 1
            })
        },
        // 异步操作
        asyncIncrement (context) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit({
                        type: 'increment',
                        count: 1
                    })
                    resolve()
                }, 1000)
            })
        }
    }
})

new Vue({
    el: '#app',
    router: router, // 使用router
    store: store, // 使用vuex
    render: (h) =>  {
        return h(App)
    }
})
