<template>
  <div class="content notifications">
    <div class="md-layout">
      <div class="md-layout-item md-size-100 button-menu">
        <md-button class="md-tertiary">
          <feather type="check-circle"></feather>Mark all as read
        </md-button>
        <md-button class="md-tertiary">
          <feather type="filter"></feather>Filter
        </md-button>
      </div>
      <div class="md-layout-item md-size-100">
        <time-ago
          :refresh="60"
          :datetime="new Date('2020/01/20')"
          locale="en"
          :long="true"
        ></time-ago>
        <transition-group name="slide-fade-exchange" tag="div">
          <div v-for="notif in notifications" v-bind:key="notif.id">
            <div class="notification" :class="{ unread: !notif.isRead }">
              <span class="bullet" v-on:click="notif.isRead = false"></span>
              <div class="md-layout-item mmd-size-100 data-block flex-row">
                <div class="flex-space-between icon-title">
                  <div class="flex-vert-align-center">
                    <feather type="file-plus"></feather>
                    <span>{{ notif.eventName }}</span>
                  </div>
                </div>
                <div class="text-align-left event-title">
                  {{ notif.programTitle }}
                </div>
                <div class="sentence text-align-left">
                  <span class="bold">{{ notif.username }}</span>
                  <span>{{ notif.eventAction }}</span>
                  <span class="bold">{{ notif.eventTopic }}</span>
                </div>
                <div class="light-subtitle-small date">{{ notif.date }}</div>
              </div>
              <md-button class="md-icon-button md-just-icon">
                <feather type="trash-2"></feather>
              </md-button>
            </div>
          </div>
        </transition-group>
      </div>
      <div class="md-layout-item md-size-20" style="border: 2px solid blue">
        <modal :show="showCustomModal" @show="showCustomModal = $event" />
      </div>
      <div class="md-layout-item">
        <md-button @click="showErrorSnackbar = true"
          >Show error snackbar</md-button
        >
        <md-button @click="showSuccessSnackbar = true"
          >Show success snackbar</md-button
        >
        <md-button @click="showConfirmDialog = true"
          >Show confirm dialog</md-button
        >
        <md-button @click="showCustomModal = true">Show custom modal</md-button>
        <md-dialog :md-active.sync="showConfirmDialog">
          <md-dialog-title>Redirection to the CRM</md-dialog-title>
          <md-dialog-content>
            Go to the CRM to add new contacts to any listed company. Once added,
            you will find your new contact on this platform and you will be able
            to add them to your project’s contact list.
          </md-dialog-content>
          <md-dialog-actions>
            <md-button class="md-secondary">
              <feather type="x"></feather>Stay here
            </md-button>
            <md-button class="md-default">
              <feather type="corner-up-right"></feather>I confirm
            </md-button>
          </md-dialog-actions>
        </md-dialog>
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
              <p>
                Thank you for your message! We will get back to you within 48h.
              </p>
            </div>
          </div>
        </md-snackbar>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  components: {
    modal: Modal
  },
  data() {
    return {
      showSuccessSnackbar: false,
      showErrorSnackbar: false,
      showConfirmDialog: false,
      showCustomModal: false,
      position: "center",
      duration: 4000,
      isInfinity: false,
      notifications: []
    };
  },
  created() {
    this.initNotifications();
  },
  methods: {
    notifyVue() {},
    onConfirm() {
      alert("confirm");
    },
    onCancel() {
      alert("cancel");
    },
    initNotifications() {
      for (let i = 0; i < 4; i++) {
        let notif = {
          id: i,
          eventName: "Transfered to next gate",
          programTitle: "Volkswagen T6 Connector",
          username: "Kimberley Tartine",
          eventAction: "requested the program transfer to",
          eventTopic: "Gate 3 approval by Client",
          date: "2019/04/28 2:27PM",
          isRead: false
        };
        let notif2 = {
          id: "a" + i,
          eventName: "File uploaded",
          programTitle: "Volkswagen T6 Connector",
          username: "Kimberley Tartine",
          eventAction: "added the file",
          eventTopic: "Gate 3 ",
          date: "2019/04/28 2:27PM",
          isRead: false
        };
        this.notifications.push({ ...notif });
        this.notifications.push({ ...notif2 });
      }
      this.notifications[0].isRead = true;
      this.notifications[1].isRead = true;
    }
  },
  computed: {}
};
</script>
