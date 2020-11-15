import Vue from "vue";
import App from "./App.vue";
import VModal from 'vue-js-modal';
import Notifications from 'vue-notification';
import router from "./routes/routes";
import store from './store/';
import VueToasted from 'vue-toasted';


// Plugins
import GlobalDirectives from "./globalDirectives";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

//chart
import VueApexCharts from 'vue-apexcharts'


export const bus = new Vue();

Vue.use(VueToasted, {
  iconPack : 'material' 
});

Vue.use(VModal);
Vue.use(Notifications);

Vue.use(MaterialDashboard);
Vue.use(GlobalDirectives);
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  data: {},
  store,
  render: h => h(App)
});

