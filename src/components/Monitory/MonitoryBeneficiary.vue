<template>
  <div class="px-4">
    <h1 class="text-2xl font-bold mb-4 px-5 m-5">Monitoreos</h1>
    <button
      @click="redirectToMonitoryForm"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 inline-block mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        ></path>
      </svg>
      Agregar Monitoreo
    </button>
    <Suspense>
      <template #default>
        <SumaryMonitories />
      </template>
      <template #fallback>
        <div class="text-center">Cargando...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";
import SumaryMonitories from "../Monitory/SumaryMonitories.vue";

const router = useRouter();

const beneficiariesStore = useBeneficiariesStore();
const idUser = router.currentRoute.value.params.idBeneficiary;

const beneficiaryData = ref(null);

// onBeforeMount(async () => {
//   beneficiaryData.value =
//     await beneficiariesStore.getBeneficiaryDataFromFirestore(idUser);
// });

const redirectToMonitoryForm = () => {
  router.push({ name: "AddMonitoryBeneficiary" });
};
</script>
