<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100 md-size-100">
      <h1>Contact me</h1>
    </div>
    <form class="full-form">
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-small-size-100 md-size-100">
          <label class="mandatory"> <feather type="user"></feather>Name </label>
          <input-text
            type="text"
            initialvalue="What's your name?"
            :model="username"
            @vmodel="username = $event"
          ></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <label class="mandatory"> <feather type="mail"></feather>Email </label>
          <input-text
            initialvalue="example@mail.com"
            :model="email"
            @vmodel="email = $event"
            :hasError="hasErrorEmail"
            :errorMessage="errorEmail"
          ></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <label> <feather type="phone"></feather>Phone </label>
          <input-text
            type="text"
            initialvalue="ex: +33 1 23 45 67 89"
            :model="phone"
            @vmodel="phone = $event"
            errorMessage="The phone format is not valid"
          ></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <label> <feather type="home"></feather>Company name </label>
          <input-text
            type="text"
            initialvalue="Where do you work?"
            :model="company"
            @vmodel="company = $event"
          ></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <label> <feather type="type"></feather>Subject </label>
          <input-text
            type="text"
            initialvalue="How can we help you?"
            :model="subject"
            @vmodel="subject = $event"
          ></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <label> <feather type="type"></feather>Message </label>
          <input-text
            type="textarea"
            initialvalue="Tell us more here."
            @vmodel="message = $event"
            :model="message"
          ></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100 text-left">
          * These fields are required.
        </div>
        <div class="md-layout-item md-size-100 text-center">
          <md-button class="md-tertiary" @click="sendEmail">
            <feather type="check"></feather>Send my message
          </md-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import InputText from "@/common/componentslib/InputText.vue";
import { serviceUser } from "@/services";
import { Message } from "@/common/models/types";

export default {
  data() {
    return {
      hasError: false,
      hasErrorEmail: false,
      username: null,
      disabled: null,
      email: null,
      city: null,
      country: null,
      phone: null,
      subject: null,
      message: null,
      company: null,
      errorEmail: "",
      errorName: "",
      errorMessage: "",
    };
  },
  components: {
    "input-text": InputText,
  },
  methods: {
    checkForm(): void {
      const mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!this.username) {
        this.errorName = "please, enter your name";

        this.$toasted.show(this.errorName, {
          icon: "error-outline",
          theme: "bubble",
          position: "bottom-center",
          duration: 5000,
        });

        this.hasError = true;
        return;
      }

      if (!this.email) {
        this.errorEmail = "please, enter your email";

        this.$toasted.show(this.errorEmail, {
          icon: "error-outline",
          theme: "bubble",
          position: "bottom-center",
          duration: 5000,
        });

        this.hasError = true;
        this.hasErrorEmail = true;
        return;
      }

      if (!this.email.match(mailformat)) {
        this.errorEmail = "Your email is not valid";

        this.$toasted.show(this.errorEmail, {
          icon: "error-outline",
          theme: "bubble",
          position: "bottom-center",
          duration: 5000,
        });

        this.hasError = true;
        this.hasErrorEmail = true;
        return;
      }

      this.hasErrorEmail = false;

      if (!this.message) {
        this.errorMessage = "please, enter your message";

        this.$toasted.show(this.errorMessage, {
          icon: "error-outline",
          theme: "bubble",
          position: "bottom-center",
          duration: 5000,
        });

        this.hasError = true;
        return;
      }

      this.errorMessage = "";
      this.errorName = "";
      this.errorEmail = "";

      this.hasError = false;
    },
    resetForm() {
      this.hasError = false;
      this.username = "";
      this.disabled = "";
      this.email = "";
      this.phone = "";
      this.subject = "";
      this.message = "";
      this.company = "";
      this.errorEmail = "";
      this.errorName = "";
      this.errorMessage = "";
    },
    sendEmail() {
      this.checkForm();

      if (this.hasError) {
        return "";
      }

      this.$toasted.show("Email send ! =)", {
        icon: "error-outline",
        theme: "bubble",
        position: "bottom-center",
        duration: 5000,
      });

      let message: Message = {
        username: this.username,
        email: this.email,
        phone: this.phone,
        subject: this.subject,
        message: this.message,
        company: this.company,
        date: new Date().toISOString().substr(0, 10),
        read: false
      };

      serviceUser.sendMessage(message);

          this.resetForm();
      this.$emit("reRender");

    },
  },
};
</script>
<style scoped></style>
