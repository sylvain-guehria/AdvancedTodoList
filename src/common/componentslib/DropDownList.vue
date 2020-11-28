<template>
  <md-field :class="validationInput" class="app-dropdownlist">
    <feather type="check" class="icon-success"></feather>
    <feather type="alert-circle" class="icon-error"></feather>
    <v-select
      v-model="selectedItem"
      :id="'ddl_' + uniqueId"
      ref="ddl"
      :value="value"
      :label="label"
      :options="options"
      :clearable="clearable"
      :disabled="disabled"
      :searchable="searchable"
      :multiple="multiple"
      :transition="transition"
      :clearSearchOnSelect="clearSearchOnSelect"
      :closeOnSelect="closeOnSelect"
      :reduce="reduce"
      :getOptionLabel="getOptionLabel"
      :getOptionKey="getOptionKey"
      :onTab="onTab"
      :taggable="taggable"
      :tabindex="tabindex"
      :pushTags="pushTags"
      :filterable="filterable"
      :filterBy="filterBy"
      :filter="filter"
      :createOption="createOption"
      :resetOnOptionsChange="resetOnOptionsChange"
      :noDrop="noDrop"
      :inputId="inputId"
      :dir="dir"
      :selectOnTab="selectOnTab"
      @input="selectedItemChanged"
      @option:created="optionCreated"
      @search:blur="searchBlur"
      @search:focus="searchFocus"
      @click.native="click"
    >
      <template slot="option" slot-scope="option" v-if="!simpleValues">
        <span v-for="value in displayProperties" :key="value">
          {{ option[value] + ' ' }}
        </span>
      </template>
      <template
        slot="selected-option"
        slot-scope="selectedItem"
        v-if="!simpleValues && localModel"
      >
        <span
          style="margin-right:4px"
          v-for="value in displayProperties"
          :key="value"
          >{{ selectedItem[value] }}</span
        >
      </template>
    </v-select>
    <label>{{ placeholder }}</label>
    <div
      class="talk-bubble warning"
      :class="{ 'display-below': displayErrorBelow }"
    >
      <div class="talktext">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </md-field>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  PropSync,
  Watch,
  Ref,
} from 'vue-property-decorator';
import { VNode } from 'vue';

@Component({
  name: 'dropdownlist',
})
export default class DropDownList extends Vue {
  // Inherited from vuejs-datepicker
  @Prop() value!: string;
  @Prop() options!: Array<any>;
  @Prop() disabled!: boolean;
  @Prop({ default: false }) clearable!: boolean;
  @Prop() searchable!: boolean;
  @Prop() multiple!: boolean;
  @Prop() placeholder!: string;
  @Prop() transition!: string;
  @Prop() clearSearchOnSelect!: boolean;
  @Prop() closeOnSelect!: boolean;
  @Prop() label!: string;
  @Prop() reduce!: Function;
  @Prop() getOptionLabel!: Function;
  @Prop() getOptionKey!: Function;
  @Prop() onTab!: Function;
  @Prop() taggable!: boolean;
  @Prop() tabindex!: number;
  @Prop() pushTags!: boolean;
  @Prop() filterable!: boolean;
  //@Prop() filterBy!: Function;
  @Prop() filter!: Function;
  @Prop() createOption!: Function;
  @Prop() resetOnOptionsChange!: boolean | Function;
  @Prop() noDrop!: boolean;
  @Prop() inputId!: string;
  @Prop() dir!: string;
  @Prop() selectOnTab!: boolean;

  // Local Datepicker props
  @Prop() vmodel!: string | number;

  @Prop({ default: false }) hasError!: boolean;
  @Prop({ default: false }) isValid!: boolean;
  @Prop() errorMessage!: string;
  @Prop() displayProperties!: string[];
  @Prop({ default: false }) simpleValues!: boolean;
  @Prop() displayErrorBelow!: boolean; // True to display the error message below the field instead of at its right

  @Ref() readonly ddl!: Vue;
  public selectedItem: any = null;
  public uniqueId = '';

  get validationInput() {
    if (this.isValid) return 'input-success';
    if (this.hasError) return 'input-error';
    return '';
  }

  get localModel() {
    return this.vmodel;
  }
  set localModel(value) {
    this.$emit('vmodel', value);
  }

  mounted(): void {
    this.uniqueId = (this as any)._uid;
  }

  // Local DropDownList methods

  @Watch('vmodel', { immediate: true })
  vmodelChanged(newValue, oldValue) {
    // If the options are an array of strings
    if (this.simpleValues) {
      // The model has been changed by the parent, we report it to the component
      if (this.selectedItem != newValue) {
        this.selectedItem = newValue;
      }
    }
    // If the options are an array of objects
    else {
      // Prevents an infinite loop
      if (this.selectedItem && this.selectedItem[this.label] == newValue) {
        return;
      }
      // The model has been cleaned by the parent: we report it
      if (!this.vmodel || this.vmodel.toString().length === 0) {
        this.selectedItem = null;
      }
      // The model has been changed by the parent, we set the corresponding object as selected item
      else {
        const correspondingItem = this.options.find(
          (o) => o[this.label] == this.vmodel
        );
        this.selectedItem = correspondingItem ? correspondingItem : null;
      }
    }
  }

  public selectedItemChanged(event) {
    if (!event) {
      this.localModel = null;
    } else if (this.simpleValues) {
      this.localModel = event;
    } else {
      this.localModel = this.selectedItem[this.label];
    }
    this.$emit('input', event);
  }

  public isDdlOpen(): boolean {
    return this.ddl
      ? (this.ddl.$vnode.elm as HTMLDivElement).classList.contains('vs--open')
      : false;
  }

  public filterBy(option, label, search) {
    if (this.simpleValues) {
      return label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    } else {
      let displayedLabel = '';
      for (let i = 0; i < this.displayProperties.length; i++) {
        displayedLabel += option[this.displayProperties[i]] + ' ';
      }
      return displayedLabel.toLowerCase().indexOf(search.toLowerCase()) > -1;
    }
  }

  // Methods inherited from vSelect

  optionCreated(event) {
    this.$emit('option:created', event);
  }

  searchBlur() {
    this.$emit('search:blur');
  }

  searchFocus() {
    this.$emit('search:focus');
  }

  click(event) {
    this.$emit('click', event);
  }
}
</script>
