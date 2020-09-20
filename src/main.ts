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

Vue.use(Vuex);
Vue.use(VModal);
Vue.use(VueLodash, { lodash: lodash });

Vue.config.productionTip = false;

interface Todo {
  task: string;
  deadline?: Date;
  importance?: number;
}

var todolist: Todo[] = [];

const store = new Vuex.Store({
  modules: {

  },
  state: {
    todolist: todolist
  },
  mutations: {
    setTodoList (state, newList: Todo[]) {
      state.todolist = newList;
    }
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
