import constants from './constants.js'
import axios from 'axios'
import { i18n } from '@/i18n' // Импорт i18n для получения текущего языка

const instance = axios.create({
  //baseURL: 'http://192.168.31.118:5555/api/',
  baseURL: constants.ApiBaseUrl,
  timeout: 10000 // Укажите таймаут, если нужно
})

// Добавляем интерсептор для установки заголовков
instance.interceptors.request.use(
  config => {
    // Установка Accept-Language из i18n
    config.headers['Accept-Language'] = i18n.global.locale

    // Если в запросе есть тело, например, для POST
    if (config.data && typeof config.data === 'object') {
      config.headers['Content-Type'] = 'application/json'
    }

    return config
  },
  error => Promise.reject(error)
)

export default instance
