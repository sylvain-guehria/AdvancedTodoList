<template>
  <md-drawer class="md-right" :md-active.sync="localIsActive" md-swipeable>
    <div class="drawer-wrapper">
      <div class="sticky">
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="md-icon-button simple" @click="toggleMenu()">
            <md-icon>close</md-icon>
          </md-button>
        </div>
        <div class="filters-summary">
          <div class="md-layout-item md-size-100">
            <h1 v-if="this.formData.key">Edit a task</h1>
            <h1 v-if="!this.formData.key">Add a task</h1>

            <md-button class="md-tertiary" @click="resetStepOne">
              <feather type="trash-2"></feather>Reset
            </md-button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="md-layout-item md-size-100 filters-wrapper">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="pen-tool"></feather>Task title </label>
            <input-text
              type="text"
              :maxlength="200"
              initialvalue="Your title"
              :vmodel="formData.task"
              @vmodel="formData.task = $event"
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
          </div>

           <!-- <div class="mb">
            <sub-tasks-viewer
              @onSubmitSubTasks="setSubTasks"
              @changeSubtaskInput="changeSubtaskInput"
              :subtasksreceived="[...this.formData.subtasks]"
            ></sub-tasks-viewer>
          </div>  -->

          <md-button class="md-tertiary" @click="checkBeforeSave">
            <feather type="save"></feather>Save
          </md-button>
        </div>
      </div>
    </div>

    <!-- modal confirm reset -->
    <div>
      <md-dialog :md-active.sync="confirmModalactive">
        <md-dialog-title>Do you want to reset the form?</md-dialog-title>

        <md-dialog-content>
          <p>You cannot go back if you press 'Yes'</p>
          <p v-if="isEditionMode">
            The modifications will not be taken in account as long as you don't
            click save
          </p>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-tertiary" @click="onCancel">Cancel</md-button>
          <md-button class="md-tertiary" @click="onConfirm">Yes</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>

    <!-- modal confirm leave -->
    <div>
      <md-dialog :md-active.sync="confirmModalLeaveactive">
        <md-dialog-title>Do you want to leave without saving?</md-dialog-title>

        <md-dialog-content>
          <p>You will loose non saved data if you press 'Yes'</p>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-tertiary" @click="onCancelLeave"
            >Cancel</md-button
          >
          <md-button class="md-tertiary" @click="leavingDrawerEdit"
            >Yes</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </div>

    <!-- modal warning subtask in progress -->
    <div>
      <md-dialog :md-active.sync="subtaskInProgressModal">
        <md-dialog-title
          >Carfull, there is a subtask in progress</md-dialog-title
        >

        <md-dialog-content>
          <p>You will loose this subtask if you save without adding it.</p>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-tertiary" @click="subtaskInProgressModal = false"
            >Cancel</md-button
          >
          <md-button class="md-tertiary" @click="actionTodo"
            >Save anyway</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </div>
  </md-drawer>
</template>

<script lang='ts'>
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import { Todo, SubTask } from "@/common/models/types";
import InputText from "@/common/componentslib/InputText.vue";
import SubtaskViewer from "@/components/forms/SubTaskViewer.vue";
import lodash from "lodash";

import { bus } from "@/main";

@Component({
  components: {
    "input-text": InputText,
    "sub-tasks-viewer": SubtaskViewer,
  },
})
export default class EditTaskDrawer extends Vue {
  @Prop() isActive!: boolean;

  filtersNb: number = 0;
  list = [];
  selectedDate: Date = null;
  currentTodo: Todo;
  isEditionMode: boolean = false;
  confirmModalactive: boolean = false;
  confirmModalLeaveactive: boolean = false;
  userDoWantToLeave: boolean = false;
  isThereASubtaskInProgress: boolean = false;
  subtaskInProgressModal: boolean = false;
  noDeadLine: boolean = false;

  todolist: Todo[] = [];

  mounted() {
    this.todolist = this.$store.getters.getTodoList;
  }

  resetStepOne() {
    this.confirmModalactive = true;
  }

  onConfirm() {
    this.confirmModalactive = false;
    this.resteForm();
  }
  onCancel() {
    this.confirmModalactive = false;
  }

