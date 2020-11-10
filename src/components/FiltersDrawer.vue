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
            <p v-if="false">
              The filters you select will appear directly here. Just click on
              them to delete.
            </p>
            <div v-if="true" class="active-filters">
              <a
                v-for="filter in selectedFilters"
                :key="filter"
                v-on:click="removeFilter(filter)"
                >{{ filter }}</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="md-layout-item md-size-100 filters-wrapper">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="folder"></feather>State of the task </label>
            <md-field>
              <v-select
                :options="list"
                :clearable="false"
                v-model="task_state"
              ></v-select>
              <label>task done, not done or both</label>
            </md-field>
          </div>

          <!-- fliter task title -->

          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="pen-tool"></feather>Task</label>
            <input-text
              type="text"
              initialvalue="Contain the words..."
              :vmodel="title_contain"
              @vmodel="title_contain = $event"
            ></input-text>
          </div>

          <!-- deadline filter -->

          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="calendar"></feather>Deadline after </label>
            <md-field>
              <datepicker
                placeholder="YYYY/MM/DD"
                v-model="selectedDateDeadLineAfter"
              ></datepicker>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="calendar"></feather>Deadline before </label>
            <md-field>
              <datepicker
                placeholder="YYYY/MM/DD"
                v-model="selectedDateDeadLinBefore"
              ></datepicker>
            </md-field>
          </div>

          <!-- creation date filter -->

          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="calendar"></feather>Created after </label>
            <md-field>
              <datepicker
                placeholder="YYYY/MM/DD"
                v-model="selectedDateCreateAfter"
              ></datepicker>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="calendar"></feather>Created before </label>
            <md-field>
              <datepicker
                placeholder="YYYY/MM/DD"
                v-model="selectedDateCreateBefore"
              ></datepicker>
            </md-field>

            <!-- importance filter -->
            <label>
              <feather type="alert-octagon"></feather>importance min and max
            </label>

            <div class="bar-min-max">
            <div class="min">
              <label>
              Min
              </label>
              <input type="range" v-model.number="min_importance" />
              {{ min_importance }}%
            </div>

            <div class="max">
               <label>
              Max
              </label>
              <input type="range" v-model.number="max_importance" />
              {{ max_importance }}%
            </div>
            </div>

            <div class="prog-bar">
              <div class="mirror">
              <md-progress-bar
                md-mode="buffer"
                :md-value="min_importance_mirror"
                :md-buffer="buffer"
              ></md-progress-bar>
              </div>
              <md-progress-bar
                class="md-accent"
                md-mode="buffer"
                :md-value="max_importance"
                :md-buffer="buffer"
              ></md-progress-bar>
            </div>
          </div>

          <!-- end filter -->
        </div>
      </div>
    </div>
  </md-drawer>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import InputText from "./../components/Form/InputText.vue";

@Component({
  components: {
    "input-text": InputText
  }
})
export default class FiltersDrawer extends Vue {
  @Prop() isActive!: boolean;

  filtersNb: number = 0;
  list = ["finished", "not finished", "both"];
  selectedDateCreateBefore: Date = new Date();
  selectedDateCreateAfter: Date = new Date();
  selectedDateDeadLinBefore: Date = new Date();
  selectedDateDeadLineAfter: Date = new Date();
  title_contain: string = "";
  task_state: string = "";
  max_importance: number = 100;
  min_importance: number = 0;
  buffer: number = 0;

  selectedFilters: Array<string> = ["Glass Maker", "Switzerland"];

  get min_importance_mirror(): number {
    return 100 - this.min_importance ;
  }

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

<style lang="scss" scoped>
.sticky + .content {
  top: 250px !important;
}

.md-progress-bar {
  margin-top: 24px;
  margin-bottom: 15px;
}

.prog-bar {
  position: absolute;
  top: 225px;
  bottom: 0px;
  width: 100%;
  margin-left: 5px;
}

.bar-min-max{
  margin-top: 15px;
  margin-left: 25px;
  display: flex;
  widows: 100%;
}
.max{
  position: absolute;
  right: 0;
}
.min{
  position: absolute;
  left: 20px;
}
.mirror{
  transform:         scaleX(-1); /* Standard */
  filter: FlipH;                 /* IE 6/7/8 */
}
</style>