import { ref } from 'vue';
import { defineStore } from 'pinia';

import appFirebase from '@/firebaseInit';

import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";



// import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { getFirestore, collection, setDoc, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";

const db = getFirestore(appFirebase);
// const auth = getAuth(appFirebase);


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
    console.log('Se guardo en el store', gestionProveedores.value);
    addNewMonitory(idBeneficiary)
  }

  function saludar(data) {
    console.log('Hola', data);
  }

  async function addNewMonitory(idBeneficiary,) {
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

    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  function saveToFirestore() {
    console.log('Guardando en firestore');

  }


  return {
    personaFamilia,
    gestionEmpresarial,
    gestionProveedores,
    setPersonaFamilia,
    setGestionEmpresarial,
    setGestionProveedores,
    // addNewMonitory,
    saludar
  }

}


);

