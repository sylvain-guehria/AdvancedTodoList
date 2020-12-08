<template>
  <div>
    <md-table class="table-custom no-border">
      <md-table-row v-if="item.subtasks && item.subtasks.length">
        <md-table-head width="40px"></md-table-head>
        <md-table-head width="350px" v-if="getSettings('label')"
          >Label</md-table-head
        >
        <md-table-head width="250px" v-if="getSettings('details')"
          >Details</md-table-head
        >
        <md-table-head width="50px" v-if="getSettings('deadline')"
          >Deadline</md-table-head
        >
        <md-table-head width="50px" v-if="getSettings('importance')"
          >Imp</md-table-head
        >
        <md-table-head width="50px" v-if="getSettings('order')"
          >Order</md-table-head
        >
        <md-table-head width="50px" v-if="getSettings('isdone')"
          >Done</md-table-head
        >
        <md-table-head width="50px" v-if="getSettings('actions')"
          >Delete/Edit</md-table-head
        >
      </md-table-row>
      <md-table-row v-for="(subtask, index) in item.subtasks" :key="index">
        <md-table-cell width="40px"></md-table-cell>
        <md-table-cell width="350px" v-if="getSettings('label')">
          <div>
            <p
              contenteditable
              @input="onChange($event, subtask.key, 'label')"
              :class="subtask.isdone ? 'done' : ''"
            >
              {{ subtask.label || "..." }}
            </p>
          </div></md-table-cell
        >

        <md-table-cell width="250px" v-if="getSettings('details')">
          <simple-table-lvl2
            :subtask="subtask"
            :motherKey="item.key"
            :key="getNumberDetailInSubtask(item.key, subtask.key)"
          />
        </md-table-cell>

        <md-table-head
          width="50px"
          v-if="getSettings('deadline')"
          class="hover-click"
        >
          <p @click="showDatepickerDialog(subtask.key, subtask.deadline)">
            {{
              dateOfSubTask(item.key, subtask.key)
                ? dateOfSubTask(item.key, subtask.key)
                : ""
            }}
          </p>
          <feather
            size="20px"
            v-if="!subtask.deadline"
            type="calendar"
            @click="showDatepickerDialog(subtask.key)"
          ></feather>
        </md-table-head>
        <md-table-head width="50px" v-if="getSettings('importance')">
          <p
            contenteditable
            @input="onChangeNumber($event, subtask.key, 'importance')"
          >
            {{ subtask.importance || "..." }}
          </p>
        </md-table-head>
        <md-table-head width="50px" v-if="getSettings('order')">
          <p
            contenteditable
            @input="onChangeNumber($event, subtask.key, 'order')"
          >
            {{ subtask.order || "..." }}
          </p></md-table-head
        >

        <md-table-head width="50px" v-if="getSettings('isdone')"
          ><input
            type="checkbox"
            v-model="subtask.isdone"
            @click="setSubTaskState(subtask.key, item.key, !subtask.isdone)"
          />
        </md-table-head>

        <md-table-head width="50px" v-if="getSettings('actions')">
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
            @click="addEmptySubTask(item.key)"
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

    <md-dialog
      :md-active.sync="showdatepickerDialog"
      :show="showdatepickerDialog"
      @show="showdatepickerDialog = $event"
    >
      <md-button class="md-icon-button simple" @click="closeDialog()">
        <md-icon>close</md-icon>
      </md-button>
      <v-date-picker v-model="date" width="290" class="mt-4"></v-date-picker>
      <md-checkbox v-model="noDeadLine">no deadline</md-checkbox>
      <md-button class="md-tertiary" @click="editDateSubtask"> Save </md-button>
    </md-dialog>
  </div>
</template>
<script lang='ts'>
import { SubTask, Todo, HTMLElementEvent, SubTasks } from "@/common/models/types/types";
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import AddSubtaskModal from "../modals/AddSubtaskModal.vue";
import { myFunctions } from "@/common/helpers/helperfunction";

// Subtasks
import { ActionTypes as subtasksActionsType } from "@/store/modules/subtasks/actions";
import { MutationTypes as subtasksMutationType } from "@/store/modules/subtasks/mutations";

import SimpleTableLvl2 from "./SimpleTableLvl2.vue";

import lodash from "lodash";

@Component({
  components: {
    "add-subtask-modal": AddSubtaskModal,
    "simple-table-lvl2": SimpleTableLvl2,
  },
})
export default class SimpleTableLvl1 extends Vue {
  @Prop() item: Todo;
  showDialogAddSubtask: boolean = false;
  numberInput: number = 0;
  noDeadLine: boolean = false;
  currentKey: string = "";
  dateOfSubTask = myFunctions.dateOfSubTask;
  date = "";

  subtaskToEdit: SubTask = {
    label: "",
    isdone: false,
  };

  selectedDate: Date = null;
  showdatepickerDialog: boolean = false;

