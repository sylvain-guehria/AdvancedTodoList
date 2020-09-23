import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import VModal from 'vue-js-modal';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';
import { Todo } from './models/types';

import './assets/css/modalstyle.css';

Vue.use(Vuex);
Vue.use(VModal);
Vue.use(VueLodash, { lodash: lodash });

Vue.config.productionTip = false;

var todolist: Todo[] = [];
var coloredtodolist: Todo[] = [];

const store = new Vuex.Store({
  modules: {

  },
  state: {
    todolist: todolist,
    coloredtodolist: coloredtodolist
  },
  mutations: {
    setTodoList (state, newList: Todo[]) {
      state.todolist = newList;
    },
    setColoredTodoList (state, newList: Todo[]) {
      state.coloredtodolist = newList;
    }
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
