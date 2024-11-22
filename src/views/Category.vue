<template>
  <category-header></category-header>

  <Alert message="Hello!" />

  <div class="category">
    <img src="@/assets/img/image-category.png" alt="" />
    <div class="inner">
      <!-- <pre>{{ accelerometer }}</pre> -->
      <pre>IsStarted: {{ accelerometer.ac.isStarted }}</pre>
      <pre>X: {{ accelerometer.ac.x }}</pre>
      <pre>Y: {{ accelerometer.ac.y }}</pre>
      <pre>Z: {{ accelerometer.ac.z }}</pre>
      <pre>T: {{ accelerometer.ac.z }}</pre>
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
import { ref, reactive, onMounted, onBeforeUnmount, computed } from 'vue'
import CategoryHeader from '@/components/CategoryHeader.vue'

const tg = reactive(window.Telegram.WebApp)
//let t = ref(0)

// Accelerometer
// const user = ref({ name: 'John', age: 30 }); // Создает реактивную ссылку на объект
// console.log(user.value.name); // Выведет 'John'

//const accelerometer = ref({ X: tg.Accelerometer }) // Создает реактивную ссылку на объект
//const accelerometerIsStarted = ref(tg.Accelerometer.isStarted)
//const accelerometerX = ref(tg.Accelerometer.x)
//const accelerometerY = ref(tg.Accelerometer.y)
//const accelerometerZ = ref(tg.Accelerometer.z)

const accelerometer = computed(() => {
  return {
    ac: tg.Accelerometer,
    //t: t
  }
})
onMounted(() => {
  tg.requestFullscreen()
  tg.Accelerometer.start()
  //console.log(tg.Accelerometer.isStarted)
  //console.log(tg.Accelerometer.x)
  //console.log(tg.Accelerometer.y)
  //console.log(tg.Accelerometer.z)
  console.log(tg)
  // setInterval(() => {
  //   t.value++
  // }, 100)
})
</script>
