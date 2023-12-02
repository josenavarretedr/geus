<template>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
  >
    <div class="md:flex">
      <div class="md:flex-shrink-0">
        <img
          class="h-48 w-full object-cover md:w-48"
          src="https://picsum.photos/200/300"
          :alt="beneficiary.name"
        />
      </div>
      <div class="p-8">
        <div
          class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
        >
          {{ beneficiary.name }} {{ beneficiary.surname }}
        </div>
        <div class="mt-4">
          <p class="text-gray-500 text-sm">
            {{ beneficiary.birthdate }} ({{ beneficiary.age }} años)
          </p>
          <p class="text-gray-500 text-sm">{{ beneficiary.phone }}</p>
        </div>
      </div>
      <div class="mt-4">
        <router-link
          :to="{ name: 'EditBeneficiary' }"
          class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150"
        >
          Editar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const idUser = router.currentRoute.value.params.id;

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";

const beneficiariesStore = useBeneficiariesStore();

const beneficiary = computed(() => {
  return beneficiariesStore.getBeneficiary(idUser);
});
</script>
