import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';



const vuetify = createVuetify({components, directives,});

import App from './App.vue'
import router from '@/router/index'

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)
app.mount('#app')

