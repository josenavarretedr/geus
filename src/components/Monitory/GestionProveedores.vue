<template>
  <div class="p-4 my-4">
    <h1 class="text-2xl font-bold">{{ componentMonitoryForm[0].component }}</h1>
    <p class="mt-2">{{ componentMonitoryForm[0].description }}</p>
    <div class="mt-4">
      <div
        v-for="(criterion, index) in componentMonitoryForm[0]
          .evaluationCriterion"
        :key="index"
        class="mt-4"
      >
        <h2 class="text-lg font-semibold">
          <span
            class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
            v-if="selectedValues[index] === null"
          >
            Pendiente
          </span>
          {{ criterion.name }}
        </h2>
        <p class="mt-2 text-xs text-gray-600">{{ criterion.item }}</p>

        <label
          v-for="(tooltip, tooltipIndex) in criterion.scaleToolTip"
          :key="tooltipIndex"
          class="flex items-center mt-2"
        >
          <input
            type="radio"
            :value="tooltip.value"
            v-model="selectedValues[index]"
            class="mr-2"
          />
          <span>{{ tooltip.description }}</span>
        </label>

        <label class="block text-gray-700">
          Comentarios/Recomendaciones:
          <input
            type="text"
            v-model="comments[index]"
            class="mt-2 p-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
          />
        </label>
      </div>

      <div
        role="alert"
        class="rounded border-s-4 border-red-500 bg-red-50 p-4 my-4"
        v-if="areNull"
      >
        <div class="flex items-center gap-2 text-red-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clip-rule="evenodd"
            />
          </svg>

          <strong class="block font-medium">
            Te faltan preguntas por completar
          </strong>
        </div>

        <p class="mt-2 text-sm text-red-700">
          Recuerda que tienes que completar por lo menos con una respuesta cada
          pregunta.
        </p>
      </div>
      <NextSectionBtn @click="saveAnswers" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NextSectionBtn from "@/components/Monitory/NextSectionBtn.vue";

import { useMonitoryFormStore } from "@/stores/monitoryForm.js";
const monitoryFormStore = useMonitoryFormStore();
const areNull = ref(false);

import { useRouter } from "vue-router";

const router = useRouter();

const componentMonitoryForm = ref([
  {
    component: "Gestion PROVEEDORES",
    description: "Evalúa la gestión DE PROVEEDORES del emprendimiento",
    evaluationCriterion: [
      {
        name: "Estandarización de Procesos Empresariales",
        item: "Evalúe si el emprendimiento tiene pautas claras, manuales o procesos establecidos para la producción o prestación de servicios.",
        question:
          "¿Consigues los materiales y cosas que necesitas para tu emprendimiento de diferentes lugares, o siempre dependes de un solo proveedor?",
        scaleToolTip: [
          {
            value: 0,
            description:
              "Ausencia total de pautas, manuales o procesos estandarizados para la producción o prestación de servicios. No se observan procesos definidos.",
          },
          {
            value: 1,
            description:
              "Presencia parcial de pautas, manuales o procesos, pero no completamente estandarizados. Existen algunos elementos, pero la estandarización es limitada.",
          },
          {
            value: 2,
            description:
              "Presencia completa de pautas, manuales o procesos totalmente estandarizados para la producción o prestación de servicios. Los procesos están claramente definidos y siguen estándares específicos.",
          },
        ],
      },
    ],
  },
]);

const selectedValues = ref(
  new Array(componentMonitoryForm.value[0].evaluationCriterion.length).fill(
    null
  )
);

const comments = ref(
  new Array(componentMonitoryForm.value[0].evaluationCriterion.length).fill(
    null
  )
);

async function saveAnswers() {
  const mergedArray = componentMonitoryForm.value[0].evaluationCriterion.map(
    (criterion, index) => {
      return {
        value: selectedValues.value[index],
        commentOrRecommendation: comments.value[index],
        question: criterion.question,
      };
    }
  );

  if (selectedValues.value.includes(null)) {
    areNull.value = true;
  } else {
    areNull.value = false;
    await monitoryFormStore.setGestionProveedores(
      router.currentRoute.value.params.idBeneficiary,
      mergedArray
    );
  }
}
</script>

<style>
/* Add Tailwind CSS classes here */
</style>
