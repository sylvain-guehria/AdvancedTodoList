<template>
  <v-card class="mx-auto row container justify-content-center">
    <div class="col-md-5">
      <form @submit.prevent="onFormSubmit">
        <h3>Sign Up</h3>

        <div class="form-group">
          <label>Full Name</label>
          <input
            v-model="user.data.fullName"
            type="text"
            class="form-control form-control-lg"
            required
          >
        </div>

        <div class="form-group">
          <label>Email address</label>
          <input
            v-model="user.data.email"
            type="email"
            class="form-control form-control-lg"
            required
          >
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            v-model="user.data.password"
            type="password"
            class="form-control form-control-lg"
            required
          >
        </div>

        <button
          type="submit"
          class="btn btn-outline-dark btn-block mt-7"
        >
          Sign Up
        </button>

        <p class="forgot-password mt-3">
          Already registered
          <button
            @click.prevent="showSignInModal"
          >
            sign in?
          </button>
        </p>
      </form>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { User } from '../../models/types';
import Firebase from '../../firebase/firebase';

@Component
export default class SignUpModal extends Vue {
  user: User = {
    loggedIn: false,
    data: {
      fullName: '',
      email: '',
      password: ''
    }
  } ;

  showSignInModal (): void {
    this.$modal.hide('signupmodal');
    this.$emit('onClickShowSignInModal');
  }

  onFormSubmit (event: Event) {
    event.preventDefault();
    Firebase.signUpEmail(this.user.data.email, this.user.data.password).then(() => {
      this.$modal.hide('signupmodal');
      this.$notify({
        title: 'You signed up',
        text: 'Welcome ! =)',
        type: 'success'
      });
    }).catch((error: Error) => {
      this.$notify({
        title: 'Cannot register you',
        text: error.message,
        type: 'error'
      });
    });
  }
}
</script>

<style scoped>
label{
  align-items: left;
}
</style>
