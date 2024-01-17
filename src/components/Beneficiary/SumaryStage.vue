<template>
  <div
    class="my-5 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4"
  >
    <p class="text-xs mb-4">La próx etapa será:</p>
    <h3 class="text-xl font-bold mb-4">{{ getNextStageUI.nameUI }}</h3>
    <p class="text-gray-500">{{ getNextStageUI.descriptionUI }}</p>

    <button
      class="px-3 py-2 bg-blue-500 text-white rounded-xl"
      @click="goToStageBeneficiary(getNextStageUI.id)"
    >
      Saber +
    </button>
  </div>

  <div
    class="my-5 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-4"
  >
    <p class="text-xs mb-4">El beneficiario actual está en la etapa:</p>
    <span
      class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
      :class="{
        'bg-green-50 text-green-700 ring-green-600/20': lastProcess.completed,
        'bg-red-50 text-red-700 ring-red-600/20': !lastProcess.completed,
      }"
    >
      {{ lastProcess.completed ? "Completado" : "Incompleto" }}
    </span>

    <h3 class="text-xl font-bold mb-4">{{ getOneStageByIdUI.nameUI }}</h3>
    <button
      class="px-3 py-2 bg-blue-500 text-white rounded-xl"
      @click="goToStageBeneficiary(lastProcess.id)"
    >
      Saber +
    </button>
  </div>

  <div class="flex items-center justify-center max-w-md mx-auto md:max-w-2xl">
    <div class="border-t border-gray-200 w-1/3"></div>
    <button class="py-2 rounded-xl mx-4 border-t border-gray-200 w-1/3">
      + Info
    </button>
    <div class="border-t border-gray-200 w-1/3"></div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

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

// Inicializamos el beneficiario actual
const beneficiary = computed(() => {
  return beneficiariesStore.getBeneficiary(idUser);
});

const lastProcess = computed(() => {
  const progress = beneficiary.value.progress;
  if (progress.length === 0) {
    return null;
  }
  let maxTimestamp = progress[0].timestamp;
  let lastProcessIndex = 0;
  for (let i = 1; i < progress.length; i++) {
    if (progress[i].timestamp > maxTimestamp) {
      maxTimestamp = progress[i].timestamp;
      lastProcessIndex = i;
    }
  }
  return progress[lastProcessIndex];
});

const getOneStageByIdUI = computed(() => {
  const stageID = lastProcess.value.id;
  const stageUI = stageStore.getOneStageById(stageID);
  if (stageUI === null) {
    return null;
  }
  return stageUI;
});

const getNextStageUI = computed(() => {
  const stageID = lastProcess.value.id;
  const stageUI = stageStore.getNextStage(stageID);
  if (stageUI === null) {
    return null;
  }
  return stageUI;
});

function goToStageBeneficiary(id) {
  router.push({ name: "StageBeneficiary", params: { idStage: id } });
}
</script>

<style>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
