<template>
    <section class="comment">
        <p><strong>{{ comment.name }}</strong></p>
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
</style>