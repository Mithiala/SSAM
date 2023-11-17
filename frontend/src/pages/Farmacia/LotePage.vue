<template>
  <q-page padding>
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Control de lotes
      </h5>
      </div>
    <LoteTable />
  </q-page>
</template>

<script setup>
import LoteTable from "src/components/Farmacia/LoteTable.vue"
</script>
