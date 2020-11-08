<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <breadcrumbs></breadcrumbs>
      </div>
    </div>
    <div class="md-toolbar-row title">
      <div class="md-toolbar-section-start">
        <h1>{{ $route.name }}</h1>
      </div>
    </div>
    {{ firstName() }}
  </md-toolbar>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TopNavbar extends Vue {

 firstName (){
    const user = this.$store.getters.getUser.data;
    if (user.displayName) {
      return user.displayName.split(' ')[0];
    }
    if (user.email) {
      return user.email.split('@')[0];
    }
    return null;
  }

}


</script>

<style lang="css"></style>
