<template>
  <div>
    <input type="file" @change="uploadFile" />
    {{ namePath }}
  </div>
</template>

<script setup>
import { useUpdatedFile } from "@/stores/updatedFile";

import router from "@/router";

import appFirebase from "@/firebaseInit";

import {
  getStorage,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

import { ref as refStorage } from "firebase/storage"; // Importamos el ref de Firebase con un alias

const storeUpdatedFile = useUpdatedFile();

const db = getFirestore(appFirebase);

const storage = getStorage(appFirebase); // Usamos el alias para evitar conflictos

const storageRef = refStorage(storage, "some-child");

defineProps({
  namePath: {
    type: String,
    required: true,
  },
});

async function uploadFile(event) {
  try {
    // 'file' comes from the Blob or File API
    const file = event.target.files[0];

    //

    // const fileRef = refStorage(storage, `${namePath}/${file.name}`);
    const fileRef = refStorage(storage, `images/${file.name}`);
    // const fileUpdateStored = await uploadBytes(fileRef, file);

    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case "paused":
        //     console.log("Upload is paused");
        //     break;
        //   case "running":
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      async () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const refFile = await uploadTask.snapshot.metadata.fullPath;

        storeUpdatedFile.updateFileStorage(refFile, downloadURL);

        console.log("File available at", downloadURL);
        console.log("File ref in Store at", refFile);
      }
    );
    // const url = await getDownloadURL(fileUpdateStored.ref);

    // console.log(url);
  } catch (error) {
    console.log(error);
  }
}
</script>
