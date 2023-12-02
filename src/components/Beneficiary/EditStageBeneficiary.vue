<template>
  <div>
    <h3>Editando Stage del Beneficiario</h3>
    <div v-if="stage">
      <div>
        Hola {{ beneficiary.name }}, se encuentra en el proceso:
        {{ stage.name }}
      </div>

      <div v-for="document in stage.documents">
        <FileInput
          :namePath="document.codeDocument"
          nameUI="Autorización de imagen"
        ></FileInput>
      </div>
    </div>
  </div>
</template>

<script setup>
import FileInput from "@/components/Inputs/FileInput.vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import appFirebase from "@/firebaseInit";
const db = getFirestore(appFirebase);
const programStagesRef = collection(db, "programStages");

const idUser = router.currentRoute.value.params.id;

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";

const beneficiariesStore = useBeneficiariesStore();

const beneficiary = computed(() => {
  return beneficiariesStore.getBeneficiary(idUser);
});

const stage = computed(() => {
  if (beneficiary.value.stages.length > 0) {
    return beneficiary.value.stages[beneficiary.value.stages.length - 1];
  } else {
    return null;
  }
});

const stageToEdit = ref(null);

const q = query(programStagesRef, where("name", "==", "seleccion"));

onMounted(async () => {
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    stageToEdit.value = doc.data();
  });
});
</script>
