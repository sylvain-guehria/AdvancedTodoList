<template>
  <li class="tree-item">
    <div
      @click="select()"
      @dblclick="makeFolder"
      class="folder-item"
      :class="{ selected: selectedItemId === uniqueId }"
    >
      <span v-if="isFolder">
        <feather
          @click="toggle($event)"
          v-if="isOpen"
          type="chevron-down"
        ></feather>
        <feather
          @click="toggle($event)"
          v-if="!isOpen"
          type="chevron-right"
        ></feather>
      </span>
      <span class="folder-name">{{ item.name }}</span>
    </div>
    <transition name="list-complete">
      <ul v-show="isOpen" v-if="isFolder">
        <tree-item
          class="item"
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          :selectedItemId="selectedItemId"
          @make-folder="$emit('make-folder', $event)"
          @selected-changed="$emit('selected-changed', $event)"
          @path-changed="$emit('path-changed', $event)"
        ></tree-item>
      </ul>
    </transition>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from 'vue-property-decorator';

@Component({})
export default class TreeItem extends Vue {
  // Inherited from md-input and md-field
  @Prop() item!: any;
  //@Prop() parentName!: string;
  @Prop() selectedItemId!: string;

  isOpen = false;
  selectedItem: any = null;
  uniqueId = '';
  pathArray = [];

  get isFolder() {
    return this.item.children && this.item.children.length;
  }

  mounted(): void {
    this.uniqueId = (this as any)._uid;
  }

  toggle(event): void {
    if (this.isFolder) {
      this.isOpen = !this.isOpen;
    }
    event.stopPropagation();
  }

  private getSelectedFolderPath(component: Vue): void {
    const parentItem = (component as TreeItem).item;
    if (parentItem) {
      this.pathArray.push(parentItem.name);
      this.getSelectedFolderPath(component.$parent);
    }
  }

  select() {
    this.pathArray = [];
    this.pathArray.push(this.item.name);
    this.getSelectedFolderPath(this.$parent);
    this.$emit('selected-changed', this.uniqueId);
    this.$emit('path-changed', this.pathArray.reverse().join(' / '));
  }

  makeFolder(): void {
    if (!this.isFolder) {
      this.$emit('make-folder', this.item);
      this.isOpen = true;
    }
  }
}
</script>
