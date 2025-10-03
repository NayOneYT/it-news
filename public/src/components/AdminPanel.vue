<template>
  <div id="adminPanel">
    <button @click="createArticle">Создать статью</button>
    <button @click="switchToModeration">Статьи на модерации ( {{moderationArticles.length}} )</button>
    <button @click="switchToApproved">Подтвержденные статьи ( {{approvedArticles.length}} )</button>
    <button @click="switchToMain">На главную</button>
    <transition name="fade">
      <CreateArticle
        v-if="isModalOpen"
        @close="isModalOpen = false"
        @created="onArticleCreated"
        :admin = true
      />
    </transition>
  </div>
</template>

<script>
import axios from 'axios'
import CreateArticle from './CreateArticle.vue'
export default {
  name: "AdminPanel",
  components: {
    CreateArticle
  },
  data() {
    return {
      isModalOpen: false,
      moderationArticles: [],
      approvedArticles: []
    }
  },
  async mounted() {
    const token = localStorage.getItem("token")
    const moderationResult = await axios.get("/api/articles/moderation", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    this.moderationArticles = moderationResult.data
    const approvedResult = await axios.get("/api/articles/approved")
    this.approvedArticles = approvedResult.data
    this.$nextTick(() => {
      const el = this.$el
      el.scrollIntoView()
    })
  },
  methods: {
    createArticle() {
      this.isModalOpen = true
    },
    switchToModeration() {
      this.$router.push("/admin/moderation").catch(() => {})
    },
    switchToApproved() {
      this.$router.push("/admin/approved").catch(() => {})
    },
    switchToMain() {
      this.$router.push("/").catch(() => {})
    },
    async onArticleCreated(newArticle) {
      this.approvedArticles.push(newArticle)
    }
  }
}
</script>

<style scoped>
#adminPanel {
  display: flex;
  flex-direction: column;
}

button:first-child {
  margin-top: 15px;
}

button {
  flex: 1;
  width: 86%;
  margin: 0 7% 15px;
  font-size: 16px;
  padding: 12px;
  font-weight: 500;
  color: white;
  background-color: #222222;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease;
}

button:hover {
  transform: scale(1.1);
  background-color: #000000;
}
</style>