 <template>
  <md-drawer class="md-right" :md-active.sync="localIsActive" md-swipeable>
    <div class="drawer-wrapper">
      <div class="sticky">
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="md-icon-button simple" @click="toggleMenu()">
            <md-icon>close</md-icon>
          </md-button>
        </div>
        <div class="filters-summary">
          <div class="md-layout-item md-size-100">
            <h1>Manage filters</h1>
            <md-button class="md-tertiary">
              <feather type="trash-2"></feather>Reset
            </md-button>
          </div>
          <div class="md-layout-item md-size-100 text-left">
            <h3>{{ filtersNb }} filters added</h3>
            <p
              v-if="false"
            >The filters you select will appear directly here. Just click on them to delete.</p>
            <div v-if="true" class="active-filters">
              <a
                v-for="filter in selectedFilters"
                :key="filter"
                v-on:click="removeFilter(filter)"
              >{{filter}}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="md-layout-item md-size-100 filters-wrapper">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label>
              <feather type="folder"></feather>Customer category
            </label>
            <md-field>
              <v-select :options="list" :clearable="false"></v-select>
              <label>Filter by customer category</label>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label>
              <feather type="briefcase"></feather>Customer
            </label>
            <md-field>
              <v-select :options="list" :clearable="false"></v-select>
              <label>Filter by customer</label>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label>
              <feather type="globe"></feather>Country
            </label>
            <md-field>
              <v-select :options="list" :clearable="false"></v-select>
              <label>Filter by country</label>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label>
              <feather type="user"></feather>People
            </label>
            <md-field>
              <v-select :options="list" :clearable="false"></v-select>
              <label>Filter by people</label>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label>
              <feather type="droplet"></feather>Substrate
            </label>
            <md-field>
              <v-select :options="list" :clearable="false"></v-select>
              <label>Filter by substrate</label>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label>
              <feather type="calendar"></feather>Created after
            </label>
            <md-field>
              <datepicker placeholder="YYYY/MM/DD" v-model="selectedDate"></datepicker>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label>
              <feather type="calendar"></feather>Created before
            </label>
            <md-field>
              <datepicker placeholder="YYYY/MM/DD" v-model="selectedDate"></datepicker>
            </md-field>
          </div>
        </div>
      </div>
    </div>
  </md-drawer>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";

@Component
export default class FiltersDrawer extends Vue {
  @Prop() isActive!: boolean;

  filtersNb: number = 0;
  list = [];
  selectedDate: Date = new Date();
  selectedFilters: Array<string> = ["Glass Maker", "Switzerland"];

  get localIsActive(): boolean {
    return this.isActive;
  }
  set localIsActive(value: boolean) {
    this.$emit("isActive", value);
  }

  public toggleMenu() {
    this.localIsActive = false;
  }

  public removeFilter(filter: string) {
    delete this.selectedFilters[filter];
  }
}
</script>