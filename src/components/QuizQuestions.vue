<template>
  <div class="container">
    <div v-if="currentQuestion" class="question-wrap" @click="handleClick">
      <div class="question-head">
        <router-link :to="{ name: 'Category', params: { id: 1 } }" class="btn">
          <i>
            <svg
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.78976 0.410051C9.33649 0.956784 9.33649 1.84322 8.78976 2.38995L4.1797 7L8.78976 11.6101C9.33649 12.1568 9.33649 13.0432 8.78976 13.5899C8.24302 14.1367 7.35659 14.1367 6.80986 13.5899L1.20986 7.98995C0.663121 7.44322 0.663121 6.55678 1.20986 6.01005L6.80986 0.410051C7.35659 -0.136683 8.24302 -0.136684 8.78976 0.410051Z"
                fill="white"
              />
            </svg>
          </i>
          {{ $t('back') }}
        </router-link>

        <div class="right">
          <div class="cards">
            <i>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="9.3658"
                  y="2.22474"
                  width="13"
                  height="16"
                  rx="2"
                  transform="rotate(15 9.3658 2.22474)"
                  stroke="white"
                  stroke-width="2"
                />
                <rect
                  x="3"
                  y="3"
                  width="13"
                  height="16"
                  rx="2"
                  fill="black"
                  stroke="white"
                  stroke-width="2"
                />
              </svg>
            </i>
            {{ questionProgress }}
          </div>

          <div class="timer">{{ formattedTime }}</div>
        </div>
      </div>

      <div class="question" :key="currentIndex">
        <div v-if="answerStatus === 'correct'" class="answer-status">
          <span class="checkmark">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.5 30L27.5 35L37.5 25M52.5 30C52.5 42.4264 42.4264 52.5 30 52.5C17.5736 52.5 7.5 42.4264 7.5 30C7.5 17.5736 17.5736 7.49997 30 7.49997C42.4264 7.49997 52.5 17.5736 52.5 30Z"
                stroke="#4CD964"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
        <div v-if="answerStatus === 'incorrect'" class="answer-status">
          <span class="cross">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 35.0001L30 30.0001M30 30.0001L35 25.0001M30 30.0001L25 25.0001M30 30.0001L35 35.0001M52.5 30.0001C52.5 42.4265 42.4264 52.5001 30 52.5001C17.5736 52.5001 7.5 42.4265 7.5 30.0001C7.5 17.5737 17.5736 7.50012 30 7.50012C42.4264 7.50012 52.5 17.5737 52.5 30.0001Z"
                stroke="#FC5F55"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
        <p :style="{ color: currentAnswerColor }">
          {{ currentQuestion.question }}
        </p>
      </div>

      <!-- <pre>{{ currentIndex }}</pre>      <pre> {{ questionProgress }}</pre> -->

      <div class="question-footer">
        <!-- progress-bar -->
        <router-link :to="{ name: 'Category', params: { id: 1 } }" class="btn">
          {{ $t('finish') }}
        </router-link>
      </div>
    </div>

    <div v-else class="end-message">
      <router-link :to="{ name: 'Category', params: { id: 1 } }" class="btn">
        <i>
          <svg
            width="10"
            height="14"
            viewBox="0 0 10 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.78976 0.410051C9.33649 0.956784 9.33649 1.84322 8.78976 2.38995L4.1797 7L8.78976 11.6101C9.33649 12.1568 9.33649 13.0432 8.78976 13.5899C8.24302 14.1367 7.35659 14.1367 6.80986 13.5899L1.20986 7.98995C0.663121 7.44322 0.663121 6.55678 1.20986 6.01005L6.80986 0.410051C7.35659 -0.136683 8.24302 -0.136684 8.78976 0.410051Z"
              fill="white"
            />
          </svg>
        </i>
      </router-link>
      <div class="msg">
        <i>🥳</i>
        <h6>You got 8 cards!</h6>
        <p>out of 21 cards</p>
      </div>
      <button class="btn btn-yellow-transparent">Play this deck again</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useGameSettingsStore } from '@/stores/gameSettings'

//==========================
const gameSettings = useGameSettingsStore()

// Таймер отсчета
const timeLeft = ref(gameSettings.gameTime)
const timerInterval = ref(null)

// Форматирование времени для отображения
const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
})

// Начало отсчета времени
const startTimer = () => {
  timerInterval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timerInterval.value)
      // Завершаем игру, когда время истекло
      currentQuestion.value = null // Можно здесь реализовать завершение игры
      emit('gameEnded') // Сообщаем об окончании игры
    }
  }, 1000)
}
//==========================

const props = defineProps({
  questions: {
    type: Array,
    required: true,
  },
})

