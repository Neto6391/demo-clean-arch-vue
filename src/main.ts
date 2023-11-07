import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { todoController } from './module/di/di'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Configure a injeção de dependências no ponto de entrada
app.provide('todoController', todoController());

app.mount('#app')