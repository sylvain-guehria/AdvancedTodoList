<template>
  <div class="md-layout">
    <form class="full-form">
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item">
          <label class="mandatory">
            <feather type="mail"></feather>Email
          </label>
          <input-text
            :vmodel="email"
            :hasError="hasError"
            :errorMessage="errorMessage"
            @vmodel="email = $event"
          ></input-text>
        </div>
        <div class="md-layout-item md-size-100 text-center">
          <md-button @click="resetPassword">
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

import Firebase from "../../firebase/firebase";

@Component({
  components: {
    "input-text": InputText,
  },
})
export default class ForgotPassForm extends Vue {
  email: string = "";
  errorMessage: string = "";
  hasError: boolean = false;

  resetPassword() {
    this.checkResetForm();

    if (this.hasError) {
      return "";
    }

    Firebase.sendResetPassEmail(this.email)
      .then(() => {
        this.$modal.hide("forgotpassmodal");
        this.$toasted.show("We just sent you an email to reset your password", {
          icon: "mail_outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      })
      .catch((error: Error) => {
        this.$toasted.show("Cannot send the email at the moment", {
          icon: "error-outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      });
  }

  checkResetForm(): void {
    const mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordformat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!this.email) {
      this.errorMessage = "please, enter your email";
      this.hasError = true;
      return ;
    }

    if (!this.email.match(mailformat)) {
      this.errorMessage = "Your email is not valid";
      this.hasError = true;
      return ;
    }

    this.errorMessage = "";

    this.hasError = false;
  }
}
</script>

<style scoped>
</style>
