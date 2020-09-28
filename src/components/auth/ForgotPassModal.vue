<template>
  <v-card class="mx-auto container ">
    <div class="vue-tempalte">
      <form @submit.prevent="resetPassword">
        <h3>Forgot Password</h3>

        <div class="form-group">
          <label>Email address</label>
          <input
            v-model="email"
            type="email"
            class="form-control form-control-lg"
          >
        </div>

        <button
          type="submit"
          class="btn btn-dark btn-lg btn-block"
        >
          Reset password
        </button>
      </form>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Firebase from '../../firebase/firebase';

@Component
export default class ForgotPassModal extends Vue {
  email: string = '';

  resetPassword (){
    Firebase.sendResetPassEmail(this.email).then(() => {
      this.$modal.hide('forgotpassmodal');
      this.$notify({
        title: 'We just sent you an email to reset your password',
        type: 'success'
      });
    }).catch((error: Error) => {
      this.$notify({
        title: 'Cannot send the email at the moment',
        text: error.message,
        type: 'error'
      });
    });
  }
}
</script>

<style scoped>

</style>
