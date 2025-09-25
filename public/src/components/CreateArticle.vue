<template>
  <div id="createArticle" @click.self="$emit('close')">
    <div class="articleContent">
      <form @submit.prevent="submitArticle" v-if="!submitted">
        <h2>Добавление статьи</h2>
        <input type="text" v-model="title.content" placeholder="Заголовок">
        <transition name="fade-out">
          <div class="inputError" v-if="title.error">
            <p>Введите заголовок длиннее 10 символов</p>
          </div>
        </transition>
        <textarea v-model="anons.content" placeholder="Анонс"></textarea>
        <transition name="fade-out">
          <div class="inputError" v-if="anons.error">
            <p>Введите анонс длиннее 10 символов</p>
          </div>
        </transition>
        <textarea v-model="full_text" placeholder="Полный текст (HTML)"></textarea>
        <input type="file" @change="handleImg" accept="image/*">
        <transition name="fade-out">
          <div class="inputError" v-if="img.error">
            <p>Можно выбрать только изображение</p>
          </div>
        </transition>
        <button type="submit">Отправить</button>
      </form>
      <div v-else>
        <h3>Статья отправлена на модерацию!</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "CreateArticle",
  data() {
    return {
      title: {
        content: "",
        error: false
      },
      anons: {
        content: "",
        error: false
      },
      full_text: '',
      img: 
      {
        data: null,
        error: false
      },
      submitted: false
    }
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
      const target = e.target
      if (target.tagName === 'TEXTAREA') {
        if (target.scrollHeight > target.clientHeight) return
      }
      e.preventDefault()
    },
    preventKeys(e) {
      const tag = e.target.tagName
      const isTextInput = (tag === 'INPUT' || tag === 'TEXTAREA')
      let keys
      if (isTextInput) {
        keys = [33, 34] 
        // 33 - PageUp, 34 - PageDown
      }
      else {
        keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]
        // 32 - Space, 33 - PageUp, 34 - PageDown, 35 - End, 36 - Home, 
        // 37 - ArrowLeft, 38 - ArrowUp, 39 - ArrowRight, 40 - ArrowDown
      }
      if (keys.includes(e.keyCode)) {
          e.preventDefault()
      }
    },
    handleImg(event) {
      const file = event.target.files[0]
      if (!file.type.startsWith('image/')) {
        this.img.error = true
        setTimeout(() => {
          this.img.error = false
        }, 3000)
        this.img.data = null
        event.target.value = ''
        return
      }
      this.img.error = false
      this.img.data = file
    },
    async submitArticle() {
      const formattedTitle = this.title.content.trim().replace(/\s+/g, ' ')
      const isTitleValid = formattedTitle.length > 10
      const formattedAnons = this.anons.content.trim().replace(/\s+/g, ' ')
      const isAnonsValid = formattedAnons.length > 10
      if (isTitleValid && isAnonsValid) {
        this.title.error = false
        this.anons.error = false
        try {
          const formData = new FormData()
          formData.append('title', formattedTitle)
          formData.append('anons', formattedAnons)
          formData.append('full_text', this.full_text)
          if (this.img.data) {
            formData.append('img', this.img.data)
          }
          await axios.post('/api/create-article', formData)
          this.submitted = true
        } 
        catch (err) {
          console.error('Ошибка при создании статьи:', err)
        }
      } 
      else {
        if (!isTitleValid) this.title.error = true 
        else this.title.error = false
        if (!isAnonsValid) this.anons.error = true
        else this.anons.error = false
      }
    }
  }
}
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

h3 {
  width: 100%;
  font-size: 30px;
  text-align: center;
  margin: 0;
  box-sizing: border-box;
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
  max-height: 15vh;
}

.header {
  display: flex;
  justify-content: space-between;
}

button[type="submit"] {
  width: 90%;
  padding: 12px;
  margin-left: 5%;
  font-size: 20px;
  color: white;
  font-weight: 500;
  border: none;
  background-color: #222222;
  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease;
}

button[type="submit"]:hover {
  transform: scale(1.1);
  background-color: #000;
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