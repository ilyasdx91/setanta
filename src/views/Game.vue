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
  const orientationLocked =
    window.Telegram?.WebApp?.isOrientationLocked || false
  console.log(`Ориентация заблокирована: ${orientationLocked}`)

  // Проверяем текущую ориентацию (портретная или альбомная)
  isPortrait.value = window.innerWidth < window.innerHeight
  console.log(`Ориентация: ${isPortrait.value ? 'портретная' : 'альбомная'}`)
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
  // Проверяем начальное состояние ориентации
  checkOrientation()

  // Регистрируем событие orientationChanged
  try {
    window.Telegram.WebApp.onEvent('orientationChanged', onOrientationChange)
    console.log('Слушатель orientationChanged успешно установлен.')
  } catch (err) {
    console.error('Ошибка при добавлении слушателя orientationChanged:', err)
  }

  // Автоматическая блокировка альбомной ориентации, если уже возможно
  if (!isPortrait.value) {
    lockOrientationLandscape()
  }
})

onBeforeUnmount(() => {
  // Удаляем слушатель при размонтировании компонента
  try {
    window.Telegram.WebApp.offEvent('orientationChanged', onOrientationChange)
    console.log('Слушатель orientationChanged успешно удалён.')
  } catch (err) {
    console.error('Ошибка при удалении слушателя orientationChanged:', err)
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
  background-color: #000;
}

.orientation-warning p {
  font-size: 1.5rem;
  color: #fff;
}
</style>
