<template>
  <div>
    <h1>Información del negocio desde Sumary Business</h1>

    <div v-if="business">
      <h2>Nombre del negocio: {{ business.name }}</h2>
      <p>Descripción: {{ business.description }}</p>
      <p>Ubicación: {{ business.location }}</p>
      <p>Telefono: {{ business.phone }}</p>

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="redirectToEditBusiness"
      >
        Editar
      </button>
    </div>
    <div v-else>
      <p>No hay información del negocio</p>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="redirectToCreateBusiness"
      >
        Añadir información del negocio
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import appFirebase from "@/firebaseInit";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const db = getFirestore(appFirebase);

import { useRouter } from "vue-router";
const router = useRouter();

const idUser = router.currentRoute.value.params.idBeneficiary;

// Get data from firestore

const beneficiaryData = ref(null);
const business = ref(null);

const getDataFirestore = async (id) => {
  try {
    const docRef = doc(db, "beneficiaries", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.log("Document data:", docSnapshot.data());
      beneficiaryData.value = docSnapshot.data();
      if (beneficiaryData.value.business) {
        business.value = docSnapshot.data().business;
      }
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

await getDataFirestore(idUser);

function redirectToEditBusiness() {
  router.push({ name: "EditBusinessBeneficiaryRoute" });
}

function redirectToCreateBusiness() {
  router.push({ name: "CreateBusinessBeneficiaryRoute" });
}
</script>
