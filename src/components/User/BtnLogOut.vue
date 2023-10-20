<template>
  <div>
    <button
      @click="storeUser.signOutUser()"
      class="flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-9.414a1 1 0 011.414 0L10 10.586l1.414-1.414a1 1 0 011.414 1.414L11.414 12l1.414 1.414a1 1 0 01-1.414 1.414L10 13.414l-1.414 1.414a1 1 0 01-1.414-1.414L8.586 12l-1.414-1.414a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
      Salir
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const storeUser = useUserStore();
</script>
