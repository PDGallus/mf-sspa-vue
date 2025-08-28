<template>
  <div class="container">
    <DogDashboard />
  </div>
</template>
<script setup lang="ts">
import DogDashboard from '@/components/dog-dashboard.vue';
</script>
<style scoped>
.container {
  margin-left: var(--navbar-width);
}
</style>
