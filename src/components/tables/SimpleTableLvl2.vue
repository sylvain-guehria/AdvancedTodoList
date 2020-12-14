<template>
  <md-table>
    <md-table-row v-for="(detail, index) in subtask.details" :key="index">
      <md-table-cell>
        <div class="flex">
          <div class="checkme">
            <input
              type="checkbox"
              v-model="detail.isdone"
              @click="onChangeCheckBox(index, !detail.isdone)"
            />
          </div>
          <div :style="imgStyle()" class="dots">
            <input-contenteditable
              :class="detail.isdone ? 'done' : ''"
              v-model="detail.label"
              class="break-word"
              _is="span"
              :maxlength="250"
              type="text"
              placeholder="..."
              @giveTodoKey="setCurrentIndex_And_attribue(index, 'label')"
              @keydown.enter="onPressEnterOrBlur"
              @blur="onPressEnterOrBlur"
              @click="setCurrentIndex(index)"
            />
          </div>
        </div>
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

<script lang="ts">
import { SubTask, Todo, HTMLElementEvent, Detail } from "@/common/models/types/index";
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import AddSubtaskModal from "../modals/AddSubtaskModal.vue";

// Subtasks
import { ActionTypes as subtasksActionsType } from "@/store/modules/subtasks/actions";
import { MutationTypes as subtasksMutationType } from "@/store/modules/subtasks/mutations";

import InputContenteditable from "@/common/componentslib/input-contenteditable/input-contenteditable.vue";

@Component({
  components: {
    "input-contenteditable": InputContenteditable,
  },
})
export default class SimpleTableLvl2 extends Vue {
  @Prop() subtask: SubTask;
  @Prop() motherKey: string;
  emptyDetail: Detail = {
    label: "",
    isdone: false,
  };

  currentIndex: number;
  currentAttributeEdited: string;

  setCurrentIndex_And_attribue(index, attribute) {
    this.currentIndex = index;
    this.currentAttributeEdited = attribute;
  }

  setCurrentIndex(index) {
    this.currentIndex = index;
  }

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
        index,
      });
    }
  }

  onPressEnterOrBlur(e) {
    if (e.keyCode == 13) {
      event.preventDefault();
    }

    let taskKey = this.motherKey;
    let subtaskKey = this.subtask.key;
    let attribute = this.currentAttributeEdited;
    let index = this.currentIndex;
    let value;
    if (e.target.innerText) {
      value = e.target.innerText;
    }

    if (value) {
      value = value.trim();
    }

    if (value && value !== "") {
      this.$store.dispatch(subtasksActionsType.EDITSUBTASKDETAIL, {
        taskKey,
        subtaskKey,
        attribute,
        value,
        index,
      });
    } else if (value == "" || value == undefined) {
      this.$store.dispatch(subtasksActionsType.DELETESUBTASKDETAIL, {
        taskKey,
        subtaskKey,
        index,
      });
    }
  }

  onChangeCheckBox(index, isdone) {
    this.setSubTaskDetailState(index, isdone);
  }

  createSubtasksDetail() {
    let subtask = { ...this.subtask };
    subtask.motherKey = this.motherKey;
    if (subtask.details && subtask.details.length > 0) {
      subtask.details.push({ ...this.emptyDetail });
    } else {
      subtask.details = [{ ...this.emptyDetail }];
    }

    this.$store.dispatch(subtasksActionsType.EDITSUBTASK, subtask);
  }

  setSubTaskDetailState(index: number, isdone: boolean) {
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
  imgStyle() {
    return (
      " width: 100%; display: inline-flex; background : url('" +
      require("@/assets/images/smallDot.png") +
      "') repeat-x;  background-position: bottom;"
    );
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
.flex {
  display: flex;
}
.checkme {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 2px;
}
.break-word {
  word-break: break-all;
}
</style>
