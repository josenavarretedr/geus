<template>
  <div>
    <NewFileInput
      namePath="evidenciaMonitoreo"
      :idUser="idUser"
      @fileSelected="getDataFromChildrenInputFile"
    />

    <div class="mt-4">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="guardarMonitoreo"
      >
        Guardar
      </button>
    </div>
  </div>
</template>

<script setup>
import NewFileInput from "@/components/Inputs/NewFileInput.vue";

import { useRoute } from "vue-router";

import { useMonitoryFormStore } from "@/stores/monitoryForm.js";
const monitoryFormStore = useMonitoryFormStore();

const route = useRoute();

const idUser = route.params.idBeneficiary;

function getDataFromChildrenInputFile(file) {
  let data = {
    downloadURL: file.downloadURL,
    refFile: file.refFile,
  };

  monitoryFormStore.setEvidenceOFMonitory(data);
}

function guardarMonitoreo() {
  console.log("Guardando monitoreo");
  monitoryFormStore.saveNewMonitory(idUser);
}
</script>
