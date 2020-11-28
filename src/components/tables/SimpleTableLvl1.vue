<template>
  <div>
    <md-table class="table-custom">
      <md-table-row v-if="item.subtasks && item.subtasks.length">
        <md-table-head  width="50px">Order</md-table-head>
        <md-table-head>Label</md-table-head>
        <md-table-head>Details</md-table-head>
        <md-table-head>Deadline</md-table-head>
        <md-table-head>Importance</md-table-head>
        <md-table-head>Done</md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>

      <md-table-row v-for="(subtask, index) in item.subtasks" :key="index">
        <md-table-head  width="50px">{{ subtask.order }}</md-table-head>
        <md-table-head>{{ subtask.label }}</md-table-head>
        <md-table-head>{{ subtask.detail }}</md-table-head>
        <md-table-head>{{ subtask.deadline }}</md-table-head>
        <md-table-head>{{ subtask.importance }}</md-table-head>

        <md-table-head
          ><feather type="check" v-if="subtask.isdone"  @click="setSubTaskState(subtask.key, item.key, false)"></feather>
          <feather type="x" v-if="!subtask.isdone"  @click="setSubTaskState(subtask.key, item.key, true)"></feather>
        </md-table-head>

        <md-table-head width="50px">
          <feather
            type="edit"
            class="md-icon"
            @click="editSubtask(subtask, item.key)"
          ></feather>

          <feather
            type="delete"
            class="md-icon"
            @click="deleteSubtask(subtask.key, item.key)"
          ></feather>
        </md-table-head>
      </md-table-row>
      <md-table-row>
        <md-table-head></md-table-head>
        <md-table-head></md-table-head>
        <md-table-head></md-table-head>
        <md-table-head>
          <feather type="plus" @click="addSubtaskModal(item.key)"></feather
        ></md-table-head>
        <md-table-head></md-table-head>
        <md-table-head></md-table-head>
        <md-table-head></md-table-head>
      </md-table-row>
    </md-table>

    <md-dialog :md-active.sync="showDialogAddSubtask" >
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

  setSubTaskState(subtaskKey, motherKey, isDone){
    this.$store.dispatch("setSubTaskState", {subtaskKey, motherKey, isDone} )
  }

  getSubtaskToEdit(){
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

  addSubtaskModal(key) {
    this.motherKey = key;
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
        todoKey
      }
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
// .md-table,
// .md-table.md-theme-default {
//   table {
//     border-radius: 0 10px 10px 10px;
//   }
//   .md-table-content,
//   &.md-content {
//     background-color: transparent;
//   }
//   tr {
//     height: 60px;
//   }
//   thead {

//     .md-table-head {
//       padding-left: 25px;
//     }
//     .md-table-head-label {
//       font-weight: bold;
//       text-transform: uppercase;
//     }
//   }
//   tbody {
//     border: none !important;

//     .md-table-row {
//       border: none!important;
//       td {
//         border: none;
//         &.more-column {
//           //border-left: $table-default-border;
//           padding: 0;
//           width: 70px;

//           .md-button {
//             min-width: 70px;
//             width: 70px;
//           }
//         }
//         &.last-column {
//           padding-right: 10px;
//         }
//       }
//       &:hover:not(.md-header-row) .md-table-cell,
//       &.active:not(.md-header-row) .md-table-cell {
//         cursor: pointer;
//       }
//     }
//   }
//   .md-menu
//     .md-button:not(.md-just-icon):not(.md-tab-nav-button)
//     .md-button-content
//     i,
//   .md-menu .md-button:not(.md-just-icon) .md-button-content i:first-child {
//     margin-right: 0px;
//     font-weight: 400;
//   }

//   &.menu-opened tbody {
//     .md-table-row:not(.table-row-selected) {
//       &:hover:not(.md-header-row) .md-table-cell,
//       &.active:not(.md-header-row) .md-table-cell {
//         background-color: white;
//         cursor: unset;
//       }
//     }

//     .md-table-row.table-row-selected {
//       background-color: #e8f0f7 !important;
//       td {
//         background-color: transparent;
//       }
//     }
//   }
// }
</style>
