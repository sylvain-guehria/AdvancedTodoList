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
            <h1>Add a task</h1>
            <md-button class="md-tertiary" @click="resteForm">
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
          </div>

          <sub-tasks-viewer @onSubmitSubTasks="setSubTasks"></sub-tasks-viewer>

          <md-button class="md-tertiary" @click="createTodo">
            <feather type="save"></feather>Save
          </md-button>
        </div>
      </div>
    </div>
  </md-drawer>
</template>

<script lang='ts'>
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import { Todo, SubTask } from "../../models/types";
import InputText from "../../components/Form/InputText.vue";
import SubtaskViewer from '../../pages/Forms/SubTaskViewer.vue';

import {bus} from '../../main';

@Component({
  components: {
    "input-text": InputText,
    "sub-tasks-viewer": SubtaskViewer
  }
})
export default class EditTaskDrawer extends Vue {

  @Prop() isActive!: boolean;

  filtersNb: number = 0;
  list = [];
  selectedDate: Date = new Date();

  get localIsActive(): boolean {
    return this.isActive;
  }
  set localIsActive(value: boolean) {
    this.$emit("isActive", value);
  }

  public toggleMenu() {
    this.localIsActive = false;
  }

  formData: Todo = {
    key: "",
    task: "",
    deadline: new Date().toISOString().substr(0, 10),
    importance: 0,
    description: [],
    creationDate: new Date().toISOString().substr(0, 10)
  };

  dateHelper: string = "";

  dateToday: string = "";

  useruid: string = "";

  subTasks: SubTask[] = [];

  createTodo() {
    this.dateHelper = this.selectedDate.toISOString().substr(0, 10);
    this.formData.deadline = this.dateHelper;

    let todo: Todo = this.formData;

    this.$store
      .dispatch("createTodo", todo)
      .then(() => {
        this.$notify({
          title: "Task created",
          text: "it is now in your list =)",
          type: "success"
        });
      })
      .catch((error: Error) => {
        this.$notify({
          title: "Cannot create task",
          text: error.message,
          type: "error"
        });
      });

    this.toggleMenu();
    this.resteForm();
    this.$store.commit('resetCurrentTodo');
    //emitt event for child
    bus.$emit('resetSubTasks');
  }

  setSubTasks (subtasks: SubTask[]){
    this.formData.description = subtasks;
  }

  resteForm() {
    this.formData = {
      key: "",
      task: "",
      deadline: "",
      importance: 0,
      description: [],
      creationDate: new Date().toISOString().substr(0, 10)
    };
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