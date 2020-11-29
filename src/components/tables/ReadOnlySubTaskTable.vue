<template>
  <div class="my-table">
    <md-table v-model="subtasks">
      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="setSubTaskDoneUndone(item)">
        <md-table-cell md-label="Sub-task" class="testt"
          ><span class="label" :class="{ completed: item.isdone }">{{
            item.label
          }}</span></md-table-cell
        >
        <md-table-cell md-label="Done*">
          <feather type="check" v-if="item.isdone"></feather>
          <feather type="x" v-if="!item.isdone"></feather>
        </md-table-cell>
      </md-table-row>
    </md-table><br>
    <p>*click to mark as done/undone</p>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import { Todo, SubTask } from "@/common/models/types";
import InputText from "@/common/componentslib/InputText.vue";
import SubtaskViewer from "@/components/forms/SubTaskViewer.vue";

import { bus } from "@/main";

@Component({
  components: {}
})
export default class ReadOnlySubTaskTable extends Vue {
  @Prop() subtasksreceived: SubTask[];
  @Prop() todo: Todo;

  subtasks: SubTask[] = [];
  localTodo: Todo;

  @Watch("subtasksreceived", { immediate: true })
  changeSubtasks() {
    if (this.subtasksreceived && this.todo) {
      this.subtasks = [...this.subtasksreceived];
      this.localTodo = this.todo;
    }
  }

  setSubTaskDoneUndone(subtask: SubTask): void {
    let subtaskKey = subtask.key;
    let motherKey = this.todo.key;
    let isDone = !subtask.isdone;
    this.$store.dispatch("setSubTaskState", { subtaskKey, motherKey, isDone });
  }
}
</script>

<style lang="scss" scoped>
.testt {
  padding: 5px;
  width: 100%;
}

.label {
  font-size: 15px;
  max-width: 140px;
  word-break: break-word;
  font-size: 16px
}

.my-table {
  all: initial;
  width: 100%;
}

p{
  color: dimgrey;
  font-size: 14px;
}
</style>