<template>
  <div class="md-layout">
    <div class="md-layout-item md-small-size-100 md-size-100">
      <h1>Contact us</h1>
    </div>
    <form class="full-form">
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-small-size-100 md-size-100">
          <label class="mandatory">
            <feather type="user"></feather>Name
          </label>
          <input-text type="text" initialvalue="What's your name?" :model="username"></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <label class="mandatory">
            <feather type="mail"></feather>Email
          </label>
          <input-text
            type="email"
            initialvalue="example@mail.com"
            :model="emailadress"
            :hasError="true"
            errorMessage="The email format is not valid"
          ></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <label>
            <feather type="phone"></feather>Phone
          </label>
          <input-text
            type="text"
            initialvalue="ex: +33 1 23 45 67 89"
            :model="phone"
            :hasError="true"
            errorMessage="The phone format is not valid"
          ></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <label>
            <feather type="home"></feather>Company name
          </label>
          <input-text type="text" initialvalue="Where do you work?" :model="company"></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <label>
            <feather type="package"></feather>Department
          </label>

          <md-field>
            <v-select :options="departments" :clearable="false"></v-select>
            <label>Select your department</label>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <label>
            <feather type="briefcase"></feather>Position
          </label>
          <input-text type="text" initialvalue="What work do you do?" :model="position"></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <label class="mandatory">
            <feather type="type"></feather>Subject
          </label>
          <input-text type="text" initialvalue="How can we help you?" :model="subject"></input-text>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-100">
          <label>
            <feather type="type"></feather>Message
          </label>
          <input-text type="textarea" initialvalue="Tell us more here." :model="message"></input-text>
        </div>
        <div
          class="md-layout-item md-small-size-100 md-size-100 text-left"
        >* These fields are required.</div>
        <div class="md-layout-item md-size-100 text-center">
          <md-button class="md-primary">
            <feather type="check"></feather>Send my message
          </md-button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import InputText from "@/components/Form/InputText";
export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      username: null,
      disabled: null,
      emailadress: null,
      departement: null,
      position: null,
      address: null,
      city: null,
      country: null,
      code: null,
      phone: null,
      company: null,
      subject: null,
      message: null,
      departments: [],
      aboutme:
        "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
    };
  },
  components: {
    "input-text": InputText
  }
};
</script>
<style></style>
