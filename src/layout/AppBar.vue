<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      app
      dense
      clipped-left
      :src="imageLink"
    >
      <v-app-bar-nav-icon
        dark
        @click.stop="changDrawer"
      />
      <div class="title-white">
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </div>
      <v-spacer />
      <v-spacer />
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
  v-toolbar-title,
  .title-white {
    color: white;
  }
  </style>
