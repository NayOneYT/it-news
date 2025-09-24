<template>
  <section id="articleDetails">
    <div class="stickyContainer">
      <button @click="$router.push('/')">Назад ко всем статьям</button>
    </div>
    <div id="articleContent" v-if="article">
      <img :src="article.img" alt="Картинка" v-if="isOriginalImage">
      <h2>{{ article.title }}</h2>
      <p>{{ article.anons }}</p>
      <div id="fullText" v-html="article.full_text"></div>
      <CommentList v-if="comments.length > 0" :comments="comments"/>
      <LeaveCommentForm @submitComment="submitComment" :article_id="article._id"/>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import CommentList from './CommentList.vue';
import LeaveCommentForm from './LeaveCommentForm.vue';
export default {
  name: "ArticleDetails",
  components: {
    CommentList,
    LeaveCommentForm
  },
  props: {
    id: {
      type: String,
      required: true 
    }
  },
  data() {
    return {
      article: null,
      comments: [],
      isOriginalImage: false
    }
  },
  async mounted() {
    try {
      const articleRes = await axios.get(`/api/articles/${this.id}`);
      this.article = articleRes.data;
      if (this.article.img != "/img/no-image.jpg") this.isOriginalImage = true
      const commentsRes = await axios.get('/api/comments', {
        params: { article_id: this.article._id }
      });
      this.comments = commentsRes.data;
    } catch (err) {
      console.error("Ошибка при загрузке статьи или комментариев:", err);
    }
    this.$nextTick(() => {
    const el = this.$el;
    el.scrollIntoView();
  });
  },
  methods: {
    async submitComment(commentData) {
      try {
        const result = await axios.post("/api/comments", commentData);
        this.comments.unshift(result.data);
      } 
      catch (err) {
        console.error("Ошибка при отправке комментария:", err)
      }
    }
  }
}
</script>

<style scoped>
#articleDetails {
  display: flex;
  gap: 0;
  align-items: flex-start;
}

.stickyContainer {
  position: sticky;
  top: 0px;
  flex: 15%;
  padding: 15px 1%;
  box-sizing: border-box;
  align-self: flex-start;
}

#articleDetails button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: white;
  font-weight: 500;
  background-color: #222222;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease;
}

#articleDetails button:hover {
  transform: scale(1.1);
  background-color: #000000;
}

#articleContent {
  flex: 70%;
  background-color: rgba(230, 230, 230, 0.7);
  backdrop-filter: blur(6px);
  margin-right: 15%;
}

#articleContent img {
  width: 100%;
  border-radius: 10px;
  border: 1px solid black;
  margin-top: 15px;
  box-sizing: border-box;
}

#articleContent h2, :deep(#fullText) h2 {
  padding: 15px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
}

#articleContent p, :deep(#fullText) p {
  font-size: 20px;
  padding: 0 30px 20px;
  text-align: justify;
}

:deep(#fullText) ul, :deep(#fullText) ol {
  padding: 0px 30px 20px 50px;
  font-size: 20px;
}

:deep(#fullText) pre {
  display: inline-block;
  margin: 0px 30px;
  font-size: 20px;
  padding: 10px;
  background-color: rgba(230, 230, 230, 0.7);
  border: 1px solid black;
  border-radius: 10px;
}
</style>