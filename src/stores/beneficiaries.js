import { ref } from 'vue';
import { defineStore } from 'pinia';

import { v4 as uuidv4 } from "uuid";
import router from '@/router';

import appFirebase from '@/firebaseInit';

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, setDoc, getDocs, doc } from "firebase/firestore";

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

  async function createBeneficiary({ name, surname, phone, age, birthdate, timestamp }) {
    try {
      const idBeneficiary = uuidv4();

      await setDoc(doc(db, "beneficiaries", idBeneficiary), {
        name,
        surname,
        phone,
        age,
        id: idBeneficiary,
        progress: [
          {
            id: "d22b93df-22a3-494c-9262-7239e5eddedc",
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

  return {
    beneficiaries,
    beneficiary,
    name,
    surname,
    dni,
    email,
    getBeneficiaries,
    getBeneficiary, createBeneficiary
  }

}

);