  onCancelLeave() {
    this.localIsActive = true;
    this.confirmModalLeaveactive = false;
    this.userDoWantToLeave = false;
  }

  leavingDrawerEdit() {
    this.resteForm();
    this.$store.commit("resetCurrentTodo");
    bus.$emit("resetSubTasks");
    this.userDoWantToLeave = true;
    this.localIsActive = false;
    this.confirmModalLeaveactive = false;
  }

  get localIsActive(): boolean {
    return this.isActive;
  }
  set localIsActive(value: boolean) {
    this.$emit("isActive", value);
  }

  public toggleMenu() {
    this.localIsActive = false;
  }

  @Watch("isActive", { immediate: false })
  isThereACurrentTodo() {
    if (this.isActive) {
      this.userDoWantToLeave = false;
      this.currentTodo = { ...this.$store.getters.getCurrentTodo };
      if (this.currentTodo && this.currentTodo.key) {
        this.formData = { ...this.currentTodo };
        if (this.currentTodo.deadline) {
          this.selectedDate = new Date(this.currentTodo.deadline);
           this.noDeadLine = false;
        }else{
          this.noDeadLine = true;
        }
        this.isEditionMode = true;
      }
    }

    if (!this.isActive && !this.userDoWantToLeave) {
      this.localIsActive = true;
      this.confirmModalLeaveactive = true;
    }
  }

  changeSubtaskInput(hasSubTaskInProgress: boolean) {
    this.isThereASubtaskInProgress = hasSubTaskInProgress;
  }

  formData: Todo = {
    key: "",
    task: "",
    deadline: null,
    importance: null,
    subtasks: [],
    creationDate: new Date().toISOString().substr(0, 10),
    isdone: false,
  };

  dateHelper: string = "";

  dateToday: string = "";

  useruid: string = "";

  subTasks: SubTask[] = [];

  checkBeforeSave() {
    if (!this.isThereASubtaskInProgress) {
      this.actionTodo();
    } else {
      this.subtaskInProgressModal = true;
    }
  }

  actionTodo() {
    this.subtaskInProgressModal = false;

    if (this.selectedDate) {
      this.dateHelper = this.selectedDate.toISOString().substr(0, 10);
      this.formData.deadline = this.dateHelper;
    }

    if (!this.formData.task) {
      this.$toasted.show("Your task must have a title", {
        icon: "warning",
        theme: "bubble",
        position: "top-right",
        duration: 5000,
      });
      return "";
    }

    let todo: Todo = { ...this.formData };

    let action: string = todo.key ? "editTodo" : "createTodo";
    let msg: string = todo.key ? "Task updated" : "Task created";

    if (action === "createTodo") {
      // find highest order and add 1
      let higher_order: number;
      let todo_with_max_order: Todo;

      todo_with_max_order = lodash.maxBy(this.todolist, "order");

      if (todo_with_max_order) {
        higher_order = todo_with_max_order.order + 1;
      } else {
        higher_order = 1;
      }

      todo.order = higher_order;
    }

    //unable no importance :
    if (todo.importance === 0) {
      todo.importance = null;
    }

    //unable no deadline :
    if (this.noDeadLine) {
      todo.deadline = null;
    }

    this.$store
      .dispatch(action, todo)
      .then(() => {
        this.$toasted.show(msg + " , it is now in your list", {
          icon: "create",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      })
      .catch((error: Error) => {
        this.$toasted.show("Cannot create task", {
          icon: "error_outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      });

    this.userDoWantToLeave = true;
    this.toggleMenu();
    this.resteForm();
    this.$store.commit("resetCurrentTodo");
    //emitt event for child
    bus.$emit("resetSubTasks");
  }

  setSubTasks(subtasks: SubTask[]) {
    this.formData.subtasks = [...subtasks];
  }

  resteForm() {
    this.formData = {
      key: "",
      task: "",
      deadline: "",
      importance: 0,
      subtasks: [],
      creationDate: new Date().toISOString().substr(0, 10),
      isdone: false,
    };
    bus.$emit("resetSubTasks");
    this.selectedDate = new Date();
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
</style>