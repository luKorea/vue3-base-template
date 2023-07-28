import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { localCache } from '@/utils/localCache'
import { firstMenu } from '@/utils/map-menus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/front-login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 按下 后退/前进 按钮
    if (savedPosition) return savedPosition
    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

// 导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path !== '/login' && !token) {
    return '/login'
  }
  // 重定向页面
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
