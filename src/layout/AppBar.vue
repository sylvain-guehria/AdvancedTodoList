<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      app
      dense
      dark
      clipped-left
      :src="imageLink"
    >
      <v-app-bar-nav-icon @click.stop="changDrawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-spacer />
      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <loginbutton />
    </v-app-bar>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LoginButton from '../components/auth/LoginButton.vue';

@Component({
  components: {
    loginbutton: LoginButton
  }
})
export default class AppBar extends Vue {
  @Prop() routerTitle?: string;

  imageLink: string = 'https://free4kwallpapers.com/uploads/originals/2020/01/05/illustration-wallpaper.jpg'

  changDrawer (){
    this.$emit('onClickDrawer');
  }

  private title: string = 'My TODO list';
}
</script>

  <style scoped>
  </style>
