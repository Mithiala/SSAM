<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Escala Salud Mental
      </h5>
    </div>
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="salud"
      :columns="columns"
      row-key="id"
      :visible-columns="visibleColumns"
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

          <q-select
          bg-color="blue-3"
          label="Defectología"
          v-model="visibleColumns"
          transition-show="scale"
          transition-hide="scale"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="field"
          options-cover
          style="min-width: 150px"
        />

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
            @click="destroyDef(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogSM" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form class="">
            <div class="row justify-around q-gutter-md">

              <q-space class="col-1" />

              <!-- TODO:  "salud_paciente" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempSalud.sm_paciente"
                label="Nombre del paciente"
                :options="SaludOption"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Orientación Temporal" -->
              <q-input
                class="col-2"
                outlined
                dense
                type="number"
                label="Orientación Temporal"
                lazy-rules
                v-model="tempSalud.orientemporal"
                :rules="[
                  (val) =>
                    (val > 0 && val < 6) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />

              <!-- TODO:  "Orientación Espacial" -->
              <q-input
                class="col-2"
                outlined
                dense
                type="number"
                label="Orientación Espacial"
                lazy-rules
                v-model="tempSalud.orientespacial"
                :rules="[
                  (val) =>
                    (val > 0 && val < 6) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />

              <!-- TODO:  "Fijación" -->
              <q-input
                class="col-2"
                outlined
                dense
                type="number"
                label="Fijación"
                lazy-rules
                v-model="tempSalud.fijacion"
                :rules="[
                  (val) =>
                    (val > 0 && val < 5) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />

              <q-space class="col-1" />

              <!-- TODO:  "Fijación" -->
              <q-input
                class="col-2"
                outlined
                dense
                type="number"
                label="Atención y Cálculo"
                lazy-rules
                v-model="tempSalud.atcalculo"
                :rules="[
                  (val) =>
                    (val > 0 && val < 6) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />

              <!-- TODO:  "Memoria" -->
              <q-input
                class="col-2"
                outlined
                dense
                type="number"
                label="Memoria"
                lazy-rules
                v-model="tempSalud.memoria"
                :rules="[
                  (val) =>
                    (val > 0 && val < 6) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />

              <!-- TODO:  "Lenguaje" -->
              <q-input
                class="col-2"
                outlined
                dense
                type="number"
                label="Lenguaje"
                lazy-rules
                v-model="tempSalud.lenguaje"
                :rules="[
                  (val) =>
                    (val > 0 && val < 5) || 'Por favor ingrese la evaluación correcta',
                ]"
                mask="#"
              />

              <!-- TODO:  "Normal" -->
              <q-input
                class="col-2"
                outlined
                dense
                type="number"
                label="Normal"
                lazy-rules
                v-model="tempSalud.normal"
                :rules="[
                  (val) =>
                    (val > 0 && val < 6) || 'Por favor ingrese la evaluación correcta',
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
                v-if="EditSM"
                @click="updateSaludm(tempSalud.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddSM"
                @click="createSaludm(tempSalud)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                color="purple-9"
                label="Salir"
                @click="showDialogSM = false"
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
import { useSaludStore } from "src/stores/Salud-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listSaludm();
  await listPacientes();
  // }
});

const {
  resetTempSaludm,
  listSaludm,
  listPacientes,
  createSaludm,
  updateSaludm,
  destroySaludm,
} = useSaludStore();

const { salud, AddSM, EditSM, showDialogSM, loading, tempSalud, tempPaciente } =
  storeToRefs(useSaludStore());

  const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre y Apellidos",
    field: "nombre",
    sortable: true,
  },

  {
    name: 'orientemporal',
    align: 'center',
    label: 'Orientación Temporal',
    field: 'orientemporal',
  },
  {
    name: 'orientespacial',
    align: 'center',
    label: 'Orientación Espacial',
    field: 'orientespacial',
  },
  {
    name: 'fijacion',
    align: 'center',
    label: 'Fijacion',
    field: 'fijacion'
  },
  {
    name: 'atcalculo',
    align: 'center',
    label: 'Atención y Cálculo',
    field: 'atcalculo'
  },
  {
    name: 'memoria',
    align: 'center',
    label: 'Memoria',
    field: 'memoria'
  },
  {
    name: 'lenguaje',
    align: 'center',
    label: 'Lenguaje',
    field: 'lenguaje'
  },
  {
    name: 'normal',
    align: 'center',
    label: 'Normalo',
    field: 'normal'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddSM.value = false;
  EditSM.value = true;
  tempSalud.value = { ...row };
  showDialogSM.value = true;
};
const openAddDialog = () => {
  AddSM.value = true;
  EditSM.value = false;
  resetTempSaludm();
  showDialogSM.value = true;
};

const SaludOption = [
  {
    label: "Andrés Cueva Heredia",
    value: "1",
  },
  {
    label: "Francisaca Navia Cuadrado",
    value: "2",
  },
];

const visibleColumns = ref([
  'nombre',
  'edad',
  'sexo',
  'orientemporal',
  'orientespacial',
  'fijacion',
  'atcalculo',
  'memoria',
  'lenguaje',
  'normal',
  'actions',
])

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(salud.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Salud");
  writeFileXLSX(wb, "SaludMental.xlsx");
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
