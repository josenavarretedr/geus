<template>
  <div
    class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
  >
    <div class="md:flex">
      <div class="md:flex-shrink-0">
        <!-- src="https://picsum.photos/200/300" -->
        <img
          class="h-48 w-full object-cover md:w-48"
          src="../../assets/perro.jpg"
          :alt="beneficiaryData.profile.name"
        />
      </div>
      <div class="p-8">
        <div
          class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"
        >
          {{ beneficiaryData.profile.name }}
          {{ beneficiaryData.profile.surname }}
        </div>
        <div class="mt-4">
          <p class="text-gray-500 text-sm">
            {{ beneficiaryData.profile.birthdate }} ({{
              beneficiaryData.profile.age
            }}
            años)
          </p>
          <p class="text-gray-500 text-sm">
            {{ beneficiaryData.profile.phone }}
          </p>
        </div>
      </div>
      <div class="mt-4">
        <router-link
          :to="{ name: 'EditBeneficiary' }"
          class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray disabled:opacity-25 transition ease-in-out duration-150"
        >
          Editar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import appFirebase from "@/firebaseInit";
import { getFirestore, doc, getDoc } from "firebase/firestore";
const db = getFirestore(appFirebase);

const router = useRouter();

const idUser = router.currentRoute.value.params.idBeneficiary;

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";

const beneficiaryData = ref(null);

const beneficiariesStore = useBeneficiariesStore();

const getBeneficiaryDataFromFirestore = async (id) => {
  try {
    const docRef = doc(db, "beneficiaries", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      console.log("Document data:", docSnapshot.data());
      beneficiaryData.value = docSnapshot.data();
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

await getBeneficiaryDataFromFirestore(idUser);
</script>
