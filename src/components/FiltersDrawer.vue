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
            <md-button class="md-tertiary" @click="resetStepOne()">
              <feather type="trash-2"></feather>Reset
            </md-button>
          </div>
          <div class="md-layout-item md-size-100 text-left">
            <h3>{{ getNumberFilter() }} filters added</h3>
            <h3>{{ getNumberCorresonpondingTask() }} corresponding task(s)</h3>
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
                v-model="filter_data.task_state"
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
              :vmodel="filter_data.title_contain"
              @vmodel="filter_data.title_contain = $event"
            ></input-text>
          </div>

          <!-- deadline filter -->

          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="calendar"></feather>Deadline after </label>
            <md-field>
              <datepicker
                placeholder="YYYY/MM/DD"
                v-model="filter_data.selectedDateDeadLineAfter"
              ></datepicker>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="calendar"></feather>Deadline before </label>
            <md-field>
              <datepicker
                placeholder="YYYY/MM/DD"
                v-model="filter_data.selectedDateDeadLinBefore"
              ></datepicker>
            </md-field>
          </div>

          <!-- creation date filter -->

          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="calendar"></feather>Created after </label>
            <md-field>
              <datepicker
                placeholder="YYYY/MM/DD"
                v-model="filter_data.selectedDateCreateAfter"
              ></datepicker>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <label> <feather type="calendar"></feather>Created before </label>
            <md-field>
              <datepicker
                placeholder="YYYY/MM/DD"
                v-model="filter_data.selectedDateCreateBefore"
              ></datepicker>
            </md-field>

            <!-- importance filter -->
            <label>
              <feather type="alert-octagon"></feather>importance min and max
            </label>

            <div class="bar-min-max">
              <div class="min">
                <label> Min </label>
                <input
                  type="range"
                  v-model.number="filter_data.min_importance"
                />
                {{ filter_data.min_importance }}%
              </div>

              <div class="max">
                <label> Max </label>
                <input
                  type="range"
                  v-model.number="filter_data.max_importance"
                />
                {{ filter_data.max_importance }}%
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
                :md-value="filter_data.max_importance"
                :md-buffer="buffer"
              ></md-progress-bar>
            </div>
          </div>

          <!-- end filter -->
        </div>
      </div>
    </div>

    <!-- modal confirm reset -->
    <div>
      <md-dialog :md-active.sync="confirmModalactive">
        <md-dialog-title>Do you want to reset all filter?</md-dialog-title>

        <md-dialog-content>
          <p>You cannot go back if you press 'Yes'</p>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-tertiary" @click="onCancel">Cancel</md-button>
          <md-button class="md-tertiary" @click="onConfirm">Yes</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
    
  </md-drawer>
</template>
<script lang="ts">
import { Todo } from "@/models/types";
import { Component, Vue, Prop, PropSync, Watch } from "vue-property-decorator";
import InputText from "./../components/Form/InputText.vue";

@Component({
  components: {
    "input-text": InputText,
  },
})
export default class FiltersDrawer extends Vue {
  @Prop() isActive!: boolean;

  list = ["done", "not done", "any"];
  filtersNb: number = 0;
  todolist: Todo[] = [];
  confirmModalactive: boolean = false;

  selectedFilters: Array<string> = [];
  buffer: number = 0;

  filter_data = {
    selectedDateCreateBefore: null,
    selectedDateCreateAfter: null,
    selectedDateDeadLinBefore: null,
    selectedDateDeadLineAfter: null,
    title_contain: null,
    task_state: null,
    max_importance: null,
    min_importance: null,
  };

  resetStepOne() {
    this.confirmModalactive = true;
  }

  onConfirm() {
    this.confirmModalactive = false;
    this.reset_filter();
  }
  onCancel() {
    this.confirmModalactive = false;
  }

  mounted() {
    this.todolist = [...this.$store.getters.getTodoList];
  }

  getNumberFilter(): number {
    let number: number = 0;
    for (const [key, value] of Object.entries(this.filter_data)) {
      if (value) {
        number = number + 1;
      }
    }
    return number;
  }

  getNumberCorresonpondingTask(): number {
    return this.$store.getters.getNumberFilteredTask;
  }

  @Watch("filter_data", { immediate: false, deep: true })
  changeFilters(val) {
    if (
      !val.selectedDateCreateBefore &&
      !val.selectedDateCreateAfter &&
      !val.selectedDateDeadLinBefore &&
      !val.selectedDateDeadLineAfter &&
      !val.title_contain &&
      !val.task_state &&
      !val.max_importance &&
      !val.min_importance
    ) {
      return;
    }

    this.todolist = [...this.$store.getters.getTodoList];

    if (val.selectedDateCreateBefore) {
      this.todolist = this.todolist.filter(
        (todo) =>
          todo.creationDate <
          val.selectedDateCreateBefore.toISOString().substr(0, 10)
      );
    }
    if (val.selectedDateCreateAfter) {
      this.todolist = this.todolist.filter(
        (todo) =>
          todo.creationDate >
          val.selectedDateCreateAfter.toISOString().substr(0, 10)
      );
    }

    if (val.selectedDateDeadLinBefore) {
      this.todolist = this.todolist.filter(
        (todo) =>
          todo.deadline <
          val.selectedDateDeadLinBefore.toISOString().substr(0, 10)
      );
    }

    if (val.selectedDateDeadLineAfter) {
      this.todolist = this.todolist.filter(
        (todo) =>
          todo.deadline >
          val.selectedDateDeadLineAfter.toISOString().substr(0, 10)
      );
    }

    if (val.title_contain) {
      this.todolist = this.todolist.filter((todo) =>
        todo.task.includes(val.title_contain)
      );
    }

    if (val.task_state) {
      if (val.task_state === "done") {
        this.todolist = this.todolist.filter((todo) => todo.isdone);
      }
      if (val.task_state === "not done") {
        this.todolist = this.todolist.filter((todo) => !todo.isdone);
      }
    }

    if (val.max_importance) {
      this.todolist = this.todolist.filter(
        (todo) => todo.importance < val.max_importance
      );
    }

    if (val.min_importance) {
      this.todolist = this.todolist.filter(
        (todo) => todo.importance > val.min_importance
      );
    }

    this.$emit("activeFilterTab", "tab-posts");
    this.$store.commit("setFilteredTodoList", this.todolist);
  }

  reset_filter(): void {
    this.filter_data = {
      selectedDateCreateBefore: null,
      selectedDateCreateAfter: null,
      selectedDateDeadLinBefore: null,
      selectedDateDeadLineAfter: null,
      title_contain: null,
      task_state: null,
      max_importance: null,
      min_importance: null,
    };
    this.$store.commit("setFilteredTodoList", []);
    this.todolist = [];
    this.$emit("activeFilterTab", "tab-home");
  }

  get min_importance_mirror(): number {
    return 100 - this.filter_data.min_importance;
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

.bar-min-max {
  margin-top: 15px;
  margin-left: 25px;
  display: flex;
  widows: 100%;
}
.max {
  position: absolute;
  right: 0;
}
.min {
  position: absolute;
  left: 20px;
}
.mirror {
  transform: scaleX(-1); /* Standard */
  filter: FlipH; /* IE 6/7/8 */
}

p {
  font-size: 17px;
}
</style>