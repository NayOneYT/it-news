<template>
    <div class="article">
        <img :src="article.img" alt="Картинка" @error="onImageError">
        <h2>{{ article.title }}</h2>
        <p>{{ article.anons }}</p>
        <button @click="goToDetails">Читать детальнее</button>
    </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    article: {
      type: Object,
      required: true 
    }
  },
  methods: {
    onImageError(event) {
      event.target.src = '/img/no-image.jpg';
    },
    goToDetails() {
      sessionStorage.setItem('scrollPosition', Math.round(window.scrollY.toString()));
      this.$router.push(`/articles/${this.article._id}`);
    }
  }
}
</script>

<style scoped>
.article {
  width: 450px;
  background-color: rgba(230, 230, 230, 0.7);
  border-radius: 10px;
  border: 1px solid black;
  backdrop-filter: blur(6px);
}

.article img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
}

.article h2 {
  margin: 10px;
}

.article p {
  margin: 10px;
  font-size: 22px;
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
</style>