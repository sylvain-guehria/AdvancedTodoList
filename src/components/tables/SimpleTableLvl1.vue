<template>
  <div>
    <md-table class="table-custom no-border">
      <md-table-row v-if="item.subtasks && item.subtasks.length">
        <md-table-head width="40px"></md-table-head>
        <md-table-head width="150px">Label</md-table-head>
        <md-table-head width="350px">Details</md-table-head>
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
            <p contenteditable @input="onChange($event, subtask.key, 'label')">
              {{ subtask.label || "..." }}
            </p>
          </div></md-table-cell
        >
        <md-table-cell width="350px"
          ><p
            class="detail"
            contenteditable
            @input="onChange($event, subtask.key, 'detail')"
          >
            {{ subtask.detail || "..." }}
          </p></md-table-cell
        >
        <md-table-head width="50px"
          >{{ subtask.deadline ? subtask.deadline : "" }}
          <feather 
          v-if="!subtask.deadline" 
          type="calendar"
          @click="showdatepickerDialog = true"
          ></feather>
        </md-table-head>
        <md-table-head width="50px">
          <p
            contenteditable
            @input="onChangeNumber($event, subtask.key, 'importance')"
          >
            {{ subtask.importance || "..." }}
          </p>
        </md-table-head>
        <md-table-head width="50px">
          <p
            contenteditable
            @input="onChangeNumber($event, subtask.key, 'order')"
          >
            {{ subtask.order || "..." }}
          </p></md-table-head
        >

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

     <md-dialog
      :md-active.sync="showdatepickerDialog"
      >
      <md-dialog-title>
        Choose a date
        </md-dialog-title>
      <md-dialog-content>
     <div class="md-layout-item md-small-size-100 md-size-100">
          <label> <feather type="calendar"></feather>Deadline </label>
          <md-field>
            <datepicker
              placeholder="YYYY/MM/DD"
              v-model="selectedDate"
            ></datepicker>
          </md-field>
        </div><br>
      </md-dialog-content>
          <md-checkbox v-model="noDeadLine">no deadline</md-checkbox>
     </md-dialog>


  </div>
</template>
<script lang='ts'>
import { SubTask, Todo, HTMLElementEvent } from "@/common/models/types";
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import AddSubtaskModal from "../modals/AddSubtaskModal.vue";

// Subtasks
import { ActionTypes as subtasksActionsType } from "@/store/modules/subtasks/actions";
import { MutationTypes as subtasksMutationType } from "@/store/modules/subtasks/mutations";

@Component({
  components: {
    "add-subtask-modal": AddSubtaskModal,
  },
})
export default class SimpleTableLvl1 extends Vue {
  @Prop() item: Todo;
  showDialogAddSubtask: boolean = false;
  numberInput: number = 0;
  noDeadLine: boolean = false;

  subtaskToEdit: SubTask = {
    label: "",
    isdone: false,
  };

  selectedDate: Date = new Date();
  showdatepickerDialog: boolean = false;

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

  onChangeNumber(
    e: HTMLElementEvent<HTMLTextAreaElement>,
    key: string,
    attribute
  ) {
    e.preventDefault();
    if (e && e.target && e.target.innerText) {
      let number = parseInt(e.target.innerText, 10);
      let motherKey = this.item.key;

      //eslint-disable-next-line no-console
      console.log("number", number);
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
.detail {
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
