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
        <p class="mt-2">{{ criterion.item }}</p>

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

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="saveAnswers"
      >
        Guardar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const areNull = ref(false);

const componentMonitoryForm = ref([
  {
    component: "Persona y Familia",
    description: "Se evalúa la situación de la persona y su familia",
    evaluationCriterion: [
      {
        name: "Suficiencia de Ingresos para Acceso a Servicios de Salud",
        item: "Evalúe la suficiencia de los ingresos generados por el emprendimiento para que el emprendedor y su núcleo familiar puedan acceder a servicios de salud, tales como citas médicas particulares, compra de medicamentos, afiliación a salud, entre otros.",
        scaleToolTip: [
          {
            value: 0,
            description:
              "Los ingresos no son suficientes para cubrir servicios de salud esenciales.",
          },
          {
            value: 1,
            description:
              "Los ingresos son parcialmente suficientes, pero aún limitan el acceso a algunos servicios de salud.",
          },
          {
            value: 2,
            description:
              "Los ingresos son suficientes para acceder a la mayoría o a todos los servicios de salud necesarios.",
          },
        ],
      },
      {
        name: "Suficiencia de Ingresos para Alimentación Familiar",
        item: "Evalúe si los ingresos generados por el emprendimiento permiten al emprendedor comprar alimentos suficientes para él y su núcleo familiar.",
        scaleToolTip: [
          {
            value: 0,
            description:
              "Los ingresos no son suficientes para cubrir la compra de alimentos básicos.",
          },
          {
            value: 1,
            description:
              "Los ingresos son parcialmente suficientes, pero limitan la capacidad de comprar alimentos de manera adecuada.",
          },
          {
            value: 2,
            description:
              "Los ingresos son suficientes para adquirir todos los alimentos necesarios para el emprendedor y su familia.",
          },
        ],
      },
      {
        name: "Suficiencia de Ingresos para Acceso a Vivienda Adecuada",
        item: "Evalúe si los ingresos generados por el emprendimiento permiten al emprendedor acceder a una vivienda con un espacio adecuado que satisfaga sus necesidades y las de su núcleo familiar.",
        scaleToolTip: [
          {
            value: 0,
            description:
              "Los ingresos no son suficientes para acceder a una vivienda adecuada.",
          },
          {
            value: 1,
            description:
              "Los ingresos son parcialmente suficientes, pero limitan la capacidad de obtener una vivienda que satisfaga todas las necesidades.",
          },
          {
            value: 2,
            description:
              "Los ingresos son suficientes para acceder a una vivienda con un espacio adecuado que satisface plenamente las necesidades del emprendedor y su familia.",
          },
        ],
      },
      {
        name: "Contribución de Ingresos al Pago de Alquiler y Servicios Básicos",
        item: "Evalúe si los ingresos generados por el emprendimiento contribuyen al pago del alquiler y servicios básicos para el hogar, incluyendo agua, luz y gas",
        scaleToolTip: [
          {
            value: 0,
            description:
              "Los ingresos no contribuyen al pago del alquiler ni a los servicios básicos del hogar.",
          },
          {
            value: 1,
            description:
              "Los ingresos contribuyen parcialmente, pero de manera limitada, al pago del alquiler y servicios básicos.",
          },
          {
            value: 2,
            description:
              "Los ingresos contribuyen significativamente al pago del alquiler y cubren los servicios básicos del hogar de manera adecuada.",
          },
        ],
      },
      {
        name: "Suficiencia de Ingresos para Acceso a Educación",
        item: "Evalúe si los ingresos generados por el emprendimiento son suficientes para que usted y su núcleo familiar puedan acceder a servicios de educación, incluyendo cursos especializados, diplomados o talleres. En el caso de tener hijos, considere la matrícula y la adquisición de útiles escolares.",
        scaleToolTip: [
          {
            value: 0,
            description:
              "Los ingresos no son suficientes para cubrir servicios educativos ni gastos asociados a la educación de los hijos.",
          },
          {
            value: 1,
            description:
              "Los ingresos son parcialmente suficientes, pero limitan el acceso a algunos servicios educativos y gastos escolares.",
          },
          {
            value: 2,
            description:
              "Los ingresos son suficientes para acceder a la mayoría o todos los servicios educativos necesarios, incluyendo la educación de los hijos y la adquisición de útiles escolares.",
          },
        ],
      },
      {
        name: "Suficiencia de Ingresos para Electrodomésticos y Mantenimiento",
        item: "Evalúe si los ingresos generados por el emprendimiento permiten al emprendedor acceder a la adquisición de electrodomésticos para el hogar o al mantenimiento de los mismos, tales como nevera, lavadora, computadora, televisor, entre otros.",
        scaleToolTip: [
          {
            value: 0,
            description:
              "Los ingresos no son suficientes para la adquisición ni el mantenimiento de electrodomésticos.",
          },
          {
            value: 1,
            description:
              "Los ingresos son parcialmente suficientes, pero limitan la capacidad de adquirir o mantener algunos electrodomésticos.",
          },
          {
            value: 2,
            description:
              "Los ingresos son suficientes para acceder a la mayoría o a todos los electrodomésticos necesarios y cubrir su mantenimiento.",
          },
        ],
      },
      {
        name: "Definición de Objetivos Personales y Familiares",
        item: "Evalúe si el emprendedor ha definido objetivos a corto y mediano plazo, tanto personales como familiares. Incluya metas personales a seis meses y en los próximos dos años.",
        scaleToolTip: [
          {
            value: 0,
            description:
              "No se han definido objetivos personales ni familiares a corto ni mediano plazo.",
          },
          {
            value: 1,
            description:
              "Se han definido parcialmente objetivos personales o familiares a corto o mediano plazo.",
          },
          {
            value: 2,
            description:
              "Se han definido claramente objetivos personales y familiares a corto y mediano plazo.",
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

function saveAnswers() {
  const mergedArray = componentMonitoryForm.value[0].evaluationCriterion.map(
    (criterion, index) => {
      return {
        value: selectedValues.value[index],
        commentOrRecommendation: comments.value[index],
      };
    }
  );

  // Use the mergedArray as needed
  console.log(mergedArray);

  if (selectedValues.value.includes(null)) {
    areNull.value = true;
  } else {
    areNull.value = false;
  }
}
</script>

<style>
/* Add Tailwind CSS classes here */
</style>
