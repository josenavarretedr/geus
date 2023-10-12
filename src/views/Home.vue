<template>
  <div>
    <h1>Bienvenido a Geus 2</h1>
    <p class="text-3xl font-bold underline">Elige una opcion</p>
    <div class="card">
      <router-link to="/login">Iniciar Sesion</router-link>
      |
      <router-link to="/register" class="btn btn-primary"
        >Registrarse</router-link
      >
    </div>
  </div>
</template>
