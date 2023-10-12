<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import LoginForm from "@/components/LoginForm.vue";

const userStore = useUserStore();
</script>

<template>
  <div>
    <h1>Hola desde Login view</h1>

    <LoginForm></LoginForm>
    <router-link to="/">Home</router-link>
  </div>
</template>
