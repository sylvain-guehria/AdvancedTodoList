<template>
  <div class="md-layout-item md-size-100 flex-start calendar-toolbar">
    <div class="menu-title">{{ month }}</div>
    <md-button class="md-icon-button md-just-icon" @click="prev()">
      <feather type="chevron-left"></feather>
    </md-button>
    <md-button class="md-icon-button md-just-icon" @click="next()">
      <feather type="chevron-right"></feather>
    </md-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Calendar } from "dayspan";

@Component
export default class Toolbar extends Vue {
  @Prop() calendar!: Calendar<any, any>;

  get month() {
    return this.calendar.summary(false, false, false, false);
  }

  next(): void {
    this.calendar.unselect().next();

    this.triggerChange();
  }

  prev(): void {
    this.calendar.unselect().prev();

    this.triggerChange();
  }

  triggerChange() {
    this.$emit("monthChange", {
      calendar: this.calendar
    });
  }
}
</script>
