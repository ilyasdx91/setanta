import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Category from '@/views/Category.vue'
import Game from '@/views/Game.vue'
import Settings from '@/views/Settings.vue'
import Faq from '@/views/Faq.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:id', // Динамический маршрут в корне
    name: 'Category',
    component: Category,
    props: true,
  },
  {
    path: '/:id/game',
    name: 'Game',
    component: Game,
    props: true,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    props: true,
  },
  {
    path: '/faq',
    name: 'Faq',
    component: Faq,
    props: true,
  },
]
// settings
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  //routes: [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView,
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue'),
  // },
  //],
})

export default router
