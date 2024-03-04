<template>
  <!--
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
-->
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
        <tr>
          <th
            class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
          >
            Pregunta
          </th>
          <!-- BEGIN: Add dynamic TH elements -->
          <th
            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
            v-for="(monitory, index) in monitories"
            :key="index"
          >
            Monitoreo {{ index + 1 }}
          </th>
          <!-- END: Add dynamic TH elements -->

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
        <!-- BEGIN: Add dynamic TD elements  -->
        <template>
          <tr
            v-for="(answers, index) in monitories[0].data.personaFamilia"
            :key="index"
          >
            <td class="px-4 py-2 font-medium text-gray-900">
              {{ answers.question }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-center text-gray-700">
              {{ monitories[0].data.personaFamilia[indexTwo].value }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps({
  monitories: {
    type: Array,
    required: true,
    default: [],
  },
});
</script>
