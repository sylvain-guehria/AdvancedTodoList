<template>
  <div>
    <v-btn
      icon
      @click="showLogin"
    >
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-btn
      icon
      @click="showSignUp"
    >
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    <modal
      draggable
      scrollable
      name="loginmodal"
      height="auto"
    >
      <loginmodal
        @onClickShowForgotModal="showForgotPass"
      />
    </modal>
    <modal
      draggable
      scrollable
      name="signupmodal"
      height="auto"
    >
      <signupmodal />
    </modal>
    <modal
      draggable
      scrollable
      name="forgotpassmodal"
      height="auto"
    >
      <forgotpassmodal />
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginModal from './LoginModal.vue';
import SignUpModal from './SignUpModal.vue';
import ForgotPassModal from './ForgotPassModal.vue';

@Component({
  components: {
    loginmodal: LoginModal,
    signupmodal: SignUpModal,
    forgotpassmodal: ForgotPassModal
  }
})
export default class LoginButton extends Vue {
  showLogin (): void {
    this.$modal.show('loginmodal');
  }

  showSignUp (): void {
    this.$modal.show('signupmodal');
  }

  showForgotPass (): void {
    this.$modal.show('forgotpassmodal');
  }

  hide () {
    this.$modal.hide('loginmodal');
  }
}
</script>

  <style scoped>
  </style>
