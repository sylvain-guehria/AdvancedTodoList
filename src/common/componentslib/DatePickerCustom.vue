<template>
  <md-dialog :md-active.sync="showDialogDate" :md-click-outside-to-close="false">
    <div class="container">
      <md-button class="md-icon-button" @click="closeDialogDate">
        <md-icon>close</md-icon>
      </md-button>
      <md-dialog-content>
        <v-date-picker
          v-model="localDate"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
        ></v-date-picker>
      </md-dialog-content>

      <md-dialog-actions>
        <md-checkbox v-model="noDeadLine">no deadline</md-checkbox>
        <md-button class="md-tertiary" @click="editDate"> Save </md-button>
      </md-dialog-actions>
    </div>
  </md-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ConfimDialogCustom extends Vue {
  @Prop() showDialogDate: boolean;
  @Prop() date: string;

  localDate: string = null;

  @Watch("showDialogDate", { immediate: false })
  watcherShowDialogDate() {
    this.localDate = this.date;
  }

  noDeadLine: boolean = false;

  closeDialogDate(): void {
    this.$emit("closeDialogDate");
    this.noDeadLine = false;
  }

  editDate(): void {
    this.$emit("editDate", {
      noDeadLine: this.noDeadLine,
      date: this.localDate,
    });
    this.noDeadLine = false;
  }
}
</script>
