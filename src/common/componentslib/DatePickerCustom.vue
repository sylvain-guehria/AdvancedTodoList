<template>
  <div class='dateDialog'>
    <md-dialog
      :md-active.sync="showDialogDate"
      :show="showDialogDate"
      @show="showDialogDate = $event"
    >
      <div class="padding">
        <md-button class="md-icon-button simple" @click="closeDialogDate">
          <md-icon>close</md-icon>
        </md-button>
        <v-date-picker v-model="localDate"></v-date-picker>
      </div>
      <div class="padding">
        <md-checkbox v-model="noDeadLine">no deadline</md-checkbox>
        <md-button class="md-tertiary" @click="editDate"> Save </md-button>
      </div>
    </md-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ConfimDialogCustom extends Vue {
  @Prop() showDialogDate: boolean;
  @Prop() date: string;

  localDate: string = null;

  mounted() {
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
<style scoped>
.dateDialog{
  /* padding: 50px !important; */
}
</style>