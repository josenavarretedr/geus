import { ref } from 'vue'
import { defineStore } from 'pinia'

import router from '@/router'

import appFirebase from '@/firebaseInit'

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);


export const useUserStore = defineStore('user', () => {
  const email = ref('')
  const password = ref('')

  async function createUser() {

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        email: email.value,
        password: password.value
      });
      console.log("Document written with ID: ", docRef.id);
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function signIn() {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user
      console.log('User signed in: ', user)
      // Al confirmar el login tiene que redirigi a /dashboard
      router.push('/dashboard')


    } catch (error) {
      console.error('Error signing in: ', error)
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

  return { email, password, signIn, createUser, signOutUser }
})