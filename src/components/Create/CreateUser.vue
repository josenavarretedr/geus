<template>
  <div>
    <router-link to="/dashboard">Regresar</router-link>
    <h3>Hola desde el Create Beneficiary</h3>
    <div class="form">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" name="name" v-model="name" />
      </div>

      <div class="form-group">
        <label for="surname">Apellido:</label>
        <input type="text" id="surname" name="surname" v-model="surname" />
      </div>

      <div class="form-group">
        <label for="phone">Teléfono:</label>
        <input type="text" id="phone" name="phone" v-model="phone" />
      </div>

      <div class="form-group">
        <label for="age">Edad:</label>
        <input type="text" id="age" name="age" v-model="age" />
      </div>

      <div class="form-group">
        <label for="birthdate">Fecha de nacimiento:</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          v-model="birthdate"
        />
      </div>

      <button @click="createBeneficiary()">Crear</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import appFirebase from "@/firebaseInit";

import { getFirestore, doc, setDoc } from "firebase/firestore";
const db = getFirestore(appFirebase);

import { v4 as uuidv4 } from "uuid";

const name = ref("");
const surname = ref("");
const phone = ref("");
const age = ref("");
const birthdate = ref("");

const idBeneficiary = computed(() => uuidv4());

async function createBeneficiary() {
  try {
    await setDoc(doc(db, "beneficiaries", idBeneficiary.value), {
      name: name.value,
      surname: surname.value,
      phone: phone.value,
      age: age.value,
      birthdate: birthdate.value,
      id: idBeneficiary.value,
    });

    console.log("Document written with ID: ", idBeneficiary.value);

    name.value = "";
    surname.value = "";
    phone.value = "";
    age.value = "";
    birthdate.value = "";

    // TODO - Mostrar mensaje de éxito al crear el beneficiario
    alert("Beneficiario creado correctamente");
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
