<template>
  <div>
    <h1>Aquí se subirá el resumen del monitoreo del emprendedor</h1>

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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const redirectToMonitoryForm = () => {
  const idBeneficiary = 123; // Reemplaza 123 con el valor real del idBeneficiary
  router.push({ name: "AddMonitoryBeneficiary" });
};
</script>
