// import './assets/main.css'
import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import i18n from './i18n'
import router from './router'

import { VueTelegramPlugin } from 'vue-tg'

import Header from './components/Header.vue'

const app = createApp(App)

app.component('Header', Header)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(VueTelegramPlugin)

const _audioContext = window.AudioContext || window.webkitAudioContext
app.config.globalProperties.audioCtx = _audioContext

app.mount('#app')
