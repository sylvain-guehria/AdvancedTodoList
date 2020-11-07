<template>
  <div class="md-layout">
    <form class="full-form" @submit.prevent="resetPassword">
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item">
          <label class="mandatory">
            <feather type="mail"></feather>Email
          </label>
          <input-text
            type="email"
            :model="email"
            :hasError="true"
            errorMessage="The email format is not valid"
          ></input-text>
        </div>
        <div class="md-layout-item md-size-100 text-center">

        <md-button
          type="submit"
        >
          <feather type="key"> </feather>Reset password
        </md-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import InputText from "@/components/Form/InputText.vue";

import Firebase from '../../firebase/firebase';

@Component({
  components: {
    "input-text": InputText
  }
})
export default class ForgotPassForm extends Vue {
  email: string = "";

  resetPassword() {
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
