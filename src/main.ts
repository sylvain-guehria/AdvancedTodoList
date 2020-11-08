import Vue from "vue";
import App from "./App.vue";
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';
import router from "./routes/routes";
import store from './store/';

// Plugins
import GlobalDirectives from "./globalDirectives";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

Vue.use(VModal);
Vue.use(Notifications);

Vue.use(MaterialDashboard);
Vue.use(GlobalDirectives);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  data: {},
  store,
  render: h => h(App)
});

