<template>
  <div>
    <h1>Desde el componente de Storage</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineStore } from "pinia";

import router from "@/router";

import appFirebase from "@/firebaseInit";

import { getStorage, uploadBytes } from "firebase/storage";

import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { ref as refStorage } from "firebase/storage"; // Importamos el ref de Firebase con un alias

const db = getFirestore(appFirebase);
const storage = getStorage(appFirebase); // Usamos el alias para evitar conflictos
const storageRef = refStorage(storage, "some-child");

function uploadFile() {
  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
}
</script>
