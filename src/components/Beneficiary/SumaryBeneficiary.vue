<template>
  <div>
    <CardSumaryBeneficiary></CardSumaryBeneficiary>
    <!-- <SumaryStage></SumaryStage> -->
    <!-- Monitoreo Component -->

    <div class="monitoring-card">
      <button @click="redirectToMonitoring" class="monitoring-button">
        <i class="fas fa-eye"></i>
        Monitoreo
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

import CardSumaryBeneficiary from "@/components/Beneficiary/CardSumaryBeneficiary.vue";
import SumaryStage from "@/components/Beneficiary/SumaryStage.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const idUser = router.currentRoute.value.params.id;

const beneficiary = computed(() => {
  return beneficiariesStore.getBeneficiary(idUser);
});

function redirectToMonitoring() {
  router.push({ name: "MonitoryBeneficiary" });
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
