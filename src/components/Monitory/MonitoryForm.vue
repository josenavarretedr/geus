<template>
  <div class="p-4">
    <h1>Formulario de monitoreo</h1>
    {{ controlerForm }}

    <PersonaFamilia v-if="controlerForm.personaFamilia" />
    <GestionEmpresarial v-if="controlerForm.gestionEmpresarial" />
    <GestionProveedores v-if="controlerForm.gestionProveedores" />
    <WrapperInputEvidence v-if="controlerForm.evidenceOfMonitory" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import WrapperInputEvidence from "@/components/Monitory/WrapperInputEvidence.vue";

import PersonaFamilia from "@/components/Monitory/PersonaFamilia.vue";
import GestionEmpresarial from "@/components/Monitory/GestionEmpresarial.vue";
import GestionProveedores from "@/components/Monitory/GestionProveedores.vue";

import { useMonitoryFormStore } from "@/stores/monitoryForm.js";

const monitoryFormStore = useMonitoryFormStore();

const controlerForm = computed(() => {
  const controlerForm = {
    personaFamilia: false,
    gestionEmpresarial: false,
    gestionProveedores: false,
    evidenceOfMonitory: false,
  };

  if (monitoryFormStore.personaFamilia === null) {
    controlerForm.personaFamilia = true;
    controlerForm.gestionEmpresarial = false;
    controlerForm.gestionProveedores = false;
  }

  if (monitoryFormStore.personaFamilia != null) {
    controlerForm.personaFamilia = false;
    controlerForm.gestionEmpresarial = true;
    controlerForm.gestionProveedores = false;
  }

  if (monitoryFormStore.gestionEmpresarial != null) {
    controlerForm.personaFamilia = false;
    controlerForm.gestionEmpresarial = false;
    controlerForm.gestionProveedores = true;
  }

  if (monitoryFormStore.gestionProveedores != null) {
    controlerForm.personaFamilia = false;
    controlerForm.gestionEmpresarial = false;
    controlerForm.gestionProveedores = false;
    controlerForm.evidenceOfMonitory = true;
  }

  return controlerForm;
});
</script>

<style>
/* Add Tailwind CSS classes here */
</style>
