import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/AboutView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/front/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/front/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/front/CartView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/UserLogin.vue')
  },
  {
    path: '/user',
    component: () => import('../views/UserView.vue'),
    children: [
      {
        path: '/userorders',
        component: () => import('../views/user/UserOrders.vue')
      },
      {
        path: '/userprodeuts',
        component: () => import('../views/user/UserProducts.vue')
      },
      {
        path: '/voucher',
        component: () => import('../views/user/VoucherView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
