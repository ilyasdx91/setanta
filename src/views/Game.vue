<template>
  <div class="game-container">
    <!-- Сообщение для портретной ориентации -->
    <div v-if="isPortrait" class="orientation-warning">
      <p>
        {{ $t('wrong_orientation') }}
      </p>
    </div>

    <!-- Игровой интерфейс -->
    <div v-else>
      <begin-game @countdownFinished="showQuestions" v-if="!showQuiz" />
      <quiz-questions
        v-else
        :categoryId="categoriesStore.category.id"
        :questions="categoriesStore.questions"
        @gameEnded="endGame"
      />
<!--      <pre>{{ categoriesStore.questions }}</pre>-->
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import BeginGame from '@/components/BeginGame.vue'
import QuizQuestions from '@/components/QuizQuestions.vue'

const categoriesStore = useCategoriesStore()
const route = useRoute()

const showQuiz = ref(false)

// const questions = ref([
//   { id: 1, question: 'Что это?' },
//   { id: 2, question: 'Где это?' },
//   { id: 3, question: 'Как это?' },
// ])

const isPortrait = ref(true) // Флаг для текущей ориентации

// Показываем вопросы после завершения отсчета
const showQuestions = () => {
  showQuiz.value = true
}

// Завершение игры: сброс ориентации
const endGame = () => {
  showQuiz.value = false
  unlockOrientation() // Отменяем фиксацию ориентации
}

// Проверяем ориентацию
const checkOrientation = () => {
  isPortrait.value = window.innerWidth < window.innerHeight
  //console.log(`Ориентация: ${isPortrait.value ? 'портретная' : 'альбомная'}`)
}

// Устанавливаем альбомную ориентацию через Telegram API
const lockLandscape = () => {
  try {
    window.Telegram?.WebApp?.lockOrientation('landscape')
    const deviceOrientation = window.Telegram?.WebApp?.DeviceOrientation
    if (deviceOrientation) {
      deviceOrientation.start()
    }
    //console.log('Ориентация заблокирована на альбомный режим.')
  } catch (error) {
    //console.error('Не удалось заблокировать альбомный режим:', error)
  }
}

// Сбрасываем ориентацию к значениям по умолчанию
const unlockOrientation = () => {
  try {
    window.Telegram?.WebApp?.unlockOrientation()
    //console.log('Ориентация разблокирована.')
  } catch (error) {
    //console.error('Не удалось разблокировать ориентацию:', error)
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
  const categoryId = route.params.id // Получаем id из URL
  categoriesStore.fetchQuestions(categoryId)

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

  // Сбрасываем ориентацию
  unlockOrientation()
})
</script>

<style scoped>
.game-container {
  min-height: calc(100vh - 70px);
}

.orientation-warning {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px);
  text-align: center;
  background-color: #000;
}

.orientation-warning p {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fdd106;
}
</style>
