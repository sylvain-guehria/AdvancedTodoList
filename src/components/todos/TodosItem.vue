<template>
  <v-card
    class="item-todo"
  >
    <div
      class="row mr-5 clickme"
      @click="showTask"
    >
      <div class="col ">
        <p>{{ todo.task }} </p>
      </div>
      <div class="col">
        {{ todo.deadline }}
      </div>
      <div class="col">
        {{ getdaysleft(todo.deadline) }}
      </div>
      <div class="col">
        {{ todo.importance }}
      </div>
    </div>
    <div
      class="btn-supr"
    >
      <v-btn
        color="error"
        fab
        small
        dark
        @click="supressTodo"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </div>
    <div class="btn-edit">
      <v-btn
        color="primary"
        fab
        small
        dark
        @click="showEditModal"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Todo } from '../../models/types';
import { myFunctions } from '../helpers/helperfunction';

@Component
export default class Todos extends Vue {
  todolist: Todo[] = [];

  @Prop() private todo?: Todo;

  @Prop() private index?: number;

  supressTodo (){
    console.log('keyyu', this.todo ? this.todo.key : '')
    this.$emit('onSuppress', this.todo ? this.todo.key : '');
  }

  showTask (){
    this.$store.commit('setCurrentTodo', this.index);
    this.$emit('onClickModal', this.index);
  }

  showEditModal (){
    this.$store.commit('setCurrentTodo', this.index);
    this.$emit('onClickEditModal', this.index);
  }

  getdaysleft = myFunctions.getdaysleft;
}
</script>

<style scoped>
.item-todo{
  position: relative;
  padding: 20px 60px 20px 30px;
  font-size: 20px;
  height: 88px;
  margin-top : 10px;
  margin-bottom : 10px;

}
.btn-supr{
  position:absolute;
  top: 25px;
  right: 70px;
}
.btn-edit{
  position:absolute;
  top: 25px;
  right: 10px;
}
  .clickme{
cursor: pointer;
  }

</style>
