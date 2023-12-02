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
        <input
          id="type"
          type="text"
          v-model="typeStage"
          class="w-2/3 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Tipo de etapa"
        />
      </div>
      <div class="flex items-center mb-2">
        <label for="evidence" class="w-1/3 text-right pr-4">Adjunto</label>

        <div class="w-2/3 px-4 py-2">
          <span class="mr-2">¿Requiere adjunto?</span>
          <span class="mr-2">Sí</span>
          <input
            id="evidence"
            type="radio"
            v-model="evidence"
            class="mr-2"
            value="true"
          />
          <span>No</span>
          <input
            id="evidence"
            type="radio"
            v-model="evidence"
            class="mr-2"
            value="false"
          />
        </div>
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
          <option
            v-for="program in stageProgram"
            :key="program"
            :value="program"
          >
            {{ program }}
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
        @click="createStage"
        class="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Crear etapa
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import BtnPreviewPage from "@/components/Navigation/BtnPreviewPage.vue";

import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import appFirebase from "@/firebaseInit";

const db = getFirestore(appFirebase);

const programStagesRef = collection(db, "programStages");

import { v4 as uuidv4 } from "uuid";

const router = useRouter();

let idStage = uuidv4();
// Generar los let para nameUI, descriptionUI, typeStage, evidence, stageProgram, requirement

let nameUI = ref("");
let descriptionUI = ref("");
let typeStage = ref("");
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

//TODO Este requerimiento tiene que ser una llamada a la base de datos para los documentos de "programStages" en firsestore y que muestre un select con los documentos que existen en la base de datos de firestore

// Por ahora se simulará una data que es la siguiente:

let requirementOptionsAPI = ref([
  // {
  //   nameUI: "Convocatoria - Datos básicos",
  //   id: "convocatoriaProceso",
  //   stageProgram: "Convocatoria",
  // },
  //,
  // {
  //   nameUI: "Autorización de uso de Datos",
  //   id: "autorizacionDatosProceso",
  //   stageProgram: "Convocatoria",
  // },
  // {
  //   nameUI: "Documento de identidad",
  //   id: "docIdentidadProceso",
  //   stageProgram: "Convocatoria",
  // },
  // {
  //   nameUI: "Selección de beneficiario",
  //   id: "seleccionBeneficiarioProceso",
  //   stageProgram: "Selección",
  // },
]);

let requirementOptions = ref([]);

let requirementSelected = ref("");

/**
 * Watches the changes in the selected stage program and updates the requirement options accordingly.
 * @param {string} newVal - The new value of the selected stage program.
 */
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

/**
 * Gets the data from the database and sets the requirement options.
 */

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

/**
 * Creates a new stage with the provided data and saves it to the database.
 * @returns {Promise<void>} A promise that resolves when the stage is successfully created.
 */
const createStage = async () => {
  const stage = {
    nameUI: nameUI.value,
    descriptionUI: descriptionUI.value,
    typeStage: typeStage.value,
    evidence: evidence.value,
    stageProgram: stageProgramSelected.value,
    requirement: {
      nameUI: requirementSelected.value.nameUI,
      id: requirementSelected.value.id,
    },
    id: idStage,
  };

  await setDoc(doc(db, "programStages", idStage), stage);
  router.push("/dashboard");
};
</script>
