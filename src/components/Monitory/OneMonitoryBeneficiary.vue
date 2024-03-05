<template>
  <div>
    <h1 class="text-2xl font-bold mb-4 px-10 m-5">
      Monitoreo de beneficiario individual
    </h1>
    <p class="text-right text-gray-500 px-10 m-5">{{ dateOfMonitory }}</p>

    <div class="overflow-x-auto">
      <table
        class="max-w-fit divide-y-2 divide-gray-200 bg-white text-sm px-10 m-5 rounded-lg shadow-md"
      >
        <thead class="ltr:text-left rtl:text-right text-lg">
          <tr>
            <th
              class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
            >
              Pregunta
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Respuesta
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Comentario
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <!-- Formateando Persona y Familia -->
          <tr>
            <td class="px-4 py-2 text-gray-900 font-bold">Persona y familia</td>
          </tr>

          <tr
            v-for="(answer, index) in dataOfOneMonitory.data.personaFamilia"
            :key="index"
          >
            <td class="px-4 py-2 font-medium text-gray-900">
              {{ answer.question }}
            </td>
            <td class="px-4 py-2 font-medium text-gray-900 text-center">
              <span
                :class="getAnswerClass(answer.value)"
                class="whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm"
              >
                {{ answer.value }}
              </span>
            </td>

            <td class="px-4 py-2 font-medium text-gray-500 text-left text-sm">
              <span v-if="answer.commentOrRecommendation !== null">
                {{ answer.commentOrRecommendation }}
              </span>
              <span v-else> Sin comentario </span>
            </td>
          </tr>
          <!-- Persona y Familia  -->
          <!-- Gestión Empresarial -->
          <tr>
            <td class="px-4 py-2 text-gray-900 font-bold">
              Gestión Empresarial
            </td>
          </tr>

          <tr
            v-for="(answer, index) in dataOfOneMonitory.data.gestionEmpresarial"
            :key="index"
          >
            <td class="px-4 py-2 font-medium text-gray-900">
              {{ answer.question }}
            </td>
            <td class="px-4 py-2 font-medium text-gray-900 text-center">
              <span
                :class="getAnswerClass(answer.value)"
                class="whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm"
              >
                {{ answer.value }}
              </span>
            </td>

            <td class="px-4 py-2 font-medium text-gray-500 text-left text-sm">
              <span v-if="answer.commentOrRecommendation !== null">
                {{ answer.commentOrRecommendation }}
              </span>
              <span v-else> Sin comentario </span>
            </td>
          </tr>
          <!-- Gestión Empresarial -->

          <!-- Gestión Proveedores -->
          <tr>
            <td class="px-4 py-2 text-gray-900 font-bold">
              Gestion Proveedores
            </td>
          </tr>

          <tr
            v-for="(answer, index) in dataOfOneMonitory.data.gestionProveedores"
            :key="index"
          >
            <td class="px-4 py-2 font-medium text-gray-900">
              {{ answer.question }}
            </td>
            <td class="px-4 py-2 font-medium text-gray-900 text-center">
              <span
                :class="getAnswerClass(answer.value)"
                class="whitespace-nowrap rounded-full px-2.5 py-0.5 text-sm"
              >
                {{ answer.value }}
              </span>
            </td>

            <td class="px-4 py-2 font-medium text-gray-500 text-left text-sm">
              <span v-if="answer.commentOrRecommendation !== null">
                {{ answer.commentOrRecommendation }}
              </span>
              <span v-else> Sin comentario </span>
            </td>
          </tr>
          <!-- Gestión Proveedores -->
        </tbody>
      </table>

      <div class="flex justify-center items-center">
        <h2 class="text-2xl font-bold mb-4 px-5 m-5">Evidencia de monitoreo</h2>
      </div>
      <div id="previewFile" class="w-full border-green-300">
        <template
          v-if="
            dataOfOneMonitory.data.evidenceOfMonitory.refFile.endsWith('.pdf')
          "
        >
          <a
            :href="dataOfOneMonitory.data.evidenceOfMonitory.downloadURL"
            target="_blank"
          >
            <i class="far fa-file-pdf"></i> PDF
          </a>
        </template>
        <template v-else>
          <a
            :href="dataOfOneMonitory.data.evidenceOfMonitory.downloadURL"
            target="_blank"
          >
            <div class="flex justify-center items-center">
              <img
                :src="dataOfOneMonitory.data.evidenceOfMonitory.downloadURL"
                alt="Preview"
                width="300"
                height="300"
                class=""
              />
            </div>
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMonitoryFormStore } from "@/stores/monitoryForm.js";
const monitoryFormStore = useMonitoryFormStore();

const dataOfOneMonitory = computed(() => {
  return monitoryFormStore.dataOfOneMonitory;
});

const dateOfMonitory = computed(() => {
  const date = monitoryFormStore.dataOfOneMonitory.timestamp.toDate();
  let dateFormateada = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  const formattedDate =
    dateFormateada.charAt(0).toUpperCase() + dateFormateada.slice(1);
  const monthUpperCase = formattedDate.replace(
    /(\b[a-z](?!\s))/g,
    function (x) {
      return x.toUpperCase();
    }
  );

  return monthUpperCase;
});

console.log("OneMonitoryBeneficiary.vue is working!");

function getAnswerClass(answer) {
  if (answer === 1) {
    return "bg-yellow-100 text-yellow-800";
  } else if (answer === 0) {
    return "bg-red-100 text-red-800";
  } else {
    return " bg-green-100 text-green-800";
  }
}
</script>
