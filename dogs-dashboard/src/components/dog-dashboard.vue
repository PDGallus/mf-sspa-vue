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

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const PageHeader = defineAsyncComponent(async () => {
  const mod = await System.import('@vue-mf/styleguide'); // Name muss in der import map vorkommen
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return mod.PageHeader; // benannter Export aus dem Styleguide
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
