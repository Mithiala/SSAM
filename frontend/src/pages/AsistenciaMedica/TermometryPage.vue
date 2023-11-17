<template>
  <q-page padding>
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Control de la temperatura de los pacientes
      </h5>
      </div>
    <TableTermometry />
  </q-page>
</template>

<script setup>
import TableTermometry from "src/components/AsistenciaMedica/TableTermometry.vue"
</script>
