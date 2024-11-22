<template>
  <category-header></category-header>

  <Alert message="Hello!" />

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
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import CategoryHeader from '@/components/CategoryHeader.vue';

// Реактивные данные для ориентации устройства
const orientation = reactive({
  alpha: 0, // Вращение вокруг оси Z
  beta: 0,  // Наклон вперед/назад (ось X)
  gamma: 0, // Наклон влево/вправо (ось Y)
});

const isFullscreen = ref(false);

// Переключение полноэкранного режима
const toggleFullscreen = () => {
  if (!isFullscreen.value) {
    window.Telegram.WebApp.requestFullscreen();
    isFullscreen.value = true;
  } else {
    document.exitFullscreen();
    isFullscreen.value = false;
  }
};

onMounted(() => {
  // Включаем полноэкранный режим при монтировании компонента
  toggleFullscreen();

  const accel = window.Telegram?.WebApp?.Accelerometer;

  if (accel) {
    accel.start(); // Запуск акселерометра

    // Устанавливаем интервал обновления данных
    setInterval(() => {
      orientation.alpha = accel.alpha || 0;  // Вращение по оси Z
      orientation.beta = accel.beta || 0;    // Наклон вперед/назад
      orientation.gamma = accel.gamma || 0;  // Наклон влево/вправо
    }, 100); // Обновление каждые 100 мс
  } else {
    console.error('Акселерометр недоступен.');
  }
});

onUnmounted(() => {
  const accel = window.Telegram?.WebApp?.Accelerometer;
  if (accel && accel.stop) {
    accel.stop(); // Остановка акселерометра при размонтировании компонента
  }
});
  // Убираем подписку на событие при размонтировании
  if (handleOrientationChange) {
    window.removeEventListener('deviceorientation', handleOrientationChange)
  }
})
</script>
