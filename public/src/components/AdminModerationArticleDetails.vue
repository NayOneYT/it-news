<template>
  <section id="AdminModerationArticleDetails">
    <div class="stickyContainer" :style="article ? {} : { width: '90%', margin: '0 auto', flex: 'unset' }">
      <button @click="$router.push('/admin/moderation').catch(() => {})">Назад ко всем статьям</button>
    </div>
    <div id="articleContent" v-if="article">
      <img :src="article.img" alt="Картинка" v-if="isOriginalImage">
      <h2>{{ article.title }}</h2>
      <p>{{ article.anons }}</p>
      <div id="fullText" v-html="article.full_text"></div>
      <div class="buttons">
        <button @click="approve">Одобрить</button>
        <button class="red" @click="reject">Отклонить</button>
      </div>
    </div>
    <div class="mobileBtns">
      <button class="circleBtn" @click="$router.push('/admin/moderation').catch(() => {})">🠔</button>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  name: "AdminModerationArticleDetails",
  props: {
    id: {
      type: String,
      required: true 
    }
  },
  data() {
    return {
      article: null,
      isOriginalImage: false
    }
  },
  async mounted() {
    try {
      const articleRes = await axios.get(`/api/articles/${this.id}`);
      this.article = articleRes.data;
      document.title = `${this.article.title} | IT News`
      if (this.article.img != "/img/no-image.jpg") this.isOriginalImage = true
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
    async approve() {
      try {
        const token = localStorage.getItem("token")
        await axios.patch(`/api/articles/approve/${this.id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.$router.push("/admin/moderation").catch(() => {})
      } catch (err) {
        console.error("Ошибка при одобрении:", err)
      }
    },
    async reject() {
      try {
        const token = localStorage.getItem("token")
        await axios.delete(`/api/articles/${this.article._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.$router.push("/admin/moderation").catch(() => {})
      } catch (err) {
        console.error("Ошибка при удалении:", err)
      }
    }
  }
}
</script>

<style scoped>
#AdminModerationArticleDetails {
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

button:hover {
  transform: scale(1.1);
  background-color: #000000;
}

#articleContent {
  flex: 70%;
  background-color: rgba(230, 230, 230, 0.7);
  backdrop-filter: blur(6px);
  margin-right: 15%;
}

#articleContent button {
  margin: 12px 5%;
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

.buttons {
  display: flex;
  justify-content: space-between;
}

button.red {
  background-color: rgb(249, 20, 20);
  transition: all 300ms ease;
}

button.red:hover {
  background-color: rgb(190, 20, 20);
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

  #articleContent button {
    margin: 10px 5%;
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

  #articleContent button {
    margin: 8px 5%;
  }
}
</style>