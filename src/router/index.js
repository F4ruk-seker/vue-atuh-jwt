import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },  {
    path: '/about',
    name: 'AboutView',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }, {
    path: '/list',
    name: 'ListView',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
