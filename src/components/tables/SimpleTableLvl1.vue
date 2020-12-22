<template>
  <div>
    <md-table>
      <md-table-row v-if="getLocalSubtasks() && getLocalSubtasks().length > 0">
        <md-table-cell class="head"></md-table-cell>
        <md-table-cell
         class="head center-icon"
         v-if="getSettings('deadline')" 
         >
          <feather
            size="15px"
            type="arrow-down"
            v-if="currentSorting === 'deadline' && currentAsc === 'desc'"
            @click="sortSubtasks('deadline', 'asc')"
          ></feather>
          <feather
            size="15px"
            type="arrow-up"
            v-if="currentSorting === 'deadline' && currentAsc === 'asc'"
            @click="sortSubtasks('deadline', 'desc')"
          ></feather>
          <feather
            size="15px"
            type="arrow-right"
            @click="sortSubtasks('deadline', 'asc')"
            v-if="currentSorting != 'deadline'"
          ></feather>
          <md-tooltip md-direction="top">Sort By Deadline</md-tooltip>
        </md-table-cell>
        <md-table-cell 
        class="head center-icon"
        v-if="getSettings('importance')" >
          <feather
            size="15px"
            type="arrow-down"
            v-if="currentSorting === 'importance' && currentAsc === 'desc'"
            @click="sortSubtasks('importance', 'asc')"
          ></feather>
          <feather
            size="15px"
            type="arrow-up"
            v-if="currentSorting === 'importance' && currentAsc === 'asc'"
            @click="sortSubtasks('importance', 'desc')"
          ></feather>
          <feather
            size="15px"
            type="arrow-right"
            v-if="currentSorting != 'importance'"
            @click="sortSubtasks('importance', 'asc')"
          ></feather>
          <md-tooltip md-direction="top">Sort By Importance</md-tooltip>
        </md-table-cell>
        <md-table-cell
         class="head center-icon"
          v-if="getSettings('order')" >
          <feather
            size="15px"
            type="arrow-down"
            v-if="currentSorting === 'order' && currentAsc === 'desc'"
            @click="sortSubtasks('order', 'asc')"
          ></feather>
          <feather
            size="15px"
            type="arrow-up"
            v-if="currentSorting === 'order' && currentAsc === 'asc'"
            @click="sortSubtasks('order', 'desc')"
          ></feather>
          <feather
            size="15px"
            type="arrow-right"
            v-if="currentSorting != 'order'"
            @click="sortSubtasks('order', 'asc')"
          ></feather>
          <md-tooltip md-direction="top">Sort By order</md-tooltip>
        </md-table-cell>
        <md-table-cell class="head"></md-table-cell>
      </md-table-row>
      <md-table-row v-for="(subtask, index) in getLocalSubtasks()" :key="index">
        <md-table-cell class="colum-min-width-400">
          <div class="flex">
            <div class="checkbox">
              <v-checkbox
                dense
                class="checkme"
                height="100%"
                v-model="subtask.isdone"
                @click="setSubTaskState(subtask.key, item.key, subtask.isdone)"
                hide-details
              />
            </div>
            <div class="label-content">
              <input-contenteditable
                v-model="subtask.label"
                :class="subtask.isdone ? 'done' : ''"
                class="break-word"
                _is="p"
                :maxlength="250"
                type="text"
                placeholder="label"
                @giveTodoKey="setCurrentSubtaskEdited_key_attribue(subtask.key, 'label')"
                @keydown.enter="onPressEnterOrBlur"
                @blur="onPressEnterOrBlur"
              />
            </div>
          </div>

          <div class="details" :class="maintable ? 'details-maintable': ''">
            <simple-table-lvl2
              :subtask="subtask"
              :motherKey="item.key"
              :key="getCustomKey(item.key, subtask.key)"
              @keyLvl2Incr="keyLvl2Incr"
            />
          </div>
        </md-table-cell>

        <md-table-cell v-if="getSettings('deadline')" class="column-90 center-icon">
          <div
            class="hover-click"
            @click="showDatepickerDialog(subtask.key, subtask.deadline)"
          >
            <div class="hover-click">
              <date-picker :item="subtask" @emitDate="editDateSubtaskTask" :key="subtask.key" />
            </div>

            <md-tooltip md-direction="bottom">Deadline</md-tooltip>
          </div>
        </md-table-cell>
        <md-table-cell v-if="getSettings('importance')" class="column-30 center-icon">
          <input-contenteditable
            v-model="subtask.importance"
            _is="p"
            :maxlength="100"
            type="number"
            placeholder="..."
            @giveTodoKey="setCurrentSubtaskEdited_key_attribue(subtask.key, 'importance')"
            @keydown.enter="onPressEnterOrBlur"
            @blur="onPressEnterOrBlur"
          />
          <md-tooltip md-direction="bottom">Importance</md-tooltip>
        </md-table-cell>
        <md-table-cell v-if="getSettings('order')" class="column-30 center-icon">
          <input-contenteditable
            v-model="subtask.order"
            _is="p"
            :maxlength="1000"
            type="number"
            placeholder="..."
            @giveTodoKey="setCurrentSubtaskEdited_key_attribue(subtask.key, 'order')"
            @keydown.enter="onPressEnterOrBlur"
            @blur="onPressEnterOrBlur"
          />
          <md-tooltip md-direction="bottom">Order</md-tooltip>
        </md-table-cell>

        <md-table-cell class="column-30">
          <div class="hover-click">
            <feather
              type="delete"
              size="15px"
              class="hover-click"
              @click="activeDeleteSubtask(subtask.key, item.key)"
            ></feather>
          </div>
          <md-tooltip md-direction="bottom">Delete subtask</md-tooltip>
        </md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell>
          <div class="hover-click">
            <feather size="17px" type="plus-circle" @click="addEmptySubTask(item.key)"></feather> 
             <md-tooltip md-direction="bottom">Add subtask</md-tooltip></div
        ></md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog :md-active.sync="showDialogAddSubtask">
      <add-subtask-modal
        @closeAddSubtaskModal="closeAddSubtaskModal"
        :motherKey="getMotherKey()"
        :subtask="getSubtaskToEdit()"
      ></add-subtask-modal>
    </md-dialog>

    <!-- CONFIRM DELET DIALOG -->
    <confirm-dialog
      :confirmDialog="deleteDialog"
      title="Delete subtask?"
      content="You cannot go back if you press 'Yes'"
      @closeConfirmDialog="onCancelDialogDelete"
      @confirmDialog="onConfirmDialogDelete"
    />
  </div>
