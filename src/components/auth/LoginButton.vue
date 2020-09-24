<template>
  <div>
    <v-menu
      left
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          color="white"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item>
          <v-btn
            color="primary lighten-2"
            text
            @click="showLogin"
          >
            Sign-In
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn
            color="primary lighten-2"
            text
            @click="showSignUp"
          >
            Sign-Up
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <modal
      scrollable
      name="loginmodal"
      height="auto"
    >
      <loginmodal
        @onClickShowForgotModal="showForgotPass"
      />
    </modal>
    <modal
      scrollable
      name="signupmodal"
      height="auto"
    >
      <signupmodal
        @onClickShowSignInModal="showLogin"
      />
    </modal>
    <modal
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
