<template>
  <div>
    <Suspense>
      <template #default>
        <SumaryBusiness></SumaryBusiness>
      </template>
      <template #fallback>
        <div class="text-center">Cargando información del negocio...</div>
      </template>
    </Suspense>
    <br />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import SumaryBusiness from "@/components/Business/SumaryBusiness.vue";

const router = useRouter();

const idUser = router.currentRoute.value.params.idBeneficiary;
</script>
