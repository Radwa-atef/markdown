import { createApp } from 'vue'
import App from './App.vue'
import {vMarkdown} from './directives/vMarkdown';
import router from './router'
// createApp(App).use(router).mount('#app')

createApp(App).directive("markdown",vMarkdown).use(router).mount('#app')
