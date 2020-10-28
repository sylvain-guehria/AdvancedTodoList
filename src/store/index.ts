import Vue from 'vue';
import Vuex from 'vuex';
import todos from './modules/todos-module';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    todos
  }
});

export default store;
