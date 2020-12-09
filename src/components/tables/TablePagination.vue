<template>
  <div class="md-table-pagination" :class="{ ddl_open: ddlOpen }">
    <template v-if="mdPageOptions !== false">
      <p class="subtitle md-table-pagination-label">{{ mdLabel }}</p>
      <dropdownlist
        :options="mdPageOptions"
        :vmodel="currentPageSize"
        :simpleValues="true"
        @input="setPageSize"
        @vmodel="currentPageSize = $event"
        @click="ddlClicked($event)"
        class="pagination-select"
        ref="ddl"
      ></dropdownlist>
    </template>

    <p class="subtitle pagination-items-count">
      {{ currentItemCount }}-{{ currentPageCount }} {{ mdSeparator }}
      {{ data.length }} {{ itemsLabel }}
    </p>

    <md-button
      class="md-icon-button md-just-icon md-table-pagination-first"
      @click="goToFirstPage()"
      :disabled="previousButtonsDisabled()"
    >
      <feather type="chevrons-left"></feather>
    </md-button>
    <md-button
      class="md-icon-button md-just-icon md-table-pagination-previous"
      @click="goToPrevious()"
      :disabled="previousButtonsDisabled()"
    >
      <feather type="chevron-left"></feather>
    </md-button>

    <md-button
      class="md-icon-button md-just-icon md-table-pagination-next"
      @click="goToNext()"
      :disabled="nextButtonsDisabled()"
    >
      <feather type="chevron-right"></feather>
    </md-button>

    <md-button
      class="md-icon-button md-just-icon md-table-pagination-last"
      @click="goToLastPage()"
      :disabled="nextButtonsDisabled()"
    >
      <feather type="chevrons-right"></feather>
    </md-button>
  </div>
</template>

<script lang="ts">
import DropDownList from "@/common/componentslib/DropDownList.vue";
import {
  Component,
  Vue,
  Prop,
  PropSync,
  Watch,
  Ref
} from "vue-property-decorator";

@Component({
  name: "TablePagination",
  components: {
    dropdownlist: DropDownList
  }
})
export default class TablePagination extends Vue {
  @Prop({ default: 100 }) pageSize!: number;
  @Prop({ default: () => [100, 200] }) mdPageOptions!: Array<number>;
  @Prop({ default: 1 }) pageIndex!: number;
  @Prop({ default: "Many" }) mdTotal!: string | number;
  @Prop({ default: "Items" }) itemsLabel!: string;
  @Prop({ default: "Items per page:" }) mdLabel!: string;
  @Prop({ default: "of" }) mdSeparator!: string;
  @Prop({ default: false }) disabled!: boolean;
  @Prop({ default: false }) serverSide!: boolean;
  @Prop() data!: any[];

  @Ref() readonly ddl!: HTMLElement;
  public currentPageSize: number = 0;
  public currentPageIndex: number = 1;
  public ddlOpen = false;

  get currentItemCount() {
    return (this.currentPageIndex - 1) * this.currentPageSize + 1;
  }

  get currentPageCount() {
    if (this.currentPageSize > this.data.length) {
      return this.data.length;
    } else {
      return this.currentPageIndex * this.currentPageSize;
    }
  }

  @Watch("pageSize", { immediate: true })
  mdPageSizeChanged(pageSize) {
    this.currentPageSize = pageSize;
  }

  @Watch("data", { immediate: false })
  dataChanged() {
    this._paginate();
  }

  created() {
    this.currentPageSize = this.pageSize;
    this.currentPageIndex = this.pageIndex;
    this._paginate();
  }

  public setPageSize() {
    const previousPageIndex = this.currentPageIndex;
    this.$emit("update:pageSize", this.currentPageSize);
    this.currentPageIndex = 1;
    this._paginate();
    this._emitPageEvent(previousPageIndex);
  }

  /** Move back to the previous page if it exists. */
  public goToPrevious() {
    if (!this.hasPreviousPage()) {
      return;
    }
    const previousPageIndex = this.currentPageIndex;
    this.currentPageIndex--;
    this._paginate();
    this._emitPageEvent(previousPageIndex);
  }

  /** Move to the next page if it exists. */
  public goToNext() {
    if (!this.hasNextPage()) {
      return;
    }
    const previousPageIndex = this.currentPageIndex;
    this.currentPageIndex++;
    this._paginate();
    this._emitPageEvent(previousPageIndex);
  }

  /** Move to the first page if not already there. */
  public goToFirstPage() {
    if (!this.hasPreviousPage()) {
      return;
    }
    const previousPageIndex = this.currentPageIndex;
    this.currentPageIndex = 1;
    this._paginate();
    this._emitPageEvent(previousPageIndex);
  }

  /** Move to the last page if not already there. */
  public goToLastPage() {
    if (!this.hasNextPage()) {
      return;
    }
    const previousPageIndex = this.currentPageIndex;
    this.currentPageIndex = this.getNumberOfPages();
    this._paginate();
    this._emitPageEvent(previousPageIndex);
  }

  /** Whether there is a next page. */
  hasNextPage(): boolean {
    const maxPageIndex = this.getNumberOfPages();
    return this.currentPageIndex < maxPageIndex && this.currentPageSize != 0;
  }

  /** Whether there is a previous page. */
  hasPreviousPage(): boolean {
    return this.currentPageIndex > 1 && this.currentPageSize != 0;
  }

  /** Calculate the number of pages */
  getNumberOfPages(): number {
    if (!this.currentPageSize) {
      return 0;
    }

    return Math.ceil(this.data.length / this.currentPageSize);
  }

  /** Checks whether the buttons for going forwards should be disabled. */
  nextButtonsDisabled() {
    return this.disabled || !this.hasNextPage();
  }

  /** Checks whether the buttons for going backwards should be disabled. */
  previousButtonsDisabled() {
    return this.disabled || !this.hasPreviousPage();
  }

  ddlClicked(event) {
    this.ddlOpen = this.ddl ? (this.ddl as any).isDdlOpen() : false;
  }

  /** Emits an event notifying that a change of the paginator's properties has been triggered. */
  private _emitPageEvent(previousPageIndex: number) {
    const event: PaginationEvent = {
      previousPageIndex,
      pageIndex: this.currentPageIndex,
      pageSize: this.currentPageSize,
      length: this.data.length
    };
    this.$emit("paginationEvent", event);
  }

  /** Slices the data to show only the current slice (client-side pagination)  */
  private _paginate(): void {
    if (this.serverSide) {
      return;
    }
    let from =
      this.currentPageIndex * this.currentPageSize - this.currentPageSize;
    let to = this.currentPageIndex * this.currentPageSize;
    this.$emit("pagination", this.data.slice(from, to));
  }
}

export interface PaginationEvent {
  previousPageIndex: number;
  pageIndex: number;
  pageSize: number;
  length: number;
}
</script>
