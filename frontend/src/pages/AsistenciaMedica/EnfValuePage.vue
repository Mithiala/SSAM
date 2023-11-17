<template>
  <q-page padding>
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Control de evaluaciones
      </h5>
      </div>
      <TableValue />
      <TableLawton/>
    </q-page>
</template>

<script setup>
import TableValue from "src/components/AsistenciaMedica/TableValue.vue";
import TableLawton from "src/components/AsistenciaMedica/TableLawton.vue";
</script>
