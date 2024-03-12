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
        <label for="sex" class="mr-2">Sexo:</label>
        <select
          id="sex"
          name="sex"
          v-model="sexSelected"
          class="border rounded py-1 px-2"
        >
          <option v-for="option in sexOptions" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="gender" class="mr-2">Género:</label>
        <select
          id="gender"
          name="gender"
          v-model="genderSelected"
          class="border rounded py-1 px-2"
        >
          <option v-for="option in genderOptions" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="form-group" v-if="genderSelected === 'Otro'">
        <label for="otherGender" class="mr-2">Especificar otro género:</label>
        <input
          type="text"
          id="otherGender"
          name="otherGender"
          v-model="genderSelectedOther"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group" v-if="sexSelected === 'Femenino'">
        <label for="isPregnant" class="mr-2">¿Está embarazada?</label>
        <input
          type="checkbox"
          id="isPregnant"
          name="isPregnant"
          v-model="isPregnant"
          class="border rounded py-1 px-2"
        />
      </div>
      <div class="form-group" v-if="sexSelected === 'Femenino'">
        <label for="isLactating" class="mr-2">¿Está lantando?</label>
        <input
          type="checkbox"
          id="isLactating"
          name="isLactating"
          v-model="isLactating"
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

      <div class="form-group">
        <label for="nationality" class="mr-2">Nacionalidad:</label>
        <select
          id="nationality"
          name="nationality"
          v-model="nationalitySelected"
          class="border rounded py-1 px-2"
        >
          <option v-for="option in nationalityOptions" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="form-group" v-if="nationalitySelected === 'Otro'">
        <label for="otherNationality" class="mr-2"
          >Especificar otra nacionalidad:</label
        >
        <input
          type="text"
          id="otherNationality"
          name="otherNationality"
          v-model="nationalitySelectedOther"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="docID" class="mr-2">Documento de identidad:</label>
        <select
          id="docID"
          name="docID"
          v-model="docIDSelected"
          class="border rounded py-1 px-2"
        >
          <option v-for="option in docOptionsFilter" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="numDocID" class="mr-2">Num doc ID:</label>
        <input
          type="text"
          id="numDocID"
          name="numDocID"
          v-model="numDocID"
          class="border rounded py-1 px-2"
        />
      </div>

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
import { ref, computed } from "vue";

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";

const beneficiariesStore = useBeneficiariesStore();

const name = ref("");
const surname = ref("");
const phone = ref("");
const birthdate = ref("");

const age = computed(() => {
  const today = new Date();
  const birthdateValue = new Date(birthdate.value);
  let age = today.getFullYear() - birthdateValue.getFullYear();
  const monthDifference = today.getMonth() - birthdateValue.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthdateValue.getDate())
  ) {
    age--;
  }
  return Math.floor(age);
});

const sexOptions = ref(["Masculino", "Femenino", "Intersexual"]);

const sexSelected = ref(null);

const isPregnant = ref(false);
const isLactating = ref(false);

const genderOptions = ref(["Hombre", "Mujer", "Prefiero no decirlo", "Otro"]);

const genderSelected = ref(null);
const genderSelectedOther = ref(null);

const nationalityOptions = ref(["Venezolano", "Peruano", "Otro"]);
const nationalitySelected = ref(null);
const nationalitySelectedOther = ref(null);

const docIDOptions = ref([
  "DNI",
  "Cédula",
  "Pasaporte",
  "CPP",
  "Carne de Extranjería",
]);

const docOptionsFilter = computed(() => {
  if (
    nationalitySelected.value === "Venezolano" ||
    nationalitySelected.value === "Otro"
  ) {
    return docIDOptions.value.filter((option) => option !== "DNI");
  } else {
    return docIDOptions.value.filter((option) => option === "DNI");
  }
});

const docIDSelected = ref(null);
const numDocID = ref(null);

let timestamp = ref(new Date().toISOString());

function createBeneficiaryUI() {
  beneficiariesStore.createBeneficiary({
    name: name.value,
    surname: surname.value,
    phone: phone.value,
    age: age.value,
    birthdate: birthdate.value,
    timestamp: timestamp.value,
    sex: sexSelected.value,
    // isPregnant: isPregnant.value,
    // isLactating: isLactating.value,
    gender:
      genderSelected.value === "Otro"
        ? genderSelectedOther.value
        : genderSelected.value,
    nationality:
      nationalitySelected.value === "Otro"
        ? nationalitySelectedOther.value
        : nationalitySelected.value,
    docID: docIDSelected.value,
    numDocID: numDocID.value,
  });
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
