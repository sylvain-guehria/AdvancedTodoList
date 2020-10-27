import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import store from './store/';

import './assets/css/modalstyle.css';

Vue.use(VModal);
Vue.use(Notifications);
Vue.use(VueLodash, { lodash: lodash });

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
