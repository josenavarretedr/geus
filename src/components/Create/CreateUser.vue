<template>
  <div>
    <router-link
      to="/dashboard"
      class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150"
    >
      <svg
        class="w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M10.707 3.293a1 1 0 0 1 0 1.414L6.414 9H16a1 1 0 0 1 0 2H6.414l4.293 4.293a1 1 0 1 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      Regresar
    </router-link>
    <h3>Hola desde el Create Beneficiary</h3>
    <div class="form">
      <div class="form-group">
        <label for="name" class="mr-2">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="name"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="surname" class="mr-2">Apellido:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          v-model="surname"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="phone" class="mr-2">Teléfono:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          v-model="phone"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="age" class="mr-2">Edad:</label>
        <input
          type="text"
          id="age"
          name="age"
          v-model="age"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="birthdate" class="mr-2">Fecha de nacimiento:</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          v-model="birthdate"
          class="border rounded py-1 px-2"
        />
      </div>

      <!-- <div class="form-group w-full">
        <FileInput
          namePath="docIDs"
          nameUI="Documento de identidad"
          @fileSelected="capturandoDocIDFile"
        />
      </div>

      <div class="form-group group w-full">
        <FileInput
          namePath="consentimiento"
          nameUI="Consentimiento de Uso de Imagen"
          @fileSelected="capturandoConsentimiento"
        />
      </div> -->

      <button
        @click="createBeneficiaryUI()"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Crear
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";

const beneficiariesStore = useBeneficiariesStore();

const name = ref("");
const surname = ref("");
const phone = ref("");
const age = ref("");
const birthdate = ref("");

// const docIDFile = ref({
//   ref: "",
//   url: "",
// });

// function capturandoDocIDFile(file) {
//   docIDFile.value.ref = file.refFile;
//   docIDFile.value.url = file.downloadURL;
// }

// const consentimientoFile = ref({
//   ref: "",
//   url: "",
// });

// function capturandoConsentimiento(file) {
//   consentimientoFile.value.ref = file.refFile;
//   consentimientoFile.value.url = file.downloadURL;
// }

let timestamp = ref(new Date().toISOString());

function createBeneficiaryUI() {
  beneficiariesStore.createBeneficiary({
    name: name.value,
    surname: surname.value,
    phone: phone.value,
    age: age.value,
    birthdate: birthdate.value,
    timestamp: timestamp.value,
  });
  console.log("Creando beneficiario");
}
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

label {
  margin-right: 10px;
}
</style>
