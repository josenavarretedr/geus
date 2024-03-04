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

  const personaFamilia = ref(null);
  const gestionEmpresarial = ref(null);
  const gestionProveedores = ref(null);

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


    addNewMonitoryFirestore(idBeneficiary)
    // addMonitoryStore(idBeneficiary, dataOfNewMonitory)
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
          gestionProveedores: gestionProveedores.value
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

  function addMonitoryStore(idBeneficiary, dataOfNewMonitory) {
    const indexOfBeneficiaryInStore = beneficiariesStore.getBeneficiaryIndexById(idBeneficiary);
    beneficiariesStore.updateMonitoryBeneficiaryInStore(indexOfBeneficiaryInStore, dataOfNewMonitory)


    // beneficiaries[i].monitory = [];
    // break;
  }

  function clearAllStates() {
    personaFamilia.value = null;
    gestionEmpresarial.value = null;
    gestionProveedores.value = null;
  }

  return {
    personaFamilia,
    gestionEmpresarial,
    gestionProveedores,
    setPersonaFamilia,
    setGestionEmpresarial,
    setGestionProveedores,
  }

}


);

