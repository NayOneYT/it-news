<template>
  <section id="articleList">
    <div class="stickyContainer" :style="articles.length > 0 ? {} : { width: '90%', margin: '0 auto', flex: 'unset' }">
      <button class="floatingBtn" @click="isModalOpen = true">Добавить статью</button>
      <button class="floatingBtn" @click="upend">Сначала: {{ inverted? "старые" : "новые" }}</button>
      <button class="floatingBtn" @click="handleAuthClick">Админская панель</button>
    </div>
    <transition name="fade">
      <CreateArticle
        v-if="isModalOpen"
        @close="isModalOpen = false"
      />
    </transition>
    <transition name="fade">
      <AdminAuth
        v-if="isAuthOpen"
        @close="isAuthOpen = false"
      />
    </transition>
    <div class="content" v-if="articles.length > 0">
      <ArticleCard  
        v-for="el in articles" 
        :key="el._id" 
        :article="el"
      />
    </div>
    <div class="mobileBtns">
      <button class="circleBtn" @click="isModalOpen = true">＋</button>
      <button class="circleBtn" @click="upend">⇅</button>
      <button class="circleBtn" @click="handleAuthClick">⚙</button>
    </div>
  </section>
</template>

<script>
import ArticleCard from './ArticleCard.vue'
import CreateArticle from './CreateArticle.vue'
import AdminAuth from './AdminAuth.vue'
import axios from "axios"
import { jwtDecode } from "jwt-decode";
export default {
  name: "ArticleList",
  components: {
    ArticleCard,
    CreateArticle,
    AdminAuth
  },
  data() {
    return {
      articles: [],
      isModalOpen: false,
      isAuthOpen: false,
      inverted: false
    }
  },
  methods: {
    handleAuthClick() {
      const token = localStorage.getItem("token")
      if (!token) {
        this.isAuthOpen = true
        return
      }
      const decoded = jwtDecode(token)
      const now = Date.now() / 1000
      if (decoded.exp && decoded.exp > now) {
        sessionStorage.setItem('scrollPositionUser', Math.round(window.scrollY));
        this.$router.push("/admin")
      } 
      else {
        localStorage.removeItem("token")
        this.isAuthOpen = true
      }
    },
    upend() {
      this.inverted = !this.inverted
      this.articles = this.articles.reverse()
    },
  },
  async mounted() {
    const result = await axios.get("/api/articles/approved")
    this.articles = result.data
    this.$nextTick(() => {
      const savedScroll = parseInt(sessionStorage.getItem('scrollPositionUser')) || 0
      if (savedScroll) {
        window.scrollTo({ top: savedScroll })
        sessionStorage.removeItem('scrollPositionUser')
      }
    })
  }
}
</script>

<style scoped>
#articleList {
  display: flex;
}

.stickyContainer {
  position: sticky;
  top: 0px;
  flex: 15%;
  padding: 15px 1%;
  box-sizing: border-box;
  align-self: flex-start;
}

.content {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  flex: 85%;
  margin: 15px 0px;
  align-items: center;
  justify-content: flex-start;
}

.floatingBtn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: white;
  margin-bottom: 10px;
  font-weight: 500;
  background-color: #222222;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease;
}

.floatingBtn:hover {
  transform: scale(1.1);
  background-color: #000000;
}

.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave-to {
  opacity: 0;
}

.fade-leave-active {
  transition: all 0.3s ease;
}

.mobileBtns {
  position: fixed;
  display: none;
  top: 140px;
}

.circleBtn {
  height: 56px;
  width: 56px;
  border-radius: 50%;
  margin: 5px;
  font-size: 44px;
  line-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  background-color: rgba(230, 230, 230, 0.7);
  backdrop-filter: blur(6px);
  transition: all 300ms ease;
  cursor: pointer;
}

@media (max-width: 768px) {
  .mobileBtns {
    display: flex;
    flex-direction: column;
  }
  .stickyContainer {
    display: none;
  }
  .content {
    gap: 15px;
    flex: 100%;
    justify-content: center;
  }
}
</style>