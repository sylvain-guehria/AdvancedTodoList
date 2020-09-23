<template>
  <v-card class="mx-auto container ">
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
          class="forgot-password text-right mt-2 mb-4"
          @click.prevent="showForgotModal"
        >
          Forgot password ?
        </button>

        <div class="social-icons">
          <ul>
            <li><a href="#"><i class="fa fa-google" /></a></li>
            <li><a href="#"><i class="fa fa-facebook" /></a></li>
            <li><a href="#"><i class="fa fa-twitter" /></a></li>
          </ul>
        </div>
      </form>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginModal extends Vue {
  showForgotModal (): void {
    this.$modal.hide('loginmodal');
    this.$emit('onClickShowForgotModal');
  }
}
</script>
