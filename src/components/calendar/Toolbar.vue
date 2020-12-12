<template>
  <div class="md-layout-item md-size-100 flex-start calendar-toolbar">
    <md-button class="md-icon-button md-just-icon" @click="prev()">
      <feather type="arrow-left"></feather>
    </md-button>
     <div class="menu">{{ month }}</div>
    <md-button class="md-icon-button md-just-icon" @click="next()">
      <feather type="arrow-right"></feather>
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
<style scoped>
.feather{
  all :initial;
  width: 35px !important;
  height: 35px !important;

}
.menu{
  font-family:  Times, 'Times New Roman', serif;
  font-size: 25px ;
}
</style>
