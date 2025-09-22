<template>
    <section id="articleList" ref="listRoot">
        <ArticleCard  
        v-for="el in articles" 
        :key="el._id" 
        :article="el"
        @readMore="$emit('readMore', el)"
        />
    </section>
</template>

<script>
import ArticleCard from './ArticleCard.vue';
export default {
    name: "ArticleList",
    props: {
        articles: {
            type: Array,
            required: true
        }
    },
    components: {
        ArticleCard
    }
}
</script>

<style scoped>
#articleList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}
</style>