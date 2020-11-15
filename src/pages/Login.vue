<template>
  <div>
    <hgroup>
      <h1>Stay productive .!</h1>
    </hgroup>

    <div class="form-structor" :style="{ backgroundImage: `url('${image}')` }">
      <div class="signup" :class="signupclass">
        <h2
          class="form-title font-fam"
          @click="addEventListenerSignUp"
          id="signup"
        >
          <span v-if="showorsign">or</span>Sign up
        </h2>
        <div class="form-holder">
          <input
            type="text"
            class="input"
            v-model="user.data.fullName"
            placeholder="Name"
          />
          <input
            type="email"
            v-model="user.data.email"
            class="input"
            placeholder="Email"
          />
          <input
            type="password"
            class="input"
            placeholder="Password"
            v-model="user.data.password"
          />
        </div>
        <!-- error msg  sign up-->
        <div :class="{ 'display-below': displayErrorBelow }">
          <div class="talktext">
            <p>{{ errorMessage }}</p>
          </div>
        </div>
        <!--fin error msg  sign up-->
        <button @click="onFormSubmitSignUp" class="submit-btn">Sign up</button>
      </div>
      <div class="login " :class="loginclass">
        <div class="center">
          <h2
            class="form-title font-fam"
            @click="addEventListenerLog"
            id="login"
          >
            <span v-if="showorlog">or</span>Log in
          </h2>
          <div class="form-holder">
            <input
              type="email"
              class="input"
              placeholder="Email"
              v-model="user.data.email"
            />
            <input
              type="password"
              class="input"
              placeholder="Password"
              v-model="user.data.password"
            />
          </div>
          <!-- error msg  login-->
          <div :class="{ 'display-below': displayErrorBelow }">
            <div class="talktext">
              <p>{{ errorMessage }}</p>
            </div>
          </div>
          <!--fin error msg  login-->

          <button @click="onFormSubmitLoginEmail" class="submit-btn">
            Log in
          </button>

          <!-- btn google -->
          <br /><br />
          <div>
            <span class="texte-grey">
              Or sign-in with
            </span>
          </div>

          <div @click="logginFirebase">
            <img class="logogoogle" :src="'google-icon.svg'" />
          </div>
        </div>
        <div class="forgotten-pass" @click="showMoreEvents = true">
          <a class="texte-grey"> Password forgotten? </a>
        </div>
        <!-- fin google -->
      </div>
    </div>
    <br /><br />
    <footer>
      <a
        href="https://www.linkedin.com/in/sylvain-guehria-ab9737134/"
        target="_blank"
      >
        <img :src="'logo.svg'" alt/></a
      ><br /><br />
      <p>
        Click To See My
        <a
          href="https://www.linkedin.com/in/sylvain-guehria-ab9737134/"
          target="_blank"
          >LinkedIn</a
        >
      </p>
    </footer>
    <modal :show="showMoreEvents" @show="showMoreEvents = $event">
      <div slot="header">PASSWORD FORGOTTEN</div>
      <div slot="body">
        <forgotpassmodal />
      </div>
    </modal>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import "../assets/css/loginstyle.css";
import firebase from "./../firebase/firebase";
import { User } from "../models/types";
import Modal from "@/components/Modal.vue";
import ForgotPassForm from "./Forms/ForgotPassForm.vue";

@Component({
  components: {
    modal: Modal,
    forgotpassmodal: ForgotPassForm
  }
})
export default class LoginModal extends Vue {
  beforeCreate() {
    document.body.className = "login";
  }

  mounted() {
    firebase.setAuthChange();
  }

  image = "testimg.jpeg";

  showTooltip: boolean;

  errorMessage: string = "";

  showMoreEvents: boolean = false;

  loading: boolean = false;

  displayErrorBelow: boolean = false;

  showorlog: boolean = false;
  showorsign: boolean = true;

  signupclass: string = "slide-up";
  loginclass: string = "";

  user: User = {
    loggedIn: false,
    data: {
      email: "",
      password: ""
    }
  };

  logginFirebase() {
    firebase.loginGoogle();
  }

