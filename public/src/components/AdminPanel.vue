<template>
  <div id="adminPanel">
    <button @click="switchToModeration">Статьи на модерации</button>
    <button @click="switchToApproved">Подтвержденные статьи</button>
    <button @click="switchToMain">На главную</button>
  </div>
</template>

<script>
export default {
  name: "AdminPanel",
  mounted() {
    this.$nextTick(() => {
      const el = this.$el
      el.scrollIntoView()
    })
  },
  methods: {
    switchToModeration() {
      this.$router.push("/admin/moderation").catch(() => {})
    },
    switchToApproved() {
      this.$router.push("/admin/approved").catch(() => {})
    },
    switchToMain() {
      this.$router.push("/").catch(() => {})
    }
  }
}
</script>

<style scoped>
button:first-child {
  margin-top: 15px;
}

button {
  width: 90%;
  padding: 12px;
  font-size: 16px;
  color: white;
  margin-bottom: 15px;
  font-weight: 500;
  margin-left: 5%;
  background-color: #222222;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 300ms ease;
}

button:hover {
  transform: scale(1.1);
  background-color: #000000;
}
</style>