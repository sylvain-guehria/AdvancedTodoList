<template>
  <div
    class="day"
    :class="classesDay"
    @mouseenter="mouseEnterDay"
    @mouseleave="mouseLeaveDay"
    @mousemove.stop="mouseMoveDay"
    @mousedown="mouseDownDay"
    @mouseup="mouseUpDay"
    @click.stop="add"
    @dragstart.prevent
  >
    <div :class="classesHeader">
      <a
        class="ds-dom"
        href
        :class="classesDayOfMonth"
        @click.stop.prevent="viewDay"
        @mousedown.stop
        >{{ dayOfMonth }}</a
      >
    </div>

    <template v-for="todo in visibleTodos">
      <calendar-event
        :key="todo.id"
        :event="todo"
        :calendar="calendar"
      ></calendar-event>
    </template>
    <div
      class="more-todos"
      v-if="todoFulllistOfDay.length > 2"
      @click="showMoreTodos = true"
    >
      + {{ todoFulllistOfDay.length - 2 }} more (click here)
    </div>
    <modal :show="showMoreTodos" @show="showMoreTodos = $todo">
      <div slot="header">{{ dayOfMonth }}</div>
      <div slot="body">
        <template v-for="todo in todoFulllistOfDay">
          <calendar-event
            :key="todo.id"
            :event="todo"
            :calendar="calendar"
          ></calendar-event>
        </template>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { CalendarDay, Calendar, CalendarEvent, Functions as fn } from "dayspan";
import PCalendarEvent from "./PCalendarEvent.vue";
import Modal from "@/common/componentslib/Modal.vue";
import { Todo } from "@/common/models/types/index";
import { myFunctions } from "@/common/helpers/helperfunction";

@Component({
  components: {
    "calendar-event": PCalendarEvent,
    modal: Modal
  }
})
export default class DayBlock extends Vue {
  @Prop() day!: CalendarDay<any, any>;
  @Prop() calendar!: Calendar<any, any>;
  @Prop() placeholder!: CalendarEvent<any, any>;
  @Prop() placeholderForCreate!: Boolean;

  todolist: Todo[] = [];
  todolistOfDay: Todo[] = [];
  todoFulllistOfDay: Todo[] = [];

  formats = {
    month: "MM",
    year: "YYYY"
  };
  getdaysleft = myFunctions.getdaysleft;

  created() {
    this.todolist = [...this.$store.getters.getTodoList];

    // if (this.todolist) {
    //   this.todolist.forEach((todo: Todo) => {
    //     todo.numberdaysleft = this.getdaysleft(todo.deadline);
    //   });
    // }
  }

  showMoreTodos: boolean = false;

  get classesDay() {
    return {
      today: this.day.currentDay,
      "first-day-day": this.day.dayOfMonth === 1,
      "out-calendar": !this.day.inCalendar
    };
  }

  get classesHeader() {
    return {
      "out-calendar": !this.day.inCalendar
    };
  }

  get classesDayOfMonth() {
    return {
      "today-dom": this.day.currentDay
    };
  }

  get dayOfMonth() {
    return this.day.dayOfMonth;
  }

  get month() {
    return this.day.format(this.formats.month);
  }

  get year() {
    return this.day.format(this.formats.year);
  }

  get hasPlaceholder() {
    return this.placeholder && this.placeholder.time.matchesDay(this.day);
  }

  get visibleTodos() {

    let string_date = this.day.date.format('YYYY-MM-DD');

    if (this.todolist) {
      this.todolistOfDay = this.todolist.filter(
        (todo) => { 
          return todo.deadline === string_date }
      );
    }
    this.todoFulllistOfDay = [...this.todolistOfDay];
    return this.todolistOfDay.length < 3
      ? this.todolistOfDay
      : this.todolistOfDay.slice(0, 2);
  }

  add() {
    this.$emit("add", this.day);
  }

  viewDay(todo) {
    this.$emit("view-day", this.day);
  }

  mouseEnterDay($todo) {
    this.$emit("mouse-enter-day", this.day);
  }

  mouseLeaveDay($todo) {
    this.$emit("mouse-leave-day", this.day);
  }

  mouseMoveDay($todo) {
    this.$emit("mouse-move-day", this.getTodo("mouse-move-day", $todo));
  }

  mouseDownDay($todo) {
    this.$emit("mouse-down-day", this.getTodo("mouse-down-day", $todo));
  }

  mouseUpDay($todo) {
    this.$emit("mouse-up-day", this.getTodo("mouse-up-day", $todo));
  }

  getTodo(type, $todo, extra = {}) {
    return fn.extend(
      {
        type: type,
        day: this.day,
        calendar: this.calendar,
        left: $todo.button === 0 && $todo.buttons > 0,
        right: $todo.button === 1 && $todo.buttons > 0,
        handled: false,
        $todo: $todo,
        $vm: this,
        $element: this.$el
      },
      extra
    );
  }
}
</script>

<style scoped>
.more-todos{
  cursor: pointer;
}
</style>




