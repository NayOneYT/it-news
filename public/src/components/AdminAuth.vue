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
    document.body.style.overflow = "hidden"
    const savedLogin = sessionStorage.getItem("login")
    if (savedLogin) this.login = savedLogin
    const savedPassword = sessionStorage.getItem("password")
    if (savedPassword) this.password = savedPassword
  },
  beforeDestroy() {
    document.body.style.overflow = ""
    if (this.login.trim() != "") sessionStorage.setItem("login", this.login) 
    else sessionStorage.removeItem("login")
    if (this.password.trim() != "") sessionStorage.setItem("password", this.password)
    else sessionStorage.removeItem("password")
  },
  methods: {
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
  z-index: 1;
}

.content {
  background-color: #fff;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 0 50px black;
  padding: 20px;
}

h2 {
  padding-bottom: 15px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
  word-break: break-word;
  hyphens: auto;
}

form input {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 15px 20px;
  border-radius: 10px;
  border: 1px solid black;
  font-size: 20px;
  box-sizing: border-box;
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

@media (max-width: 768px) {
  .content {
    width: 350px;
    padding: 14px;
  }

  h2 {
    padding-bottom: 12px;
    font-size: 20px;
  }

  form input {
    margin-bottom: 10px;
    padding: 12px 16px;
    font-size: 18px;
  }

  button[type="submit"] {
    padding: 10px;
    font-size: 18px;
  }
}

@media (max-width: 425px) {
  .content {
    padding: 10px;
    width: 280px;
  }

  h2 {
    padding-bottom: 8px;
    font-size: 16px;
  }

  form input {
    margin-bottom: 8px;
    padding: 10px 12px;
    font-size: 14px;
  }

  button[type="submit"] {
    padding: 8px;
    font-size: 14px;
  }
}
</style>