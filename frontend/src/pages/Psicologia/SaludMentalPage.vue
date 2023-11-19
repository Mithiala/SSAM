<template>
  <q-page padding>
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Control de Escalas
      </h5>
      </div>
    <TableSalud />
    <TableEnars />
  </q-page>
</template>

<script setup>
import TableSalud from "src/components/Psicologia/TableSalud.vue"
import TableEnars from "src/components/Psicologia/TableEnars.vue"
</script>
