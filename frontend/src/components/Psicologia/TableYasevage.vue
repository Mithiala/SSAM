<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Escala Yasevage
      </h5>
    </div>
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="yasevage"
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
            class="q-ml-md"
            flat
            unelevated
            fab-mini
            color="white"
            icon="add"
            type="submit"
            label="Agregar"
            @click="openAddDialog()"
          />
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
            color="accent"
            icon="edit"
            @click="openEditDialog(props.row)"
          />
          <q-btn
            flat
            round
            dense
            color="warning"
            icon="delete"
            @click="destroyYase(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogYP" persistent full-medium >
      <q-card class="column medium">
        <q-card-section>
          <q-form class="">
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "yasevage_paciente" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempYasevage.y_paciente"
                label="Nombre del paciente"
                :options="YaseOption"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Normal" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="number"
                label="Normal"
                lazy-rules
                v-model="tempYasevage.normal"
                :rules="[
                  (val) =>
                    (val > 0 && val < 6) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />

              <!-- TODO:  "Depresión Moderada" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="number"
                label="Depresión Moderada"
                lazy-rules
                v-model="tempYasevage.depmoderada"
                :rules="[
                  (val) =>
                    (val > 5 && val < 11) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />

              <!-- TODO:  "Depresión Severa" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="number"
                label="Depresión Severa"
                lazy-rules
                v-model="tempYasevage.depsevera"
                :rules="[
                  (val) =>
                    (val > 10 && val < 16) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />
              
            </div>
            <div class="q-mt-lg row q-gutter-md justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditYP"
                @click="updateYase(tempYasevage.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddYP"
                @click="createYase(tempYasevage)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                color="purple-9"
                label="Salir"
                @click="showDialogYP = false"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { PDFDocument, StandardFonts } from "pdf-lib";
import { utils, writeFileXLSX } from "xlsx";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useYesavageStore } from "src/stores/Yesavage-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listYase();
  await listPacientes();
  // }
});

const {
  resetTempYase,
  listYase,
  listPacientes,
  createYase,
  updateYase,
  destroyYase,
} = useYesavageStore();

const { yesavage, AddYP, EditYP, showDialogYP, loading, tempYasevage, tempPaciente } =
  storeToRefs(useYesavageStore());

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
    name: 'depmoderada',
    align: 'center',
    label: 'Depresión Moderada',
    field: 'depmoderada',
  },
  {
    name: 'depsevera',
    align: 'center',
    label: 'Depresión Severa',
    field: 'depsevera',
  },
  {
    name: 'normal',
    align: 'center',
    label: 'Normal',
    field: 'normal'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddYP.value = false;
  EditYP.value = true;
  tempYasevage.value = { ...row };
  showDialogYP.value = true;
};
const openAddDialog = () => {
  AddYP.value = true;
  EditYP.value = false;
  resetTempYase();
  showDialogYP.value = true;
};

const YaseOption = [
  {
    label: "Andrés Cueva Heredia",
    value: "1",
  },
  {
    label: "Francisaca Navia Cuadrado",
    value: "2",
  },
];

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(yasevage.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Yasevage");
  writeFileXLSX(wb, "Yasevage.xlsx");
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
    background-color: #5bb2cf

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
