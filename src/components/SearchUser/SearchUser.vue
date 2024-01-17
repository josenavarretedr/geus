<script setup lang="jsx">
import { autocomplete } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";

import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";

const beneficiariesStore = useBeneficiariesStore();

const router = useRouter();

// TODO Hacer un loading para que no se vea el tiempo de carga de Algolia

onMounted(() => {
  autocomplete({
    container: "#autocomplete",
    placeholder: "Escribe para empezar a buscar ... ",
    getSources({ query }) {
      return [
        {
          sourceId: "users",
          getItems() {
            // Aquí solo está filtrando por el nombre, TODO modificar la función para que también busque por apellido

            let dataFiltered = beneficiariesStore.beneficiaries.filter(
              ({ name, surname, phone }) =>
                name.toLowerCase().includes(query.toLowerCase()) ||
                surname.toLowerCase().includes(query.toLowerCase()) ||
                phone.toLowerCase().includes(query.toLowerCase())
            );

            return dataFiltered.slice(0, 5);
          },
          templates: {
            header() {
              return "Sugerencias";
            },
            item({ item, html }) {
              return html` <div
                class="py-2 px-4 rounded-sm border border-gray-200"
                id="${item.id}"
                class="resultsDiv"
              >
                ${item.name} - ${item.surname}

                <div class="text-sm text-gray-500">${item.id}</div>
              </div>`;
            },
            noResults() {
              return "No results.";
            },
          },
        },
      ];
    },
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("resultsDiv")) {
    router.push({ name: "SumaryBeneficiary", params: { id: e.target.id } });
  }
});
</script>

<template>
  <div>
    <div id="autocomplete" class="my-5"></div>
  </div>
</template>
