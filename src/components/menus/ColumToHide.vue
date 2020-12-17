<template>
    <md-menu
      md-size="auto"
      md-direction="bottom-start"
      :md-active.sync="toggleCard"
      :mdCloseOnClick="false"
      :mdCloseOnSelect="false"
    >
      <md-button class="md-tertiary" md-menu-trigger>
        <feather type="eye-off"></feather>
        Hide Columns
      </md-button>

      <md-menu-content>
        <div>
          <div class="legend">
            <div class="legend-2">
              <p>Order</p>
              <div class="feathers">
                <feather
                  type="check"
                  v-if="hiddenColumn ? hiddenColumn.order : false"
                  @click="setSettings('order')"
                ></feather>
                <feather
                  type="x"
                  v-if="hiddenColumn? !hiddenColumn.order : false"
                  @click="setSettings('order')"
                ></feather>
              </div>
            </div>
            <div class="legend-2">
              <p>Task title</p>
              <div class="feathers">
                <feather
                  type="check"
                  v-if="hiddenColumn? hiddenColumn.task : false"
                  @click="setSettings('task')"
                ></feather>
                <feather
                  type="x"
                  v-if="hiddenColumn? !hiddenColumn.task : false"
                  @click="setSettings('task')"
                ></feather>
              </div>
            </div>
            <div class="legend-2">
              <p>Deadline</p>
              <div class="feathers">
                <feather
                  type="check"
                  v-if="hiddenColumn ? hiddenColumn.deadline : false"
                  @click="setSettings('deadline')"
                ></feather>
                <feather
                  type="x"
                  v-if="hiddenColumn ? !hiddenColumn.deadline : false"
                  @click="setSettings('deadline')"
                ></feather>
              </div>
            </div>
            <div class="legend-2">
              <p>Creation Date</p>
              <div class="feathers">
                <feather
                  type="check"
                  v-if="hiddenColumn ? hiddenColumn.creationDate : false"
                  @click="setSettings('creationDate')"
                ></feather>
                <feather
                  type="x"
                  v-if="hiddenColumn ? !hiddenColumn.creationDate : false"
                  @click="setSettings('creationDate')"
                ></feather>
              </div>
            </div>
            <div class="legend-2">
              <p>Finish Time</p>
              <div class="feathers">
                <feather
                  type="check"
                  v-if="hiddenColumn ? hiddenColumn.numberdaysleft : false"
                  @click="setSettings('numberdaysleft')"
                ></feather>
                <feather
                  type="x"
                  v-if="hiddenColumn ? !hiddenColumn.numberdaysleft : false"
                  @click="setSettings('numberdaysleft')"
                ></feather>
              </div>
            </div>
            <div class="legend-2">
              <p>Importance</p>
              <div class="feathers">
                <feather
                  type="check"
                  v-if="hiddenColumn ? hiddenColumn.importance : false"
                  @click="setSettings('importance')"
                ></feather>
                <feather
                  type="x"
                  v-if="hiddenColumn ? !hiddenColumn.importance : false"
                  @click="setSettings('importance')"
                ></feather>
              </div>
            </div>
          </div>
        </div>
      </md-menu-content>
    </md-menu>
</template>

<script>
import { ActionTypes as settingsActionsType } from '@/store/modules/settings/actions';
import { MutationTypes as settingsMutationType } from '@/store/modules/settings/mutations';

export default {
  components: {},
  data() {
    return {
      toggleCard: false,
    };
  },
  computed: {
    hiddenColumn() {
      let settings = this.$store.getters.getSettings;
      let columns;
      if (settings) {
        columns = settings.hidden_column;
      }
      return columns;
    },
  },
  methods: {
    toggle() {
      this.toggleCard = !this.toggleCard;
    },
    setSettings(setting) {
      this.$store.commit(settingsMutationType.HIDECOLUMN, setting);
      let columns = this.$store.getters.getSettings.hidden_column;

      let payload = {
        label: "hidden_column",
        value: columns,
      };

      this.$store.dispatch(settingsActionsType.SAVE_SETTINGS, payload);
    },
  },
};
</script>
<style lang="scss" scoped>
.legend {
  display: inline-block;
  all: inherit;
  width: 200px;
}
.legend-2 {
  display: flex;
  padding: 10px;
  margin-left: 15px;
  margin: 0 auto;
}

p {
  all: initial;
  margin-left: 10px;
  font-family:  "Open Sans Regular", sans-serif;
  color: #58616b
}

.feathers {
  position: absolute;
  right: 7px;
}
</style>
