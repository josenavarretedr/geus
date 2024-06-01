<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold mb-8">Bienvenido a Geus 2</h1>
    <div class="flex space-x-4">
      <router-link
        to="/login"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Iniciar Sesiones
      </router-link>
      <router-link
        to="/register"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Registros nuevos
      </router-link>
    </div>
  </div>
</template>
