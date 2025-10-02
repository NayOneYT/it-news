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
  margin: 0 2% 12px;
}

.comment:last-child {
  margin-bottom: 0;
}

p {
  font-size: 20px;
  padding: 0;
  margin-bottom: 10px;
  word-break: break-word;
  hyphens: auto;
}

span {
  align-self: flex-end;
  font-size: 16px;
}

hr {
  margin-bottom: 5px;
}

.header {
  display: flex;
  justify-content: space-between;
}

button {
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

@media (max-width: 768px) {
  .comment {
    padding: 8px;
    margin: 0 2% 10px;
  }

  p {
    font-size: 18px;
    margin-bottom: 8px;
  }

  hr {
    margin-bottom: 4px;
  }
  
  span {
    font-size: 14px;
  }

  button {
    width: 80px;
    padding: 7px;
    font-size: 14px;
    margin-bottom: 8px;
  }

  .header p {
    margin-top: 8px;
  }
}

@media (max-width: 425px) {
  .comment {
    padding: 6px;
    margin: 0 2% 8px;
  }

  p {
    font-size: 14px;
    margin-bottom: 6px;
  }

  hr {
    margin-bottom: 3px;
  }
  
  span {
    font-size: 11px;
  }

  button {
    width: 60px;
    padding: 6px;
    font-size: 11px;
    margin-bottom: 6px;
  }

  .header p {
    margin-top: 6px;
  }
}
</style>