</template>
<script lang="ts">
import { SubTask, Todo, HTMLElementEvent, Settings } from "@/common/models/types/index";
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import ConfirmDialogCustom from "@/common/componentslib/ConfimDialogCustom.vue";
import DatePickerCustom from "@/common/componentslib/DatePickerCustom.vue";
import InputContenteditable from "@/common/componentslib/input-contenteditable/input-contenteditable.vue";
import lodash from "lodash";

// Subtasks
import { subtasksActionsType } from "@/store/modules/subtasks";
import { subtasksMutationType } from "@/store/modules/subtasks";
import { sortSubtasksBy } from "@/modules/subtasks/shared/sortSubtasks";
import { subtaskEnum } from "@/modules/subtasks/shared/enumSubtask";
import { helperSubtask } from "@/modules/subtasks/shared/subtaskHelper";


import SimpleTableLvl2 from "./SimpleTableLvl2.vue";


@Component({
  components: {
    "simple-table-lvl2": SimpleTableLvl2,
    "input-contenteditable": InputContenteditable,
    "confirm-dialog": ConfirmDialogCustom,
    "date-picker": DatePickerCustom,
  },
})
export default class SimpleTableLvl1 extends Vue {
  @Prop() item: Todo;
  @Prop() maintable: boolean;

  showDialogAddSubtask: boolean = false;
  numberInput: number = 0;
  noDeadLine: boolean = false;
  currentKey: string = "";
  dateOfSubTask = helperSubtask.dateOfSubTask;
  date: string = "";
  currentSubtaskKeyEdited: string = "";
  currentAttributeEdited: string = "";
  deleteDialog: boolean = false;
  currentOrder: number = null;
  localSubtasks: SubTask[] = [];

  currentSorting: string = "";
  currentAsc: string = "desc";
  keyLvl2: number = 1;

  getNumberDetailInSubtask = helperSubtask.getNumberDetailInSubtask;
  sortSubtasksBy = sortSubtasksBy;

  getCustomKey(itemKey, subtaskKey){
    return this.getNumberDetailInSubtask(itemKey, subtaskKey) + this.keyLvl2;
  }

  keyLvl2Incr(){
    this.keyLvl2 += 1;
      // eslint-disable-next-line no-console
      console.log('key incr', this.keyLvl2);
  }

