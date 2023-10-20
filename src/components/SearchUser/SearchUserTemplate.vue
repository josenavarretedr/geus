<template>
  <div>
    <h1>Hola</h1>
    <img :src="props.hit.image" alt="" />
    <h2>{{ props.hit.name }}</h2>
    <p>{{ props.hit.description }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  hit: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
/* Your styles here */
</style>
