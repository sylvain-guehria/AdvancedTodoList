<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route"
        >
          <v-list-item-content>
            <v-list-item-title><h4>{{ item.title }}</h4></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <appbar
      :router-title="routerTitle"
      @onClickDrawer="onClickDrawer"
    />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Router from '@/router';
import AppBar from './layout/AppBar.vue';

@Component({
  components: {
    appbar: AppBar
  }
})
export default class App extends Vue {
  private routerTitle: string = '';

  private drawer: boolean = true;

  private items = [
    { title: 'Home', route: '/' },
    { title: 'Todos', route: '/todos' },
    { title: 'Matrice', route: '/matrice' }
  ];

  private created () {
    this.routerTitle = Router.currentRoute.meta.title || '';
    Router.afterEach(to => {
      this.routerTitle = to.meta.title || '';
    });
  }

  onClickDrawer (){
    this.drawer = !this.drawer;
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
h4{
  color: #7c795d;
  font-family: 'Trocchi', 'serif';
}
</style>
