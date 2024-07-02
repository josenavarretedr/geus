<template>
  <div>
    <h1>Hola desde Formulario de EDITAR negocio del beneficiario</h1>

    <div class="form">
      <div class="form-group flex items-center">
        <label for="name" class="mr-2 w-56 text-right"
          >Nombre del negocio:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="business.name"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group flex items-center">
        <label for="address" class="mr-2 w-56 text-right">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          v-model="business.address"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group flex items-center">
        <label for="phone" class="mr-2 w-56 text-right">Teléfono:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          v-model="business.phone"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group flex items-center">
        <label for="description" class="mr-2 w-56 text-right"
          >Descripción:</label
        >
        <textarea
          id="description"
          name="description"
          v-model="business.description"
          class="border rounded py-1 px-2"
        ></textarea>
      </div>

      <div class="form-group flex items-center">
        <label for="category" class="mr-2 w-56 text-right">Categoría:</label>
        <select
          id="category"
          name="category"
          v-model="business.category"
          class="border rounded py-1 px-2"
        >
          <option value="Alimentos y bebidas">Alimentos y Bebidas</option>
          <option value="Servicios de belleza">Servicios de Belleza</option>
          <option value="Panadería y repostería">Panadería y Repostería</option>
          <option value="Textil">Textil</option>
          <option value="comercio">Comercio</option>
          <option value="Otros servicios">Otros Servicios</option>
        </select>
      </div>

      <div class="form-group flex items-center">
        <label for="category" class="mr-2 w-56 text-right"
          >Antiguedad del negocio</label
        >
        <select
          id="category"
          name="category"
          v-model="business.ageOfBusiness"
          class="border rounded py-1 px-2"
        >
          <option value="Menos de 6 meses">Menos de 6 meses</option>
          <option value="De 6 meses a 1 año">6 meses a 1 año</option>
          <option value="De 1 a 2 años">1 a 2 años</option>
          <option value="Más">3 años</option>
        </select>
      </div>

      <div class="form-group flex items-center">
        <label for="category" class="mr-2 w-56 text-right"
          >Formalidad del negocio</label
        >
        <select
          id="category"
          name="category"
          v-model="business.formality"
          class="border rounded py-1 px-2"
        >
          <option value="Informal">Informal</option>
          <option value="Persona natural con negocio">
            Persona natural con negocio
          </option>
          <option value="Persona jurídica">Persona jurídica</option>
        </select>
      </div>

      <!-- <div class="form-group flex items-center">
        <label for="logo" class="mr-2 w-56 text-right">Logo:</label>
        <input
          type="text"
          id="logo"
          name="logo"
          v-model="business.logo"
          class="border rounded py-1 px-2"
        />
      </div> -->

      <div class="form-group flex items-center">
        <label for="facebook" class="mr-2 w-56 text-right">Facebook:</label>
        <input
          type="text"
          id="facebook"
          name="facebook"
          v-model="business.social.facebook"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group flex items-center">
        <label for="instagram" class="mr-2 w-56 text-right">Instagram:</label>
        <input
          type="text"
          id="instagram"
          name="instagram"
          v-model="business.social.instagram"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group flex items-center">
        <label for="tiktok" class="mr-2 w-56 text-right">TikTok:</label>
        <input
          type="text"
          id="tiktok"
          name="tiktok"
          v-model="business.social.tiktok"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group flex items-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 mr-2 text-white font-bold py-2 px-4 rounded"
          @click="getLocation()"
        >
          Conseguir ubicación
        </button>
      </div>

      <div class="form-group flex items-center">
        <label for="lng" class="mr-2 w-56 text-right">Latitud:</label>
        <input
          type="text"
          id="lng"
          name="lng"
          v-model="business.location.lat"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group flex items-center">
        <label for="lng" class="mr-2 w-56 text-right">Longitud:</label>
        <input
          type="text"
          id="lng"
          name="lng"
          v-model="business.location.lng"
          class="border rounded py-1 px-2"
        />
      </div>

      <div class="form-group flex items-center">
        <label for="status" class="mr-2 w-56 text-right">Estado:</label>
        <select
          id="status"
          name="status"
          v-model="business.status"
          class="border rounded py-1 px-2"
        >
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      </div>

      <div class="form-group flex items-center">
        <!-- TODO Tengo que hacer que el componente NewFileInput, reciba un download ref si es que existe para que pueda mostrar la vista previa del documento -->
        <!-- <NewFileInput
          namePath="evidenciaBusiness"
          :idUser="idUser"
          @fileSelected="getDataFromChildrenInputFile"
        /> -->
      </div>

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="editBusiness"
      >
        Actualizar negocio
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import appFirebase from "@/firebaseInit";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
const db = getFirestore(appFirebase);

// import NewFileInput from "@/components/Inputs/NewFileInput.vue";

import { useRouter } from "vue-router";
const router = useRouter();

const idUser = router.currentRoute.value.params.idBeneficiary;

// Get data from firestore

const beneficiaryData = ref(null);
const business = ref(null);

const getDataFirestore = async (id) => {
  try {
    const docRef = doc(db, "beneficiaries", id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      beneficiaryData.value = docSnapshot.data();
      if (beneficiaryData.value.business) {
        business.value = docSnapshot.data().business;
      }
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
  }
};

await getDataFirestore(idUser);

function getLocation() {
  if (navigator.geolocation) {
    business.value.location.lat = "Buscando...";
    business.value.location.lng = "Buscando...";

    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  business.value.location.lat = "";
  business.value.location.lng = "";
  business.value.location.lat = position.coords.latitude;
  business.value.location.lng = position.coords.longitude;
}

function getDataFromChildrenInputFile(file) {
  business.value.evidence.downloadURL = file.downloadURL;
  business.value.evidence.refFile = file.refFile;
}

async function editBusiness() {
  try {
    const idBeneficiaryRef = doc(db, "beneficiaries", idUser);

    // Atomically add a new region to the "regions" array field.
    await updateDoc(idBeneficiaryRef, {
      business: business.value,
    });

    console.log("Se completo la carga de business en Firestore");
    router.push({ name: "BusinessBeneficiary" });
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}
</script>
