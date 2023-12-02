<template>
  <div>
    <BtnPreviewPage />
    <BtnLogOut />
    <br />
    <router-view />
  </div>
</template>

<script setup>
import BtnPreviewPage from "@/components/Navigation/BtnPreviewPage.vue";
import BtnLogOut from "@/components/User/BtnLogOut.vue";
import { useRouter } from "vue-router";

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";
import { computed } from "vue";

const beneficiariesStore = useBeneficiariesStore();

const router = useRouter();

const idUser = router.currentRoute.value.params.id;

const beneficiary = computed(() => {
  return beneficiariesStore.getBeneficiary(idUser);
});
</script>
