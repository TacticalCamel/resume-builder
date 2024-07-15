import { createApp, reactive, watch } from 'vue'
import { getDefaultSettings } from "@/models/SettingsModel";
import type SettingsModel from "@/models/SettingsModel";
import App from './components/App.vue'
import './assets/style.css'

// reactive model for site settings and resume data
// the entire app shares a single instance of this model, and we want to avoid prop drilling, so reactive might be the best choice
export const settings: SettingsModel = reactive(loadSettings());

// watch for changes in the settings model
watch(settings, saveSettings, {deep: true});

// initialize the app
createApp(App).mount('#app');

function loadSettings(): SettingsModel {
    // attempt to load model from local storage
    const json: string | null = localStorage.getItem('settings');

    // if there is a saved value, parse it and return it
    if (json != null) {
        return JSON.parse(json);
    }
    // otherwise return the default settings
    else{
        return getDefaultSettings();
    }
}

function saveSettings(value: SettingsModel): void {
    localStorage.setItem('settings', JSON.stringify(value));
}