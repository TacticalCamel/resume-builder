import './assets/style.css'
import {createApp} from 'vue'
import App from './App.vue'

import type Model from "@/data/Model";

const init = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

const json = await fetch('0.json', init).then(async res => {
    return await res.json();
});

export const model: Model = json as Model;

createApp(App).mount('#app')