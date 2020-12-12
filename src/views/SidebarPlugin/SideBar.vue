<template>
  <div class="sidebar">
    <div class="logo">
      <a href="#" class="logo-big">
        <div class="logo-img-side">
          <img :src="'../yourtodoslogo.svg'" alt />
        </div>
        <div class="smalllogo" >
          <img :src="'../logo.svg'" alt />
        </div>
      </a>
    </div>
    <div class="hide-menu-btn" @click="toggleNavMini(true)" v-show="!isNavMini">Hide menu</div>
    <div class="show-menu-btn" @click="toggleNavMini(false)" v-show="isNavMini"></div>
    <div class="sidebar-wrapper">
      <slot name="content"></slot>
      <md-list class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot>
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :to="link.path"
            :link="link"
          ></sidebar-link>
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";

export default {
  components: {
    SidebarLink
  },
  props: {
    sidebarLinks: {
      type: Array,
      default: () => []
    },
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isNavMini: true
    };
  },
  methods: {
    toggleNavMini: function(isNavMini) {
      this.isNavMini = isNavMini;
      this.$emit("isNavMini", this.isNavMini);
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  computed: {}
};
</script>
<style>
@media screen and (min-width: 991px) {
  .nav-mobile-menu {
    display: none;
  }
  .smalllogo{
    width: 40px;
  }
  .logo-img-side{
    max-width: 150px
  }
}
</style>