  navigate() {
    this.$router.push("/contactme");
  }
  goToApp() {
    this.$router.push("/app");
  }

  addEventListenerLog() {
    if (this.loginclass !== "slide-up") {
      this.loginclass = "slide-up";
      this.showorlog = true;
      this.showorsign = false;
    } else {
      this.signupclass = "slide-up";
      this.loginclass = "";
      this.showorlog = false;
      this.showorsign = true;
    }
  }

  addEventListenerSignUp() {
    if (this.signupclass !== "slide-up") {
      this.signupclass = "slide-up";
      this.showorsign = true;
      this.showorlog = false;
    } else {
      this.loginclass = "slide-up";
      this.signupclass = "";
      this.showorsign = false;
      this.showorlog = true;
    }
  }

  onFormSubmitSignUp(event: Event) {
    event.preventDefault();

    if (!this.checkLoginForm()) {
      return "";
    }

    firebase.signUpEmail(this.user.data.email, this.user.data.password).then(() => {
     this.$toasted.show("You signed up, Welcome", {
            icon: "create",
            theme: "bubble",
            position: "bottom-right",
            duration: 5000
          });
    }).catch((error: Error) => {
     this.$toasted.show("Cannot register you" + error, {
            icon: "error-outline",
            theme: "bubble",
            position: "bottom-right",
            duration: 5000
          });
    });
  }

  checkLoginForm(): boolean {
    let email: string = this.user.data.email;
    let password: string = this.user.data.password;
    const mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordformat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!email) {
      this.errorMessage = "please, enter your email";
      this.displayErrorBelow = true;
      return false;
    }
    if (!password) {
      this.errorMessage = "please, enter your password";
      this.displayErrorBelow = true;
      return false;
    }

    if (!email.match(mailformat)) {
      this.errorMessage = "Your email is not valid";
      this.displayErrorBelow = true;
      return false;
    }

    if (!password.match(passwordformat)) {
      this.errorMessage =
        "Password: minimum eight characters, at least one letter and one number";
      this.displayErrorBelow = true;
      return false;
    }

    this.errorMessage = "";
    this.displayErrorBelow = false;

