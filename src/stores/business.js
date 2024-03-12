import { ref } from 'vue';
import { defineStore } from 'pinia';

import router from '@/router';

import appFirebase from '@/firebaseInit';

import { getFirestore, collection, setDoc, getDocs, getDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

const db = getFirestore(appFirebase);

export const useBusinessStore = defineStore('business', () => {
  const beneficiaries = ref([]);

  async function createDataBusiness({
    name,
  }) {
    try {

      await setDoc(doc(db, "beneficiaries",), {
        profile: {
          name,
          surname,
          phone,
          age,
          id: idBeneficiary,
          birthdate,
          sex,
        },
      });

      router.push({ name: "Dashboard" });

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return {
  }

}

);

