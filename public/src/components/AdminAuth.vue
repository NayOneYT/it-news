<template>
  <div id="adminAuth" @click.self="$emit('close')">
    <div class="content">
      <form @submit.prevent="submitAuth">
        <h2>Авторизация администратора</h2>
        <input type="text" v-model="login" placeholder="Логин">
        <input type="password" v-model="password" placeholder="Пароль">
        <InputError :condition="error" :text="'Неверный логин или пароль'"/>
        <button type="submit">Войти</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import InputError from './InputError.vue'
export default {
  name: "AdminAuth",
  components: {
    InputError
  },
  data() {
    return {
      login: "",
      password: "",
      error: false
    }
  },
  mounted() {
    const savedLogin = sessionStorage.getItem("login")
    if (savedLogin) this.login = savedLogin
    const savedPassword = sessionStorage.getItem("password")
    if (savedPassword) this.password = savedPassword
    window.addEventListener('wheel', this.preventScroll, { passive: false })
    window.addEventListener('keydown', this.preventKeys)
  },
  beforeDestroy() {
    if (this.login.trim() != "") sessionStorage.setItem("login", this.login) 
    else sessionStorage.removeItem("login")
    if (this.password.trim() != "") sessionStorage.setItem("password", this.password)
    else sessionStorage.removeItem("password")
    window.removeEventListener('wheel', this.preventScroll)
    window.removeEventListener('keydown', this.preventKeys)
  },
  methods: {
    preventScroll(e) {
      e.preventDefault()
    },
    preventKeys(e) {
      const tag = e.target.tagName
      const isTextInput = (tag === 'INPUT')
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
    async submitAuth() {
      try {
        const res = await axios.post("/api/admin/login", {
          login: this.login,
          password: this.password,
        })
        localStorage.setItem("token", res.data.token)
        this.error = false
        this.login = ""
        this.password = ""
        this.$emit("close")
        this.$router.push("/admin")
      } 
      catch (err) {
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<style scoped>
#adminAuth {
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

.content {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  width: 30%;
  max-width: 90%;
  box-shadow: 0 0 50px black;
}

h2 {
  padding-bottom: 15px;
}

form input, form textarea {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid black;
  font-size: 20px;
  box-sizing: border-box;
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
</style>