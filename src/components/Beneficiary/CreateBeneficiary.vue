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
    <h1>Hola desde el CreateBeneficiary</h1>
    <pre
      >{{ profile }}
    </pre>

    <div class="form">
      <div class="form-group">
        <label for="name" class="mr-2">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="profile.name"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="surname" class="mr-2">Apellido:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          v-model="profile.surname"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="gender" class="mr-2">Género:</label>
        <select
          id="gender"
          name="gender"
          v-model="profile.gender"
          class="border rounded py-1 px-2"
        >
          <option
            v-for="option in genderOptions"
            :value="option.label"
            :key="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="age" class="mr-2">Edad:</label>
        <input
          type="text"
          id="age"
          name="age"
          v-model="profile.age"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="nacionality" class="mr-2">Nacionalidad:</label>
        <select
          id="nacionality"
          name="nacionality"
          v-model="profile.nacionality"
          class="border rounded py-1 px-2"
        >
          <option
            v-for="option in nacionalityOptions"
            :value="option.label"
            :key="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="vulnerability" class="mr-2">Vulnerabilidad:</label>
        <select
          id="vulnerability"
          name="vulnerability"
          v-model="profile.vulnerability"
          class="border rounded py-1 px-2"
        >
          <option
            v-for="option in vulnerabilityOptions"
            :value="option.label"
            :key="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="docType" class="mr-2">Tipo de documento:</label>
        <select
          id="docType"
          name="docType"
          v-model="profile.docType"
          class="border rounded py-1 px-2"
        >
          <option
            v-for="option in docTypeOptions"
            :value="option.label"
            :key="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="docNumber" class="mr-2">Número de documento:</label>
        <input
          type="text"
          id="docNumber"
          name="docNumber"
          v-model="profile.docNumber"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="migrationState" class="mr-2">Estado migratorio:</label>
        <select
          id="migrationState"
          name="migrationState"
          v-model="profile.migrationState"
          class="border rounded py-1 px-2"
        >
          <option
            v-for="option in migrationStatusOptions"
            :value="option.label"
            :key="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="region" class="mr-2">Región:</label>
        <select
          id="region"
          name="region"
          v-model="profile.region"
          class="border rounded py-1 px-2"
        >
          <option
            v-for="option in regionOptions"
            :value="option.label"
            :key="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="address" class="mr-2">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          v-model="profile.address"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="district" class="mr-2">Distrito:</label>
        <input
          type="text"
          id="district"
          name="district"
          v-model="profile.district"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="email" class="mr-2">Correo:</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="profile.email"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group">
        <label for="phone" class="mr-2">Teléfono:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          v-model="profile.phone"
          class="border rounded py-1 px-2"
        />
      </div>

      <button
        @click="createBeneficiary"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Crear usuario
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import appFirebase from "@/firebaseInit";
import {
  getFirestore,
  collection,
  setDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore(appFirebase);
import { v4 as uuidv4 } from "uuid";

import { useRouter } from "vue-router";

const profile = ref({
  nacionality: "",
  region: "",
  name: "",
  surname: "",
  docType: "",
  docNumber: "",
  migrationState: "",
  gender: "",
  age: "",
  address: "",
  district: "",
  vulnerability: "",
  email: "",
  phone: "",
});

const regionOptions = [
  { value: "Piura", label: "Piura" },
  { value: "Lambayeque", label: "Lambayeque" },
  { value: "La Libertad", label: "La Libertad" },
];

const nacionalityOptions = [
  { value: "Peruana", label: "Peruana" },
  { value: "Venezolana", label: "Venezolana" },
];

const migrationStatusOptions = [
  { value: "R", label: "R=Refugiados" },
  { value: "DI", label: "DI=Desplazados Internos" },
  { value: "CA", label: "CA=Comunidad Anfitriona" },
  { value: "RR", label: "RR=Refugiados Retornados" },
  { value: "SA", label: "SA=Solicitantes de Asilo" },
  { value: "A", label: "A=Apatriados" },
  { value: "O", label: "O=Otros (Migrantes venezolanos)" },
];

const vulnerabilityOptions = [
  { value: "D", label: "D=Persona con discapacidad" },
  { value: "AM", label: "AM=Adultos Mayores" },
  { value: "MNA", label: "MNA=Menor no acompañado" },
  {
    value: "JH0",
    label: "JH0=Jefa de Hogar (De hogar encabezado por mujeres)",
  },
  { value: "O", label: "O=Otros" },
];

const genderOptions = [
  { value: "M", label: "M=Masculino" },
  { value: "F", label: "F=Femenino" },
  { value: "LGTBIQ+", label: "LGTBIQ=Otro (LGTBIQ+)" },
];

const docTypeOptions = [
  { value: "DNI", label: "DNI=DNI" },
  { value: "CE", label: "CE=Carné de Extranjería" },
  { value: "CPP", label: "CPP=CPP" },
  { value: "Pasaporte", label: "Pasaporte=Pasaporte" },
];

const userPrueba = {
  name: "Quero Demey",
  surname: "Jaxiber Clt",
  docType: "CPP",
  docNumber: "001804885",
  migrationState: "O",
  gender: "F",
  age: "25",
  vulnerability: "Joven",
  email: "",
  phone: "960329772",
  region: "Lambayeque",
  nacionality: "Venezolana",
};

const router = useRouter();

async function createBeneficiary() {
  try {
    const idBeneficiary = uuidv4();

    await setDoc(doc(db, "beneficiaries", idBeneficiary), {
      id: idBeneficiary,
      profile: profile.value,
      progress: [
        {
          id: "94421b49-fda1-4006-a03d-d70e2466fdba",
          completed: true,
          // timestamp: timestamp,
        },
      ],
    });

    router.push({ name: "Dashboard" });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
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
