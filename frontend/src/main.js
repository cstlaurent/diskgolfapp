import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import '@fortawesome/fontawesome-free'

import { router } from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
