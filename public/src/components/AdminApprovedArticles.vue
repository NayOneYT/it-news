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
      <button class="circleBtn" @click="back">
        <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M74.656,56.818c3.895,3.729,5.788,8.795,5.788,15.491c0,1.104,0.896,2,2,2s2-0.885,2-1.989 c0-7.736-2.362-13.91-7.022-18.369C66.646,43.639,46.325,44.551,30,45.269c-2.28,0.101-4.461,0.211-6.499,0.28L38.428,30.62 c0.781-0.781,0.781-2.047,0-2.828s-2.048-0.781-2.828,0L17.479,45.915c-0.375,0.375-0.586,0.884-0.586,1.414 s0.211,1.039,0.586,1.414l18.123,18.12c0.391,0.391,0.902,0.586,1.414,0.586s1.024-0.195,1.415-0.586 c0.781-0.781,0.781-2.048,0-2.828L24.142,49.75c1.915-0.11,3.932-0.261,6.033-0.354C44.919,48.748,65.114,47.688,74.656,56.818z"></path></g></g></svg>
      </button>
      <button class="circleBtn" @click="upend">
        <svg viewBox="-6 -6 32.00 32.00" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000" stroke-width="0.0002"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#000000" d="M19.29894,13.097555 C19.9200379,13.097555 20.2332042,13.8469628 19.7969407,14.2892722 L14.369746,19.7916791 C14.0983279,20.0668585 13.6553376,20.0697948 13.3802994,19.7982374 C13.1052612,19.52668 13.1023265,19.0834622 13.3737445,18.8082827 L17.6255116,14.497593 L0.703482198,14.497593 C0.317070803,14.497593 0.00382247492,14.1841838 0.00382247492,13.797574 C0.00382247492,13.4109642 0.317070803,13.097555 0.703482198,13.097555 L19.29894,13.097555 Z M6.61970059,0.201762638 C6.89473881,0.473320047 6.89767354,0.91653784 6.62625551,1.19171729 L2.37448841,5.50240698 L19.2965178,5.50240698 C19.6829292,5.50240698 19.9961775,5.81581617 19.9961775,6.20242599 C19.9961775,6.58903581 19.6829292,6.902445 19.2965178,6.902445 L0.701060011,6.902445 C0.0799621139,6.902445 -0.233204177,6.15303716 0.203059275,5.7107278 L5.63025404,0.208320918 C5.90167207,-0.0668585286 6.34466238,-0.0697947706 6.61970059,0.201762638 Z"></path></g></svg>
      </button>
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
  padding: 0;
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