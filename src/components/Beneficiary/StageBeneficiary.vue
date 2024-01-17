<template>
  <div>
    <h1>
      {{ getOneStageByIdUI.nameUI }}
    </h1>

    <FileInput
      v-if="getOneStageByIdUI.typeStage === 'evidence'"
      :namePath="getStringToCamelCase(getOneStageByIdUI.nameUI)"
      :nameUI="getOneStageByIdUI.nameUI"
      @fileSelected="getDataFromChildrenInputFile"
    ></FileInput>

    <button
      @click="saveInFirestore"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 inline-block mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10 2a8 8 0 100 16A8 8 0 0010 2zm1 11a1 1 0 01-2 0V9a1 1 0 012 0v4zm0-6a1 1 0 00-2 0v2a1 1 0 002 0V7z"
          clip-rule="evenodd"
        />
      </svg>
      GUARDAR
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import FileInput from "@/components/Inputs/FileInput.vue";

// Inicializamos firebase y la base de datos

import { getFirestore, collection, getDoc, doc } from "firebase/firestore";

import appFirebase from "@/firebaseInit";

const db = getFirestore(appFirebase);

const programStagesRef = collection(db, "programStages");

// Inicializamos los store de Pinia
import { useBeneficiariesStore } from "@/stores/beneficiaries.js";
import { useStageStore } from "@/stores/stages.js";

const stageStore = useStageStore();

const beneficiariesStore = useBeneficiariesStore();

// Inicializamos el ID del beneficiario actual
const idUser = router.currentRoute.value.params.id;

const idStage = router.currentRoute.value.params.idStage;

const downloadURL = ref("");
const refFile = ref("");

// Inicializamos el beneficiario actual
const beneficiary = computed(() => {
  return beneficiariesStore.getBeneficiary(idUser);
});

const getOneStageByIdUI = computed(() => {
  const stageUI = stageStore.getOneStageById(idStage);
  if (stageUI === null) {
    return null;
  }
  return stageUI;
});

function getStringToCamelCase(string) {
  const stringWithoutAccents = string
    .replace(/[áÁ]/g, "a")
    .replace(/[éÉ]/g, "e")
    .replace(/[íÍ]/g, "i")
    .replace(/[óÓ]/g, "o")
    .replace(/[úÚ]/g, "u");

  const stringCamelCase = stringWithoutAccents
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");

  return stringCamelCase;
}

function getDataFromChildrenInputFile(file) {
  downloadURL.value = file.downloadURL;
  refFile.value = file.refFile;
}

function saveInFirestore() {
  stageStore.updateBeneficiariesInStage(idStage, idUser);

  let timestamp = new Date().toISOString();

  const progressToSave = {
    completed: true,
    evidence: {
      downloadURL: downloadURL.value,
      refFile: refFile.value,
    },
    id: idStage,
    timestamp,
  };

  beneficiariesStore.updateProgressOfBeneficiary(idUser, progressToSave);
}
</script>
