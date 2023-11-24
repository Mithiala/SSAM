<template>
  <q-page padding>
    <h6
      class="text-primary text-h5 text-bold text-center q-pa-none q-ma-none q-animate--scale"
    >
      Administración de Registros
    </h6>

    <TableUsuario />
  </q-page>
</template>

<script setup>
import TableUsuario from "src/components/Administrador/TableUsuario.vue";
import { onBeforeMount } from "vue";
import { useAuthStore } from "src/stores/Auth-Store";
const { verifyToken } = useAuthStore();

onBeforeMount(async () => {
  await verifyToken();
});
</script>