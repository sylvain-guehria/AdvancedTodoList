import Vue from 'vue';
import Router from 'vue-router';
import HomeView from './views/HomeView.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/matrice',
    name: 'matrice',
    component: () => import(/* webpackChunkName: "about" */ './views/MatriceView.vue')
  },
  {
    path: '/todos',
    name: 'todos',
    component: () => import(/* webpackChunkName: "about" */ './views/TodosView.vue')
  }

];

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: routes
});
