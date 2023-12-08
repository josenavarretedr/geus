<template>
  <div>
    <h1>
      AQUí IRÁ EL RESUMEN DEL ULTIMO ESTADO QUE HAYA REGISTRADO EL CONSULTOR
    </h1>
    <div
      v-if="lastProcessInfo === null"
      class="flex justify-center items-center h-screen"
    >
      <div
        class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"
      ></div>
    </div>
    <div class="bg-white shadow-lg rounded-lg p-6" v-else>
      <h2 class="text-xl font-bold mb-4">{{ lastProcessInfo.nameUI }}</h2>
      <p class="text-gray-500">{{ lastProcessInfo.descriptionUI }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import { getFirestore, collection, getDoc, doc } from "firebase/firestore";

import appFirebase from "@/firebaseInit";

const db = getFirestore(appFirebase);

const programStagesRef = collection(db, "programStages");

const idUser = router.currentRoute.value.params.id;

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";
import { useStageStore } from "@/stores/stages.js";

const stageStore = useStageStore();

const beneficiariesStore = useBeneficiariesStore();

const beneficiary = computed(() => {
  return beneficiariesStore.getBeneficiary(idUser);
});

let lastProcessInfo = ref(null);

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

onMounted(async () => {
  const stage = await stageStore.getStageInfo(lastProcess.value.id);

  lastProcessInfo.value = stage;
});
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
