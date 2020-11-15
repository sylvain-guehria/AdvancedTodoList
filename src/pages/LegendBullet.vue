<template>
  <div class="layout">
    <md-menu
      md-size="auto"
      md-direction="bottom-start"
      :md-active.sync="toggleCard"
    >
      <md-button class="md-tertiary" md-menu-trigger>
        <feather type="arrow-down"></feather>
        Display Legend
      </md-button>

      <md-menu-content>
        <div>
          <div class="legend">
            <div class="legend-2">
              <div class="bullet bullet2"></div>
              <p>Task Important and Urgent</p>
            </div>
            <div class="legend-2">
              <div class="bullet bullet3"></div>
              <p>Task Important, Not Urgent</p>
            </div>
            <div class="legend-2">
              <div class="bullet bullet4"></div>
              <p>Task Urgent, Not Important</p>
            </div>
            <div class="legend-2">
              <div class="bullet bullet1"></div>
              <p>Task Not Urgent, Not Important</p>
            </div>
            <div class="legend-2">
              <feather type="check"></feather>
              <p>subtask done</p>
            </div>
            <div class="legend-2">
              <feather type="x-circle"></feather>
              <p>subtask not done</p>
            </div>
            <div class="legend-2">(x) number of active subtasks</div>
            <div class="legend-sorting">
              <feather type="arrow-up"></feather>
              <feather type="arrow-down"></feather>
              <p>click column title to sort</p>
            </div>
          </div>
        </div>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
export default {
  props: ["planning"],
  components: {},
  data() {
    return {
      toggleCard: false,
    };
  },
  methods: {
    toggle() {
      this.toggleCard = !this.toggleCard;
    },
  },
};
</script>
<style lang="scss" scoped>
.legend {
  display: inline-block;
}
.legend-2 {
  display: flex;
  padding: 10px;
  margin-left: 15px;
}

.bullet {
  margin: 5px;
}
p {
  margin-left: 10px;
  font-family: initial;
  font-size : 16px !important
}
.layout {
  display: flex;
  margin-top: 25px;
}

p {
  margin-left: 10px;
}
.legend-sorting {
  display: flex;
  margin-left: 20px;
  margin-top: 16px;
}

md-menu-content {
  width: 100% !important;
}
</style>
