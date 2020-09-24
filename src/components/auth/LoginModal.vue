<template>
  <v-card class="mx-auto container">
    <div class="vue-tempalte">
      <form>
        <h3>Sign In</h3>

        <div class="form-group">
          <label>Email address</label>
          <input
            type="email"
            class="form-control form-control-lg"
          >
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            class="form-control form-control-lg"
          >
        </div>

        <button
          type="submit"
          class="btn btn-dark btn-lg btn-block"
        >
          Sign In
        </button>

        <button
          class="forgot-password mt-2 mb-4"
          @click.prevent="showForgotModal"
        >
          Forgot password ?
        </button>

        <div class="social-icons">
          <img
            class="ma-2"
            :src="imageLink"
            @click="showGoogleConnex"
          >
        </div>
      </form>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import '../../assets/css/loginstyle.css';

@Component
export default class LoginModal extends Vue {
  imageLink = require('../../assets/images/btn_google.png');

  showForgotModal (): void {
    this.$modal.hide('loginmodal');
    this.$emit('onClickShowForgotModal');
  }

  showGoogleConnex (){
    console.log('google connex)');
  }
}
</script>
