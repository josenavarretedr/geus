import { ref } from 'vue';
import { defineStore } from 'pinia';

import router from '@/router'

// Inicianlizacion de Firebase
import appFirebase from '@/firebaseInit';
import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";
const beneficiariesStore = useBeneficiariesStore();


const db = getFirestore(appFirebase);

export const useMonitoryFormStore = defineStore('monitoryForm', () => {

  const dataOfOneMonitory = ref(null);

  const personaFamilia = ref(null);
  const gestionEmpresarial = ref(null);
  const gestionProveedores = ref(null);
  const evidenceOfMonitory = ref(null);

  function setPersonaFamilia(data) {
    personaFamilia.value = data;
    console.log('Se guardo en el store', personaFamilia.value);
  }

  function setGestionEmpresarial(data) {
    gestionEmpresarial.value = data;
    console.log('Se guardo en el store', gestionEmpresarial.value);
  }

  function setGestionProveedores(idBeneficiary, data) {
    gestionProveedores.value = data;
    console.log('Se guardo en el store', gestionProveedores.value);
  }

  function setEvidenceOFMonitory(data) {
    evidenceOfMonitory.value = data;
    console.log('Se guardo en el store', evidenceOfMonitory.value);
  }

  function saveNewMonitory(idBeneficiary) {
    addNewMonitoryFirestore(idBeneficiary)
    clearAllStates()
  }

  async function addNewMonitoryFirestore(idBeneficiary, dataOfNewMonitory) {
    try {

      const idBeneficiaryRef = doc(db, "beneficiaries", idBeneficiary);


      const dataOfNewMonitory = {
        timestamp: new Date(),
        data: {
          personaFamilia: personaFamilia.value,
          gestionEmpresarial: gestionEmpresarial.value,
          gestionProveedores: gestionProveedores.value,
          evidenceOfMonitory: evidenceOfMonitory.value
        }
      };

      // Atomically add a new region to the "regions" array field.
      await updateDoc(idBeneficiaryRef, {
        monitory: arrayUnion(dataOfNewMonitory)
      });

      console.log('Se completo la carga en Firestore');
      router.push({ name: "SumaryBeneficiary" });



    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  function clearAllStates() {
    personaFamilia.value = null;
    gestionEmpresarial.value = null;
    gestionProveedores.value = null;
  }

  function setOneMonitoryData(data) {
    dataOfOneMonitory.value = '';
    dataOfOneMonitory.value = data;
    console.log('Se guardo en el store', dataOfOneMonitory.value);
  }

  return {
    personaFamilia,
    gestionEmpresarial,
    gestionProveedores,
    evidenceOfMonitory,

    dataOfOneMonitory,

    setPersonaFamilia,
    setGestionEmpresarial,
    setGestionProveedores,

    setEvidenceOFMonitory,

    saveNewMonitory,


    setOneMonitoryData,
  }

}


);

