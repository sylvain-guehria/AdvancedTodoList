<template>
   <div>
    <md-dialog :md-active.sync="showAddTaskModal" :md-backdrop="true">
      <md-dialog-title>Add Task</md-dialog-title>

      <md-dialog-content>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
          mollitia dolorum dolores quae commodi impedit possimus qui, atque at
          voluptates cupiditate. Neque quae culpa suscipit praesentium inventore
          ducimus ipsa aut.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
          mollitia dolorum dolores quae commodi impedit possimus qui, atque at
          voluptates cupiditate. Neque quae culpa suscipit praesentium inventore
          ducimus ipsa aut.
        </p>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-tertiary" @click="showAddTaskModal = false">
          <feather type="corner-down-left"></feather>Close</md-button
        >
        <md-button class="md-tertiary" @click="showAddTaskModal = false"
          ><feather type="save"></feather>Save</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-tertiary" @click="showAddTaskModal = true">
      <feather type="star"></feather>Add a task
    </md-button>
  </div> 


</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components:{}
})
export default class EditTaskButton extends Vue {

  showAddTaskModal: boolean = false;

  public showCrmPopup: boolean = false;

  isLoading: boolean= false;





}
</script>

<style lang="scss" scoped>
.md-dialog /deep/.md-dialog-container {
  max-width: 768px;
  padding: 3% 3%;
  height: auto;
}
.md-dialog-title {
  text-align: center;
  padding-bottom: 30px;
}
</style>