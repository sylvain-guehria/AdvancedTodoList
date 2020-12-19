<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="330">
      <template v-slot:activator="{ on, attrs }">
        <p v-show="item.deadline" v-bind="attrs" v-on="on">
          {{ item.deadline ? item.deadline : "" }}
        </p>
        <feather
          size="20px"
          v-show="!item.deadline"
          type="calendar"
          v-bind="attrs"
          v-on="on"
        ></feather>
      </template>
      <v-card>
        <v-card-text> Choose your deadline </v-card-text>
        <v-card-text
          ><v-row justify="center">
            <v-date-picker
              color="primary lighten-1"
              v-model="localItem.deadline"
              year-icon="mdi-calendar-blank"
              prev-icon="mdi-skip-previous"
              next-icon="mdi-skip-next"
            ></v-date-picker> </v-row
        ></v-card-text>
        <v-card-text>
          <v-checkbox
            v-model="noDeadline"
            label="No deadline"
            color="primary"
            hide-details
          ></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="editDate"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Todo } from "../models/types";
import { helperFunctions } from "@/common/helpers/helperfunction";

@Component({
  components: {},
})
export default class DatePickerCustom extends Vue {
  @Prop() item;
  noDeadline: boolean = false;
  dialog: boolean = false;
  //dateOfTask = helperFunctions.dateOfTask;

  localItem = {
    deadline: null,
  };

  emptyiItem = {
    deadline: null,
  };

  @Watch("dialog", { immediate: false })
  watchDialog() {
    if (!this.dialog) {
      this.localItem = {...this.emptyiItem} ;
    }else{
       this.localItem = {...this.item};
    }
     this.noDeadline = false;
  }

  closeDialogDate(): void {
    this.dialog = false;
  }

  editDate(): void {
    this.dialog = false;
    this.$emit("emitDate", {
      item: this.localItem,
      noDeadline: this.noDeadline,
    });
  }
}
</script>

<style scoped></style>