  mounted() {
    if (this.item) {
      this.localSubtasks = this.item.subtasks;
    }
  }

  //DELETE DIALOG
  @Watch("deleteDialog", { immediate: true })
  deleteDialogWatch() {
    if (this.deleteDialog === false) {
      this.onCancelDialogDelete();
    }
  }

  activeDeleteSubtask(subtaskKey: string, TodoKey: string) {
    this.deleteDialog = true;
    this.currentSubtaskKeyEdited = subtaskKey;
    this.currentKey = TodoKey;
  }
  onCancelDialogDelete() {
    this.currentKey = "";
    this.currentSubtaskKeyEdited = null;
    this.deleteDialog = false;
  }
  onConfirmDialogDelete() {
    this.deleteSubtask(this.currentSubtaskKeyEdited, this.currentKey);
    this.deleteDialog = false;
  }
  // END DELETE DIALOG

  getLocalSubtasks() {
    return this.localSubtasks;
  }

  sortSubtasks(attribute, asc) {
    let todoKey = this.item.key;
    this.localSubtasks = sortSubtasksBy(this.localSubtasks, attribute, asc, todoKey);
    this.currentSorting = attribute;
    this.currentAsc = asc;
  }

  subtaskToEdit: SubTask = {
    label: "",
    isdone: false,
  };

  selectedDate: Date = null;
  showdatepickerDialog: boolean = false;

  setCurrentSubtaskEdited_key_attribue(key, attribute) {
    this.currentSubtaskKeyEdited = key;
    this.currentAttributeEdited = attribute;
  }

  onPressEnterOrBlur(e) {
    if (e.keyCode == 13) {
      event.preventDefault();
    }
    if (!e.target.innerText) {
      return;
    }

    let key = this.currentSubtaskKeyEdited;
    let attribute = this.currentAttributeEdited;
    let motherKey = this.item.key;
    let value = e.target.innerText;

    if (value) {
      value = value.trim();
    }

    if (attribute === subtaskEnum.IMPORTANCE || attribute === subtaskEnum.ORDER) {
      value = parseInt(value, 10);
    }

    this.$store.dispatch(subtasksActionsType.EDITATTRIBUTESUBTASK, {
      motherKey,
      key,
      attribute,
      value,
    });
  }

  addEmptySubTask(key) {
    let higher_order: number;
    let subtask_with_max_order: Todo;
    let temp_higher_order;

    subtask_with_max_order = lodash.maxBy(this.item.subtasks, "order");

    if (subtask_with_max_order) {
      temp_higher_order = subtask_with_max_order.order;
      temp_higher_order = parseInt(temp_higher_order, 10);
      higher_order = temp_higher_order + 1;
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
  }

  getSettings(columnLabel: string) {
    let settings: Settings = this.$store.getters.getSettings;
    if (!settings || !settings.hidden_column_subtasks) {
      return true;
    }
    let colums = settings.hidden_column_subtasks;
    let colum: boolean = true;

    if (colums) {
      colum = colums[columnLabel];
    }
    if(colum != null) { 
      return colum;
    }else{
      return true
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

  editDateSubtaskTask({ item, noDeadline }: { item: Todo; noDeadline: boolean }) {
    let value = item.deadline;
    let subtaskKey = item.key;

    let todoKey = this.item.key;
    let attribute = subtaskEnum.DEADLINE;

    if (noDeadline) {
      value = null;
    }

    this.$store.dispatch(subtasksActionsType.EDITATTRIBUTESUBTASK, {
      motherKey: todoKey,
      key: subtaskKey,
      attribute,
      value,
    });
    this.updateLocalSubtasksDate(subtaskKey, value);
  }

  updateLocalSubtasksDate(key, value) {
    if (this.item.subtasks && this.item.subtasks.length > 0) {
      var index = this.item.subtasks.findIndex(function (o) {
        return o.key === key;
      });
      if (index !== -1) this.item.subtasks[index].deadline = value;
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
    }
  }

  closeDialog() {
    this.showdatepickerDialog = false;
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
.details {
  margin-left: 50px;
}
.details-maintable {
  margin-top: -15px;
}
.flex {
  display: flex;
}
.checkme {
  margin: 0 auto;
  padding: 0;
}
.break-word {
  word-break: break-all;
}
.checkbox {
  margin-left: 10px;
}
.label-content {
  margin-top: 3px;
}

.colum-min-width-400{
  min-width: 400px
}
</style>
