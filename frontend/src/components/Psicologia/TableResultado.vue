<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Resultado por Escalas
      </h5>
    </div>
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="resultado"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="[10, 20, 30]"
      separator="cell"
    >
      <template v-slot:top="props">
        <div class="row col-12">
          <q-input
            class="col-3"
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
          <q-space class="col-3" />
          <q-btn
            flat
            unelevated
            fab-mini
            class="q-ml-sm"
            color="white"
            icon-right="archive"
            label="Exportar"
            no-caps
            @click="exportFile"
          >
            <q-tooltip
              anchor="top middle"
              self="center middle"
              class="bg-info text-black shadow-4"
              :offset="[10, 10]"
            >
              Exportar Tabla a Excel
            </q-tooltip>
          </q-btn>

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

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            color="warning"
            icon="delete"
            @click="destroyResult(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { PDFDocument, StandardFonts } from "pdf-lib";
import { utils, writeFileXLSX } from "xlsx";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useResultadoStore } from "src/stores/Resultado-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listResult();
  await listPacientes();
  // }
});

const {
  resetTempResult,
  listResult,
  listPacientes,
  createResult,
  updateResult,
  destroyResult,
} = useResultadoStore();

const { resultado, AddDG, EditDG, showDialogDG, loading, tempResultado, tempPaciente } =
  storeToRefs(useResultadoStore());

  const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre y Apellidos",
    field: "nombre",
    sortable: true,
  },
  {
    name: "edad",
    label: "Edad",
    field: "edad",
    align: "center",
    sortable: true,
    sort: (a, b) => a - b,
  },
  {
    name: "sexo",
    label: "Sexo",
    field: "sexo",
    align: "center",
  },

  {
    name: 'depresion',
    align: 'center',
    label: 'Depresión',
    field: 'depresion',
  },
  {
    name: 'intentosuicida',
    align: 'center',
    label: 'Intento Suicida',
    field: 'intentosuicida',
  },
  {
    name: 'demencia',
    align: 'center',
    label: 'Demencia',
    field: 'demencia'
  },
  {
    name: "normales",
    label: "Normales",
    field: "normales",
    align: "center",
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempEstadistica.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempEstad();
  showDialogDG.value = true;
};

const date = ref("")

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(resultado.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Resultado");
  writeFileXLSX(wb, "Resultado.xlsx");
}
</script>

<style lang="sass">
.table
  /* height or max-height is important */
  height: 410px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #2eb8a1

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
