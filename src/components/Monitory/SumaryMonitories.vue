<template>
  <div class="overflow-x-auto">
    <table
      class="max-w-fit divide-y-2 divide-gray-200 bg-white text-sm px-10 m-5 rounded-lg shadow-md"
      v-if="monitories !== null"
    >
      <thead class="ltr:text-left rtl:text-right text-lg">
        <tr>
          <th
            class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
          >
            Pregunta
          </th>
          <th
            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
            v-for="(monitory, index) in monitories"
            :key="index"
            @click="redirectToOneMonitory(index)"
          >
            <span
              class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-2 text-blue-500 cursor-pointer"
            >
              Monitoreo {{ index + 1 }}
            </span>
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <!-- Formateando Persona y Familia -->
        <tr>
          <td class="px-4 py-2 text-gray-900 font-bold">Persona y familia</td>
        </tr>

        <tr v-for="(answers, index) in personaFamilia" :key="index">
          <td class="px-4 py-2 font-medium text-gray-900">
            {{ answers.question }}
          </td>
          <td
            class="px-4 py-2 font-medium text-gray-900 text-center"
            v-for="(answer, index) in answers.values"
            :key="index"
          >
            <span
              :class="getAnswerClass(answer)"
              class="whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm"
            >
              {{ answer }}
            </span>
          </td>
        </tr>
        <!-- Acabó Persona y Familia  -->
        <!-- Gestión Empresarial -->
        <tr>
          <td class="px-4 py-2 text-gray-900 font-bold">Gestión Empresarial</td>
        </tr>

        <tr v-for="(answers, index) in gestionEmpresarial" :key="index">
          <td class="px-4 py-2 font-medium text-gray-900">
            {{ answers.question }}
          </td>
          <td
            class="px-4 py-2 font-medium text-gray-900 text-center"
            v-for="(answer, index) in answers.values"
            :key="index"
          >
            <span
              :class="getAnswerClass(answer)"
              class="whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm"
            >
              {{ answer }}
            </span>
          </td>
        </tr>
        <!-- Gestión Empresarial -->

        <!-- Gestión Proveedores -->
        <tr>
          <td class="px-4 py-2 text-gray-900 font-bold">Gestión Proveedores</td>
        </tr>

        <tr v-for="(answers, index) in gestionProveedores" :key="index">
          <td class="px-4 py-2 font-medium text-gray-900">
            {{ answers.question }}
          </td>
          <td
            class="px-4 py-2 font-medium text-gray-900 text-center"
            v-for="(answer, index) in answers.values"
            :key="index"
          >
            <span
              :class="getAnswerClass(answer)"
              class="whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm"
            >
              {{ answer }}
            </span>
          </td>
        </tr>
        <!-- Gestión Proveedores -->
      </tbody>
    </table>

    <div v-else>
      <p>No hay monitoreos</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import appFirebase from "@/firebaseInit";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const db = getFirestore(appFirebase);

import { useRouter } from "vue-router";
const router = useRouter();

const idUser = router.currentRoute.value.params.idBeneficiary;

import { useMonitoryFormStore } from "@/stores/monitoryForm.js";
const monitoryFormStore = useMonitoryFormStore();

// Get data from firestore

const beneficiaryData = ref(null);
const monitories = ref(null);

// rebuilding data of the monitories
const personaFamilia = ref(null);
const gestionEmpresarial = ref(null);
const gestionProveedores = ref(null);

const getDataFirestore = async (id) => {
  try {
    const docRef = doc(db, "beneficiaries", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.log("Document data:", docSnapshot.data());
      beneficiaryData.value = docSnapshot.data();
      if (beneficiaryData.value.monitory) {
        monitories.value = docSnapshot.data().monitory;
      }
      rebuildMonitory();
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

await getDataFirestore(idUser);

function rebuildMonitory() {
  let dataPersonaFamilia = [];
  let dataGestionProveedores = [];
  let dataGestionEmpresarial = [];

  for (let i = 0; i < monitories.value.length; i++) {
    dataPersonaFamilia.push(monitories.value[i].data.personaFamilia);
    dataGestionProveedores.push(monitories.value[i].data.gestionProveedores);
    dataGestionEmpresarial.push(monitories.value[i].data.gestionEmpresarial);
  }
  personaFamilia.value = formatDataFromMonitories(dataPersonaFamilia);
  gestionProveedores.value = formatDataFromMonitories(dataGestionProveedores);
  gestionEmpresarial.value = formatDataFromMonitories(dataGestionEmpresarial);
}

function formatDataFromMonitories(data) {
  const dataFormateada = [];

  if (!Array.isArray(data)) {
    console.error("data is not an array");
    return dataFormateada;
  }
  for (const group of data) {
    for (const question of group) {
      const existingQuestion = dataFormateada.find(
        (item) => item.question === question.question
      );

      if (existingQuestion) {
        existingQuestion.values.push(question.value);
      } else {
        dataFormateada.push({
          question: question.question,
          values: [question.value],
        });
      }
    }
  }
  return dataFormateada;
}

function getAnswerClass(answer) {
  if (answer === 1) {
    return "bg-yellow-100 text-yellow-800";
  } else if (answer === 0) {
    return "bg-red-100 text-red-800";
  } else {
    return " bg-green-100 text-green-800";
  }
}

const redirectToOneMonitory = (index) => {
  monitoryFormStore.setOneMonitoryData(monitories.value[index]);
  console.log("monitories.value[index]", monitories.value[index]);
  router.push({
    name: "OneMonitoryBeneficiary",
    params: { idMonitory: index },
  });
};
</script>
