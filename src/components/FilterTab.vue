<template>
  <div class="tab" v-if="id">
    <div
      class="tab-header"
      :class="{ active: syncActiveTab === id }"
      @click="tabClicked($event)"
    >
      <slot name="tab-header"></slot>
    </div>
    <div class="content">
      <slot name="tab-content"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";

@Component
export default class FilterTab extends Vue {
  @PropSync("activeTab") syncActiveTab: string;

  id: string = "";

  mounted() {
    this.id = `filterTab-${(this as any)._uid}`;
  }

  tabClicked(event): void {
    if (this.syncActiveTab === this.id) {
      this.syncActiveTab = "";
    } else {
      this.syncActiveTab = this.id;
    }

    this.$emit("tabClicked", event);
  }
}
</script>
