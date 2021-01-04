<template>
  <div>
    <time-ago
      :refresh="1"
      :datetime="new Date('2020/01/20')"
      locale="en"
      :long="true"
    ></time-ago>
    <transition-group name="slide-fade-exchange" tag="div">
      <div :key="user.uid">
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
          <md-button class="md-icon-button md-just-icon" @click="activeDeleteTodo(user.uid)">
            <feather type="trash-2"></feather>
          </md-button>
        </div>
      </div>
    </transition-group>

    <!-- CONFIRM DELET DIALOG -->
    <confirm-dialog
      :confirmDialog="deleteDialog"
      title="Delete user?"
      content="You cannot go back if you press 'Yes'"
      @closeConfirmDialog="onCancelDialogDelete"
      @confirmDialog="onConfirmDialogDelete"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { User } from "@/common/models/types";
import { serviceUser } from "@/services";
import ConfirmDialogCustom from "@/common/componentslib/ConfimDialogCustom.vue";


@Component({
  components: {
    "confirm-dialog": ConfirmDialogCustom,
  },
})
export default class AdminRow extends Vue {
  @Prop() user!: User;
  deleteDialog: boolean = false;
  currentUid: string = '';

  mounted() {}

  activeDeleteTodo(uid: string) {
    this.deleteDialog = true;
    this.currentUid= uid;
  }
  onCancelDialogDelete() {
    this.deleteDialog = false;
    this.currentUid= '';
  }
  onConfirmDialogDelete() {
    serviceUser.deletUser(this.currentUid)
    this.deleteDialog = false;
  }
}
</script>
