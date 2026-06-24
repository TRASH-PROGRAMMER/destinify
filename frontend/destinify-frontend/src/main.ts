import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import router from './router'
import App from './App.vue'
import './style.css'
import './index.css'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(createPinia()).use(router).use(vuetify).mount('#app')
