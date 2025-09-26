<template>
  <section id="adminPanel">
    <h1>АДМИН</h1>
  </section>
</template>

<script>
// import ArticleCard from './ArticleCard.vue'
// import CreateArticle from './CreateArticle.vue'
// import AdminAuth from './AdminAuth.vue'
// import axios from "axios"
export default {
  name: "AdminPanel",
//   components: {
//     ArticleCard,
//     CreateArticle,
//     AdminAuth
//   },
//   data() {
//     return {
//       articles: [],
//       isModalOpen: false,
//       isAuthOpen: false
//     }
//   },
//   async mounted() {
//     const result = await axios.get("/api/articles/approved")
//     this.articles = result.data
//     this.$nextTick(() => {
//       const savedScroll = parseInt(sessionStorage.getItem('scrollPosition')) || 0;
//       if (savedScroll) {
//         window.scrollTo({ top: savedScroll });
//         sessionStorage.removeItem('scrollPosition');
//       }
//     });
//   }
}
</script>

<style scoped>
#articleList {
  display: flex;
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

.stickyContainer {
  position: sticky;
  top: 0px;
  flex: 15%;
  padding: 15px 1%;
  box-sizing: border-box;
  align-self: flex-start;
}

.articleListContent {
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
</style>