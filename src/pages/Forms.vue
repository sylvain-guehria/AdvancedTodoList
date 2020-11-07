<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <h4>Buttons</h4>
        <div
          class="md-layout-item md-small-size-100 md-size-100 flex-space-around"
        >
          <md-button class="md-default" @click="btnDefaultClick()">
            <feather type="activity"></feather>Label
          </md-button>
          <md-button class="md-primary">
            <feather type="activity"></feather>Label
          </md-button>
          <md-button class="md-secondary">
            <feather type="activity"></feather>Label
          </md-button>
          <md-button class="md-tertiary">
            <feather type="activity"></feather>Label
          </md-button>
          <md-button class="md-tertiary active">Active button</md-button>
          <md-button class="md-icon-button md-just-icon">
            <feather type="edit-3"></feather>
          </md-button>
        </div>
      </div>
      <div
        class="md-layout-item md-small-size-100 md-size-70 flex-space-around"
      >
        <div>
          <h4>Switch</h4>
          <md-switch v-model="boolValue"></md-switch>
        </div>
        <div>
          <h4>Checkbox</h4>
          <md-checkbox v-model="boolValueCheck">Label</md-checkbox>
          <div class="input-error free-validation">
            <feather type="alert-circle" class="icon-error"></feather>
            <div class="talk-bubble warning display-below">
              <div class="talktext">
                <p>An error message next to a label</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>Radiobutton</h4>
          <md-radio v-model="radio" :value="false">Ici</md-radio>
          <md-radio v-model="radio" :value="true">Là</md-radio>
        </div>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-40">
        <h4>Dropdownlist</h4>
        <dropdownlist
          :options="contacts"
          :vmodel="selectedContactId"
          @vmodel="selectedContactId = $event"
          label="id"
          placeholder="Test component"
          :isValid="true"
          :displayProperties="['firstname', 'lastname']"
          :disabled="true"
        ></dropdownlist>
        <dropdownlist
          :options="contacts"
          :vmodel="selectedContactId"
          @vmodel="selectedContactId = $event"
          label="id"
          placeholder="Test error"
          :displayProperties="['firstname']"
          :hasError="true"
          :errorMessage="errorMessage"
          :displayErrorBelow="true"
          :clearable="true"
        ></dropdownlist>
        <dropdownlist
          :options="contacts"
          :vmodel="selectedContactId"
          @vmodel="selectedContactId = $event"
          label="id"
          placeholder="Test clear"
          :displayProperties="['firstname']"
          :clearable="true"
        ></dropdownlist>
        <dropdownlist
          :options="contacts"
          :vmodel="selectedContactId"
          @vmodel="selectedContactId = $event"
          label="id"
          placeholder="Test normal"
          :displayProperties="['firstname', 'lastname']"
        ></dropdownlist>
        <dropdownlist
          :options="countries"
          :vmodel="selectedCountry"
          @vmodel="selectedCountry = $event"
          placeholder="Test countries"
          :simpleValues="true"
        ></dropdownlist>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-40">
        <h4>Custom Datepicker</h4>
        <date-picker
          placeholder="Normal"
          @vmodel="selectedDate = $event"
          :vmodel="selectedDate"
          @selected="dateSelected"
          :clear-button="true"
        ></date-picker>
        <date-picker
          placeholder="Error"
          vmodel="selectedDate"
          :hasError="true"
          :errorMessage="errorMessage"
          :displayErrorBelow="true"
          :clear-button="true"
        ></date-picker>
        <date-picker
          placeholder="Success"
          vmodel="selectedDate"
          :isValid="true"
          :clear-button="true"
        ></date-picker>
        <date-picker
          placeholder="Disabled"
          vmodel="selectedDate"
          :disabled="true"
          :clear-button="true"
        ></date-picker>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-40">
        <h4>Input text</h4>
        <label for="txt_initial">
          <feather type="activity"></feather>Label
        </label>
        <input-text
          type="number"
          initialvalue="Valid field"
          :vmodel="initialValid"
          @vmodel="initialValid = $event"
          :isValid="true"
          :maxlength="10"
          :min="0"
          :max="100"
        ></input-text>
        <input-text
          type="text"
          initialvalue="Disabled"
          :vmodel="name"
          @vmodel="name = $event"
          :disabled="true"
        ></input-text>
        <input-text
          type="password"
          initialvalue="Password"
          :vmodel="name"
          @vmodel="name = $event"
        ></input-text>
        <input-text
          type="text"
          initialvalue="Le test"
          :hasError="true"
          :maxlength="10"
          :vmodel="error"
          @vmodel="error = $event"
          :required="true"
          :errorMessage="errorMessage"
          :displayErrorBelow="true"
          @focus="focus()"
        ></input-text>
        <input-text
          type="textarea"
          initialvalue="Textarea"
          :hasError="true"
          :maxlength="500"
          :vmodel="textarea"
          @vmodel="textarea = $event"
          :required="true"
          :errorMessage="errorMessage"
          :mdAutogrow="false"
          class="big-txt-height"
        ></input-text>
        <input-text
          type="file"
          id="file"
          initialvalue="File"
          :accept="'image/*'"
          :vmodel="fileValue"
          @vmodel="fileValue = $event"
        ></input-text>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-40">
        <h4>Tree view</h4>
        <label>Path: {{ path }}</label>
        <ul class="tree-view">
          <tree-item
            v-for="(folder, index) in treeData"
            :key="index"
            class="item"
            :item="folder"
            :selectedItemId="selectedItemId"
            @make-folder="makeFolder"
            @selected-changed="selectedItemChanged($event)"
            @path-changed="path = $event"
          ></tree-item>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from '@/components/Form/InputText';
