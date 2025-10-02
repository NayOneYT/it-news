<template>
  <section id="articleDetails">
    <div class="stickyContainer" :style="article ? {} : { width: '90%', margin: '0 auto', flex: 'unset' }">
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
    <div class="mobileBtns">
      <button class="circleBtn" @click="$router.push('/')">
        <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M74.656,56.818c3.895,3.729,5.788,8.795,5.788,15.491c0,1.104,0.896,2,2,2s2-0.885,2-1.989 c0-7.736-2.362-13.91-7.022-18.369C66.646,43.639,46.325,44.551,30,45.269c-2.28,0.101-4.461,0.211-6.499,0.28L38.428,30.62 c0.781-0.781,0.781-2.047,0-2.828s-2.048-0.781-2.828,0L17.479,45.915c-0.375,0.375-0.586,0.884-0.586,1.414 s0.211,1.039,0.586,1.414l18.123,18.12c0.391,0.391,0.902,0.586,1.414,0.586s1.024-0.195,1.415-0.586 c0.781-0.781,0.781-2.048,0-2.828L24.142,49.75c1.915-0.11,3.932-0.261,6.033-0.354C44.919,48.748,65.114,47.688,74.656,56.818z"></path></g></g></svg>
      </button>
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
      document.title = `${this.article.title} | IT News`
      if (this.article.img != "/img/no-image.jpg") this.isOriginalImage = true
      const commentsRes = await axios.get('/api/comments', {
        params: { article_id: this.article._id }
      });
      this.comments = commentsRes.data;
    } catch (err) {
      console.error("Ошибка при загрузке статьи или комментариев:", err);
      document.title = `Статья не найдена | IT News`
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

button {
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

.stickyContainer button:hover {
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
  max-height: 800px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid black;
  margin-top: 15px;
  box-sizing: border-box;
}

#articleContent h2, :deep(#fullText) h2 {
  padding: 15px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
  word-break: break-word;
  hyphens: auto;
}

#articleContent p, :deep(#fullText) p {
  font-size: 20px;
  padding: 0 30px 20px;
  text-align: justify;
  word-break: break-word;
  hyphens: auto;
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
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: auto;
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
  color: black;
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

  #articleContent {
    flex: 100%;
    margin: 0;
  }

  #articleContent img {
    width: 96%;
    max-height: 600px;
    margin: 2%;
  }

  #articleContent h2, :deep(#fullText) h2 {
    padding: 12px;
    font-size: 20px;
  }

  #articleContent p, :deep(#fullText) p {
    font-size: 18px;
    padding: 0 24px 10px;
  }

  :deep(#fullText) ul, :deep(#fullText) ol {
    padding: 0px 22px 12px 42px;
    font-size: 18px;
  }

  :deep(#fullText) pre {
    display: inline-block;
    margin: 0px 20px;
    font-size: 18px;
    padding: 6px;
  }
}

@media (max-width: 425px) {
  #articleContent img {
    max-height: 400px;
  }

  #articleContent h2, :deep(#fullText) h2 {
    padding: 8px;
    font-size: 16px;
  }

  #articleContent p, :deep(#fullText) p {
    font-size: 14px;
    padding: 0 18px 8px;
  }

  :deep(#fullText) ul, :deep(#fullText) ol {
    padding: 0px 16px 9px 36px;
    font-size: 14px;
  }

  :deep(#fullText) pre {
    display: inline-block;
    margin: 0px 16px;
    font-size: 14px;
    padding: 5px;
  }
}
</style>