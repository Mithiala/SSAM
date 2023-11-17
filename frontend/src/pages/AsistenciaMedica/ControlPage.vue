<template>
  <q-page padding>
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Control de medicinas
      </h5>
      </div>
    <TableControl />
    <TableIntercurrencia/>
    <TableGastable/>
  </q-page>
</template>

<script setup>
import TableControl from "src/components/AsistenciaMedica/TableControl.vue"
import TableIntercurrencia from "src/components/AsistenciaMedica/TableIntercurrencia.vue"
import TableGastable from "src/components/AsistenciaMedica/TableGastable.vue"
</script>
