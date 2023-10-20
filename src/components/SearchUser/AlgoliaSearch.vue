<template>
  <div>
    <h3>Hola desde un buscador de algolia</h3>
    <!-- Hacer una barra de busqueda estilizada con tailwind -->

    <form class="relative rounded-md" {{ formProps }}>
      <input
        type="text"
        v-model="search"
        placeholder="Buscar..."
        class="border border-gray-200 rounded-sm px-4 py-2 w-full pr-10"
        {{
        inputProps
        }}
      />
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <svg
          class="h-5 w-5 text-gray-400"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M22 22l-6-6"></path>
          <path d="M16 10a6 6 0 1 0-12 0 6 6 0 0 0 12 0z"></path>
        </svg>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { createAutoComplete } from "@algolia/autocomplete-core";

const [autocompleteState, setAutocompleteState] = ref({
  collections: [],
  isOpen: false,
});

const automplete = createAutoComplete({
  onStateChange: ({ state }) => {
    setAutocompleteState(state);
  },
  getSources: () => [
    {
      sourceId: "users",
      getItems({ query }) {
        if (!!query) {
          return [
            {
              image: "https://picsum.photos/200/300",
              name: "Juan",
              description: "Lorem ipsum dolor sit amet, consectetur",
            },
            {
              image: "https://picsum.photos/200/300",
              name: "Ana",
              description: "Lorem ipsum dolor sit amet, consectetur",
            },
            {
              image: "https://picsum.photos/200/300",
              name: "Carlos",
              description: "Lorem ipsum dolor sit amet, consectetur",
            },
            {
              image: "https://picsum.photos/200/300",
              name: "Sofia",
              description: "Lorem ipsum dolor sit amet, consectetur",
            },
            {
              image: "https://picsum.photos/200/300",
              name: "Diego",
              description: "Lorem ipsum dolor sit amet, consectetur",
            },
            {
              image: "https://picsum.photos/200/300",
              name: "Laura",
              description: "Lorem ipsum dolor sit amet, consectetur",
            },
          ];
        }
      },
    },
  ],
});
const formRef = ref(null);
const inputRef = ref(null);

const formProps = automplete.getFormProps({
  inputElement: inputRef,
});

const inputProps = automplete.getInputProps({
  inputElement: inputRef,
});

const search = ref("");
</script>
