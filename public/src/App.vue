<template>
  <main>
    <AppHeader />
    <CreateArticle />
    <router-view />
    <AppFooter />
  </main>
</template>

<script>
import AppHeader from "./components/AppHeader.vue"
import AppFooter from "./components/AppFooter.vue"
import CreateArticle from "./components/CreateArticle.vue";
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    CreateArticle
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
* {
    padding: 0;
    margin: 0;
    outline: none;
    font-family: "Montserrat", sans-serif;
}
main {
  background: url("../public/img/main-background.jpg");
  background-size: 100% auto;
}
</style>