<template>
  <section>
    <h2>Оставьте комментарий</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="comment.name" placeholder="Введите имя">
      <InputError :condition="shortNameErr" :text="'Имя должно содержать не менее 2-х символов'"/>
      <InputError :condition="longNameErr" :text="'Имя должно содержать не более 30-и символов'"/>
      <textarea v-model="comment.text" placeholder="Введите комментарий"></textarea>
      <InputError :condition="shortTextErr" :text="'Текст должен содержать не менее 5-и символов'"/>
      <InputError :condition="longTextErr" :text="'Текст должен содержать не более 1000-и символов'"/>
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
      shortNameErr: false,
      shortTextErr: false,
      longNameErr: false,
      longTextErr: false
    }
  },
  methods: {
    handleSubmit() {
      this.shortNameErr = this.comment.name.trim().length < 2
      this.shortTextErr = this.comment.text.trim().length < 5
      this.longNameErr = this.comment.name.trim().length > 30
      this.longTextErr = this.comment.text.trim().length > 1000
      if (this.shortNameErr || this.shortTextErr || this.longNameErr || this.longTextErr) {
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
  word-break: break-word;
  hyphens: auto;
}

form {
  width: 96%;
  margin: auto;
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
}

form button {
  width: 40%;
  margin: 0px 30% 12px;
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

@media (max-width: 768px) {
  h2 {
    padding: 12px;
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

  form button {
    margin: 0px 30% 10px;
    padding: 10px;
    font-size: 18px;
  }
}

@media (max-width: 425px) {
  h2 {
    padding: 8px;
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

  form button {
    margin: 0px 30% 8px;
    padding: 8px;
    font-size: 14px;
  }
}
</style>