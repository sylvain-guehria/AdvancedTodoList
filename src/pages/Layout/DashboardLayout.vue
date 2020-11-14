<template>
  <div
    class="wrapper"
    :class="{ 'nav-open': $sidebar.showSidebar, 'nav-mini': $data.isNavMini }"
  >
    <side-bar @isNavMini="updateIsNavMini">
      <sidebar-link to="/app/todos">
        <feather type="trending-up"></feather>
        <p>Todo list</p>
        <div class="menu-badge">{{ this.$store.getters.getNumberActiveTask}}</div>
      </sidebar-link>
      <sidebar-link to="/app/planning">
        <feather type="calendar"></feather>
        <p>Planning</p>
      </sidebar-link>
      <sidebar-link to="/app/eisenhower">
        <feather type="pie-chart"></feather>
        <p>Eisenhower</p>
      </sidebar-link>

      <div class="bottom-menu">
        <sidebar-link to="/app/help">
          <feather type="file-plus"></feather>
          <p>Help</p>
        </sidebar-link>
<!-- 
        <md-menu md-direction="top-start">
            <sidebar-link to="" md-menu-trigger>
              <feather type="settings"></feather>
              <p>Settings</p>
            </sidebar-link>
          <md-menu-content>
            <md-menu-item>My Item 1</md-menu-item>
            <md-menu-item>My Item 2</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
          </md-menu-content>
        </md-menu> -->

        <sidebar-link to="/login">
          <feather type="settings"></feather>
          <p>Settings</p>
        </sidebar-link>
        <div  @click="logout" >
        <sidebar-link to='/'>
          <feather type="log-out"></feather>
          <p>Log-out</p>
        </sidebar-link>
      </div>
      </div>

    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <dashboard-content></dashboard-content>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import firebase from '../../firebase/firebase';

export default {
  beforeCreate: function() {
    document.body.className = "";
  },
  data() {
    return {
      isNavMini: false,
      countertasknotdone: 0
    };
  },
  methods: {
    updateIsNavMini(value) {
      this.isNavMini = value;
    },
    logout () {
    firebase.logout();
  }
  },
  components: {
    TopNavbar,
    DashboardContent
  }
};
</script>
