import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    categories: 'Categories',
    settings: 'Settings',
    round_duration: 'Round duration',
    change_language: 'Change language',
    how_to_play: 'How to play?',
    how_to_play_p_1:
      "You simply select a deck, hold your phone up to your forehead so that your friends can see the word or phrase but you can't, and then they try to get you to guess what the word or phrase is.",
    how_to_play_p_2:
      'If you guess correctly, tilt the phone downwards to mark it as correct and the game will move onto the next word.',
    how_to_play_p_3:
      "If you can't figure out the answer, tilt the phone upwards and it will pass and mark the answer as incorrect.",
    tilt_down: 'Tilt down – Correct',
    tilt_up: 'Tilt up – Skip',
    start: 'Start',
    back: 'Back',
    finish: 'Finish',
  },
  uk: {
    categories: 'Категорії',
    settings: 'Налаштування',
    round_duration: 'Тривалість раунду',
    change_language: 'Змінити мову',
    how_to_play: 'Як грати?',
    how_to_play_p_1:
      'Просто оберіть колоду, тримайте телефон біля чола так, щоб ваші друзі бачили слово або фразу, а ви ні. Вони повинні допомогти вам вгадати, що це за слово або фраза.',
    how_to_play_p_2:
      'Якщо ви вгадаєте правильно, нахиліть телефон вниз, щоб позначити це як правильну відповідь, і гра перейде до наступного слова.',
    how_to_play_p_3:
      'Якщо ви не можете знайти відповідь, нахиліть телефон вгору, і він пропустить це слово та позначить відповідь як неправильну.',
    tilt_down: 'Нахил вниз – Правильно',
    tilt_up: 'Нахил вгору – Пропустити',
    start: 'Старт',
    back: 'Назад',
    finish: 'Завершити',
  },
}

const i18n = createI18n({
  locale: 'en', // Язык по умолчанию
  fallbackLocale: 'en', // Резервный язык
  messages,
})

export default i18n
