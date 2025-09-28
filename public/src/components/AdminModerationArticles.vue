<template>
  <section id="adminModerationArticles">
    <div class="stickyContainer" :style="articles.length > 0 ? {} : { width: '90%', margin: '0 auto', flex: 'unset' }">
      <button class="floatingBtn" @click="back">Назад</button>
      <button class="floatingBtn" @click="upend">Сначала: {{ inverted? "старые" : "новые" }}</button>
    </div>
    <div class="content" v-if="articles.length > 0">
      <ArticleCard  
        v-for="el in articles" 
        :key="el._id" 
        :article="el"
        :type="'moderation'"
        @remove="removeArticle"
      />
    </div>
  </section>
</template>

<script>
import ArticleCard from './ArticleCard.vue'
import axios from "axios"
export default {
  name: "AdminModerationArticles",
  components: {
    ArticleCard
  },
  data() {
    return {
      articles: [],
      inverted: false
    }
  },
  async mounted() {
    const token = localStorage.getItem("token")
    const result = await axios.get("/api/articles/moderation", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    this.articles = result.data
    this.$nextTick(() => {
      const savedScroll = parseInt(sessionStorage.getItem('scrollPositionAdmin')) || 0
      if (savedScroll) {
        window.scrollTo({ top: savedScroll })
        sessionStorage.removeItem('scrollPositionAdmin')
      }
      else {
        const el = this.$el
      el.scrollIntoView()
      }
    })
  },
  methods: {
    back() {
      this.$router.push("/admin").catch(() => {})
    },
    upend() {
      this.inverted = !this.inverted
      this.articles = this.articles.reverse()
    },
    removeArticle(id) {
      this.articles = this.articles.filter(article => article._id !== id)
    }
  },
}
</script>

<style scoped>
#adminModerationArticles {
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
</style>