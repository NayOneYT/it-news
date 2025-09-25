<template>
  <section>
    <h2>Оставьте комментарий</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="comment.name" placeholder="Введите имя">
      <InputError :condition="nameError" :text="'Имя слишком короткое'"/>
      <textarea v-model="comment.text" placeholder="Введите комментарий"></textarea>
      <InputError :condition="textError" :text="'Введите больше текста'"/>
      <button type="submit">Отправить</button>
    </form>
  </section>
</template>

<script>
import InputError from './InputError.vue'
export default {
  name: "LeaveCommentForm",
  props: {
    article_id: {
      type: String,
      required: true
    }
  },
  components: {
    InputError
  },
  data() {
    return {
       comment: {
        name: "",
        text: ""
      },
      nameError: false,
      textError: false
    }
  },
  methods: {
    handleSubmit() {
      this.nameError = this.comment.name.trim().length < 2
      this.textError = this.comment.text.trim().length < 5
      if (this.nameError || this.textError) {
        return
      }
      this.$emit('submitComment', {
        name: this.comment.name.trim(),
        text: this.comment.text.trim(),
        article_id: this.article_id
      })
      this.comment.name = ""
      this.comment.text = ""
    }
  }
}
</script>

<style scoped>
h2 {
  padding: 15px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
}
form {
  width: calc(100%-60px);
  margin: 0 30px;
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

form textarea {
  resize: vertical;
  height: 56px;
  min-height: 56px;
}

form button {
  width: 40%;
  margin: 10px 30%;
  padding: 12px;
  font-size: 20px;
  color: white;
  font-weight: 500;
  background-color: #222222;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease;
}

form button:hover {
  transform: scale(1.1);
  background-color: #000000;
}
</style>