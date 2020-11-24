<template>
  <div
    class="wrapper"
    :class="{ 'nav-open': $sidebar.showSidebar, 'nav-mini': $data.isNavMini }"
  >
    <side-bar @isNavMini="updateIsNavMini">
      <sidebar-link to="/app/todos">
        <feather type="trending-up"></feather>
        <p>Todo list</p>
        <div class="menu-badge">
          {{ this.$store.getters.getNumberActiveTask }}
        </div>
      </sidebar-link>
      <sidebar-link to="/app/planning">
        <feather type="calendar"></feather>
        <p>Planning</p>
      </sidebar-link>
      <!-- <sidebar-link to="/app/eisenhower">
        <feather type="pie-chart"></feather>
        <p>Eisenhower</p>
      </sidebar-link> -->

      <div class="bottom-menu">
        <sidebar-link to="/app/help">
          <feather type="file-plus"></feather>
          <p>Help</p>
        </sidebar-link>

        <md-menu md-direction="top-start">
          <sidebar-link to="" md-menu-trigger :noTriangleLeft="true">
            <feather type="settings"></feather>
            <p>Settings</p>
          </sidebar-link>
          <md-menu-content>
            <md-menu-item
              v-if="this.$store.getters.getWithWeekEnd"
              @click="setWeekEnd(false)"
            >
              <feather type="calendar"></feather>Remove week-end</md-menu-item
            >
            <md-menu-item
              v-if="!this.$store.getters.getWithWeekEnd"
              @click="setWeekEnd(true)"
            >
              <feather type="calendar"></feather>Display week-end</md-menu-item
            >
            <md-menu-item
              v-if="this.$store.getters.getLangage !== 'fr'"
              @click="setCurrentLang('fr')"
              ><feather type="flag"></feather>set language french</md-menu-item
            >
            <md-menu-item
              v-if="this.$store.getters.getLangage !== 'en'"
              @click="setCurrentLang('en')"
              ><feather type="flag"></feather>set language english</md-menu-item
            >
          </md-menu-content>
        </md-menu>

        <div @click="logout">
          <sidebar-link to="/" :noTriangleLeft="true">
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
<script lang='ts'>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import firebase from "../../firebase/firebase";

export default {
  beforeCreate: function () {
    document.body.className = "";
  },
  data() {
    return {
      isNavMini: false,
      countertasknotdone: 0,
    };
  },
  methods: {
    updateIsNavMini(value) {
      this.isNavMini = value;
    },
    setWeekEnd(bool: boolean) {
      let payload = {
        label: "with_weekend",
        value: bool,
      };
      this.$store.dispatch("saveSetting", payload);
      this.$store.commit('setWithWeekEnd', bool);
    },
    setCurrentLang(lang) {
       let payload = {
        label: "langage",
        value: lang,
      };
      this.$store.dispatch("saveSetting", payload);
      this.$store.commit("setLangage", lang);
    },
    logout() {
      firebase.logout();
    },
  },
  components: {
    TopNavbar,
    DashboardContent,
  },
};
</script>
