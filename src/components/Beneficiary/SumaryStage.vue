<template>
  <div>
    <h1>
      AQUí IRÁ EL RESUMEN DEL ULTIMO ESTADO QUE HAYA REGISTRADO EL CONSULTOR
    </h1>
    <pre>
      {{ lastProcess }}
    </pre>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import { getFirestore, collection, getDoc, doc } from "firebase/firestore";

import appFirebase from "@/firebaseInit";

const db = getFirestore(appFirebase);

const programStagesRef = collection(db, "programStages");

const idUser = router.currentRoute.value.params.id;

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";

const beneficiariesStore = useBeneficiariesStore();

const beneficiary = computed(() => {
  return beneficiariesStore.getBeneficiary(idUser);
});

const lastProcess = computed(() => {
  return beneficiary.value.progress[beneficiary.value.progress.length - 1];
});

// Ahora necesito una función que con el lastProcess haga consulta a la base de firebase y me traiga los datos de ese proceso

onMounted(async () => {
  const docRef = await getDoc(doc(db, "programStages", lastProcess.value.id));
  if (docRef.exists()) {
    console.log("Document data:", docRef.data());
  } else {
    console.log("No such document!");
  }
});
</script>
