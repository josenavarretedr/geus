
import { defineStore } from 'pinia';

import router from '@/router';

import appFirebase from '@/firebaseInit';

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore(appFirebase);

import { v4 as uuidv4 } from "uuid";



export const useStageStore = defineStore('stages', () => {


  /**
   * Creates a stage with the given parameters.
   * @param {Object} options - The options for creating the stage.
   * @param {string} options.nameUI - The name of the stage.
   * @param {string} options.descriptionUI - The description of the stage.
   * @param {string} options.typeStage - The type of the stage.
   * @param {string} options.evidence - The evidence for the stage.
   * @param {string} options.stageProgram - The program for the stage.
   * @param {string} options.nameUIRequirement - The name of the requirement.
   * @param {string} options.idRequirement - The ID of the requirement.
   * @returns {Promise<void>} - A promise that resolves when the stage is created.
   */
  async function createStage({ nameUI, descriptionUI, typeStage, evidence, stageProgram, nameUIRequirement, idRequirement }) {
    try {
      let idStage = uuidv4();
      const stage = {
        nameUI: nameUI,
        descriptionUI: descriptionUI,
        typeStage: typeStage,
        evidence: evidence,
        stageProgram: stageProgram,
        requirement: {
          nameUIRequirement: nameUIRequirement,
          idRequirement: idRequirement,
        },
        id: idStage,
      };
      await setDoc(doc(db, "programStages", idStage), stage);
      // Redirigir a "/dashboard"
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating stage: ', error);
    }
  };


  async function getStageInfo(stageID) {
    try {
      const docRef = await getDoc(doc(db, "programStages", stageID));
      const data = docRef.data();
      return data;
    } catch (error) {
      console.error('Error getting stages data: ', error);
    }
  }

  return { getStageInfo, createStage };
});
