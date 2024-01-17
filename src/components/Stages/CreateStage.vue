<template>
  <div class="flex flex-col items-center">
    <BtnPreviewPage />

    <h3 class="text-2xl font-bold mb-4">Crear etapas</h3>
    <div
      class="w-full max-w-[80%] mx-auto md:w-[50%] md:p-4 md:border md:border-gray-300 md:rounded-md"
    >
      <div class="flex items-center mb-2">
        <label for="name" class="w-1/3 text-right pr-4">Nombre:</label>
        <input
          id="name"
          type="text"
          v-model="nameUI"
          class="w-2/3 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Nombre"
        />
      </div>
      <div class="flex items-center mb-2">
        <label for="description" class="w-1/3 text-right pr-4"
          >Descripción:</label
        >
        <input
          id="description"
          type="text"
          v-model="descriptionUI"
          class="w-2/3 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Descripción"
        />
      </div>
      <div class="flex items-center mb-2">
        <label for="type" class="w-1/3 text-right pr-4">Tipo de etapa:</label>

        <select
          class="w-2/3 px-4 py-2 border border-gray-300 rounded-md"
          v-model="typeStage"
        >
          <option
            v-for="option in typeStageOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="flex items-center mb-2">
        <label for="program" class="w-1/3 text-right pr-4"
          >Programa de etapa:</label
        >
        <select
          id="program"
          v-model="stageProgramSelected"
          class="w-2/3 px-4 py-2 border border-gray-300 rounded-md"
        >
          <option v-for="option in stageProgram" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <div class="flex items-center mb-2">
        <label for="requirement" class="w-1/3 text-right pr-4"
          >Requisito:</label
        >
        <select
          id="requirement"
          v-model="requirementSelected"
          class="w-2/3 px-4 py-2 border border-gray-300 rounded-md"
        >
          <option
            v-for="option in requirementOptions"
            :key="option.id"
            :value="option"
          >
            {{ option.nameUI }}
          </option>
        </select>
      </div>
      <button
        @click="createStageUI"
        class="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Crear etapa
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import BtnPreviewPage from "@/components/Navigation/BtnPreviewPage.vue";

import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import appFirebase from "@/firebaseInit";

import { useStageStore } from "@/stores/stages";

const stageStore = useStageStore();

const db = getFirestore(appFirebase);

const programStagesRef = collection(db, "programStages");

// Generar los let para nameUI, descriptionUI, typeStage, evidence, stageProgram, requirement

let nameUI = ref("");
let descriptionUI = ref("");
let typeStage = ref("");

let typeStageOptions = ref([
  {
    text: "Evidencia",
    value: "evidence",
  },
  {
    text: "Formulario",
    value: "form",
  },
]);

let evidence = ref(false);
let stageProgram = ref([
  "Convocatoria",
  "Selección",
  "Capacitaciones Técnicas",
  "Capacitaciones empresariales",
  "Monitoreo",
  "Seguimiento",
]);

let stageProgramSelected = ref("Convocatoria");

let requirementOptionsAPI = ref([]);

let requirementOptions = ref([]);

let requirementSelected = ref("");

// TODO Hacer que las opciones esten numeradas (numerar en el UI), sería mejor hacer una cadena de los requerimientos de cada etapa

watch(stageProgramSelected, (newVal) => {
  requirementOptions.value = requirementOptionsAPI.value.filter(
    (option) => option.stageProgram === newVal
  );
  if (requirementOptions.value.length === 0) {
    requirementOptions.value = [
      {
        nameUI: "Esta será la primera actividad del proceso",
        id: "noProcess",
        stageProgram: newVal,
      },
    ];
  }
  requirementSelected.value = requirementOptions.value[0];
});

onMounted(async () => {
  const querySnapshot = await getDocs(programStagesRef);
  querySnapshot.forEach((doc) => {
    requirementOptionsAPI.value.push(doc.data());
  });
  requirementOptions.value = requirementOptionsAPI.value.filter(
    (option) => option.stageProgram === stageProgram.value[0]
  );

  if (requirementOptions.value.length === 0) {
    requirementOptions.value = [
      {
        nameUI: "Esta será la primera actividad del proceso",
        id: "noProcess",
      },
    ];
  }
  requirementSelected.value = requirementOptions.value[0];
});

function createStageUI() {
  stageStore.createStage({
    nameUI: nameUI.value,
    descriptionUI: descriptionUI.value,
    typeStage: typeStage.value,
    stageProgram: stageProgramSelected.value,
    idRequirement: requirementSelected.value.id,
  });
}
</script>
