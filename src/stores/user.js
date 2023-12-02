import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useBeneficiariesStore } from '@/stores/beneficiaries.js';

const beneficiariesStore = useBeneficiariesStore();

import router from '@/router';

import appFirebase from '@/firebaseInit';

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);


export const useUserStore = defineStore('user', () => {
  const email = ref('');
  const password = ref('');


  async function createUser() {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
      console.log('User created: ', user);

      // Redirigir al usuario a la página de login
      router.push('/login');
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  }

  async function signIn() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;
      console.log('User signed in: ', user);
      await beneficiariesStore.getBeneficiaries();

      router.push('/dashboard');
      console.log('Beneficiaries: ', beneficiariesStore.beneficiaries);
    } catch (error) {
      console.error('Error signing in: ', error);
    }
  }

  async function signOutUser() {
    try {
      await signOut(auth);
      console.log('User signed out');
      router.push('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }

  return { email, password, signIn, createUser, signOutUser };
});
