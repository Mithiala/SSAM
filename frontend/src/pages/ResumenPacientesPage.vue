<template>
  <q-page padding>
    <div class="q-gutter-md row flex-center ">
      <h5 class="col-xs-11 col-sm-5 col-md-4 text-center text-weight-medium q-pt-sm q-mb-none ellipsis-2-lines ">
        Listado de pacientes
      </h5>
      </div>
    <TableResumenPacientes />
  </q-page>
</template>

<script setup>
import TableResumenPacientes from "src/components/TableResumenPacientes.vue";
</script>

