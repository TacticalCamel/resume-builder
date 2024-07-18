import { createApp, reactive, watch } from 'vue'
import { getDefaultSettings } from "@/models/SettingsModel";
import SettingsModel from "@/models/SettingsModel";
import App from './components/App.vue'
import './assets/style.css'
import NavigationService from "@/services/NavigationService";
import ThemeService from "@/services/ThemeService";
import LocalStorageService from "@/services/LocalStorageService";

const settingsStorage: LocalStorageService<SettingsModel> = new LocalStorageService<SettingsModel>('settings');
export const settings: SettingsModel = reactive(settingsStorage.load() ?? getDefaultSettings());

watch(settings, (model: SettingsModel) => {
    settingsStorage.save(model)
}, {
    deep: true
});

// initialize singleton services
export const navigationService: NavigationService = new NavigationService();
export const themeService: ThemeService = new ThemeService();

// initialize the app
createApp(App).mount('#app');