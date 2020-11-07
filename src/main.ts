import Vue from "vue";
import App from "./App.vue";
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';
import Vuex from 'vuex';
import router from "./routes/routes";

// Plugins
import GlobalDirectives from "./globalDirectives";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

Vue.use(Vuex)

Vue.use(VModal);
Vue.use(Notifications);

Vue.use(MaterialDashboard);
Vue.use(GlobalDirectives);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  data: {},
  render: h => h(App)
});

