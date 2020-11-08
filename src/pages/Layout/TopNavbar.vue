<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <breadcrumbs></breadcrumbs>
      </div>
       {{ firstName() }}
       <div class="namelogo" >
          <img :src="'../logo.svg'" alt />
        </div>
    </div>
    <div class="md-toolbar-row title">
      <div class="md-toolbar-section-start">
        <h1>{{ $route.name }}</h1>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import firebase from '../../firebase/firebase';

@Component
export default class TopNavbar extends Vue {

 firstName (){
    const user = this.$store.getters.getUser.data;
    if (user.displayName) {
      return user.displayName.split(' ')[0].toUpperCase();
    }
    if (user.email) {
      return user.email.split('@')[0].toUpperCase();
    }
    return null;
  }

  mounted () {
    firebase.setAuthChange();
  }

}


</script>

<style lang="css" scoped>
.br{
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size: 50px;
}
.namelogo{
    width: 30px;
    margin : 10px;
  }
</style>
