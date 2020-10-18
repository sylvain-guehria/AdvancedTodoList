<template>
  <div>
    <v-menu
      left
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          color="white"
          v-bind="attrs"
          v-on="on"
        >
          {{ firstName() }}
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-if="!authenticated()">
          <v-btn
            color="primary lighten-2"
            text
            @click="showLogin"
          >
            Sign-In
          </v-btn>
        </v-list-item>
        <v-list-item v-if="!authenticated()">
          <v-btn
            color="primary lighten-2"
            text
            @click="showSignUp"
          >
            Sign-Up
          </v-btn>
        </v-list-item>
        <v-list-item v-if="authenticated()">
          <v-btn
            color="primary lighten-2"
            text
            @click="logout"
          >
            Sign-Out
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
        @onClickShowSignUpModal="showSignUp"
        @onClickLogin="login"
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
import { User } from '../../models/types';
import Firebase from '../../firebase/firebase';

@Component({
  components: {
    loginmodal: LoginModal,
    signupmodal: SignUpModal,
    forgotpassmodal: ForgotPassModal
  }
})
export default class LoginButton extends Vue {
  user: User = {
    loggedIn: false,
    data: {}
  } ;

  mounted () {
    Firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.user.loggedIn = true;
        this.user.data = user;
      } else {
        this.user.loggedIn = false;
        this.user.data = {};
      }
      this.$store.commit('setUser', this.user);
    });
  }

  showLogin (): void {
    this.$modal.show('loginmodal');
  }

  showSignUp (): void {
    this.$modal.show('signupmodal');
  }

  showForgotPass (): void {
    this.$modal.show('forgotpassmodal');
  }

  authenticated (){
    return this.$store.getters.getUser.loggedIn;
  }

  firstName (){
    this.user = this.$store.getters.getUser;
    if (this.user.data.displayName) {
      return this.user.data.displayName.split(' ')[0];
    }
    if (this.user.data.email) {
      return this.user.data.email.split('@')[0];
    }
    return null;
  }

  login () {
    this.$modal.hide('loginmodal');
    Firebase.loginGoogle();
  }

  logout () {
    Firebase.logout();
  }
}
</script>

  <style scoped>
  </style>
