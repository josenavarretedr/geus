<template>
  <div>
    <BtnLogOut />
    <br />
    <router-link to="/create">Registra Beneficiario</router-link> |
    <!-- <router-link to="/details">Datails</router-link> -->
    <h1>Hola desde el Dashboard</h1>
    <div>
      <input
        type="text"
        name="searchingUser"
        id="inputShearing"
        placeholder="Buscar usuario"
      />
      <button>Buscar</button>
    </div>
    <div>
      <h3>Usuarios</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nombre</td>
            <td>Correo</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import BtnLogOut from "@/components/User/BtnLogOut.vue";
</script>
