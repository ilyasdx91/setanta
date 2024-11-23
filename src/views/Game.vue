<template>
  <div class="game-container">
    <!-- Сообщение для портретной ориентации -->
    <div v-if="isPortrait" class="orientation-warning">
      <p>
        Пожалуйста, переверните устройство в альбомный режим, чтобы начать игру.
      </p>
    </div>

    <!-- Игра -->
    <div v-else>
      <begin-game @countdownFinished="showQuestions" v-if="!showQuiz" />
      <quiz-questions v-else :questions="questions" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BeginGame from '@/components/BeginGame.vue'
import QuizQuestions from '@/components/QuizQuestions.vue'

const showQuiz = ref(false)
const questions = ref([
  { id: 1, question: 'Что это?' },
  { id: 2, question: 'Где это?' },
  { id: 3, question: 'Как это?' },
])

const isPortrait = ref(true) // Флаг для текущей ориентации

// Показываем вопросы после завершения отсчета
const showQuestions = () => {
  showQuiz.value = true
}

// Проверка текущей ориентации
const checkOrientation = () => {
  try {
    const orientation = window.Telegram?.WebApp?.isOrientationLocked
    isPortrait.value = !orientation // Если не заблокировано, это портретный режим
    console.log(
      `Текущая ориентация: ${isPortrait.value ? 'портретная' : 'альбомная'}`,
    )
  } catch (err) {
    console.error('Ошибка проверки ориентации:', err)
  }
}

// Блокировка альбомной ориентации
const lockOrientationLandscape = () => {
  try {
    window.Telegram.WebApp.lockOrientation('landscape')
    console.log(
      'Ориентация заблокирована на альбомный режим через Telegram.WebApp',
    )
  } catch (err) {
    console.error('Ошибка блокировки ориентации через Telegram.WebApp:', err)
  }
}

// Слушатель изменения ориентации
const onOrientationChange = () => {
  checkOrientation()
  if (!isPortrait.value) {
    lockOrientationLandscape() // Блокируем альбомный режим
  }
}

onMounted(() => {
  checkOrientation()

  // Устанавливаем слушатель изменения ориентации
  window.Telegram.WebApp.onEvent('orientationChanged', onOrientationChange)

  // Автоматическая блокировка альбомной ориентации, если уже возможно
  if (!isPortrait.value) {
    lockOrientationLandscape()
  }
})

onBeforeUnmount(() => {
  // Удаляем слушатель при размонтировании компонента
  window.Telegram.WebApp.offEvent('orientationChanged', onOrientationChange)
})
</script>

<style scoped>
.orientation-warning {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f0f0;
}

.orientation-warning p {
  font-size: 1.5rem;
  color: #333;
}
</style>
