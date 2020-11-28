<template>
  <md-field
    :class="{ 'input-success': isValid, 'input-error': hasError }"
    class="app-input"
    :md-inline="mdInline"
    :md-counter="mdCounterField"
    :md-clearable="mdClearable"
    :md-toggle-password="mdTogglePassword"
  >
    <label>{{ initialvalue }}</label>
    <div v-if="type === 'file'" class="inputFileCover" v-on:click="fileClick()">{{ fileName }}</div>
    <feather type="check" class="icon-success" v-if="localModel"></feather>
    <feather type="alert-circle" class="icon-error"></feather>
    <feather type="file-plus" class="icon-deco" v-if="type === 'file'"></feather>
    <md-textarea
      v-if="type === 'textarea'"
      v-model="localModel"
      :type="type"
      :required="required"
      :id="id"
      :name="name"
      :disabled="disabled"
      :maxlength="maxlength"
      :md-counter="mdCounter"
      :md-autogrow="mdAutogrow"
      @change="change"
    ></md-textarea>

    <md-input
      v-else
      v-model="localModel"
      :type="type"
      :required="required"
      :id="id"
      :name="name"
      :disabled="disabled"
      :maxlength="maxlength"
      :md-counter="mdCounter"
      :accept="accept"
      :min="min"
      :max="max"
      @change="change"
      @focus="focus"
    ></md-input>
    <div class="talk-bubble warning" :class="{ 'display-below': displayErrorBelow }">
      <div class="talktext">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </md-field>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";

@Component({
  name: "InputText"
})
export default class InputText extends Vue {
  // Inherited from md-input and md-field
  @Prop() type!: string;
  @Prop() required!: boolean;
  @Prop() vmodel!: Date | string | number;
  @Prop() id!: string;
  @Prop() name!: string;
  @Prop() accept!: string;
  @Prop() disabled!: boolean;
  @Prop() maxlength!: number;
  @Prop() mdCounter!: any;
  @Prop() mdAutogrow!: boolean;
  @Prop() mdInline!: boolean;
  @Prop() mdClearable!: boolean;
  @Prop() mdTogglePassword!: boolean;
  @Prop() mdCounterField!: boolean;
  @Prop() min!: number;
  @Prop() max!: number;

  // Custom properties
  @Prop() initialvalue!: string; // The tooltip
  @Prop({ default: false }) hasError!: boolean; // True si the form value is not valid
  @Prop({ default: false }) isValid!: boolean; // True if the form value is valid
  @Prop() errorMessage!: string; // Error message to show if the form value is not valid
  @Prop() displayErrorBelow!: boolean; // True to display the error message below the field instead of at its right

  get localModel() {
    return this.vmodel;
  }
  set localModel(value) {
    if (this.type === "file" && !value) {
      this.fileName = "";
    }
    this.$emit("vmodel", value);
  }
  public fileName: string = null;

  fileClick() {
    document.getElementById(this.id).click();
  }

  // Inherited from md-input
  change(event) {
    if (this.type === "file") {
      this.fileName =
        event.target.files.length > 0 ? event.target.files[0].name : null;
    }
    this.$emit("change", event);
  }

  focus(event) {
    this.$emit("focus", event);
  }
}
</script>