const currentQuestion = ref(null)
const currentAnswerColor = ref('#FFD106')
const answerStatus = ref('') // 'correct' | 'incorrect' | ''
const currentIndex = ref(0)

const correctAnswers = ref(0)
const totalQuestions = ref(props.questions.length) // Инициализируем здесь
const isQuizActive = ref(false) // Флаг для активности викторины

// Подсчет текущего номера вопроса и общего количества
const questionProgress = computed(() => {
  console.log(
    `Progress updated: ${currentIndex.value + 1}/${props.questions.length}`,
  )
  return `${currentIndex.value + 1}/${props.questions.length}`
})

const showNextQuestion = () => {
  // Сброс состояния ответа перед показом следующего вопроса
  answerStatus.value = '' // Сбросить статус ответа
  currentAnswerColor.value = '#FFD106' // Вернуть исходный цвет

  if (currentIndex.value < props.questions.length) {
    currentQuestion.value = props.questions[currentIndex.value]
  } else {
    currentQuestion.value = null
  }
}

const handleClick = event => {
  if (!currentQuestion.value) return // Игнорируем клики, если нет текущего вопроса
  const position =
    event.clientY < window.innerHeight / 2 ? 'correct' : 'incorrect'
  if (position === 'correct') {
    answerStatus.value = 'correct'
    currentAnswerColor.value = '#4CD964'
  } else {
    answerStatus.value = 'incorrect'
    currentAnswerColor.value = '#FC5F55'
  }

  setTimeout(() => {
    if (currentIndex.value < props.questions.length - 1) {
      currentIndex.value++ // Индекс увеличивается
      showNextQuestion() // Показать следующий вопрос
    } else {
      currentQuestion.value = null // Завершаем викторину
      emit('gameEnded') // Сообщаем родителю, что игра закончена
    }
  }, 1000)
}

let lastTiltTime = 0

const handleTilt = data => {
  const currentTime = Date.now()
  if (!currentQuestion.value || currentTime - lastTiltTime < 1000) return

  lastTiltTime = currentTime

  const { beta } = data

  if (beta < -10) {
    // Наклон вперед (верхняя часть вниз) - правильный ответ
    answerStatus.value = 'correct'
    currentAnswerColor.value = '#4CD964'
    correctAnswers.value++
    window.Telegram.WebApp.HapticFeedback.impactOccurred('light') // тактильный отклик
  } else if (beta > 10) {
    // Наклон назад (верхняя часть вверх) - неправильный ответ
    answerStatus.value = 'incorrect'
    currentAnswerColor.value = '#FC5F55'
    window.Telegram.WebApp.HapticFeedback.impactOccurred('light') // тактильный отклик
  }

  setTimeout(showNextQuestion, 1000)
}

//=====================================================

const startQuiz = () => {
  currentIndex.value = 0
  correctAnswers.value = 0
  showNextQuestion()
  timeLeft.value = gameSettings.gameTime
  startTimer()
  isQuizActive.value = true
}

onMounted(() => {
  isQuizActive.value = true // Установить isQuizActive в true здесь

  if (window.Telegram.WebApp) {
    window.Telegram.WebApp.onEvent('device_orientation', handleTilt)
  }
  startQuiz()
})

onBeforeUnmount(() => {
  if (window.Telegram.WebApp) {
    window.Telegram.WebApp.offEvent('device_orientation', handleTilt)
  }
  clearInterval(timerInterval.value)
})

//=====================================================
</script>

<style scoped lang="scss">
.quiz-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.question-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: calc(100vh - 70px);
  .question-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    font-size: 16px;
    font-weight: 700;
    .btn {
      display: flex;
      align-items: center;
      text-transform: uppercase;

      i {
        margin-right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .cards {
        display: flex;
        align-items: center;
        margin-right: 30px;
        opacity: 0.3;
        i {
          margin-right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .question {
    position: relative;
    .answer-status {
      position: absolute;
      top: -60px;
      left: 50%;
      margin-left: -30px;
    }

    p {
      font-weight: 700;
      font-size: 60px;
      color: #fdd106;
      text-align: center;
    }

    .checkmark {
      color: #4cd964;
    }

    .cross {
      color: #fc5f55;
    }
  }
  .question-footer {
    padding: 20px;
    .btn {
      display: block;
      font-size: 28px;
      font-weight: 700;
      color: #fdd106;
      text-align: center;
      text-transform: uppercase;
    }
  }
}

.end-message {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 100vh;
  padding: 20px 0;

  .msg {
    text-align: center;
    color: #fff;
    i {
      font-size: 56px;
      font-style: normal;
    }
    h6 {
      font-size: 28px;
      font-weight: 700;
      margin: 5px 0;
    }
    p {
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
