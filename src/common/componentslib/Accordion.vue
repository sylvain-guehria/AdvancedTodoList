<template>
  <div class="accordion" :class="{ active: isActive }">
    <button class="accordion-btn" @click="click">
      <div class="flex-space-between">
        <div class="flex-vert-align-center">
          <feather :type="iconType" v-if="iconType"></feather>
          {{ title }}
        </div>
        <div>
          <feather v-if="!isActive" type="chevron-down"></feather>
          <feather v-if="isActive" type="chevron-up"></feather>
        </div>
      </div>
    </button>
    <div class="panel">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";

@Component
export default class Accordion extends Vue {
  @Prop() isActive!: boolean;
  @Prop() iconType!: string;
  @Prop() title!: string;

  get localIsActive(): boolean {
    return this.isActive;
  }
  set localIsActive(value: boolean) {
    this.$emit("isActive", value);
  }

  public toggleMenu() {
    this.localIsActive = !this.isActive;
  }

  click(event) {
    this.toggleMenu();
    this.$emit("click", event);
  }
}
</script>
