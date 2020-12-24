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
      <div class="md-layout-item md-size-100">
        <time-ago
          :refresh="60"
          :datetime="new Date('2020/01/20')"
          locale="en"
          :long="true"
        ></time-ago>
        <transition-group
          name="slide-fade-exchange"
          tag="div"
          v-if="getUsers().length > 0"
        >
          <div v-for="user in getUsers()" :key="user.key">
            <div class="notification" :class="{ unread: false }">
              <span class="bullet"></span>
              <div class="md-layout-item mmd-size-100 data-block flex-row">
                <div class="flex-space-between icon-title">
                  <div class="flex-vert-align-center">
                    <feather type="file-plus"></feather>
                    <span>{{ user.email }}</span>
                  </div>
                </div>
                <div class="text-align-left event-title">
                  {{ user.pseudo }}
                </div>
                <div class="sentence text-align-left">
                  <span class="bold">{{ user.uid }}</span>
                  <span>{{ user.email }}</span>
                </div>
                <div class="light-subtitle-small date">{{ user.pseudo }}</div>
              </div>
              <md-button class="md-icon-button md-just-icon">
                <feather type="trash-2"></feather>
              </md-button>
            </div>
          </div>
        </transition-group>
      </div>
      <div class="md-layout-item">
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
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
import { serviceTodo, serviceUser } from "@/services";
import store from "@/store/index";

export default {
  components: {},
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
    this.initUsers();
  },
  methods: {
    initUsers() {
      serviceUser.fetchUsers();
    },
    getUsers() {
      return store.getters.getUsers;
    },
  },
  computed: {},
};
</script>
