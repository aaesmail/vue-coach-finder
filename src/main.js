import { createApp } from 'vue';

import router from './router';
import store from './store/index';
import App from './App.vue';
import GlobalComponents from './GlobalComponents';

const app = createApp(App);

app.use(router);
app.use(store);

for (const componentName in GlobalComponents) {
  app.component(componentName, GlobalComponents[componentName]);
}

app.mount('#app');
