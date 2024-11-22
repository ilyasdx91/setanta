<template>
  <category-header></category-header>

  <Alert message="Hello!" />

  <div class="category">
    <img src="@/assets/img/image-category.png" alt="" />
    <div class="inner">
      <!-- <pre>{{ accelerometer }}</pre> -->
      <pre>IsStarted: {{ accelerometer.isStarted }}</pre>
      <pre>X: {{ accelerometer.x }}</pre>
      <pre>Y: {{ accelerometer.y }}</pre>
      <pre>Z: {{ accelerometer.z }}</pre>

      <h1>Sport trophies</h1>
      <p>
        Describe sport trophies. Just make sure your friends guess what trophy
        you are showing
      </p>
      <router-link :to="{ name: 'Game' }" class="btn btn-yellow">
        {{ $t('start') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  watchEffect,
  computed,
} from 'vue'
import CategoryHeader from '@/components/CategoryHeader.vue'

const accelerometer = reactive({
  isStarted: false,
  x: 0,
  y: 0,
  z: 0,
})

const isFullscreen = ref(false)
let animationFrameId = null

const toggleFullscreen = () => {
  if (!isFullscreen.value) {
    window.Telegram.WebApp.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const updateAccelerometer = () => {
  const accel = window.Telegram?.WebApp?.Accelerometer

  if (accel) {
    accelerometer.isStarted = accel.isStarted
    accelerometer.x = accel.x
    accelerometer.y = accel.y
    accelerometer.z = accel.z

    // Запускаем следующий кадр обновления
    animationFrameId = requestAnimationFrame(updateAccelerometer)
  } else {
    console.error('Акселерометр недоступен.')
  }
}

onMounted(() => {
  const accel = window.Telegram?.WebApp?.Accelerometer

  if (accel) {
    accel.start()
    updateAccelerometer() // Начинаем обновление данных в реальном времени
  }
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId) // Останавливаем обновления при размонтировании
  }
})
</script>
