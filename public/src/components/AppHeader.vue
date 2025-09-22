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
    height: 69vh;
    justify-content: flex-start;
    padding-top: 31vh;
    align-items: center;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 700;
}

header h1{
    font-size: 72px;
    text-shadow: 3px 3px 4px rgba(0, 0, 0, 0.4);
}

header h2{
    font-size: 36px;
    text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
}
</style>