import DatePicker from '@/components/Form/DatePicker';
import DropDownList from '@/components/Form/DropDownList';
import TreeItem from '@/components/Form/TreeItem.vue';
export default {
  name: 'Forms',
  components: {
    'input-text': InputText,
    'date-picker': DatePicker,
    dropdownlist: DropDownList,
    'tree-item': TreeItem,
  },
  data() {
    return {
      boolValue: false,
      boolValueCheck: false,
      radio: true,
      initial: '',
      initialValid: 'Initial value',
      inputText: '',
      textarea: '',
      selectedCountry: null,
      countries: ['Algeria', 'Argentina', 'Brazil', 'Canada'],
      contacts: [
        { id: 1, firstname: 'Toto', lastname: 'Tata' },
        { id: 2, firstname: 'Jean', lastname: 'Bon' },
      ],
      selectedContactId: null,
      selectedDate: null,
      errorMessage: 'This field is required \n Text on second line',
      name: '',
      error: '',
      file: null,
      selectedFilters: ['titi', 'totot', 'tata'],
      fileValue: null,
      selectedItemId: '',
      path: '',
      treeData: [
        {
          name: 'Folder 1',
          children: [
            { name: 'Subfolder 1.1' },
            { name: 'Subfolder 1.2' },
            {
              name: 'Subfolder 1.3',
              children: [
                {
                  name: 'Sub subfolder 1',
                  children: null,
                },
                { name: 'Sub Subfolder 2', children: null },
                {
                  name: 'Sub Subfolder 3',
                  children: null,
                },
              ],
            },
          ],
        },
        {
          name: 'Folder 2',
          children: [{ name: 'Subfolder 2.1' }, { name: 'Subfolder 2.2' }],
        },
      ],
    };
  },
  created() {
    for (let i = 3; i < 100; i++) {
      this.contacts.push({
        id: i,
        firstname: 'Firstname' + i,
        lastname: 'Lastname' + i,
      });
    }
  },
  methods: {
    dateSelected: function(event) {
      alert(event);
    },
    btnDefaultClick: function() {
      this.selectedCountry = null;
      this.selectedContactId = null;
      this.file = null;
    },
    removeFilter: function(filter) {
      delete this.selectedFilters[filter];
    },
    makeFolder: function(item) {
      Vue.set(item, 'children', []);
      this.addItem(item);
    },
    selectedItemChanged: function(item) {
      if (this.selectedItemId === item) {
        this.selectedItemId = null;
      } else {
        this.selectedItemId = item;
      }
    },
  },
};
</script>
