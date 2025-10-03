<template>
  <div id="createArticle" @click.self="$emit('close')">
    <div class="articleContent">
      <form @submit.prevent="submitArticle" v-if="!submitted && !blocked">
        <h2>{{ admin? "Создание" : "Добавление" }} статьи</h2>
        <input type="text" v-model="title.content" placeholder="Заголовок">
        <InputError :condition="title.errorText != ''" :text="title.errorText"/>
        <textarea v-model="anons.content" placeholder="Анонс"></textarea>
        <InputError :condition="anons.errorText != ''" :text="anons.errorText"/>
        <textarea class="html" v-model="full_text" placeholder="Полный текст (HTML)"></textarea>
        <p>*Правила по написанию HTML кода можно изучить <span @click="readRules">здесь</span></p>
        <input type="file" @change="handleImg" accept="image/*">
        <InputError :condition="img.errorText != ''" :text="img.errorText"/>
        <button type="submit">{{ admin? "Создать" : "Отправить" }}</button>
      </form>
      <div v-else-if="blocked">
        <h1>Вы недавно отправили статью.<br>
        Попробуйте снова через {{ remainingTime }} сек</h1>
      </div>
      <div v-else-if="submitted">
        <h1>Статья {{ admin? "успешно создана!" : "отправлена на модерацию!" }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import InputError from './InputError.vue'
export default {
  name: "CreateArticle",
  props: {
    admin: {
      type: Boolean,
      required: false
    }
  },
  components: {
    InputError
  },
  data() {
    return {
      title: {
        content: "",
        errorText: ""
      },
      anons: {
        content: "",
        errorText: ""
      },
      full_text: '',
      img: 
      {
        data: null,
        errorText: ""
      },
      submitted: false,
      blocked: false,
      cooldown: 60000,
      remainingTime: 0
    }
  },
  mounted() {
    if (!this.admin) {
      const lastSuccess = localStorage.getItem("lastSuccess")
      if (lastSuccess) {
        const diff = Date.now() - parseInt(lastSuccess)
        if (diff < this.cooldown) {
          this.blocked = true
          this.remainingTime = Math.ceil((this.cooldown - diff) / 1000)
          this.startCooldownTimer()
        }
      }
    }
    const savedTitle = sessionStorage.getItem("title")
    if (savedTitle) this.title.content = savedTitle
    const savedAnons = sessionStorage.getItem("anons")
    if (savedAnons) this.anons.content = savedAnons
    const savedFullText = sessionStorage.getItem("full_text")
    if (savedFullText) this.full_text = savedFullText
    document.addEventListener('wheel', this.preventScroll, { passive: false })
    document.addEventListener('keydown', this.preventKeys, { passive: false })
    document.addEventListener('touchmove', this.preventTouch, { passive: false })
  },
  beforeDestroy() {
    if (this.title.content.trim() != "") sessionStorage.setItem("title", this.title.content) 
    else sessionStorage.removeItem("title")
    if (this.anons.content.trim() != "") sessionStorage.setItem("anons", this.anons.content)
    else sessionStorage.removeItem("anons")
    if (this.full_text.trim() != "") sessionStorage.setItem("full_text", this.full_text)
    else sessionStorage.removeItem("full_text")
    document.removeEventListener('wheel', this.preventScroll)
    document.removeEventListener('keydown', this.preventKeys)
    document.removeEventListener('touchmove', this.preventTouch)
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
    preventTouch(e) {
      const target = e.target
      if (target.tagName === 'TEXTAREA') {
        if (target.scrollHeight > target.clientHeight) return
      }
      e.preventDefault()
    },
    handleImg(event) {
      const file = event.target.files[0]
      if (!file.type.startsWith('image/')) {
        this.img.errorText = "Можно выбрать только изображение"
        setTimeout(() => {
          this.img.errorText = ""
        }, 5000)
        this.img.data = null
        event.target.value = ''
        return
      }
      this.img.errorText = ""
      this.img.data = file
    },
    async submitArticle() {
      const formattedTitle = this.title.content.trim().replace(/\s+/g, ' ')
      if (formattedTitle.length < 10) this.title.errorText = "Заголовок должен содержать не менее 10 символов"
      else if (formattedTitle.length > 100) this.title.errorText = "Заголовок должен содержать не более 100 символов"
      else this.title.errorText = ""
      const formattedAnons = this.anons.content.trim().replace(/\s+/g, ' ')
      if (formattedAnons.length < 10) this.anons.errorText = "Анонс должен содержать не менее 10 символов"
      else if (formattedAnons.length > 200) this.anons.errorText = "Анонс должен содержать не более 200 символов"
      else this.anons.errorText = ""
      const fullTextToSend = this.full_text.trim() == '' ? '' : this.full_text
      if (this.title.errorText == "" && this.anons.errorText == "") {
        try {
          const formData = new FormData()
          formData.append('title', formattedTitle)
          formData.append('anons', formattedAnons)
          formData.append('full_text', fullTextToSend)
          if (this.img.data) {
            formData.append('img', this.img.data)
          }
          if (this.admin) {
            const token = localStorage.getItem("token")
            const response = await axios.post('/api/articles/create-by-admin', formData,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            this.$emit("created", response.data)
          }
          else await axios.post('/api/articles/create-by-user', formData)
          this.submitted = true
          this.title.content = ""
          this.anons.content = ""
          this.full_text = ""
          if (!this.admin) {
            localStorage.setItem("lastSuccess", Date.now().toString())
            this.remainingTime = this.cooldown / 1000
            this.startCooldownTimer()
          }
        } 
        catch (err) {
          console.error('Ошибка при создании статьи:', err)
        }
      }
    },
    readRules() {
      window.open('/rules', '_blank')
    },
    startCooldownTimer() {
      const interval = setInterval(() => {
        this.remainingTime--
        if (this.remainingTime <= 0) {
          this.blocked = false
          clearInterval(interval)
        }
      }, 1000)
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
  z-index: 1;
}

.articleContent {
  background-color: #fff;
  border-radius: 10px;
  width: 600px;
  box-shadow: 0 0 50px black;
  padding: 20px;
}

h1 {
  text-align: center;
  padding: 30px;
  font-size: 30px;
}

h2 {
  padding-bottom: 15px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
  word-break: break-word;
  hyphens: auto;
}

form input, form textarea {
  display: block;
  width: 100%;
  margin-bottom: 12px;
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
  max-height: 100px;
}

.html {
  margin-bottom: 0;
}

button[type="submit"] {
  width: 60%;
  margin: 0px 20%;
  padding: 12px;
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

p {
  color: #adadad;
  margin-bottom: 10px;
  margin-top: 5px;
  font-size: 16px;
}

span {
  cursor: pointer;
  font-weight: 600;
}

span:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .articleContent {
    width: 90%;
    padding: 14px;
  }

  h1 {
    padding: 22px;
    font-size: 24px;
  }

  h2 {
    padding-bottom: 12px;
    font-size: 20px;
  }

  form input, form textarea {
    margin-bottom: 10px;
    padding: 12px 16px;
    font-size: 18px;
  }

  form textarea {
    height: 48px;
    min-height: 48px;
  }

  button[type="submit"] {
    padding: 10px;
    font-size: 18px;
  }
  
  p {
    margin-bottom: 8px;
    margin-top: 4px;
    font-size: 14px;
  }
}

@media (max-width: 425px) {
  .articleContent {
    width: 90%;
    padding: 10px;
  }

  h1 {
    padding: 16px;
    font-size: 20px;
  }

  h2 {
    padding-bottom: 8px;
    font-size: 16px;
  }

  form input, form textarea {
    margin-bottom: 8px;
    padding: 10px 12px;
    font-size: 14px;
  }

  form textarea {
    height: 38px;
    min-height: 38px;
  }

  button[type="submit"] {
    padding: 8px;
    font-size: 14px;
  }
  
  p {
    margin-bottom: 6px;
    margin-top: 3px;
    font-size: 11px;
  }
}
</style>