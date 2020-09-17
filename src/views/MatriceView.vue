<template>
  <div class="about">
    <matrice />
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

export default class MatriceView extends Vue{}
</script>
