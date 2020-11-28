<template>
  <div>
    <div
      class="md-layout-item md-small-size-100 md-size-100"
      v-show="!readOnlyLocal"
    >
      <label> <feather type="list"></feather>Subtask </label>
      <input-text
        :disabled="readOnlyLocal"
        type="text"
        initialvalue="Your subtask"
        :vmodel="subTaskInput"
        @vmodel="subTaskInput = $event"
      ></input-text>
      <div class="subtask-button" v-show="!readOnlyLocal">
        <md-button class="md-tertiary" @click="addSubTask">
          <feather type="plus"></feather>Add subtask
        </md-button>
      </div>
    </div>

    <div>
      <div>
        <feather type="corner-right-down"></feather>
      </div>
      <!-- table -->
      <div class="my-table">
        <md-table v-model="subtasks" v-if="subtasks && subtasks[0]">
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Sub-task" class="testt">
              <span
                class="label"
                :contenteditable="!readOnlyLocal"
                :class="{ completed: item.isdone }"
                @keydown.enter="updateSubTask($event, item)"
                @blur="updateSubTask($event, item)"
                >{{ item.label }}
                </span>
              </md-table-cell>
                  <!-- <md-table-cell md-label="subtasks">
              <span
                class="label"
                :contenteditable="!readOnlyLocal"
                :class="{ completed: item.isdone }"
                @keydown.enter="updateSubTask($event, item)"
                @blur="updateSubTask($event, item)"
                >{{ item.subtasks }}
                </span>
              </md-table-cell> -->
            <md-table-cell md-label="Done">
              <md-checkbox
                :disabled="readOnlyLocal"
                v-model="item.isdone"
                @click="completeSubTask(item)"
              ></md-checkbox
            ></md-table-cell>
            <md-table-cell md-label="Delete" v-if="!readOnlyLocal">
              <td @click="removeSubTask(item)"><md-icon>close</md-icon></td>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
      <!-- fin table -->
    </div>
  </div>
</template>

<script lang="ts">
import { SubTask, HTMLElementEvent, Todo } from "@/common/models/types";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import InputText from "@/common/componentslib/InputText.vue";

import { bus } from "@/main";

@Component({
  components: {
    "input-text": InputText,
  },
})
export default class SubTaskViewer extends Vue {
  @Prop() subtasksreceived: SubTask[];
  @Prop() readonly: boolean;
  subTaskInput: string = "";
  subTaskInputsubtasks: string = "";
  subtasks: SubTask[] = [];
  hasError: boolean = false;
  renderTable: boolean = false;

  readOnlyLocal: boolean = false;

  @Watch("subTaskInput", { immediate: false })
  changeSubtaskInput() {
    //if input, user can't leave the form without warning dialog
    if (this.subTaskInput) {
      this.$emit("changeSubtaskInput", true);
    }else{
      this.$emit("changeSubtaskInput", false);
    }
  }

  @Watch("subtasksreceived", { immediate: true })
  changeSubtasks() {
    if (this.subtasksreceived && this.subtasksreceived[0]) {
      this.subtasks = [...this.subtasksreceived];
    }
  }

  mounted() {
    bus.$on("resetSubTasks", this.resetSubTasks);
    this.readOnlyLocal = this.readonly;
    this.renderTable = false;
  }

  resetSubTasks(): void {
    this.subtasks = [];
    this.subTaskInput = "";
  }

  addSubTask() {
    if (!this.subTaskInput) {
      this.hasError = true;
      return;
    }

    this.hasError = false;

    this.subtasks.push({
      order: this.subtasks ? this.subtasks.length : 0,
      label: this.subTaskInput,
      isdone: false
    });

    this.subTaskInput = "";
    this.$emit("onSubmitSubTasks", this.subtasks);
  }

  updateSubTask(e: HTMLElementEvent<HTMLTextAreaElement>, subtask: SubTask) {
    e.preventDefault();
    if (e && e.target) {
      subtask.label = e.target.innerText;
      e.target.blur();
    }
    //this.$emit("onSubmitSubTasks", this.subtasks);
  }

  completeSubTask(subtask: SubTask) {
    subtask.isdone = !subtask.isdone;
    this.$emit("onSubmitSubTasks", this.subtasks);
  }

  removeSubTask(subtask: SubTask) {
    if (subtask.order || subtask.order === 0) {
      this.subtasks.splice(subtask.order, 1);

      this.subtasks.forEach((subtask, index) => {
        subtask.order = index;
      });
      this.$emit("onSubmitSubTasks", this.subtasks);
    }
  }
}
</script>

<style scoped>
.my-table {
  width: 95%;
  position: absolute;
  left: 15px;
  margin-top: 100px;
  margin-bottom: 20px;
}

.testt {
  width: 100%;
  padding: 5px;
}

.subtask-button {
  width: 100%;
  display: flex;
}

.label {
  display: inline-block;
  border: 1px solid transparent;
  font-size: 16px;
  max-width: 300px;
}

.completed {
  font-style: oblique;
}
</style>
