<template>
  <v-dialog
      v-model="confirmDialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ content }} 
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="onCancelDialog"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="onConfirmDialog"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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