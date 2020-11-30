<template>
  <div class="drawer-wrapper">
    <div class="sticky">
      <div class="close-right">
        <md-button class="md-icon-button" @click="closeModal">
          <md-icon>close</md-icon>
        </md-button>
      </div>
      <div class="filters-summary">
        <div class="md-layout-item md-size-100">
          <h1 v-if="this.formData.key">Edit a subtask</h1>
          <h1 v-if="!this.formData.key">Add a subtasktask</h1>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <div class="content">
      <div class="md-layout-item md-size-100 filters-wrapper">
        <div class="md-layout-item md-small-size-100 md-size-100">
          <label> <feather type="pen-tool"></feather>Subtask Label </label>
          <input-text
            type="text"
            :maxlength="200"
            initialvalue="Your label"
            :vmodel="formData.label"
            @vmodel="formData.label = $event"
          ></input-text>
        </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
          <label> <feather type="align-center"></feather>Subtask Order </label>
          <input-text
            type="number"
            :vmodel="formData.order"
            @vmodel="formData.order = $event"
          ></input-text>
        </div>

        <div class="md-layout-item md-small-size-100 md-size-100 imp-input">
          <label>
            <feather type="alert-octagon"></feather>Importance of the task
          </label>
          <div class="spinner">
            <div class="importance">
              <input type="range" v-model.number="formData.importance" />
              {{ formData.importance }}%
            </div>
            <md-progress-spinner
              md-mode="determinate"
              :md-diameter="57"
              :md-value="formData.importance"
            ></md-progress-spinner>
          </div>
        </div>

        <div class="md-layout-item md-small-size-100 md-size-100">
          <label> <feather type="calendar"></feather>Deadline </label>
          <md-field>
            <datepicker
              placeholder="YYYY/MM/DD"
              v-model="selectedDate"
            ></datepicker>
          </md-field>
          <md-checkbox v-model="noDeadLine">no deadline</md-checkbox>
        </div><br>

        <div class="md-layout-item md-small-size-100 md-size-100">
          <label> <feather type="pen-tool"></feather>Details subtask </label>
          <input-text
            type="text"
            :maxlength="200"
            initialvalue="Your label"
            :vmodel="formData.detail"
            @vmodel="formData.detail = $event"
          ></input-text>
        </div>

        <md-button class="md-tertiary" @click="addSubtask">
          <feather type="save"></feather>Save
        </md-button>
        <md-button class="md-tertiary" @click="closeModal">Close</md-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import { Todo, SubTask } from "@/common/models/types";
import InputText from "@/common/componentslib/InputText.vue";
import SubtaskViewer from "@/components/forms/SubTaskViewer.vue";
import lodash from "lodash";

//SUBTASK
import { ActionTypes as subtasksActionsType } from '@/store/modules/subtasks/actions';
import { MutationTypes as subtasksMutationType } from '@/store/modules/subtasks/mutations';

@Component({
  components: {
    "input-text": InputText,
  },
})
export default class AddSubTaskModal extends Vue {
  selectedDate: Date = null;
  dateHelper: string = "";
  noDeadLine: boolean = false;

  @Prop() motherKey: string;
  @Prop() subtask: SubTask;

  closeModal() {
    this.$emit("closeAddSubtaskModal");
  }

  @Watch("subtask", { immediate: true })
  changeSubtask() {
    if (this.subtask.key) {
      this.formData = { ...this.subtask };
    }
  }

  addSubtask() {
    if (this.selectedDate) {
      this.dateHelper = this.selectedDate.toISOString().substr(0, 10);
      this.formData.deadline = this.dateHelper;
    }

    if (!this.formData.label) {
      this.$toasted.show("Your subtask must have a label", {
        icon: "warning",
        theme: "bubble",
        position: "top-right",
        duration: 5000,
      });
      return "";
    }

    let subtask: SubTask = { ...this.formData };

    //unable no importance :
    if (subtask.importance == 0) {
      subtask.importance = null;
    }

    //unable no deadline :
    if (this.noDeadLine) {
      subtask.deadline = null;
    }

    subtask.motherKey = this.motherKey;

    let action: string = subtask.key ? subtasksActionsType.EDITSUBTASK : subtasksActionsType.CREATESUBTASK;
    let msg: string = subtask.key ? "Subtask updated" : "Subtask created";

    this.$store
      .dispatch(action, subtask)
      .then(() => {
        this.$toasted.show(msg + " , it is now in your list", {
          icon: "create",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
        this.closeModal();
      })
      .catch((error: Error) => {
        this.$toasted.show("Cannot create subtask", {
          icon: "error_outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
        this.closeModal();
      });
  }

  formData: SubTask = {
    key: "",
    label: "",
    deadline: null,
    importance: null,
    creationDate: new Date().toISOString().substr(0, 10),
    isdone: false,
    detail: "",
  };

  resteForm() {
    this.formData = {
      key: "",
      label: "",
      deadline: null,
      importance: null,
      creationDate: new Date().toISOString().substr(0, 10),
      isdone: false,
      detail: "",
    };
  }
}
</script>

<style lang="scss" scoped>
.spinner {
  display: flex;
  margin: auto;
  width: 100%;
  border: 1px solid #cedfed;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-right: 10px;
}
.importance {
  width: 100%;
  align-items: center;
  display: flex;
  padding-left: 10px;
}
.imp-input {
  margin-bottom: 15px;
}
.line {
  width: 100px;
  border-bottom: 1px solid lightblue;
  margin: 20px;
}

.close-right {
  position: absolute;
  top: 0px;
  right: 0px;
}
.drawer-wrapper{
  height: 1400px;
  width: 400px;
padding-bottom: 15px
}

</style>
