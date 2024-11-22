<template>
  <category-header></category-header>

  <div class="category">
    <img src="@/assets/img/image-category.png" alt="" />
    <div class="inner">
      <!-- <pre>{{ accelerometer }}</pre> -->
      <!-- <pre>IsStarted: {{ accelerometer.isStarted }}</pre> -->
      <pre>Alpha (Z-axis rotation): {{ orientation.alpha }}</pre>
      <pre>Beta (X-axis tilt): {{ orientation.beta }}</pre>
      <pre>Gamma (Y-axis tilt): {{ orientation.gamma }}</pre>

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
import { reactive, onMounted, onUnmounted, ref } from 'vue'
import CategoryHeader from '@/components/CategoryHeader.vue'

// Реактивные данные для ориентации устройства
const orientation = reactive({
  alpha: 0, // Вращение вокруг оси Z
  beta: 0, // Наклон вперед/назад (ось X)
  gamma: 0, // Наклон влево/вправо (ось Y)
})

const isFullscreen = ref(false)

// Переключение полноэкранного режима
const toggleFullscreen = () => {
  if (!isFullscreen.value) {
    window.Telegram.WebApp.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

// Переменная для хранения ID анимации
let animationFrameId = null

// Обновление данных ориентации через requestAnimationFrame
const updateOrientation = () => {
  const deviceOrientation = window.Telegram?.WebApp?.DeviceOrientation

  if (deviceOrientation && deviceOrientation.alpha !== null) {
    orientation.alpha = deviceOrientation.alpha || 0
    orientation.beta = deviceOrientation.beta || 0
    orientation.gamma = deviceOrientation.gamma || 0

    // Запускаем следующий кадр обновления
    animationFrameId = requestAnimationFrame(updateOrientation)
  }
}

onMounted(() => {
  // Включаем полноэкранный режим при монтировании компонента
  toggleFullscreen()
  if (window.Telegram?.WebApp?.lockOrientation) {
    window.Telegram.WebApp.lockOrientation('landscape')
  }
  console.log(window.Telegram?.WebApp)

  const deviceOrientation = window.Telegram?.WebApp?.DeviceOrientation
  if (deviceOrientation) {
    // Запуск отслеживания ориентации через API Telegram WebApp
    deviceOrientation.start() // Правильный способ запустить отслеживание
    updateOrientation() // Начинаем обновление данных в реальном времени
  } else {
    console.error('DeviceOrientation не доступен.')
  }
})

onUnmounted(() => {
  // Останавливаем обновления при размонтировании компонента
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  const deviceOrientation = window.Telegram?.WebApp?.DeviceOrientation
  if (deviceOrientation) {
    // Останавливаем отслеживание ориентации
    deviceOrientation.stop() // Правильный способ остановить отслеживание
  }
})
</script>
