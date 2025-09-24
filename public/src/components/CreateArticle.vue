<template>
  <div id="createArticle" @click.self="$emit('close')">
    <div class="articleContent">
      <form @submit.prevent="submitArticle">
        <h2>Добавление статьи</h2>
        <input type="text" v-model="title" placeholder="Заголовок">
        <textarea v-model="anons" placeholder="Анонс"></textarea>
        <textarea v-model="full_text" placeholder="Полный текст (HTML)"></textarea>
        <input type="file" @change="handleFile" accept="image/*">
        <transition name="fade-out">
          <div class="inputError" v-if="imgError">
            <p>Выберите изображение</p>
          </div>
        </transition>
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
      img: null,
      imgError: false
    };
  },
  mounted() {
    window.addEventListener('wheel', this.preventScroll, { passive: false })
    window.addEventListener('keydown', this.preventKeys)
  },
  beforeDestroy() {
    window.removeEventListener('wheel', this.preventScroll)
    window.removeEventListener('keydown', this.preventKeys)
  },
  methods: {
    preventScroll(e) {
        e.preventDefault()
    },
    preventKeys(e) {
      const tag = e.target.tagName.toLowerCase();
      const isTextInput = (tag === 'input' || tag === 'textarea');
      let keys
      if (isTextInput) {
        keys = [33, 34, 35, 36]
      }
      else {
        keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
      }
      if (keys.includes(e.keyCode)) {
          e.preventDefault()
      }
    },
    handleFile(event) {
      const file = event.target.files[0]
      if (!file.type.startsWith('image/')) {
        this.imgError = true
        event.target.value = ''
        return
      }
      this.imgError = false
      this.img = file
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
      } 
      catch (err) {
        console.error('Ошибка при создании статьи:', err);
      }
    }
  }
};
</script>

<style scoped>
#createArticle {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.articleContent {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 0 50px black;
}

h2 {
    padding-bottom: 15px;
}

form input, form textarea {
  display: block;
  width: 100%;
  margin: 0 0 20px;
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid black;
  font-size: 20px;
  box-sizing: border-box;
}

form textarea {
  resize: vertical;
  height: 56px;
  min-height: 56px;
}

.btns {
  display: flex;
  justify-content: space-between;
}

button {
  width: 40%;
  padding: 12px;
  margin: 0 10px;
  font-size: 20px;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease;
}

button[type="submit"] {
  background-color: #222222;
}

button[type="submit"]:hover {
  transform: scale(1.1);
  background-color: #000;
}

button[type="button"] {
  background-color: #ff3434;
}

button[type="button"]:hover {
  transform: scale(1.1);
  background-color: #c02121;
}

.inputError p {
  width: 100%;
  margin: -10px 0 10px;
  padding: 10px;
  background-color: rgba(255, 0, 0, 0.3);
  border-radius: 10px;
  box-sizing: border-box;
  color: rgb(150, 0, 0);
}

.fade-out-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-out-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-out-leave-active {
  transition: all 0.3s ease;
}
</style>