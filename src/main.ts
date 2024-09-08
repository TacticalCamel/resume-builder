import './assets/style.css'
import { createApp } from 'vue'
import App from './components/App.vue'

export const editableInjectionKey = Symbol();

// create the app
const app = createApp(App);

// initialize the app
app.mount('#app');