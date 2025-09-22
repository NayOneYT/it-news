<template>
  <main>
    <AppHeader />
    <ArticleList ref="articleList" v-if="showArticleList" :articles="articles" @readMore="readMore"/>
    <ArticleDetails v-else :article="selectedArticle" @goBack="goBack"/>
    <AppFooter />
  </main>
</template>

<script>
import AppHeader from "./components/AppHeader.vue"
import ArticleList from "./components/ArticleList.vue"
import ArticleDetails from "./components/ArticleDetails.vue";
import AppFooter from "./components/AppFooter.vue"
import axios from 'axios';
export default {
  name: 'App',
  components: {
    AppHeader,
    ArticleList,
    ArticleDetails,
    AppFooter
  },
  data() {
    return {
      articles: [],
      showArticleList: true,
      selectedArticle: null
    }
  },
  async mounted() {
    const result = await axios.get("api/articles")
    this.articles = result.data
    this.$nextTick(() => {
      this.restorePosition()
    });
  },
  methods: {
    async readMore(el) {
      window.removeEventListener('scroll', this.onScroll);
      this.selectedArticle = el
      this.showArticleList = false
      this.$refs.articleList.$refs.listRoot.scrollIntoView()
    },
    goBack() {
      this.showArticleList = true
      this.restorePosition()
    },
    onScroll() {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    },
    restorePosition() {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        window.scrollTo({ top: savedPosition });
      } else {
        window.scrollTo({ top: 0 });
      }
      window.addEventListener('scroll', this.onScroll)
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
* {
    padding: 0;
    margin: 0;
    outline: none;
    font-family: "Montserrat", sans-serif;
}
main {
  background: url("../public/img/main-background.jpg");
  background-size: 100% auto;
}
</style>