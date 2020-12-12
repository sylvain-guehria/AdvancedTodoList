<template>
  <md-menu md-size="auto" md-direction="bottom-start" :md-active.sync="toggleCard">
    <md-button class="md-tertiary" md-menu-trigger>
      <feather type="arrow-down"></feather>
      Display Legend
    </md-button>

    <md-menu-content>
      <div>
        <div class="legend">
          <div class="legend-2">
            <div class="bullet bullet1"></div>
            <div class="bullet bullet4"></div>
            <div class="bullet bullet3"></div>
            <div class="bullet bullet2"></div>
            <p>Importance</p>
          </div>
          <div class="legend-2">
            <feather type="check"></feather>
            <p>subtask done</p>
          </div>
          <div class="legend-2">
            <feather type="x"></feather>
            <p>subtask not done</p>
          </div>
          <div class="legend-2">
            (<feather size="17px" type="x"></feather>)
            <p>number of active subtasks</p>
          </div>
          <div class="legend-sorting legend-2">
            <feather type="arrow-up"></feather>
            <feather type="arrow-down"></feather>
            <p>click column title to sort</p>
          </div>
          <div class="legend-sorting legend-2">
            <feather type="plus-circle"> </feather>
            <p>click to add subtask</p>
          </div>
        </div>
      </div>
    </md-menu-content>
  </md-menu>
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
  margin-right: 15px;
}

.bullet {
  margin: 5px;
}

p {
  all: initial;
  margin-left: 10px;
  font-family: "Open Sans Regular", sans-serif;
  color: #58616b;
}
.legend-sorting {
  display: flex;
  margin-top: 16px;
}

md-menu-content {
  width: 100% !important;
}
</style>
