<script setup>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from "@/router"; // importamos el objeto router

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    router.push("/dashboard"); // redirigimos al usuario al dashboard
  }
});
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
