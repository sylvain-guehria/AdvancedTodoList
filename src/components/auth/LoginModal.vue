<template>
  <v-card class="mx-auto container">
    <div class="vue-tempalte">
      <form @submit.prevent="onFormSubmitLoginEmail">
        <h3>Sign In</h3>

        <div class="form-group">
          <label>Email address</label>
          <input
            v-model="user.data.email"
            type="email"
            class="form-control form-control-lg"
          >
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            v-model="user.data.password"
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
        <p class="forgot-password">
          Not registered ?
          <button
            @click.prevent="showSignUpModal"
          >
            sign up
          </button>
        </p>

        <div class="social-icons">
          <img
            class="ma-2"
            :src="imageLink"
            @click="logginFirebase"
          >
        </div>
      </form>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import '../../assets/css/loginstyle.css';
import Firebase from '../../firebase/firebase';
import { User } from '../../models/types';

@Component
export default class LoginModal extends Vue {
  imageLink = require('../../assets/images/btn_google.png');

  user: User = {
    loggedIn: false,
    data: {
      email: '',
      password: ''
    }
  } ;

  showForgotModal (): void {
    this.$modal.hide('loginmodal');
    this.$emit('onClickShowForgotModal');
  }

  logginFirebase (){
    this.$emit('onClickLogin');
  }

  showSignUpModal (): void {
    this.$modal.hide('loginmodal');
    this.$emit('onClickShowSignUpModal');
  }

  onFormSubmitLoginEmail (event: Event) {
    console.log('submit form');
    event.preventDefault();
    Firebase.loginEmail(this.user.data.email, this.user.data.password)
      .then(() => {
        this.$modal.hide('loginmodal');
      });
  }
}
</script>
