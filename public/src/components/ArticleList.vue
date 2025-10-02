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
      <button class="circleBtn" @click="isModalOpen = true">
        <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#000000" stroke-width="1.44" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
      </button>
      <button class="circleBtn" @click="upend">
        <svg viewBox="-6 -6 32.00 32.00" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="0.0002"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" d="M19.29894,13.097555 C19.9200379,13.097555 20.2332042,13.8469628 19.7969407,14.2892722 L14.369746,19.7916791 C14.0983279,20.0668585 13.6553376,20.0697948 13.3802994,19.7982374 C13.1052612,19.52668 13.1023265,19.0834622 13.3737445,18.8082827 L17.6255116,14.497593 L0.703482198,14.497593 C0.317070803,14.497593 0.00382247492,14.1841838 0.00382247492,13.797574 C0.00382247492,13.4109642 0.317070803,13.097555 0.703482198,13.097555 L19.29894,13.097555 Z M6.61970059,0.201762638 C6.89473881,0.473320047 6.89767354,0.91653784 6.62625551,1.19171729 L2.37448841,5.50240698 L19.2965178,5.50240698 C19.6829292,5.50240698 19.9961775,5.81581617 19.9961775,6.20242599 C19.9961775,6.58903581 19.6829292,6.902445 19.2965178,6.902445 L0.701060011,6.902445 C0.0799621139,6.902445 -0.233204177,6.15303716 0.203059275,5.7107278 L5.63025404,0.208320918 C5.90167207,-0.0668585286 6.34466238,-0.0697947706 6.61970059,0.201762638 Z"></path></g></svg>
      </button>
      <button class="circleBtn" @click="handleAuthClick"><svg viewBox="-4 -4 28.00 28.00" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="20" height="20"></rect> <g> <path d="M16.95 2.58c1.96 1.95 1.96 5.12 0 7.07-1.51 1.51-3.75 1.84-5.59 1.01l-1.87 3.31-2.99.31L5 18H2l-1-2 7.95-7.69c-.92-1.87-.62-4.18.93-5.73 1.95-1.96 5.12-1.96 7.07 0zm-2.51 3.79c.74 0 1.33-.6 1.33-1.34 0-.73-.59-1.33-1.33-1.33-.73 0-1.33.6-1.33 1.33 0 .74.6 1.34 1.33 1.34z"></path> </g> </g></svg></button>
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