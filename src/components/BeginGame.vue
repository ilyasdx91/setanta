<template>
  <span v-if="counter >= 0" :key="counter" class="countdown">
    {{ counter === 0 ? 'goooo!' : counter }}
  </span>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// Объявляем событие с помощью defineEmits
const emit = defineEmits(['countdownFinished'])

const counter = ref(3)

onMounted(() => {
  const timer = setInterval(() => {
    if (counter.value > 0) {
      counter.value--
    } else if (counter.value === 0) {
      counter.value = -1
      emit('countdownFinished') // Вызываем событие при завершении отсчёта
    } else {
      clearInterval(timer)
    }
  }, 1000)
})
</script>

<style scoped>
.countdown {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #ffd106;
  font-size: 128px;
  font-weight: 700;
  opacity: 0;
  animation: fadeInOut 1s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    font-size: 128px;
  }
  50% {
    opacity: 1;
    font-size: 150px;
  }
  100% {
    opacity: 0;
    font-size: 128px;
  }
}
</style>
