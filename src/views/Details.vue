<template>
  <div>
    <router-link
      to="/dashboard"
      class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150"
    >
      <svg
        class="w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10.707 3.293a1 1 0 0 1 0 1.414L6.414 9H16a1 1 0 0 1 0 2H6.414l4.293 4.293a1 1 0 1 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      Regresar
    </router-link>
    <BtnLogOut />
    <br />
    <h1>Hola desde el Details</h1>

    <div
      class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img
            class="h-48 w-full object-cover md:w-48"
            :src="beneficiary.avatar"
            :alt="beneficiary.name"
          />
        </div>
        <div class="p-8">
          <div
            class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
          >
            {{ beneficiary.name }} {{ beneficiary.surname }}
          </div>
          <a
            href="#"
            class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >{{ beneficiary.birthdate }}</a
          >
          <p class="mt-2 text-gray-500">{{ beneficiary.age }} años</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BtnLogOut from "@/components/User/BtnLogOut.vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";

const storeUser = useUserStore();

const router = useRouter();

const idUser = router.currentRoute.value.params.id;

const beneficiary = storeUser.beneficiaries.find((user) => user.id === idUser);

console.log(beneficiary);
</script>
