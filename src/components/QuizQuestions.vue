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
          BACK
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

          <div class="timer">0:51</div>
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
        progress-bar
        <router-link :to="{ name: 'Category', params: { id: 1 } }" class="btn">
          FINISH
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
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'

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
    }
  }, 1000)
}

onMounted(() => {
  showNextQuestion() // Покажите первый вопрос
  window.addEventListener('deviceorientation', checkOrientation) // Слушаем изменение ориентации устройства
})

// Обработка наклона устройства
let lastBeta = null // Для хранения последнего значения угла наклона
let lastTime = 0 // Время последнего срабатывания
const betaThreshold = 3 // Порог для изменения угла (в градусах)
const debounceTimeout = 1000 // Задержка между срабатываниями, чтобы избежать нескольких срабатываний подряд
const stableTimeout = 500 // Минимальная стабильная задержка, чтобы устройство "успокоилось" перед отслеживанием наклона

// Функция обработки события наклона устройства
const checkOrientation = event => {
  const beta = event.beta // угол наклона устройства по оси X (вперед/назад)
  const currentTime = Date.now()

  // Игнорируем маленькие изменения угла наклона (меньше порога)
  if (Math.abs(beta - lastBeta) < betaThreshold) return

  // Ожидаем, пока не пройдет время с последнего срабатывания (debounce)
  if (currentTime - lastTime < debounceTimeout) return
  lastTime = currentTime

  // Сначала проверяем, что устройство стабилизировалось
  if (Math.abs(beta) < 10) {
    // Если устройство лежит практически горизонтально (угол наклона меньше 10), игнорируем событие
    return
  }

  // Срабатывание только при значительном наклоне
  const position = beta > 0 ? 'incorrect' : 'correct' // Если наклон вперед (beta > 0), то неправильный ответ, иначе правильный

  // Устанавливаем статус ответа в зависимости от угла наклона
  if (position === 'correct') {
    answerStatus.value = 'correct'
    currentAnswerColor.value = '#4CD964' // Зеленый для правильного ответа
  } else {
    answerStatus.value = 'incorrect'
    currentAnswerColor.value = '#FC5F55' // Красный для неправильного ответа
  }

  // Переход к следующему вопросу после небольшой задержки
  setTimeout(() => {
    if (currentIndex.value < props.questions.length - 1) {
      currentIndex.value++ // Увеличиваем индекс вопроса
      showNextQuestion() // Показываем следующий вопрос
    } else {
      currentQuestion.value = null // Заканчиваем викторину
    }
  }, 1000)

  lastBeta = beta // Сохраняем текущий угол наклона для следующей проверки
}
onBeforeUnmount(() => {
  window.removeEventListener('deviceorientation', checkOrientation)
})
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
  min-height: 100vh;
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
