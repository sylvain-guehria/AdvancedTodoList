<template>
  <div class="about">
    <matrice
      :key="this.$store.getters.getTodoList ? this.$store.getters.getTodoList.length : 0"
      :todolist="this.$store.getters.getTodoList"
    />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import Matrice from '../components/matrice/Matrice.vue';

@Component({
  components: {
    matrice: Matrice
  }
})

export default class MatriceView extends Vue{
}
</script>
