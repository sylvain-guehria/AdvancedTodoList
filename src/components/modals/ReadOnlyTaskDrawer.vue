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
            <h1>Display task</h1>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="md-layout-item md-size-100 filters-wrapper">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="pen-tool"></feather>Task title </label>
            <input-text
              :disabled="true"
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
                <input
                  :disabled="true"
                  type="range"
                  v-model.number="formData.importance"
                />
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
                :disabled="true"
                placeholder="YYYY/MM/DD"
                v-model="formData.deadline"
              ></datepicker>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="calendar"></feather>Created on </label>
            <md-field>
              <datepicker
                :disabled="true"
                placeholder="YYYY/MM/DD"
                v-model="formData.creationDate"
              ></datepicker>
            </md-field>
          </div>
          <!-- <sub-tasks-viewer
            :readonly="true"
            :subtasksreceived="this.formData.description"
          ></sub-tasks-viewer> -->
          <div class="readonly-subtasks" v-if="this.formData.description">
            <read-only-task-viewer
              :subtasksreceived="this.formData.description"
              :todo="this.formData"
            >
            </read-only-task-viewer>
          </div>
        </div>
      </div>
    </div>
  </md-drawer>
</template>

<script lang='ts'>
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import { Todo, SubTask } from "../../models/types";
import InputText from "../../components/Form/InputText.vue";
import SubtaskViewer from "../../pages/Forms/SubTaskViewer.vue";

import { bus } from "../../main";
import ReadOnlySubTask from "../../pages/Forms/ReadOnlySubTask.vue";

@Component({
  components: {
    "input-text": InputText,
    // "sub-tasks-viewer": SubtaskViewer
    "read-only-task-viewer": ReadOnlySubTask
  }
})
export default class ReadOnlyTaskDrawer extends Vue {
  @Prop() isActive!: boolean;

  filtersNb: number = 0;
  list = [];
  selectedDate: Date = new Date();
  currentTodo: Todo;
  isEditionMode: boolean = false;

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
    this.currentTodo = this.$store.getters.getCurrentTodo;
    if (this.currentTodo && this.currentTodo.key) {
      this.formData = { ...this.currentTodo };
    }

    if (!this.isActive) {
      this.resteForm();
      this.$store.commit("resetCurrentTodo");
      bus.$emit("resetSubTasks");
    }
  }

  formData: Todo = {
    key: "",
    task: "",
    deadline: new Date().toISOString().substr(0, 10),
    importance: 0,
    description: [],
    creationDate: new Date().toISOString().substr(0, 10),
    isdone: false
  };

  dateHelper: string = "";

  dateToday: string = "";

  useruid: string = "";

  subTasks: SubTask[] = [];

  resteForm() {
    this.formData = {
      key: "",
      task: "",
      deadline: "",
      importance: 0,
      description: [],
      creationDate: new Date().toISOString().substr(0, 10),
      isdone: false
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
.readonly-subtasks {
  display: inline-block;
  width: 100%;
  margin: auto;
  margin-top: 100px;
}
</style>