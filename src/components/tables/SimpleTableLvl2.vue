<template>
  <md-table>
    <md-table-row v-for="(detail, index) in subtask.details" :key="index">
      <md-table-cell v-if="detail" >
        <div class="flex">
          <div class="checkbox">
            <v-checkbox
              dense
              class="checkme"
              height="100%"
              v-model="detail.isdone"
              @click="onChangeCheckBox(detail.key , detail.isdone)"
              hide-details
            />
          </div>
          <div :style="imgStyle()">
            <input-contenteditable
              :class="detail.isdone ? 'done' : ''"
              v-model="detail.label"
              class="break-word"
              _is="span"
              :maxlength="250"
              type="text"
              placeholder="..."
              @giveTodoKey="setCurrentKey_And_attribue('label', detail.key)"
              @keydown.enter="onPressEnterOrBlur"
              @blur="onPressEnterOrBlur"
              @click="setCurrentKey(detail.key)"
            />
          </div>
        </div>
      </md-table-cell>
    </md-table-row>
    <md-table-row>
      <md-table-head>
        <div class="hover-click">
          <feather
            size="15px"
            type="plus"
            class="hover-click"
            @click="createSubtasksDetail()"
          ></feather></div
      ></md-table-head>
    </md-table-row>
  </md-table>
</template>

<script lang="ts">
import { SubTask, Todo, HTMLElementEvent, Detail } from "@/common/models/types/index";
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";

// Subtasks
import { subtasksActionsType } from "@/store/modules/subtasks";
import { subtasksMutationType } from "@/store/modules/subtasks";

import InputContenteditable from "@/common/componentslib/input-contenteditable/input-contenteditable.vue";
import { DetailEnum } from "@/common/models/enums/enum";

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
  currentDetailKey: string = "";

  currentIndex: number;
  currentAttributeEdited: string;

  setCurrentKey_And_attribue(attribute, detailKey) {
    this.currentAttributeEdited = attribute;
    this.currentDetailKey = detailKey;
  }

  setCurrentKey(detailKey) {
    this.currentDetailKey = detailKey;
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
        key: this.currentDetailKey,
      });
    } else if (value == "" || value == undefined) {
      this.$store.dispatch(subtasksActionsType.DELETESUBTASKDETAIL, {
        taskKey,
        subtaskKey,
        key: this.currentDetailKey,
      });
    }
  }

  onChangeCheckBox(key, isdone) {
    this.currentDetailKey = key;
    this.setSubTaskDetailState(isdone);
  }

  createSubtasksDetail() {
    this.$store.dispatch(subtasksActionsType.ADDSUBTASKDETAIL, {
      todoKey: this.motherKey,
      subtaskKey: this.subtask.key,
      detail: { ...this.emptyDetail },
    });
  }

  setSubTaskDetailState(isdone: boolean) {
    let subtaskKey = this.subtask.key;
    let taskKey = this.motherKey;
    let key = this.currentDetailKey;

    this.$store.dispatch(subtasksActionsType.EDITSUBTASKDETAIL, {
      taskKey,
      subtaskKey,
      key,
      value: isdone,
      attribute: DetailEnum.ISDONE,
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
  cursor: pointer !important;
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
  text-align: left;
}
.checkbox {
  margin-left: 10px;
}
.label-content {
  margin-top: 1px;
}
</style>
