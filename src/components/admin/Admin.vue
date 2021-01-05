<template>
  <div class="content notifications">
    <div class="md-layout">
      <div class="md-layout-item md-size-100 button-menu">
        <md-button class="md-tertiary" v-if="editMode" @click="editMode = false">
          <feather type="alert-circle"></feather>Edit Mode
        </md-button>
        <md-button class="md-tertiary" @click="editMode = true" v-if="!editMode">
          <feather type="check-circle"></feather>Read Only
        </md-button>
      </div>
      <div v-if="getUsers().length > 0"
          class="md-layout-item md-size-100">
        <div
          v-for="user in getUsers()"
          :key="user.uid"
        >
          <AdminRow :user="user"  />
        </div>
      </div>
      <!-- <div class="md-layout-item">
        <md-button @click="showErrorSnackbar = true">Show error snackbar</md-button>
        <md-button @click="showSuccessSnackbar = true">Show success snackbar</md-button>

        <md-snackbar
          :md-position="position"
          :md-duration="isInfinity ? Infinity : duration"
          :md-active.sync="showErrorSnackbar"
          md-persistent
          class="bubble"
        >
          <div class="talk-bubble tri-top warning">
            <div class="talktext">
              <p>Oh no! We did not get your message. Please try again.</p>
            </div>
          </div>
        </md-snackbar>
        <md-snackbar
          :md-position="position"
          :md-duration="isInfinity ? Infinity : duration"
          :md-active.sync="showSuccessSnackbar"
          md-persistent
          class="bubble"
        >
          <div class="talk-bubble tri-top success">
            <div class="talktext">
              <p>Thank you for your message! We will get back to you within 48h.</p>
            </div>
          </div>
        </md-snackbar>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
import { serviceTodo, serviceUser } from "@/services";
import store from "@/store/index";
import AdminRow from "./AdminRow.vue";

export default {
  components: {
    AdminRow,
  },
  data() {
    return {
      showSuccessSnackbar: false,
      showErrorSnackbar: false,
      position: "center",
      duration: 4000,
      isInfinity: false,
      editMode: false,
    };
  },
  created() {
    serviceUser.fetchUsers();
  },
  methods: {
      
    getUsers() {
      return store.getters.getUsers;
    },
  },
  computed: {},
};
</script>
