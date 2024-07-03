<template>
  <div>
    <Suspense>
      <template #default>
        <CardSumaryBeneficiary />
      </template>
      <template #fallback>
        <div class="text-center">Cargando...</div>
      </template>
    </Suspense>

    <div class="monitoring-card">
      <button @click="redirectToMonitoring" class="monitoring-button">
        <i class="fas fa-eye"></i>
        Monitoreo
      </button>
      <button @click="redirectToBusiness" class="monitoring-button">
        <i class="fas fa-eye"></i>
        Negocio
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import CardSumaryBeneficiary from "@/components/Beneficiary/CardSumaryBeneficiary.vue";
import SumaryStage from "@/components/Beneficiary/SumaryStage.vue";
import { useRouter } from "vue-router";
const router = useRouter();

function redirectToMonitoring() {
  router.push({ name: "MonitoryBeneficiary" });
}

function redirectToBusiness() {
  router.push({ name: "BusinessBeneficiary" });
}
</script>

<style scoped>
.monitoring-card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.monitoring-button {
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.monitoring-button i {
  margin-right: 5px;
}
</style>
