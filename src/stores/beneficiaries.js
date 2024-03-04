import { ref } from 'vue';
import { defineStore } from 'pinia';

import { v4 as uuidv4 } from "uuid";
import router from '@/router';

import appFirebase from '@/firebaseInit';

import { getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, getDocs, getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);


export const useBeneficiariesStore = defineStore('beneficiaries', () => {
  const beneficiaries = ref([]);
  const beneficiary = ref({});
  const name = ref('');
  const surname = ref('');
  const dni = ref('');
  const email = ref('');



  async function getBeneficiaries() {
    // TODO se tendría que gestionar para que se obtengan solo los beneficiarios que esean de la región que consulta el usuario logeado
    beneficiaries.value = []

    const querySnapshot = await getDocs(collection(db, "beneficiaries"));
    querySnapshot.forEach((doc) => {
      beneficiaries.value.push({ id: doc.id, ...doc.data() });
    });
  }

  function getBeneficiary(id) {
    return beneficiaries.value.find(beneficiary => beneficiary.id === id);
  }



  function getBeneficiaryIndexById(id) {
    return beneficiaries.value.findIndex(beneficiary => beneficiary.id === id);
  }

  async function createBeneficiary({
    name,
    surname,
    phone,
    age,
    birthdate,
    timestamp,
    sex,
    isPregnant,
    isLactating,
    gender,
    nationality,
    docID,
    numDocID,
  }) {
    try {
      const idBeneficiary = uuidv4();

      await setDoc(doc(db, "beneficiaries", idBeneficiary), {
        name,
        surname,
        phone,
        age,
        id: idBeneficiary,
        birthdate,
        sex,
        isPregnant,
        isLactating,
        gender,
        nationality,
        docID,
        numDocID,
        progress: [
          {
            id: "94421b49-fda1-4006-a03d-d70e2466fdba",
            completed: true,
            timestamp: timestamp,
          },
        ],
      });

      // TODO - Mostrar mensaje de éxito al crear el beneficiario
      getBeneficiaries()

      router.push({ name: "Dashboard" });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function updateProgressOfBeneficiary(idBeneficiary, progress) {
    const beneficiary = getBeneficiary(idBeneficiary);
    try {
      if (beneficiary) {
        beneficiary.progress.push(progress);

        let beneficiaryRef = doc(db, "beneficiaries", idBeneficiary);

        await updateDoc(beneficiaryRef, {
          progress: beneficiary.progress
        });
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  function updateMonitoryBeneficiaryInStore(indexOfBeneficiaryInStore, data) {

    if (beneficiaries.value[indexOfBeneficiaryInStore].hasOwnProperty('monitory')) {
      beneficiaries.value[indexOfBeneficiaryInStore]['monitory'].push(data);
    } else {
      beneficiaries.value[indexOfBeneficiaryInStore]['monitory'] = [data];
    }
    console.log('Se actualizó el beneficiario', beneficiaries.value[indexOfBeneficiaryInStore]);
  }

  async function getBeneficiaryDataFromFirestore(id) {
    try {
      const docRef = doc(db, "beneficiaries", id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        console.log("Document data:", docSnapshot.data());
        return docSnapshot.data();
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.error("Error getting document: ", e);
    }
  }

  return {
    beneficiaries,
    beneficiary,
    name,
    surname,
    dni,
    email,
    getBeneficiaries,
    getBeneficiary,
    getBeneficiaryIndexById,
    createBeneficiary,
    updateProgressOfBeneficiary,
    updateMonitoryBeneficiaryInStore,
    getBeneficiaryDataFromFirestore
  }

}

);

