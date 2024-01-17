<template>
  <div class="container">
    <div class="inputFile">
      <label :for="nameUI">Sube: {{ nameUI }}</label> <br />
      <input type="file" @change="uploadFile" :id="namePath" />
    </div>
    <div class="feedback">
      <div
        class="feedbackText text-xs text-green-500"
        v-if="successUpdate"
      >
        <p>
          ✅ Subido correctamente <br />
        <p class="text-gray-400 text-xs">
          Si deseas cambiar el archivo, seleeciona uno nuevo y se reemplazará.
          <br />
          Si deseas eliminar el archivo, haz click aquí:
          <span @click="deleteFile(e)" class="cursor-pointer">❌</span>.
        </p>
        </p>
        <div id="previewFile" class="w-full border-green-300">
          <template v-if="refFile.endsWith('.pdf')">
            <a :href="downloadURL" target="_blank">
              <i class="far fa-file-pdf"></i> PDF
            </a>
          </template>
          <template v-else>
            <a :href="downloadURL" target="_blank">
              <div class="flex justify-center items-center">
                <img :src="downloadURL" alt="Preview" width="300" height="300" class="" />
              </div>
            </a>
          </template>
        </div>
      </div>
      <div class="feedbackText text-red-500 text-xs" v-if="errorUpdate">
        ⁉ Error al subir el archivo
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";

import appFirebase from "@/firebaseInit";

import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { ref as refStorage } from "firebase/storage";

const storage = getStorage(appFirebase); // Usamos el alias para evitar conflictos

const props = defineProps({
  namePath: {
    type: String,
    required: true,
  },
  nameUI: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["fileSelected"]);

const successUpdate = ref(false);
const errorUpdate = ref(false);

const downloadURL = ref("");
const refFile = ref("");

async function uploadFile(event) {
  // TODO - Agregar un spinner de carga
  // TODO - Agregar un botón de cancelar

  // TODO Cancelar la carga si es que hay un cambio de archivo. Para evitar consumo de recursos

  try {
    const file = event.target.files[0];

    if (downloadURL.value && refFile.value) {
      await deleteFile();
    }

    const fileRef = refStorage(storage, `${props.namePath}/${file.name}`);

    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress === 100) {
          successUpdate.value = true;
        } else {
        }
      },
      (error) => {
        errorUpdate.value = true;
        console.log(error.message);
        // Handle unsuccessful uploads
      },
      async () => {
        successUpdate.value = true;
        downloadURL.value = await getDownloadURL(uploadTask.snapshot.ref);
        refFile.value = await uploadTask.snapshot.metadata.fullPath;
        emit("fileSelected", { refFile, downloadURL });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function deleteFile() {
  try {
    const desertRef = refStorage(storage, refFile.value);
    await deleteObject(desertRef);
    downloadURL.value = "";
    refFile.value = "";
    successUpdate.value = false;
    emit("fileSelected", { refFile, downloadURL });

    const inputFile = document.getElementById(props.namePath);
    inputFile.value = "";
  } catch (error) {
    console.log(error);
  }
}
</script>

<style scoped>
.w3-grey,
.w3-hover-grey:hover,
.w3-gray,
.w3-hover-gray:hover {
  color: #1e9813 !important;
  background-color: #1e9813 !important;
}

.container {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  transition: width 0.5s ease-in-out;
}

.progressBar-wrapper {
  width: 100%;
  height: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
  overflow: hidden;
}

.progressBar-item {
  height: 100%;
  width: 80%;
  background-color: #1e9813;
  transition: width 0.5s ease-in-out;
}
</style>
