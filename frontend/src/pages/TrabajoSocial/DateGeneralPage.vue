<template>
  <q-page padding>
    <div class="q-gutter-md row justify-center">
      <h5
        class="col-xs-11 col-sm-5 col-md-4 text-center text-weight-medium q-pt-sm q-mb-none ellipsis-2-lines"
      >
        Datos de los Pacientes
      </h5>
    </div>
    <TableListarPaciente />
  </q-page>
</template>

<script setup>
import TableListarPaciente from "src/components/TrabajoSocial/TableListarPaciente.vue";
</script>
