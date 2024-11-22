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
import { ref, reactive, onMounted, watchEffect, computed } from 'vue'
import CategoryHeader from '@/components/CategoryHeader.vue'

const accelerometer = reactive({
  isStarted: false,
  x: 0,
  y: 0,
  z: 0,
})

onMounted(() => {
  const accel = window.Telegram?.WebApp?.Accelerometer

  if (accel) {
    try {
      window.Telegram.WebApp.requestFullscreen() // Переход в полноэкранный режим
      accel.start() // Запуск акселерометра

      watchEffect(() => {
        accelerometer.isStarted = accel.isStarted
        accelerometer.x = accel.x
        accelerometer.y = accel.y
        accelerometer.z = accel.z
      })
    } catch (error) {
      console.error(
        'Ошибка при запуске акселерометра или переходе в полноэкранный режим:',
        error,
      )
    }
  } else {
    console.error('Акселерометр не поддерживается.')
  }
})

//let t = ref(0)

// Accelerometer
// const user = ref({ name: 'John', age: 30 }); // Создает реактивную ссылку на объект
// console.log(user.value.name); // Выведет 'John'

//const accelerometer = ref({ X: tg.Accelerometer }) // Создает реактивную ссылку на объект
//const accelerometerIsStarted = ref(tg.Accelerometer.isStarted)
//const accelerometerX = ref(tg.Accelerometer.x)
//const accelerometerY = ref(tg.Accelerometer.y)
//const accelerometerZ = ref(tg.Accelerometer.z)

// const accelerometer = computed(() => {
//   return {
//     ac: tg.Accelerometer,
//     //t: t
//   }
// })
</script>
