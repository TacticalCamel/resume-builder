import './assets/style.css'
import { createApp } from 'vue'
import NavigationService from "@/services/NavigationService";
import ThemeService from "@/services/ThemeService";
import FontService from "@/services/FontService";
import App from './components/App.vue'

// initialize singleton services
export const navigationService: NavigationService = new NavigationService();
export const themeService: ThemeService = new ThemeService();
export const fontService: FontService = new FontService('--font-family');

// initialize the app
createApp(App).mount('#app');