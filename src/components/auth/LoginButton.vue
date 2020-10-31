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
import { User, Todo } from '../../models/types';
import firebase from '../../firebase/firebase';

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

  action: string = '';

  todolist: Todo[] = [];

  mounted () {
    firebase.setAuthChange();
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
    const user = this.$store.getters.getUser.data;
    if (user.displayName) {
      return user.displayName.split(' ')[0];
    }
    if (user.email) {
      return user.email.split('@')[0];
    }
    return null;
  }

  login () {
    this.$modal.hide('loginmodal');
    firebase.loginGoogle();
  }

  logout () {
    firebase.logout();
  }
}
</script>

  <style scoped>
  </style>
