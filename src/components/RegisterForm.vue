<script setup>
import { useUserStore } from "@/stores/user";

const storeUser = useUserStore();
</script>

<template>
  <div>
    <h3>Formulario de login</h3>
    <input
      type="email"
      :value="storeUser.email"
      placeholder="Email"
      @input="storeUser.email = $event.target.value"
    />
    <input
      type="password"
      :value="storeUser.password"
      placeholder="Password"
      @input="storeUser.password = $event.target.value"
    />
    <button @click="storeUser.createUser()">Login</button>
  </div>
</template>
