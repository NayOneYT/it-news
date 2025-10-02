<template>
  <section id="adminApprovedArticles">
    <div class="stickyContainer" :style="articles.length > 0 ? {} : { width: '90%', margin: '0 auto', flex: 'unset' }">
      <button class="floatingBtn" @click="back">Назад</button>
      <button class="floatingBtn" @click="upend">Сначала: {{ inverted? "старые" : "новые" }}</button>
    </div>
    <div class="content" v-if="articles.length > 0">
      <ArticleCard  
        v-for="el in articles" 
        :key="el._id" 
        :article="el"
        :type="'approved'"
        @remove="removeArticle"
      />
    </div>
    <div class="mobileBtns">
      <button class="circleBtn" @click="back">🠔</button>
      <button class="circleBtn" @click="upend">⇅</button>
    </div>
  </section>
</template>

<script>
import ArticleCard from './ArticleCard.vue'
import axios from "axios"
export default {
  name: "AdminApprovedArticles",
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
    const result = await axios.get("/api/articles/approved")
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
#adminApprovedArticles {
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