    return true;
  }

  onFormSubmitLoginEmail(event: Event) {
    event.preventDefault();

    if (!this.checkLoginForm()) {
      return "";
    }

    firebase
      .loginEmail(this.user.data.email, this.user.data.password)
      .then(() => {
         this.$toasted.show("We logged you in, Hello", {
            icon: "login",
            theme: "bubble",
            position: "bottom-right",
            duration: 5000
          });
        this.goToApp();
      })
      .catch((error: Error) => {
       this.$toasted.show("Cannot logged you in..", {
            icon: "error-outline",
            theme: "bubble",
            position: "bottom-right",
            duration: 5000
          });
      });
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");

.form-structor {
  background-color: #222;
  border-radius: 15px;
  height: 550px;
  width: 100%;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    opacity: 0.8;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-repeat: no-repeat;
    background-position: left bottom;
    background-size: 500px;
  }

  .signup {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    width: 65%;
    z-index: 5;
    -webkit-transition: all 0.3s ease;

    &.slide-up {
      top: 5%;
      -webkit-transform: translate(-50%, 0%);
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .form-holder,
    &.slide-up .submit-btn {
      opacity: 0;
      visibility: hidden;
    }

    &.slide-up .form-title {
      font-size: 20px;
      cursor: pointer;
    }

    &.slide-up .form-title span {
      margin-right: 5px;
      opacity: 1;
      visibility: visible;
      -webkit-transition: all 0.3s ease;
    }

    .form-title {
      color: #fff;
      font-size: 1.7em;
      text-align: center;

      span {
        color: rgba(0, 0, 0, 0.4);
        opacity: 0;
        visibility: hidden;
        -webkit-transition: all 0.3s ease;
      }
    }

    .form-holder {
      border-radius: 15px;
      background-color: #fff;
      overflow: hidden;
      margin-top: 50px;
      opacity: 1;
      visibility: visible;
      -webkit-transition: all 0.3s ease;

      .input {
        border: 0;
        outline: none;
        box-shadow: none;
        display: block;
        height: 50px;
        line-height: 30px;
        padding: 8px 15px;
        border-bottom: 1px solid #eee;
        width: 100%;
        font-size: 16px;

        &:last-child {
          border-bottom: 0;
        }
        &::-webkit-input-placeholder {
          color: rgba(0, 0, 0, 0.4);
        }
      }
    }

    .submit-btn {
      background-color: rgba(0, 0, 0, 0.4);
      color: rgba(256, 256, 256, 0.7);
      border: 0;
      border-radius: 15px;
      display: block;
      margin: 15px auto;
      padding: 15px 45px;
      width: 100%;
      font-size: 17px;
      font-weight: bold;
      cursor: pointer;
      opacity: 1;
      visibility: visible;
      -webkit-transition: all 0.3s ease;

      &:hover {
        transition: all 0.3s ease;
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
  }

  .login {
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 5;
    -webkit-transition: all 0.3s ease;

    &::before {
      content: "";
      position: absolute;
      left: 50%;
      top: -20px;
      -webkit-transform: translate(-50%, 0);
      background-color: #fff;
      width: 200%;
      height: 250px;
      border-radius: 50%;
      z-index: 4;
      -webkit-transition: all 0.3s ease;
    }

    .center {
      position: absolute;
      top: calc(50% - 5%);
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      width: 65%;
      z-index: 5;
      -webkit-transition: all 0.3s ease;

      .form-title {
        color: #000;
        font-size: 1.7em;
        text-align: center;

        span {
          color: rgba(0, 0, 0, 0.4);
          opacity: 0;
          visibility: hidden;
          -webkit-transition: all 0.3s ease;
        }
      }

      .form-holder {
        border-radius: 15px;
        background-color: #fff;
        border: 1px solid #eee;
        overflow: hidden;
        margin-top: 50px;
        opacity: 1;
        visibility: visible;
        -webkit-transition: all 0.3s ease;

        .input {
          border: 0;
          outline: none;
          box-shadow: none;
          display: block;
          height: 50px;
          line-height: 30px;
          padding: 8px 15px;
          border-bottom: 1px solid #eee;
          width: 100%;
          font-size: 16px;

          &:last-child {
            border-bottom: 0;
          }
          &::-webkit-input-placeholder {
            color: rgba(0, 0, 0, 0.4);
          }
        }
      }

      .submit-btn {
        background-color: #5c91b1;
        color: rgba(256, 256, 256, 0.7);
        border: 0;
        border-radius: 15px;
        display: block;
        margin: 15px auto;
        padding: 15px 45px;
        width: 100%;
        font-size: 17px;
        font-weight: bold;
        cursor: pointer;
        opacity: 1;
        visibility: visible;
        -webkit-transition: all 0.3s ease;

        &:hover {
          transition: all 0.3s ease;
          background-color: rgba(0, 0, 0, 0.8);
        }
      }
    }

    &.slide-up {
      top: 90%;
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .center {
      top: 10%;
      -webkit-transform: translate(-50%, 0%);
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .form-holder,
    &.slide-up .submit-btn {
      opacity: 0;
      visibility: hidden;
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .form-title {
      font-size: 20px;
      margin: 0;
      padding: 0;
      cursor: pointer;
      -webkit-transition: all 0.3s ease;
    }

    &.slide-up .form-title span {
      margin-right: 5px;
      opacity: 1;
      visibility: visible;
      -webkit-transition: all 0.3s ease;
    }
  }
}
// test

.logogoogle {
  width: 40px;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 5px 5px 5px 5px;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 5px 2px #fff;
  -moz-box-shadow: 0 0 5px 2px #fff;
  box-shadow: 0 0 5px 2px grey;
  cursor: pointer;
}
.centered-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .title {
    text-align: center;
    margin-bottom: 20px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    padding: 3em 2em 2em 2em;
  }
  .md-content {
    z-index: 1;
    padding: 30px;
    width: 100%;
    max-width: 400px;
    position: relative;
    .footer-form {
      padding: 20px;
    }
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>


