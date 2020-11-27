<template>
  <div class="my-table">
    <md-table v-model="subtasks">
      <md-table-row slot="md-table-row" slot-scope="{ item }" @click="setSubtTaskDone(item)">
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
import { Todo, SubTask } from "../../models/types";
import InputText from "../../components/Form/InputText.vue";
import SubtaskViewer from "../../pages/Forms/SubTaskViewer.vue";

import { bus } from "../../main";

@Component({
  components: {}
})
export default class ReadOnlySubTask extends Vue {
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

  setSubtTaskDone(subtask: SubTask): void {
    let todo = this.localTodo;
    this.$store.dispatch("setSubTaskDone", { todo, subtask });
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