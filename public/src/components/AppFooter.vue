<template>
    <footer>
      <p>© 2025 IT News. Все права защищены</p>
      <p>Некоммерческий учебный проект</p>
    </footer>
</template>

<script>
export default {
    name: "AppFooter"
}
</script>

<style scoped>
footer {
    text-align: center;
    background-color: #222222;
    padding: 30px;
    color: white;
    font-size: 24px;
    font-weight: 600;
}

@media (max-width: 1024px) {
  footer {font-size: 21px;}
}

@media (max-width: 768px) {
  footer {font-size: 16px;}
}

@media (max-width: 425px) {
  footer {font-size: 11px;}
}
</style>