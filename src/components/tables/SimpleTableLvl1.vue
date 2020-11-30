<template>
  <div>
    <md-table class="table-custom no-border">
      <md-table-row v-if="item.subtasks && item.subtasks.length">
        <md-table-head width="40px"></md-table-head>
        <md-table-head width="150px">Label</md-table-head>
        <md-table-head width="250px">Details</md-table-head>
        <md-table-head width="50px">Deadline</md-table-head>
        <md-table-head width="50px">Importance</md-table-head>
        <md-table-head width="50px">Order</md-table-head>
        <md-table-head width="50px">Done</md-table-head>
        <md-table-head width="50px">Delete/Edit</md-table-head>
      </md-table-row>

      <md-table-row v-for="(subtask, index) in item.subtasks" :key="index">
        <md-table-cell width="40px"></md-table-cell>
        <md-table-cell width="150px">
          <div class="reliure"></div>
          <div class="dot"></div>
          <div class="label">
            <p>{{ subtask.label }}</p>
          </div></md-table-cell
        >
        <md-table-cell width="250px"
          ><p class="detail">{{ subtask.detail }}</p></md-table-cell
        >
        <md-table-head width="50px">{{ subtask.deadline }}</md-table-head>
        <md-table-head width="50px">{{ subtask.importance }}</md-table-head>
        <md-table-head width="50px">{{ subtask.order }}</md-table-head>

        <md-table-head width="50px"
          ><feather
            type="check"
            class="hover-click"
            v-if="subtask.isdone"
            @click="setSubTaskState(subtask.key, item.key, false)"
          ></feather>
          <feather
            type="x"
            class="hover-click"
            v-if="!subtask.isdone"
            @click="setSubTaskState(subtask.key, item.key, true)"
          ></feather>
        </md-table-head>

        <md-table-head width="50px">
          <feather
            type="edit"
            class="md-icon hover-click"
            @click="editSubtask(subtask, item.key)"
          ></feather>

          <feather
            type="delete"
            class="md-icon hover-click"
            @click="deleteSubtask(subtask.key, item.key)"
          ></feather>
        </md-table-head>
      </md-table-row>
      <md-table-row>
        <md-table-head colspan="6">
          <feather
            type="plus-circle"
            class="hover-click"
            @click="addSubtaskModal(item.key)"
          ></feather
        ></md-table-head>
      </md-table-row>
    </md-table>

    <md-dialog :md-active.sync="showDialogAddSubtask">
      <add-subtask-modal
        @closeAddSubtaskModal="closeAddSubtaskModal"
        :motherKey="getMotherKey()"
        :subtask="getSubtaskToEdit()"
      ></add-subtask-modal>
    </md-dialog>
  </div>
</template>
<script lang='ts'>
import { SubTask, Todo } from "@/common/models/types";
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import AddSubtaskModal from "../modals/AddSubtaskModal.vue";

@Component({
  components: {
    "add-subtask-modal": AddSubtaskModal,
  },
})
export default class SimpleTableLvl1 extends Vue {
  @Prop() item: Todo;
  showDialogAddSubtask: boolean = false;

  subtaskToEdit: SubTask = {
    label: "",
    isdone: false,
  };

  motherKey: string = "";

  setSubTaskState(subtaskKey, motherKey, isDone) {
    this.$store.dispatch("setSubTaskState", { subtaskKey, motherKey, isDone });
  }

  getSubtaskToEdit() {
    return this.subtaskToEdit;
  }

  closeAddSubtaskModal() {
    this.showDialogAddSubtask = false;
    this.subtaskToEdit = {
      label: "",
      isdone: false,
    };
  }

  getMotherKey() {
    return this.motherKey;
  }

  addSubtaskModal(todoKey: string) {
    this.motherKey = todoKey;

    this.showDialogAddSubtask = true;
  }

  editSubtask(subtask: SubTask, todoKey: string) {
    this.motherKey = todoKey;
    this.subtaskToEdit = subtask;

    this.showDialogAddSubtask = true;
  }

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
.hover-click {
  cursor: pointer;
}
   .label {
      position: absolute;
      left: 0px;
      top: 7px;
    }
    .detail{
       position: absolute;
      left: 0px;
      top: 7px;
    }
table {
  table {
   .label {
      position: absolute;
      left: 15px;
      top: 7px;
    }
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 100%;
      border: solid grey 1px;
      background-color: grey;
      position: absolute;
      left: 0px;
      top: 15px;
    }
    .reliure {
      border-left: dotted #a0a2a4 1px;
      position: absolute;
      left: 2px;
      top: 24px;

      width: 1px;
      height: 47px;
    }
  }
}
</style>
