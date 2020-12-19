<template>
  <div
    class="calendar-event"
  >
      <display-task-modal
          :key="event ? event.id : null"
          :event="event ? event : null"
        ></display-task-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Calendar, Weekday } from "dayspan";
import DayBlock from "./DayBlock.vue";
import moment from "moment";
import Modal from "@/common/componentslib/Modal.vue";
import { helperFunctions } from "@/common/helpers/helperfunction";
import { bus } from "@/main";
import DisplayTaskModal from "@/components/modals/DisplayTaskModal.vue";
import { Todo } from "@/common/models/types/index";


@Component({
  components: {
    modal: Modal,
    "display-task-modal": DisplayTaskModal
  },
})
export default class PCalendarEvent extends Vue {
  @Prop() days!: Array<any>;
  @Prop() calendar!: Calendar<any, any>;
  @Prop() event!: any;

}
</script>

<style scoped>
.red-text {
  color: red;
}
.green-text {
  color: green;
}

.header-title {
  word-break: break-word;
  margin-top: 50px;
}

h1 {
  display: flex;
}
.go-edit {
  position: absolute;
  top: 7px;
  left: 10px;
  cursor: pointer;
}

.md-layout-item {
  font-family: initial;
  font-size: 19px !important;
  margin-top: 10px;
}
</style>
