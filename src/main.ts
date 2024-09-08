import './assets/style.css'
import { createApp } from 'vue'
import { fontInjectionKey, navigationInjectionKey, themesInjectionKey } from "@/services/keys";
import { fontService, navigationService, themeService } from "@/services/services";
import App from './components/App.vue'

// create the app
const app = createApp(App);

// inject app-level services
app.provide(themesInjectionKey, themeService);
app.provide(fontInjectionKey, fontService);
app.provide(navigationInjectionKey, navigationService);

// initialize the app
app.mount('#app');