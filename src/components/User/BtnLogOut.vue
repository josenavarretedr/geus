<template>
  <div>
    <button @click="storeUser.signOutUser()">Salir</button>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const storeUser = useUserStore();
</script>
