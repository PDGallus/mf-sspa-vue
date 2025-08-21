<template>
  <div>
    <page-header title="Rate doggos" />
    <div class="content">
      <div class="card">
        <div v-if="currentDogUrl">
          <img
            :src="currentDogUrl"
            alt="dog photo"
          />
        </div>
        <div class="actions">
          <select
            v-model="rating"
            @change="onNewRating"
          >
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="14.5">14.5</option>
            <option value="15">15</option>
          </select>
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

const currentDogUrl = ref<string | null>(null);
const rating = ref<string>('10');

async function newDog(): Promise<void> {
  try {
    const r = await fetch('https://dog.ceo/api/breeds/image/random');
    const json = (await r.json()) as { message: string };
    currentDogUrl.value = json.message;
    rating.value = '10';
  } catch (err) {
    // Optional: Fehlerbehandlung/Logging
    console.error('Fehler beim Laden eines Hundebilds:', err);
  }
}

function onNewRating(evt: Event): void {
  const target = evt.target as HTMLSelectElement;
  rating.value = target.value;

  const raw = localStorage.getItem('dogs');
  const dogs: { url: string | null; rating: number }[] = raw
    ? (JSON.parse(raw) as { url: string | null; rating: number }[])
    : [];
  dogs.push({ url: currentDogUrl.value, rating: Number(rating.value) });
  localStorage.setItem('dogs', JSON.stringify(dogs));

  void newDog();
}

onMounted(() => {
  void newDog();
});
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.card {
  margin-top: 1.6rem;
  padding: 3.2rem;
  background-color: white;
  border-radius: 0.5rem;
  max-width: 75%;
}

.card img {
  max-width: 100%;
}

.actions {
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
}
</style>
