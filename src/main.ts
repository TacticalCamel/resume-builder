import { createApp, reactive, watch } from 'vue'
import { getDefaultSettings } from "@/models/SettingsModel";
import './assets/style.css'
import App from './components/App.vue'
import SettingsModel from "@/models/SettingsModel";
import LocalStorageService from "@/services/LocalStorageService";
import NavigationService from "@/services/NavigationService";
import ThemeService from "@/services/ThemeService";
import FontService from "@/services/FontService";

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
export const fontService: FontService = new FontService();

// initialize the app
createApp(App).mount('#app');