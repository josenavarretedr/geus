import { ref } from 'vue';
import { defineStore } from 'pinia';

import router from '@/router';

import appFirebase from '@/firebaseInit';

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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
    beneficiaries.value = []

    const querySnapshot = await getDocs(collection(db, "beneficiaries"));
    querySnapshot.forEach((doc) => {
      beneficiaries.value.push({ id: doc.id, ...doc.data() });
    });
  }

  function getBeneficiary(id) {
    return beneficiaries.value.find(beneficiary => beneficiary.id === id);
  }

  return {
    beneficiaries,
    beneficiary,
    name,
    surname,
    dni,
    email,
    getBeneficiaries,
    getBeneficiary
  }

}

);

