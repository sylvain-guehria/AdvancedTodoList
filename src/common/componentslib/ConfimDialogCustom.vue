<template>

  <div>
    <md-dialog :md-active.sync="confirmDialog">
      <md-dialog-title>{{ title }}</md-dialog-title>

      <md-dialog-content> {{ content }} </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-tertiary" @click="onCancelDialog">Cancel</md-button>
        <md-button class="md-tertiary" @click="onConfirmDialog">Yes</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>

</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ConfimDialogCustom extends Vue {
  @Prop() confirmDialog: boolean;
  @Prop() title: string;
  @Prop() content: string;

  onCancelDialog(): void {
    this.$emit("closeConfirmDialog");
  }

  onConfirmDialog(): void {
    this.$emit("confirmDialog");
  }
}
</script>
