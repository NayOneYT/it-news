<template>
  <div class="article" v-if="type == 'moderation'">
    <img :src="article.img" alt="Картинка" @error="onImageError">
    <h2>{{ article.title }}</h2>
    <p>{{ article.anons }}</p>
    <div class="buttons">
      <button @click="goToDetailsModeration">Детальнее</button>
      <button class="red" @click="remove">Отклонить</button>
    </div>
  </div>
  <div class="article" v-else-if="type == 'approved'">
    <img :src="article.img" alt="Картинка" @error="onImageError">
    <h2>{{ article.title }}</h2>
    <p>{{ article.anons }}</p>
    <div class="buttons">
      <button @click="goToDetailsApproved">Детальнее</button>
      <button class="red" @click="remove">Удалить</button>
    </div>
  </div>
  <div class="article" v-else>
    <img :src="article.img" alt="Картинка" @error="onImageError">
    <h2>{{ article.title }}</h2>
    <p>{{ article.anons }}</p>
    <button @click="goToDetails">Читать детальнее</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ArticleCard",
  props: {
    article: {
      type: Object,
      required: true 
    },
    type: {
      type: String,
      required: false
    }
  },
  methods: {
    onImageError(event) {
      event.target.src = '/img/no-image.jpg';
    },
    goToDetails() {
      sessionStorage.setItem('scrollPositionUser', Math.round(window.scrollY));
      this.$router.push(`/articles/${this.article._id}`);
    },
    goToDetailsModeration() {
      sessionStorage.setItem('scrollPositionAdmin', Math.round(window.scrollY));
      this.$router.push(`/admin/moderation/${this.article._id}`).catch(() => {});
    },
    goToDetailsApproved() {
      sessionStorage.setItem('scrollPositionAdmin', Math.round(window.scrollY));
      this.$router.push(`/admin/approved/${this.article._id}`).catch(() => {});
    },
    async remove() {
      try {
        const token = localStorage.getItem("token")
        await axios.delete(`/api/articles/${this.article._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.$emit("remove", this.article._id)
      } catch (err) {
        console.error("Ошибка при удалении:", err)
      }
    }
  }
}
</script>

<style scoped>
.article {
  width: 420px;
  background-color: rgba(230, 230, 230, 0.7);
  border-radius: 10px;
  border: 1px solid black;
  backdrop-filter: blur(6px);
}

.article img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

.article h2 {
  margin: 10px;
  overflow-wrap: break-word;
  hyphens: auto;
}

.article p {
  margin: 10px;
  font-size: 22px;
  overflow-wrap: break-word;
  hyphens: auto;
}

.article button {
  width: 86%;
  margin: 5px 7% 15px;
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

.article button:hover {
  transform: scale(1.1);
  background-color: #000000;
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

@media (max-width: 768px) {
  .article {
    width: 380px;
  }
  
  .article img {
    height: 160px;
  }

  .article h2 {
    font-size: 22px;
    margin: 8px;
  }

  .article p {
    font-size: 20px;
    margin: 8px;
  }

  .article button {
    margin: 0 7% 10px;
    padding: 10px;
  }
}

@media (max-width: 425px) {
  .article {
    width: 300px;
  }

  .article img {
    height: 120px;
  }

  .article h2 {
    font-size: 20px;
    margin: 6px;
  }

  .article p {
    font-size: 17px;
    margin: 6px;
  }

  .article button {
    font-size: 14px;
  }
}
</style>