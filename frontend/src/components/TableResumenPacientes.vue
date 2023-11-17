<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      title="Datos generales de pacientes"
      :rows="pacientes"
      :columns="columns"
      row-key="id_pacientes"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="[10, 20, 30]"
      separator="cell"
    >
      <template v-slot:top="props">
        <div
          class="text-center col-md-6 col-sm col-xs-12 q-table__title text-white"
        ></div>
        <div class="bhg-blue-4 col-md-3 col-sm-3 col-xs-12">
          <q-input
            rounded
            standout="bg-teal-4 text-white"
            dark
            dense
            input-class="text-right"
            debounce="300"
            color="teal-3"
            v-model="filter"
          >
            <template v-slot:append>
              <q-icon v-if="filter === ''" name="search" />
              <q-icon
                v-else
                name="clear"
                class="cursor-pointer"
                @click="filter = ''"
              />
            </template>
          </q-input>
        </div>
        <div class="bhg-yellow-4 col-md-3 col-sm col-xs-12 justify-end row">
          <q-btn
            class="q-ml-xs"
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          />
        </div>
      </template>
      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-avatar size="xl">
            <template v-if="props.row.image">
              <q-img :src="baseurl + props.row.image.url" />
            </template>
          </q-avatar>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listPacientes();
  // }
});

const { listPacientes } = usePacientesStore();

const { pacientes, loading, tempPaciente } = storeToRefs(usePacientesStore());

const baseurl = "http://127.0.0.1:3333";

const columns = [
  {
    name: "image",
    align: "center",
    label: "Foto",
    field: "image",
  },
  {
    name: "nombre",
    align: "center",
    label: "Nombre:",
    field: "nombre",
    sortable: true,
  },
  {
    name: "edad",
    label: "Edad:",
    field: "edad",
    align: "center",
    sortable: true,
    sort: (a, b) => a - b,
  },
  { name: "sexo", label: "Sexo:", field: "sexo", align: "center", },
  { name: "ci", align: "center", label: "Carnet de identidad", field: "ci" },
  {
    name: "num_hc",
    align: "center",
    label: "Historia clínica",
    field: "num_hc",
  },
  {
    name: "num_hs",
    align: "center",
    label: "Historia social",
    field: "num_hs",
  },
  { name: "num_cmf", align: "center", label: "CMF", field: "num_cmf" },
  {
    name: "tiempo_estadia",
    label: "Tiempo de estadía",
    field: "tiempo_estadia",
    align: "center",
  },
];

const filter = ref("");

const imagenFile = ref(null);
const imagenURL = ref("");
function generarURL() {
  if (tempPaciente.value.image) {
    imagenURL.value = URL.createObjectURL(tempPaciente.value.image);
  } else {
    imagenURL.value = "";
  }
}
</script>

<style lang="sass">
.table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #38f2aecc
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
