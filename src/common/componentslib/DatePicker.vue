<template>
  <md-field
    :class="{disabled: disabled, 'input-success': isValid, 'input-error': hasError}"
    class="app-datepicker"
  >
    <feather type="calendar" class="icon-deco" @click.native="triggerDatePickerClick"></feather>
    <feather type="check" class="icon-success"></feather>
    <feather type="alert-circle" class="icon-error"></feather>
    <datepicker
      ref="datepick"
      :value="value"
      :name="name"
      :id="id"
      :format="format"
      v-model="localModel"
      :full-month-name="fullMonthName"
      :language="language"
      :disabled-dates="disabledDates"
      :placeholder="placeholder"
      :inline="inline"
      :calendar-class="calendarClass"
      :input-class="inputClass"
      :wrapper-class="wrapperClass"
      :monday-first="mondayFirst"
      :clear-button="clearButton"
      :clear-button-icon="clearButtonIcon"
      :calendar-button="calendarButton"
      :calendar-button-icon="calendarButtonIcon"
      :calendar-button-icon-content="calendarButtonIconContent"
      :day-cell-content="dayCellContent"
      :bootstrap-styling="bootstrapStyling"
      :initial-view="initialView"
      :disabled="disabled"
      :required="required"
      :typeable="typeable"
      :use-utc="useUtc"
      :open-date="openDate"
      :minimum-view="minimumView"
      :maximum-view="minimumView"
      @opened="opened"
      @closed="closed"
      @selected="selected"
      @selectedDisabled="selectedDisabled"
      @input="input"
      @cleared="cleared"
      @changedMonth="changedMonth"
      @changedYear="changedYear"
      @changedDecade="changedDecade"
      @focusin.native="onfocusin"
    ></datepicker>
    <div class="talk-bubble warning" :class="{ 'display-below': displayErrorBelow }">
      <div class="talktext">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </md-field>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import moment from "moment";
import Datepicker from "vuejs-datepicker";

@Component({
  name: "date-picker"
})
export default class DatePicker extends Vue {
  // Inherited from vuejs-datepicker
  @Prop() value!: Date | string;
  @Prop() id!: String;
  @Prop() name!: String;
  @Prop() format!: String | Function;
  @Prop() fullMonthName!: Boolean;
  @Prop() language!: Object;
  @Prop() disabledDates!: Object;
  @Prop() placeholder!: String;
  @Prop() inline!: Boolean;
  @Prop() calendarClass!: String | Object;
  @Prop() inputClass!: String | Object;
  @Prop() wrapperClass!: String | Object;
  @Prop() mondayFirst!: Boolean;
  @Prop() clearButton!: Boolean;
  @Prop() clearButtonIcon!: String;
  @Prop() calendarButton!: Boolean;
  @Prop() calendarButtonIcon!: String;
  @Prop() calendarButtonIconContent!: String;
  @Prop() dayCellContent!: Function;
  @Prop() bootstrapStyling!: Boolean;
  @Prop() initialView!: String;
  @Prop() disabled!: Boolean;
  @Prop() required!: Boolean;
  @Prop() typeable!: Boolean;
  @Prop() useUtc!: Boolean;
  @Prop() openDate!: Date | String;
  @Prop() minimumView!: String;
  @Prop() maximumView!: String;

  // Local Datepicker props
  @Prop() vmodel!: Date | string;
  @Prop({ default: false }) hasError!: Boolean;
  @Prop({ default: false }) isValid!: Boolean;
  @Prop() errorMessage!: String;
  @Prop() displayErrorBelow!: boolean; // True to display the error message below the field instead of at its right

  get localModel() {
    return this.vmodel;
  }
  set localModel(value) {
    this.$emit("vmodel", moment.utc(value).format());
  }

  triggerDatePickerClick(event) {
    (this.$refs.datepick as Datepicker).showCalendar();
  }

  opened(event) {
    this.$emit("opened", event);
  }

  closed(event) {
    this.$emit("closed", event);
  }

  selected(event) {
    this.$emit("selected", moment.utc(event).format());
  }

  selectedDisabled(event) {
    this.$emit("selectedDisabled", event);
  }

  input(event) {
    this.$emit("input", event);
  }

  cleared(event) {
    this.$emit("cleared", event);
  }

  changedMonth(event) {
    this.$emit("changedMonth", event);
  }

  changedYear(event) {
    this.$emit("changedYear", event);
  }

  changedDecade(event) {
    this.$emit("changedDecade", event);
  }

  onfocusin(event) {
    this.$emit("focus", event);
  }
}
</script>
