<template>
  <q-select
    class="col-3"
    dense
    options-dense
    outlined
    use-input
    input-debounce
    v-model="tempDatos.denf_paciente"
    label="Nombre del paciente"
    :options="EnfermeriaOptions"
    @filter="filterEncuesta"
    @popup-show="getNomPacientes"
    option-value="value"
    option-label="label"
  />
</template>

<script>
import { usePacientesStore } from "src/stores/Pacientes-Store";

const { listPacientes } = usePacientesStore();
const { pacientes } = storeToRefs(usePacientesStore());

const EnfermeriaOptions = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomPacientes = async () => {
  console.log("hi");
  await listPacientes();
  pacientesArray.value = pacientes.value;
  EnfermeriaOptions.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterEncuesta(val, update) {
  if (val === "") {
    update(() => {
      EnfermeriaOptions.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    EnfermeriaOptions.value = pacientesArray.value
      .filter((item) => item.nombre.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
  });
}
</script>
