import Vue from 'vue';
import MUSEUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import theme from 'muse-ui/lib/theme';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import Message from 'muse-ui-message';

import MyButton from '@/components/MyButton.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import http from './common/http';
import utils from './common/utils';
import { Env } from './common/config';

// muse-ui
Vue.use(MUSEUI);
theme.add('teal', {
  primary: '#FE7098',
  secondary: '#CC2A58',
  success: '#1FA849',
  background: {
    default: '#fcf2f2',
  },
}, 'light');
theme.use('teal');
Vue.use(Toast, {
  close: false,
  successIcon: '',
  infoIcon: '',
  errorIcon: '',
  warningIcon: '',
});
Vue.use(Loading, {
  color: '#FE7098',
  overlayColor: 'rgba(0, 0, 0, .6)',
});
Vue.use(Message, {
  className: 'my-dialog',
});

Vue.use(http);
Vue.use(utils);
Vue.component('my-button', MyButton);

Vue.config.productionTip = false;
if (Env === 'development') {
  Vue.config.devtools = true;
} else {
  Vue.config.devtools = false;
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
