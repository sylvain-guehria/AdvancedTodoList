<template>
  <div>
    <div class="md-layout-item md-small-size-100 md-size-100">
      <label> <feather type="list"></feather>Subtask </label>
      <input-text
        type="text"
        initialvalue="Add subtask"
        :vmodel="subTaskInput"
        @vmodel="subTaskInput = $event"
      ></input-text>
      <div class="subtask-button">
        <md-button class="md-tertiary" @click="addSubTask">
          <feather type="plus"></feather>Add subtask
        </md-button>
      </div>
    </div>

    <div v-if="subtasks && subtasks.length > 0">
      <div
        v-for="subtask in subtasks"
        :key="subtask.order"
      >
          <md-checkbox
            v-model="subtask.isdone"
            @click="completeSubTask(subtask)"
            >mark as done</md-checkbox
          >

          <span
            class="label"
            contenteditable="true"
            :class="{ completed: subtask.isdone }"
            @keydown.enter="updateSubTask($event, subtask)"
            @blur="updateSubTask($event, subtask)"
            >{{ subtask.label }}</span
          >

          <md-icon @click="removeSubTask(subtask)">close</md-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SubTask, HTMLElementEvent, Todo } from "@/models/types";
import { Component, Vue } from "vue-property-decorator";
import InputText from "../../components/Form/InputText.vue";

@Component({
  components: {
    "input-text": InputText
  }
})
export default class SubTaskViewer extends Vue {
  subTaskInput: string = "";

  hasError: boolean = false;

  subtasks: SubTask[] = [];

  currentTodo: Todo = {
    task: "",
    creationDate: new Date().toISOString().substr(0, 10),
    description: []
  };

  mounted(): void {
    this.currentTodo = { ...this.$store.getters.getCurrentTodo };
    if (this.currentTodo.key) {
      const listTasks: SubTask[] = this.currentTodo.description || [];
      this.subtasks = [...listTasks];
    } else {
      this.subtasks = [];
    }
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
    this.$emit("onSubmitSubTasks", this.subtasks);
  }

  completeSubTask(subtask: SubTask) {
    subtask.isdone = !subtask.isdone;
    // this.$emit("onSubmitSubTasks", this.subtasks);
  }

  removeSubTask(subtask: SubTask) {
    if (subtask.order) {
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
.subtask-button {
  width: 100%;
  display: flex;
}

.label {
  display: inline-block;
  width: 200px;
  padding: 8px;
  font-size: 16px;
  vertical-align: middle;
}

.completed {
  text-decoration: line-through;
}
</style>
