<template>
  <div class="container">
    <DogDashboard />
  </div>
</template>
<style scoped>
.container {
  margin-left: var(--navbar-width);
}
</style>
<script setup lang="ts">
import DogDashboard from '@/components/dog-dashboard.vue';
</script>
