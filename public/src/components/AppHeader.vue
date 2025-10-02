<template>
    <header>
        <h1>Новостной сайт</h1>
        <h2>Интересные статьи из мира программирования</h2>
    </header>
</template>

<script>
export default {
    name: "AppHeader"
}
</script>

<style scoped>
header {
    position: relative;
    display: flex;
    flex-direction: column;
    background-image: url("../../public/img/background.jpg");
    background-size: cover;  
    background-position: center;
    width: 100%;
    height: 66vh;
    justify-content: flex-start;
    padding-top: 34vh;
    align-items: center;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 700;
}

header h1{
    font-size: 68px;
    text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.4);
}

header h2{
    font-size: 34px;
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
    text-align: center;
}

@media (max-width: 1024px) {
  header h1 {font-size: 56px;}
  header h2 {font-size: 28px;}
  header {height: 64vh; padding-top: 36vh;}
}

@media (max-width: 768px) {
  header h1 {font-size: 40px;}
  header h2 {font-size: 20px;}
  header {height: 100%; padding: 20px 0; justify-content: center; background-size: 150%;}
}

@media (max-width: 425px) {
  header h1 {font-size: 28px;}
  header h2 {font-size: 14px;}
  header {background-size: 200%;}
}
</style>