import { ref } from 'vue';

import { defineStore } from 'pinia';

import router from '@/router';

import appFirebase from '@/firebaseInit';

import { getFirestore, doc, getDocs, setDoc, collection, updateDoc, arrayUnion } from "firebase/firestore";

const db = getFirestore(appFirebase);

import { v4 as uuidv4 } from "uuid";



export const useStageStore = defineStore('stages', () => {

  const allProgramStages = ref([]);
  async function createStage({ nameUI, descriptionUI, typeStage, stageProgram, idRequirement }) {
    try {
      let idStage = uuidv4();
      const stage = {
        nameUI: nameUI,
        descriptionUI: descriptionUI,
        typeStage: typeStage,
        stageProgram: stageProgram,
        requirement: idRequirement,
        id: idStage,
      };
      await setDoc(doc(db, "programStages", idStage), stage);
      // Redirigir a "/dashboard"
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating stage: ', error);
    }
  };

  async function getStages() {
    try {
      const querySnapshot = await getDocs(collection(db, "programStages"));
      const stages = [];
      querySnapshot.forEach((doc) => {
        stages.push(doc.data());
      });
      allProgramStages.value = stages;
      console.log('All stages: ', allProgramStages.value);
    } catch (error) {
      console.error('Error getting all stages: ', error);
    }
  }

  function getOneStageById(id) {
    console.log(id)
    const stage = allProgramStages.value.find(stage => stage.id === id);
    return stage;
  }

  function getNextStage(id) {
    const nextStage = allProgramStages.value.find(stage => stage.requirement === id);
    return nextStage;
  }

  async function updateBeneficiariesInStage(idStage, idBeneficiary) {
    try {
      const stageRef = doc(db, "programStages", idStage);
      await updateDoc(stageRef, {
        beneficiaries: arrayUnion(idBeneficiary)
      });
    } catch (error) {
      console.error('Error updating beneficiaries in stage: ', error);
    }
  }

  return { createStage, getStages, getOneStageById, getNextStage, updateBeneficiariesInStage };
});
