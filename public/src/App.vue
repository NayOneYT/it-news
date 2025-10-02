<template>
  <main>
    <AppHeader />
    <router-view class="page-content"/>
    <AppFooter />
  </main>
</template>

<script>
import AppHeader from "./components/AppHeader.vue"
import AppFooter from "./components/AppFooter.vue"
export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
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
  display: flex;
  flex-direction: column;
  background: url("../public/img/main-background.jpg");
  background-size: 100% auto;
  min-height: 100vh;
}

.page-content {
  flex: 1;
}
</style>