<template>
  <div class="w-3/6 mx-auto">
    <BtnLogOut />
    <br />
    <h1>Hola desde el Dashboard</h1>
    <router-link
      to="/create"
      class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-5a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm0-8a1 1 0 011 1v2a1 1 0 11-2 0V4a1 1 0 011-1z"
          clip-rule="evenodd"
        />
      </svg>
      Registra Beneficiario
    </router-link>
    <router-link
      to="/createStages"
      class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >Registra etapa
    </router-link>
    <SearchUser />
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

import BtnLogOut from "@/components/User/BtnLogOut.vue";
import SearchUser from "@/components/SearchUser/SearchUser.vue";
// import AlgoliaSearch from "@/components/SearchUser/AlgoliaSearch.vue";

const storeUser = useUserStore();
</script>
