<template>
  <div class="page-header">
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
defineProps<{
  title: string;
}>();
</script>

<style scoped>
.page-header {
  height: 10.2rem;
  display: flex;
  background-color: #35495e;
  padding: 1.6rem;

  h1 {
    color: white;
    font-weight: bold;
    margin: 0;
    padding: 0;
  }
}
</style>
