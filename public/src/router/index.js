import Vue from 'vue'
import Router from 'vue-router'
import RulesHTML from '../components/RulesHTML.vue'
import ArticleList from '../components/ArticleList.vue'
import ArticleDetails from '../components/ArticleDetails.vue'
import AdminPanel from '../components/AdminPanel.vue'
import AdminModerationArticles from '../components/AdminModerationArticles.vue'
import AdminApprovedArticles from '../components/AdminApprovedArticles.vue'
import AdminModerationArticleDetails from '../components/AdminModerationArticleDetails.vue'
import AdminApprovedArticleDetails from '../components/AdminApprovedArticleDetails.vue'
import { jwtDecode } from "jwt-decode"

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: ArticleList,
      meta: { title: 'Главная | IT News' }
    },
    {
      path: '/rules',
      component: RulesHTML,
      meta: { title: 'Правила написания HTML-кода при создании статьи | IT News' }
    },
    {
      path: '/articles/:id',
      component: ArticleDetails,
      props: true
    },
    {
      path: '/admin',
      component: AdminPanel,
      meta: { requiresAuth: true, title: 'Панель администратора | IT News' }
    },
    {
      path: '/admin/moderation',
      component: AdminModerationArticles,
      meta: { requiresAuth: true, title: 'Статьи на модерации | IT News' }
    },
    {
      path: '/admin/approved',
      component: AdminApprovedArticles,
      meta: { requiresAuth: true, title: 'Подтвержденные статьи | IT News' }
    },
    {
      path: '/admin/moderation/:id',
      component: AdminModerationArticleDetails,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/approved/:id',
      component: AdminApprovedArticleDetails,
      props: true,
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

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  } else {
    document.title = 'IT News'
  }
})

export default router