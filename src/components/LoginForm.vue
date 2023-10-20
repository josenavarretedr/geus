<script setup>
import { useUserStore } from "@/stores/user";

const storeUser = useUserStore();
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h3 class="text-2xl font-bold mb-4">Formulario de login</h3>
    <div class="w-full max-w-xs">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">
            Email
          </label>
          <div class="relative">
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              :value="storeUser.email"
              @input="storeUser.email = $event.target.value"
              placeholder="Email"
            />
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            Password
          </label>
          <div class="relative">
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              :value="storeUser.password"
              @input="storeUser.password = $event.target.value"
              @keydown.enter.prevent="storeUser.saludar()"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="storeUser.signIn()"
          >
            Login
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </div>
      <p class="text-center text-gray-500 text-xs">
        &copy;2021 Geus. All rights reserved.
      </p>
    </div>
  </div>
</template>

<style>
@import url("https://pro.fontawesome.com/releases/v5.15.4/css/all.css");
</style>
