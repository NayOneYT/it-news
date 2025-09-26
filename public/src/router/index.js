import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from '../components/ArticleList.vue'
import ArticleDetails from '../components/ArticleDetails.vue'
import AdminModerationArticles from '../components/AdminModerationArticles.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ArticleList
    },
    {
      path: '/articles/:id',
      component: ArticleDetails,
      props: true
    },
    {
      path: '/admin/moderation',
      component: AdminModerationArticles,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      return next('/')
    }
  }
  next()
})

export default router