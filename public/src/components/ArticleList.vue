<template>
    <section id="articleList">
        <ArticleCard  
        v-for="el in articles" 
        :key="el._id" 
        :article="el"
        />
    </section>
</template>

<script>
import ArticleCard from './ArticleCard.vue'
import axios from "axios"
export default {
    name: "ArticleList",
    components: {
        ArticleCard
    },
    data() {
        return {
            articles: []
        }
  },
  async mounted() {
    const result = await axios.get("/api/articles")
    this.articles = result.data
    this.$nextTick(() => {
        const savedScroll = parseInt(sessionStorage.getItem('scrollPosition')) || 0;
        if (savedScroll) {
          window.scrollTo({ top: savedScroll });
          sessionStorage.removeItem('scrollPosition');
        }
    });
  }
}
</script>

<style scoped>
#articleList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}
</style>