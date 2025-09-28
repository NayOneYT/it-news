import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from '../components/ArticleList.vue'
import ArticleDetails from '../components/ArticleDetails.vue'
import AdminPanel from '../components/AdminPanel.vue'
import AdminModerationArticles from '../components/AdminModerationArticles.vue'
import AdminApprovedArticles from '../components/AdminApprovedArticles.vue'
import { jwtDecode } from "jwt-decode"

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
      path: '/admin',
      component: AdminPanel,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/moderation',
      component: AdminModerationArticles,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/approved',
      component: AdminApprovedArticles,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/*',
      redirect: '/admin'
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      return next('/')
    }
    const decoded = jwtDecode(token)
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token")
      return next('/')
    }
  }
  next()
})

export default router