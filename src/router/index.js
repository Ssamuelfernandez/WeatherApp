import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../pages/homePage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    }
  ]
})

export default router
