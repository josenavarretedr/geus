<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
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
          >
            Monitoreo {{ index + 1 }}
          </th>

          <th>
            <a
              href="#"
              class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              +
            </a>
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="px-4 py-2 font-medium text-gray-900">Persona y familia</td>
        </tr>

        <tr v-for="(answers, index) in personaFamilia" :key="index">
          <td class="px-4 py-2 font-medium text-gray-900">
            {{ answers.question }}
          </td>
          <td
            class="px-4 py-2 font-medium text-gray-900"
            v-for="(answer, index) in answers.values"
            :key="index"
          >
            {{ answer }}
          </td>
        </tr>
      </tbody>
    </table>
    <v-btn color="purple" @click="rebuildMonitory"> Button </v-btn>
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

const monitories = ref(null);

const personaFamilia = ref(null);

const beneficiaryData = ref(null);

const getDataFirestore = async (id) => {
  try {
    const docRef = doc(db, "beneficiaries", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.log("Document data:", docSnapshot.data());
      beneficiaryData.value = docSnapshot.data();
      monitories.value = docSnapshot.data().monitory;
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
  for (let i = 0; i < monitories.value.length; i++) {
    dataPersonaFamilia.push(monitories.value[i].data.personaFamilia);
  }
  personaFamilia.value = formatDataFromMonitories(dataPersonaFamilia);
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
</script>