  addEmptySubTask(key) {
    let higher_order: number;
    let subtask_with_max_order: Todo;

    subtask_with_max_order = lodash.maxBy(this.item.subtasks, "order");

    if (subtask_with_max_order) {
      higher_order = subtask_with_max_order.order + 1;
    } else {
      higher_order = 1;
    }

    let emptySubTask: SubTask = {
      label: `SubtaskTask N°${higher_order}`,
      isdone: false,
      creationDate: new Date().toISOString().substr(0, 10),
      order: higher_order,
      motherKey: key,
    };

    this.$store
      .dispatch(subtasksActionsType.CREATESUBTASK, emptySubTask)
      .then(() => {
        this.$toasted.show("SubTask added, it is now in your list", {
          icon: "create",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      })
      .catch((error: Error) => {
        this.$toasted.show("Cannot create subtask", {
          icon: "error_outline",
          theme: "bubble",
          position: "bottom-right",
          duration: 5000,
        });
      });
    // if (this.item && this.item.subtasks && this.item.subtasks.length > 0) {
    //   this.item.subtasks.unshift(emptySubTask);
    // } else {
    //   this.item.subtasks = [emptySubTask];
    // }
  }

  getSettings(columnLabel) {
    let colums = this.$store.getters.getSettings;
    let colum;
    if (colums) {
      colum = colums.hidden_column_subtasks[columnLabel];
    }
    return colum;
  }

  getNumberDetailInSubtask(motherKey, key) {
    var index = this.$store.getters.getTodoList.findIndex(function (o) {
      return o.key === motherKey;
    });

    if (index !== -1 && this.$store.getters.getTodoList[index].subtasks) {
      var index_child = this.$store.getters.getTodoList[
        index
      ].subtasks.findIndex(function (o) {
        return o.key === key;
      });

      if (
        index_child !== -1 &&
        this.$store.getters.getTodoList[index].subtasks[index_child] &&
        this.$store.getters.getTodoList[index].subtasks[index_child].details
      ) {
        return this.$store.getters.getTodoList[index].subtasks[index_child]
          .length;
      }
    } else {
      return 0;
    }
  }

  //EDIT SUBTASK
  onChange(e: HTMLElementEvent<HTMLTextAreaElement>, key: string, attribute) {
    e.preventDefault();
    if (e && e.target) {
      let motherKey = this.item.key;
      let value = e.target.innerText;
      this.$store.dispatch(subtasksActionsType.EDITATTRIBUTESUBTASK, {
        motherKey,
        key,
        attribute,
        value,
      });
    }
  }

  editDateSubtask() {
    let value = this.date;
    if (this.noDeadLine) {
      value = "";
    }
    let key = this.currentKey;
    let motherKey = this.item.key;
    let attribute = "deadline";

    this.$store.dispatch(subtasksActionsType.EDITATTRIBUTESUBTASK, {
      motherKey,
      key,
      attribute,
      value,
    });
    this.updateLocalSubtasksDate(key);

    this.showdatepickerDialog = false;

  }

   updateLocalSubtasksDate(key) {
      if (this.item.subtasks && this.item.subtasks.length > 0) {
         var index = this.item.subtasks.findIndex(function (o) {
        return o.key === key;
      });
      if (index !== -1) this.item.subtasks[index].deadline = this.date;
      }
    }

  showDatepickerDialog(key: string, deadline: string) {
    this.currentKey = key;
    if (deadline) {
      this.date = deadline;
    }
    this.showdatepickerDialog = true;
  }

  @Watch("showdatepickerDialog", { immediate: false })
  resetAll() {
    if (this.showdatepickerDialog === false) {
      this.currentKey = "";
      this.date = "";
      this.selectedDate = null;
      this.noDeadLine = false;
    }
  }

  closeDialog() {
    this.showdatepickerDialog = false;
  }

  onChangeNumber(
    e: HTMLElementEvent<HTMLTextAreaElement>,
    key: string,
    attribute
  ) {
    e.preventDefault();
    if (e && e.target && e.target.innerText) {
      let number = parseInt(e.target.innerText, 10);
      let motherKey = this.item.key;

      if (number) {
        let value = e.target.innerText;
        this.$store.dispatch(subtasksActionsType.EDITATTRIBUTESUBTASK, {
          motherKey,
          key,
          attribute,
          value,
        });
      }
    }
  }

  motherKey: string = "";

  setSubTaskState(subtaskKey, motherKey, isDone) {
    this.$store.dispatch(subtasksActionsType.SETSUBTASKSTATE, {
      subtaskKey,
      motherKey,
      isDone,
    });
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

  // OPEN MODAL ADD
  addSubtaskModal(todoKey: string) {
    this.motherKey = todoKey;

    this.showDialogAddSubtask = true;
  }

  //OPEN MODAL EDIT
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
      .dispatch(subtasksActionsType.DELETESUBTASK, keys)
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
    this.deleteSubtaskFromLocalList(subtaskKey);
  }

  deleteSubtaskFromLocalList(subtaskKey: string) {
    var index = this.item.subtasks.findIndex(function (o) {
      return o.key === subtaskKey;
    });
    if (index !== -1) {
      this.item.subtasks.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
}
.hover-click {
  cursor: pointer;
}
</style>
