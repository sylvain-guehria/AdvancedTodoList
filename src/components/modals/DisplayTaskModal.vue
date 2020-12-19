<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="1300px">
      <template v-slot:activator="{ on, attrs }">
        <div class="title">
          <div class="bullet" :class="bulletClass()"></div>
          <p v-bind="attrs" v-on="on">
            {{ Title }} &nbsp; ({{ getNumberSubTaskActive() }})
          </p>
        </div>
      </template>
      <v-card >
        <v-card-title> </v-card-title>
        <v-card-text>
          <div>
            <div class="go-edit">
              <div @click="showDrawerEditTask(event)">
                <feather size="15px" type="edit"></feather>
              </div>
            </div>
            <div class="go-close">
              <div @click="closeModal">
                <feather size="16px" type="x"></feather>
              </div>
            </div>
            <div class="md-layout-item md-size-100 header-title">
              <h1>
                {{ event.task }}
              </h1>
              <div class="horizontal-separator"></div>
            </div>
            <div class="accordion-margin">
              <accordion
                :isActive="isForm1Active"
                @isActive="isForm1Active = $event"
                title="Metadata Todo"
                class="transparent"
              >
                <div class="md-layout-item">
                  <meta-data-todo :event="event"></meta-data-todo>
                </div>
              </accordion>
            </div>
          </div>
          <div class="body">
            <div class="md-layout-item md-size-100 duo-data-block no-padding">
                      <div class="light-horizontal-separator"></div>
              <vue-custom-scrollbar class="scroll-area" :settings="settings">
                <div
                  class="md-layout-item table-no-border"
                  v-if="event.subtasks && event.subtasks.length > 0"
                >
                      <simple-table-lvl1 :item="event"></simple-table-lvl1>
                </div>
              </vue-custom-scrollbar>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Calendar, Weekday } from "dayspan";
import DayBlock from "./DayBlock.vue";
import moment from "moment";
import { helperTodo } from "@/modules/todos/shared/todoHelper";
import { bus } from "@/main";
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
import SimpleTableLvl1 from "../tables/SimpleTableLvl1.vue";
import FilterTab from "@/common/componentslib/FilterTab.vue";
import MetaDataTodo from "./MetaDataTodo.vue";
import Accordion from "@/common/componentslib/Accordion.vue";

@Component({
  components: {
    "simple-table-lvl1": SimpleTableLvl1,
    "meta-data-todo": MetaDataTodo,
    accordion: Accordion,
    "vue-custom-scrollbar": vueCustomScrollbar,
  },
})
export default class PCalendarEvent extends Vue {
  @Prop() event!: any;
  isForm1Active: boolean = false;
  dialog: boolean = false;
  giveColorTodo = helperTodo.giveColorTodo;

  settings = {
    suppressScrollY: false,
    suppressScrollX: false,
    wheelPropagation: false,
  };

  getNumberSubTaskActive(): number {
    return this.event.subtasks
      ? this.event.subtasks.filter((subtask) => !subtask.isdone).length
      : 0;
  }

  showDrawerEditTask(payload): void {
    if (payload) {
      this.closeModal();
     //TODO go edit task somewhere
    }
  }

  closeModal(): void {
    this.dialog = false;
  }

  bulletClass(): string {
    const index = this.giveColorTodo(this.event);

    const classes = ["bullet1", "bullet2", "bullet3", "bullet4", "bullet5", "bullet6"];
    return classes[index];
  }

  get Title() {
    return this.event.task;
  }
}
</script>

<style lang="scss" scoped>
.header-title {
  word-break: break-word;
  margin-top: 50px;
}

h1 {
  display: flex;
}
.go-edit {
  position: absolute;
  top: 7px;
  left: 10px;
  cursor: pointer;
  i {
    color: #a5a7a9;
  }
}
.go-close {
  position: absolute;
  top: 7px;
  right: 10px;
  cursor: pointer;
  i {
    color: #a5a7a9;
  }
}
.body {
  padding: 20px;
}

.flex {
  display: flex;
}

.bullet {
  margin-top: 11px;
  margin-right: 5px;
}

.scroll-area {
  position: relative;
  margin: auto;
  padding-right: 50px;
  width: 1200px;
  max-height: 550px;
}
.accordion-margin {
  margin-left: 30px;
}
.title {
  display: inline-flex;
}
.title{
  height: 16px;
}
</style>
