import { createApp } from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from 'axios'

import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
import { all } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

import $httpMessageState from '@/libs/pushMessageState'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import { date, currency } from './libs/filters'
import  { CkeditorPlugin }from '@ckeditor/ckeditor5-vue'

Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule)
})

configure({
  generateMessage: localize({ zh_TW: zhTW })
})
setLocale('zh_TW')

const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency
}

app.config.globalProperties.$httpMessageState = $httpMessageState

app.use(router)
app.use(VueAxios, axios)
app.use( CkeditorPlugin )

app.component('VeeForm', Form)
app.component('VeeField', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('VeeLoading', Loading)

app.mount('#app')
