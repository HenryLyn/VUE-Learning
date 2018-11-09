// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//
// Vue.use(Router)
//
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

const routers = [
  {
    path: '/list',
    meta: {
      title: '商品列表'
    },
    component: (resolve) => require(['@/views/list.vue'], resolve)
  },
  {
    path: '/product/:id',
    meta: {
      title: '商品详情'
    },
    component: resolve => require(['@/views/ProductDetail.vue'], resolve)
  },
  {
    path: '/cart',
    meta: {
      title: '购物车'
    },
    component: (resolve) => require(['@/views/Cart.vue'], resolve)
  },
  {
    path: '*',
    redirect: '/list'
  }
]

export default routers
