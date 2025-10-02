<template>
  <transition name="fade-out">
    <div class="inputError" v-if="condition">
      <p>{{ text }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    condition: {
      type: Boolean,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  name: "InputError"
}
</script>

<style scoped>
.inputError p {
  width: 100%;
  margin: 0 0 12px;
  padding: 10px;
  background-color: rgba(255, 0, 0, 0.3);
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  color: rgb(150, 0, 0);
}

.fade-out-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-out-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-out-leave-active {
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .inputError p {
    margin: 0 0 10px;
    padding: 8px;
    font-size: 14px;
  }
}

@media (max-width: 425px) {
  .inputError p {
    margin: 0 0 8px;
    padding: 6px;
    font-size: 11px;
  }
}
</style>