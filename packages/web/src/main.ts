import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

createApp(App).mount('#app');

import request from '@/utils/request.ts';

console.log(request);
