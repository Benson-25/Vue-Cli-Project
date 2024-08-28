import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/frontend/HomeView.vue')
      },
      {
        path: 'products',
        component: () => import('../views/frontend/ProductsView.vue')
      },
      {
        path: 'Product/:id',
        component: () => import('../views/frontend/ProductView.vue')
      },
      {
        path: 'About',
        component: () => import('../views/frontend/AboutViews.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/frontend/ArticlesView.vue')
      },
      {
        path: 'Favorite',
        component: () => import('../views/frontend/FavoriteView.vue')
      },
      {
        path: 'checkorder',
        component: () => import('../views/frontend/CheckOrder.vue')
      },
      {
        path: 'contact',
        component: () => import('../views/frontend/ContactUs.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/frontend/CartView.vue')
      },
      {
        path: 'checkout/:id',
        component: () => import('../views/frontend/CheckOut.vue')
      },
      {
        path: 'orderfinished',
        component: () => import('../views/frontend/OrderFinished.vue')
      },
      {
        path: 'article/:id',
        component: () => import('../views/frontend/ArticleView.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    component: () => import('../views/backend/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/AdminProducts.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/backend/AdminCoupon.vue')
      },
      {
        path: 'order',
        component: () => import('../views/backend/AdminOrder.vue')
      },
      {
        path: 'articles',
        component: () => import('../views/backend/AdminArticles.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active'
})

export default router
