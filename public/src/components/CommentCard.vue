<template>
  <section class="comment">
    <div class="header">
      <p><strong>{{ comment.name }}</strong></p>
      <button v-if="admin" @click="$emit('remove', comment._id)">Удалить</button>
    </div>
    <hr>
    <p>{{ comment.text }}</p>
    <span>{{ new Date(comment.published).toLocaleString() }}</span>
  </section>
</template>

<script>
export default {
  name: "CommentCard",
  props: {
    comment: {
      type: Object,
      required: true
    },
    admin: {
      type: Boolean,
      required: false
    }
  },
}
</script>

<style scoped>
.comment {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  margin: 0 30px 20px;
}
.comment p {
  font-size: 20px;
  padding: 0;
  margin-bottom: 10px;
}

.comment span {
  align-self: flex-end;
  font-size: 16px;
}

.comment hr {
  margin-bottom: 5px;
}

.comment:last-child {
    margin-bottom: 0;
}

.header {
  display: flex;
  justify-content: space-between;
}

.header button {
  width: 100px;
  padding: 8px;
  font-size: 16px;
  margin-bottom: 10px;
  color: white;
  font-weight: 500;
  background-color: #222222;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease;
}

.header button:hover {
  transform: scale(1.1);
  background-color: #000000;
}

.header p {
  margin-top: 10px;
}
</style>