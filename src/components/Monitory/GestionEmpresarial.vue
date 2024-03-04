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

const componentMonitoryForm = ref([
  {
    component: "Gestion Empresarial",
    description: "Evalúa la gestión empresarial del emprendimiento",
    evaluationCriterion: [
      {
        name: "Claridad en la definición de objetivos",
        item: "El emprendedor tiene metas u objetivos claramente definidos a corto y largo plazo. Estos objetivos pueden estar relacionados con mejoras operativas, ventas o acciones en marcha, así como también con el futuro del emprendimiento, abarcando aspectos como ubicación y capacidad operativa.",
        question:
          "¿Tienes metas u objetivos claramente definidos para tu emprendimiento a corto y largo plazo?",
        scaleToolTip: [
          {
            value: 0,
            description:
              "Ausencia total de claridad en la definición de metas y objetivos a corto y largo plazo.",
          },
          {
            value: 1,
            description:
              "Presencia parcial de claridad, pero con variabilidad y posibles confusiones.",
          },
          {
            value: 2,
            description:
              "Presencia completa de claridad en la definición de metas y objetivos.",
          },
        ],
      },
      {
        name: "Proyección de Mejoras Empresariales",
        item: "Indique si el emprendedor tiene proyectado realizar alguna mejora relacionada al área de trabajo, imagen, producto, servicio, u otras áreas pertinentes a su emprendimiento",
        question:
          "¿Tienes proyectado realizar mejoras en tu emprendimiento, ya sea en el área de trabajo, imagen, producto, servicio u otras áreas relevantes?",
        scaleToolTip: [
          {
            value: 0,
            description:
              "Ausencia total de proyecciones para realizar mejoras en el área de trabajo, imagen, producto, servicio, u otras áreas pertinentes.",
          },
          {
            value: 1,
            description:
              "Presencia parcial de proyecciones; se observan indicios de consideración para mejoras, pero no está claramente definido.",
          },
          {
            value: 2,
            description:
              "Presencia completa de proyecciones; el emprendedor tiene planes definidos y específicos para realizar mejoras en diversas áreas relacionadas con su emprendimiento.",
          },
        ],
      },
      /**
      {
        name: "Estandarización de Procesos Empresariales",
        item: "Evalúe si el emprendimiento tiene pautas claras, manuales o procesos establecidos para la producción o prestación de servicios.",
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
      {
        name: "Claridad en Funciones y Responsabilidades",
        item: "Evalúe si en el emprendimiento hay una clara definición de funciones y responsabilidades para los trabajadores, colaboradores ocasionales y el emprendedor",
        scaleToolTip: [
          {
            value: 0,
            description:
              "No hay una clara definición de funciones y responsabilidades. Las tareas asignadas no están bien definidas.",
          },
          {
            value: 1,
            description:
              "Existe una definición parcial de funciones y responsabilidades, pero la claridad es limitada. Puede haber cierta ambigüedad en las tareas asignadas.",
          },
          {
            value: 2,
            description:
              "Hay una definición clara de funciones y responsabilidades para los trabajadores, colaboradores ocasionales y el emprendedor. Todas las tareas están claramente definidas y comprendidas por todos los involucrados.",
          },
        ],
      },
      {
        name: "Protocolo de Atención al Cliente",
        item: "Evalúe si en el emprendimiento existe un protocolo claro para atender al cliente, tanto en la presentación de servicios como en el proceso de compra de productos/servicios",
        scaleToolTip: [
          {
            value: 0,
            description:
              "Ausencia total de un protocolo establecido para atender al cliente. No hay pautas definidas para la presentación de servicios ni en el proceso de compra.",
          },
          {
            value: 1,
            description:
              "Presencia parcial de un protocolo, pero la claridad y consistencia son limitadas. Puede haber cierta falta de coherencia en la atención al cliente.",
          },
          {
            value: 2,
            description:
              "Presencia completa de un protocolo claro y establecido para atender al cliente en la presentación de servicios y durante el proceso de compra de productos/servicios. Las pautas son claras y se aplican de manera consistente.",
          },
        ],
      },
      {
        name: "Registro Financiero Actualizado",
        item: "Evalúe si el emprendimiento mantiene un registro actualizado de ingresos y egresos de forma diaria y mensual.",
        scaleToolTip: [
          {
            value: 0,
            description:
              "Ausencia total de un registro actualizado de ingresos y egresos, ya sea diaria o mensualmente. No se lleva un seguimiento financiero adecuado.",
          },
          {
            value: 1,
            description:
              "Presencia parcial de un registro, pero la actualización diaria y mensual es limitada o inconsistente. Puede haber omisiones o retrasos en el seguimiento financiero.",
          },
          {
            value: 2,
            description:
              "Presencia completa de un registro financiero actualizado de forma diaria y mensual. Se lleva un seguimiento detallado y consistente de los ingresos y egresos.",
          },
        ],
      },
      */
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

function saveAnswers() {
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
    monitoryFormStore.setGestionEmpresarial(mergedArray);
  }
}
</script>

<style>
/* Add Tailwind CSS classes here */
</style>
