// import './style.css'
// document.getElementById('app').innerHTML = 'Hello webpack'

import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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

new Vue({
    el: '#app',
    router: router,
    render: (h) =>  {
        return h(App)
    }
})
