<template>
  <div class="layout">
    <md-menu
      md-size="auto"
      md-direction="bottom-start"
      :md-active.sync="toggleCard"
      :mdCloseOnClick="false" :mdCloseOnSelect="false"
    >
      <md-button class="md-tertiary" md-menu-trigger>
        <feather type="eye-off"></feather>
        Hide Columns
      </md-button>

      <md-menu-content >
        <div>
          <div class="legend">
            <div class="legend-2">
              <p>Order</p>
             <div class="feathers"> 
              <feather type="check" v-if="this.$store.getters.getSettings.hidden_column.order" @click="setSettings('order')"></feather>
              <feather type="x-circle" v-if="!this.$store.getters.getSettings.hidden_column.order" @click="setSettings('order')"></feather>
            </div>
            </div>
            <div class="legend-2">
              <p>Task title</p>
             <div class="feathers"> 

              <feather type="check" v-if="this.$store.getters.getSettings.hidden_column.task" @click="setSettings('task')"></feather>
              <feather type="x-circle" v-if="!this.$store.getters.getSettings.hidden_column.task" @click="setSettings('task')"></feather>
            </div>
            </div>
            <div class="legend-2">
              <p>Deadline</p>
             <div class="feathers"> 

              <feather type="check" v-if="this.$store.getters.getSettings.hidden_column.deadline" @click="setSettings('deadline')"></feather>
              <feather type="x-circle" v-if="!this.$store.getters.getSettings.hidden_column.deadline" @click="setSettings('deadline')"></feather>
            </div>
            </div>
            <div class="legend-2">
              <p>Creation Date</p>
             <div class="feathers"> 

              <feather type="check" v-if="this.$store.getters.getSettings.hidden_column.creationDate" @click="setSettings('creationDate')"></feather>
              <feather type="x-circle" v-if="!this.$store.getters.getSettings.hidden_column.creationDate" @click="setSettings('creationDate')"></feather>
            </div>
            </div>
            <div class="legend-2">
              <p>Nb days left</p>
             <div class="feathers"> 

              <feather type="check" v-if="this.$store.getters.getSettings.hidden_column.numberdaysleft" @click="setSettings('numberdaysleft')"></feather>
              <feather type="x-circle" v-if="!this.$store.getters.getSettings.hidden_column.numberdaysleft" @click="setSettings('numberdaysleft')"></feather>
            </div>
            </div>
             <div class="legend-2">
              <p>Importance</p>
             <div class="feathers"> 

              <feather type="check" v-if="this.$store.getters.getSettings.hidden_column.importance" @click="setSettings('importance')"></feather>
              <feather type="x-circle" v-if="!this.$store.getters.getSettings.hidden_column.importance" @click="setSettings('importance')"></feather>
            </div>
            </div>
             <div class="legend-2">
              <p>Done/Not Done</p>
             <div class="feathers"> 

              <feather type="check" v-if="this.$store.getters.getSettings.hidden_column.isdone" @click="setSettings('isdone')"></feather>
              <feather type="x-circle" v-if="!this.$store.getters.getSettings.hidden_column.isdone" @click="setSettings('isdone')"></feather>
            </div>
            </div>
          </div>
        </div>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
export default {
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
    setSettings(setting){
      this.$store.commit('hideColumn', setting);
      //this.$store.commit('incRendAllListNumber');
    }
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
  margin-left: 10px;
  font-size: 16px !important;
}
.layout {
  display: flex;
  margin-top: 25px;
}

p {

}
.feathers {
  position: absolute;
  right: 7px;
}



</style>
