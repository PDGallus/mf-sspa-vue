<template>
  <div>
    <page-header title="Dogs dashboard" />
    <div class="card">
      <div v-if="dogs.length === 0">
        There are no dogs!
        <router-link to="/rate-doggos"> Rate dogs </router-link>.
      </div>
      <div
        v-else
        class="dogs"
      >
        <div
          v-for="dog in dogs"
          :key="dog.url"
          class="dog"
        >
          <img
            :src="dog.url"
            alt="dog photo"
          />
          <div class="rating">Rating: {{ dog.rating }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue';

import type { Component } from 'vue';

type StyleguideMod = { PageHeader: Component };
const PageHeader = defineAsyncComponent<Component>(async () => {
  const mod: StyleguideMod = (await import(/* @vite-ignore */ '@vue-mf/styleguide')) as StyleguideMod;
  return mod.PageHeader;
});

type Dog = { url: string; rating: number };

const dogs = ref<Dog[]>([]);

onMounted(() => {
  try {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('dogs') : null;
    dogs.value = saved ? (JSON.parse(saved) as Dog[]) : [];
  } catch {
    dogs.value = [];
  }
});
</script>

<style scoped>
.card {
  background-color: white;
  margin: 3.2rem auto 0 auto;
  width: 75%;
  padding: 2.4rem;
}

.dogs {
  display: flex;
  flex-wrap: wrap;
}

.dog {
  margin: 1.6rem;
  max-width: 100rem;
}

.rating {
  display: flex;
  justify-content: center;
}
</style>
