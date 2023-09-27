import { createRouter, createWebHistory } from 'vue-router'

const routers = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect:{name:'Dashboard'},
      component: () => import('../components/Layout.vue'),
      children:[
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: 'overview',
          name: 'Overview',
          component: () => import('../views/Overview.vue')
        },
      ]
    },
  ]
})

export default routers