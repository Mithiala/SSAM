<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Escala Enars
      </h5>
    </div>
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="enars"
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
            @click="destroyEnars(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogEE" persistent full-medium >
      <q-card class="column medium">
        <q-card-section>
          <q-form class="">
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "salud_paciente" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempEna.en_paciente"
                label="Nombre del paciente"
                :options="EnarsOption"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Nunca" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="number"
                label="Nunca"
                lazy-rules
                v-model="tempEna.nunca"
                :rules="[
                  (val) =>
                    (val > 0 && val < 6) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />

              <!-- TODO:  "Algunas Veces" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="number"
                label="Algunas Veces"
                lazy-rules
                v-model="tempEna.algveces"
                :rules="[
                  (val) =>
                    (val > 5 && val < 11) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />

              <!-- TODO:  "Frecuentemente" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="number"
                label="Frecuentemente"
                lazy-rules
                v-model="tempEna.frecuente"
                :rules="[
                  (val) =>
                    (val > 10 && val < 16) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />

              <!-- TODO:  "Fijación" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="number"
                label="Siempre"
                lazy-rules
                v-model="tempEna.siempre"
                :rules="[
                  (val) =>
                    (val > 15 && val < 21) || 'Por favor ingrese la evaluación correcta',
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
                v-if="EditEE"
                @click="updateYase(tempYasevage.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddEE"
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
  await listEnars();
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
    name: 'algveces',
    align: 'center',
    label: 'Algunas Veces',
    field: 'algveces',
  },
  {
    name: 'frecuente',
    align: 'center',
    label: 'Frecuentemente',
    field: 'frecuente',
  },
  {
    name: 'siempre',
    align: 'center',
    label: 'Siempre',
    field: 'siempre'
  },
  {
    name: 'atcalculo',
    align: 'center',
    label: 'Atención y Cálculo',
    field: 'atcalculo'
  },
  {
    name: 'nunca',
    align: 'center',
    label: 'Nunca',
    field: 'nunca'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddEE.value = false;
  EditEE.value = true;
  tempEna.value = { ...row };
  showDialogEE.value = true;
};
const openAddDialog = () => {
  AddEE.value = true;
  EditEE.value = false;
  resetTempEnars();
  showDialogEE.value = true;
};

const EnarsOption = [
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
  const ws = utils.json_to_sheet(enars.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Enars");
  writeFileXLSX(wb, "Enars.xlsx");
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
