<template>
  <h1>Información del negocio desde Edit Business</h1>
  <Suspense>
    <template #default>
      <FormEditBusinessBeneficiary></FormEditBusinessBeneficiary>
    </template>
    <template #fallback>
      <div class="text-center">Cargando formulario del negocio...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { useRouter } from "vue-router";
import FormEditBusinessBeneficiary from "./FormEditBusinessBeneficiary.vue";

const router = useRouter();

const idUser = router.currentRoute.value.params.idBeneficiary;
</script>
