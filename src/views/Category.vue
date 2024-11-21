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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import CategoryHeader from '@/components/CategoryHeader.vue'

const tg = window.Telegram.WebApp

// Accelerometer
// const user = ref({ name: 'John', age: 30 }); // Создает реактивную ссылку на объект
// console.log(user.value.name); // Выведет 'John'

//const accelerometer = ref({ X: tg.Accelerometer }) // Создает реактивную ссылку на объект
//const accelerometerIsStarted = ref(tg.Accelerometer.isStarted)
//const accelerometerX = ref(tg.Accelerometer.x)
//const accelerometerY = ref(tg.Accelerometer.y)
//const accelerometerZ = ref(tg.Accelerometer.z)

const accelerometer = computed(() => {
  return tg.Accelerometer
})
onMounted(() => {
  tg.Accelerometer.start()
  console.log(tg.Accelerometer.isStarted)
  console.log(tg.Accelerometer.x)
  console.log(tg.Accelerometer.y)
  console.log(tg.Accelerometer.z)
})
</script>
