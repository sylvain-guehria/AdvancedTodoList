<template>
<div class="my-table">
      <md-table v-model="subtasks">
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Sub-task" class="testt"
            ><span
              class="label"
              :class="{ completed: item.isdone }"
              >{{ item.label }}</span
            ></md-table-cell
          >
          <md-table-cell md-label="Done">
            <feather type="check" v-if="item.isdone"></feather>
            <feather type="x-circle" v-if="!item.isdone"></feather>
            </md-table-cell>
        </md-table-row>
      </md-table>
      </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import { Todo, SubTask } from "../../models/types";
import InputText from "../../components/Form/InputText.vue";
import SubtaskViewer from "../../pages/Forms/SubTaskViewer.vue";

import { bus } from "../../main";

@Component({
  components: {
  }
})
export default class ReadOnlySubTask extends Vue {


 @Prop() subtasksreceived: SubTask[];
  subtasks: SubTask[]= [];

 @Watch("subtasksreceived", { immediate: true })
  changeSubtasks() {
    if (this.subtasksreceived) {this.subtasks = [...this.subtasksreceived];}
  }
  
}
</script>

<style lang="scss" scoped>
.label {
  display: inline-block;
  border: 1px solid transparent;
  font-size: 16px;
  max-width: 140px;
}

.my-table{
  all: initial;
   width: 100%;
}
</style>