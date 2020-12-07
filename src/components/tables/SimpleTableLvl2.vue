<template>
  <md-table>
    <md-table-row v-for="(detail, index) in subtask.details" :key="index">
      <md-table-cell
        ><p contenteditable @input="onChange($event, index, 'label')" :class="detail.isdone? 'done' : '' ">
          {{ detail.label || "..." }}
        </p></md-table-cell
      >
      <md-table-cell
        ><input
          type="checkbox"
          v-model="detail.isdone"
          @click="onChangeCheckBox(index, !detail.isdone)"
        />
      </md-table-cell>
    </md-table-row>
    <md-table-row>
      <md-table-head>
        <feather
          size="15px"
          type="plus"
          class="hover-click"
          @click="createSubtasksDetail()"
        ></feather
      ></md-table-head>
    </md-table-row>
  </md-table>
</template>
<script lang='ts'>
import { SubTask, Todo, HTMLElementEvent, Detail } from "@/common/models/types";
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import AddSubtaskModal from "../modals/AddSubtaskModal.vue";

// Subtasks
import { ActionTypes as subtasksActionsType } from "@/store/modules/subtasks/actions";
import { MutationTypes as subtasksMutationType } from "@/store/modules/subtasks/mutations";

@Component({
  components: {},
})
export default class SimpleTableLvl2 extends Vue {
  @Prop() subtask: SubTask;
  @Prop() motherKey: string;
  emptyDetail: Detail = {
    label: "...",
    isdone: false,
  };

  //EDIT Details
  onChange(e: HTMLElementEvent<HTMLTextAreaElement>, index: number, attribute: string) {
    e.preventDefault();
    if (e && e.target) {
      let taskKey = this.motherKey;
      let subtaskKey = this.subtask.key;

      let value = e.target.innerText;
      
      this.$store.dispatch(subtasksActionsType.EDITSUBTASKDETAIL, {
        taskKey,
        subtaskKey,
        attribute,
        value,
        index
      });
    }
  }

  onChangeCheckBox(index, isdone) {
    this.setSubTaskDetailState(index, isdone);
  }

  createSubtasksDetail() {
    let subtask = { ...this.subtask };
    subtask.motherKey = this.motherKey;
    if (subtask.details) {
      subtask.details.push({ ...this.emptyDetail });
    } else {
      subtask.details = [{ ...this.emptyDetail }];
    }

    this.$store.dispatch(subtasksActionsType.EDITSUBTASK, subtask);
  }

  setSubTaskDetailState(index, isdone) {
    let subtaskKey = this.subtask.key;
    let motherKey = this.motherKey;
    this.$store.dispatch(subtasksActionsType.SETSUBTASKDETAILSTATE, {
      motherKey,
      subtaskKey,
      index,
      isdone,
    });
  }

  // TODO DETAIL
  deleteSubtask(subtaskKey: string, todoKey: string) {
    let keys = {
      subtaskKey,
      todoKey,
    };
    let vm = this;
    this.$store
      .dispatch("deleteSubtask", keys)
      .then(() => {
        this.$toasted.show("Subtask deleted, it is no longer in your list", {
          icon: "delete_outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      })
      .catch((error: Error) => {
        this.$toasted.show("Cannot deleted Subtask", {
          icon: "error_outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      });
  }
}
</script>

<style lang="scss" scoped>
.done{
  text-decoration: line-through;
}
.hover-click {
  cursor: pointer;
}


</style>
