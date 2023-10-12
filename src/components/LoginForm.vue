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
    <br />
    <input
      type="password"
      :value="storeUser.password"
      placeholder="Password"
      @input="storeUser.password = $event.target.value"
      @keydown.enter.prevent="storeUser.saludar()"
    />
    <button @click="storeUser.signIn()">Login</button>
  </div>
</template>
