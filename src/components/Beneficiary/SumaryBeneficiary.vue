<template>
  <div>
    <CardSumaryBeneficiary></CardSumaryBeneficiary>
    <SumaryStage></SumaryStage>
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
</script>
