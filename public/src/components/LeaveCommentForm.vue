<template>
  <section>
    <h2>Оставьте комментарий</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="comment.name" placeholder="Введите имя">
      <transition name="fade-out">
        <div class="inputError" v-if="nameError">
          <p>Имя слишком короткое</p>
        </div>
      </transition>
      <textarea v-model="comment.text" placeholder="Введите комментарий"></textarea>
      <transition name="fade-out">
        <div class="inputError" v-if="textError">
          <p>Введите больше текста</p>
        </div>
      </transition>
      <button type="submit">Отправить</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "LeaveCommentForm",
  props: {
    article_id: {
      type: String,
      required: true
    }
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
form input, form textarea {
  display: block;
  width: calc(100% - 60px);
  margin: 0 30px 20px;
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

form .inputError p {
  width: calc(100% - 60px);
  margin: -10px 30px 20px;
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