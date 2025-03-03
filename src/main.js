// import './assets/main.css'
import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import i18n from './i18n'
import router from './router'

import { VueTelegramPlugin } from 'vue-tg'

import Header from './components/Header.vue'

import { getAudioContext } from '@/audio.js'

getAudioContext()

const app = createApp(App)

app.component('Header', Header)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(VueTelegramPlugin)

app.mount('#app')
