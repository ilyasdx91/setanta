<template>
  <span v-if="counter >= 0" :key="counter" class="countdown">
    {{ counter === 0 ? 'goooo!' : counter }}
  </span>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useGameSettingsStore } from '@/stores/gameSettings.js'
import { getAudioContext, playAudioContext } from '@/audio.js'

const gameSettings = useGameSettingsStore()
const audioCtx = getAudioContext()

// Объявляем событие с помощью defineEmits
const emit = defineEmits(['countdownFinished'])

const counter = ref(3)

let countdownBuffer = void 0

onMounted(() => {
  window.fetch(new URL('@/assets/sounds/countdown.mp3', import.meta.url).href)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer,
      audioBuffer => {
        countdownBuffer = audioBuffer
      },
      error =>
        console.error(error)
    )).then(() => {
    startAll()
  })
})

const startAll = () => {
  if (gameSettings.sounds && counter.value === 3) {
    try {
      //const audio = new Audio(new URL('@/assets/sounds/countdown.mp3', import.meta.url).href)
      //audio.play()
      playAudioContext(countdownBuffer)
    } catch { /* empty */
    }
  }
  const timer = setInterval(() => {
    if (counter.value > 0) {
      counter.value--
      if (gameSettings.sounds && counter.value > 0) {
        try {
          //const audio = new Audio(new URL('@/assets/sounds/countdown.mp3', import.meta.url).href)
          //audio.play()
          playAudioContext(countdownBuffer)
        } catch { /* empty */
        }
      }
    } else if (counter.value === 0) {
      counter.value = -1
      emit('countdownFinished') // Вызываем событие при завершении отсчёта
    } else {
      clearInterval(timer)
    }
  }, 1000)
}
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
