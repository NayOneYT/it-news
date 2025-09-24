<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <form @submit.prevent="submitArticle">
        <h2>Добавить статью</h2>
        <input type="text" v-model="title" placeholder="Заголовок" required />
        <textarea v-model="anons" placeholder="Анонс" required></textarea>
        <textarea v-model="full_text" placeholder="Полный текст" required></textarea>
        <input type="file" @change="handleFile" />
        <div class="btns">
          <button type="submit">Создать статью</button>
          <button type="button" @click="$emit('close')">Отмена</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateArticle",
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
        await res.json();
        alert('Статья создана!');
        this.$emit('close');
      } catch (err) {
        console.error('Ошибка при создании статьи:', err);
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 0 20px rgba(0,0,0,0.3);
}

form input, form textarea {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #222;
  color: white;
}

button[type="submit"]:hover {
  background-color: #000;
}

button[type="button"] {
  background-color: #aaa;
  color: white;
}

button[type="button"]:hover {
  background-color: #888;
}
</style>