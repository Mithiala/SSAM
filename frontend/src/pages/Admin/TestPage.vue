<template>
  <q-page padding>
    <!-- content -->
    <q-btn
      color="primary"
      icon="check"
      label="listar pasientes"
      @click="listPaciente"
    />

    {{ pacientes }}
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePacientesStore } from "src/stores/Pacientes-Store";


const {
  resetTempPaciente,
  listPaciente,
} = usePacientesStore();

const {
  pacientes
} = storeToRefs(usePacientesStore());
</script>
