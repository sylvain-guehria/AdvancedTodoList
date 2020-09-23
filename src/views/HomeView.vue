<template>
  <div class="home">
    <home />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from '../components/home/Home.vue';

@Component({
  components: {
    home: Home
  }
})
export default class HomeView extends Vue {}
</script>
