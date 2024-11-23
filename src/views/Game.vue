<template>
  <div class="game-container">
    <!-- Сообщение для портретной ориентации -->
    <div v-if="isPortrait" class="orientation-warning">
      <p>
        Пожалуйста, переверните устройство в альбомный режим, чтобы начать игру.
      </p>
    </div>

    <!-- Игровой интерфейс -->
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

// Проверяем ориентацию
const checkOrientation = () => {
  isPortrait.value = window.innerWidth < window.innerHeight
  console.log(`Ориентация: ${isPortrait.value ? 'портретная' : 'альбомная'}`)
}

// Устанавливаем альбомную ориентацию через Telegram API
const lockLandscape = () => {
  try {
    window.Telegram?.WebApp?.lockOrientation('landscape')
    console.log('Ориентация заблокирована на альбомный режим.')
  } catch (error) {
    console.error('Не удалось заблокировать альбомный режим:', error)
  }
}

// Слушатель изменений размера окна (как резервный вариант)
const handleResize = () => {
  checkOrientation()
  if (!isPortrait.value) {
    lockLandscape()
  }
}

onMounted(() => {
  // Проверяем начальное состояние
  checkOrientation()

  // Подписываемся на изменения размера окна
  window.addEventListener('resize', handleResize)

  // Также пробуем сразу заблокировать ориентацию
  if (!isPortrait.value) {
    lockLandscape()
  }
})

onBeforeUnmount(() => {
  // Отписываемся от события изменения размера окна
  window.removeEventListener('resize', handleResize)
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
