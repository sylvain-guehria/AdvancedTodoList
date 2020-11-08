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
  created(){

    // this.todolist = this.$store.getters.getTodoList;

    // if (this.todolist) {
    //   this.todonotdone = this.todolist.filter(todo => !todo.isdone);
    //   this.countertasknotdone = this.todonotdone.length;
    //   // eslint-disable-next-line no-console
    //   console.log('ddd', this.countertasknotdone);
    // }
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
