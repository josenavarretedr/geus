<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";

defineProps({
  msg: String,
});

const count = ref(0);

// access the `store` variable anywhere in the component ✨
const store = useCounterStore();
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p class="text-3xl font-bold underline">{{ store.name }}</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
