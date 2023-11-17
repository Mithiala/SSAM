<template>
  <q-page padding>
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Control de Donaciones
      </h5>
      </div>
    <DonationsTable />
  </q-page>
</template>

<script setup>
import DonationsTable from "src/components/Farmacia/DonationsTable.vue"
</script>
