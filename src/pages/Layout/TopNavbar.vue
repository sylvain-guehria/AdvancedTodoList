<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <breadcrumbs></breadcrumbs>
      </div>
    </div>
    <div class="md-toolbar-row title">
      <div class="md-toolbar-section-start">
        <h1>{{ $route.name }}</h1>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {};
</script>

<style lang="css"></style>
