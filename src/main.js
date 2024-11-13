// import './assets/main.css'
import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import Header from './components/Header.vue'

const app = createApp(App)

app.component('Header', Header)

app.use(createPinia())
app.use(router)

app.mount('#app')
