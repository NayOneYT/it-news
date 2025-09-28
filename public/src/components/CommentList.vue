<template>
    <section>
        <h2>Комментарии ({{ comments.length }})</h2>
        <CommentCard 
        v-for="comment in comments" 
        :key="comment._id" 
        :comment="comment" 
        :admin="admin" 
        @remove="$emit('remove', $event)"/>
    </section>
</template>

<script>
import CommentCard from './CommentCard.vue';
export default {
    name: "CommentList",
    props: {
        comments: {
            type: Array,
            required: true
        },
        admin: {
            type: Boolean,
            required: false
        }
    },
    components: {
      CommentCard
    }
}
</script>

<style scoped>
h2 {
  padding: 15px;
  text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.4);
}
</style>