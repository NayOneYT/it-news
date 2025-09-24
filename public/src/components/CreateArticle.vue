<template>
  <form @submit.prevent="submitArticle">
    <input type="text" v-model="title" placeholder="Заголовок" required />
    <textarea v-model="anons" placeholder="Анонс" required></textarea>
    <textarea v-model="full_text" placeholder="Полный текст" required></textarea>
    <input type="file" @change="handleFile" />
    <button type="submit">Создать статью</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      anons: '',
      full_text: '',
      img: null
    };
  },
  methods: {
    handleFile(event) {
      this.img = event.target.files[0];
    },
    async submitArticle() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('anons', this.anons);
      formData.append('full_text', this.full_text);
      if (this.img) {
        formData.append('img', this.img);
      }

      try {
        const res = await fetch('/api/create-article', {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        console.log(data);
        alert('Статья создана!');
      } catch (err) {
        console.error('Ошибка при создании статьи:', err);
      }
    }
  }
};
</script>