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
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import BeginGame from '@/components/BeginGame.vue'
import QuizQuestions from '@/components/QuizQuestions.vue'

const showQuiz = ref(false)

const questions = ref([
  { id: 1, question: 'Что это?' },
  { id: 2, question: 'Где это?' },
  { id: 3, question: 'Как это?' },
])

const isPortrait = ref(true) // Флаг для проверки портретной ориентации

// Показываем вопросы после завершения отсчета
const showQuestions = () => {
  showQuiz.value = true
}

// Проверка ориентации устройства
const checkOrientation = () => {
  isPortrait.value = window.matchMedia('(orientation: portrait)').matches
}

// Блокировка ориентации в альбомном режиме
const lockOrientation = async () => {
  try {
    await screen.orientation.lock('landscape')
    console.log('Ориентация заблокирована на альбомный режим')
  } catch (err) {
    console.error('Не удалось заблокировать ориентацию:', err)
  }
}

onMounted(() => {
  // Проверяем ориентацию устройства при монтировании
  checkOrientation()

  // Добавляем слушатель изменений ориентации
  window.addEventListener('orientationchange', checkOrientation)

  // Если устройство в альбомной ориентации, блокируем её
  if (!isPortrait.value) {
    lockOrientation()
  }
})

onBeforeUnmount(() => {
  // Удаляем слушатель изменений ориентации
  window.removeEventListener('orientationchange', checkOrientation)

  // Снимаем блокировку ориентации, если она была установлена
  if (screen.orientation.unlock) {
    screen.orientation.unlock()
  }
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
