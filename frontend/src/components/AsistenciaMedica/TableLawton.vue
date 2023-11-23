<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row justify-center">
      <h5 class="col-6 text-center text-weight-medium">
        Evaluación Lawton
      </h5>
    </div>
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="lawton"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      :visible-columns="visibleColumns"
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
            @click="openAddDialogLW()"
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
            @click="exportFileLW"
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
          bg-color="teal-3"
          label="Evaluación Lawton"
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
            @click="openEditDialogLW(props.row)"
          />
          <q-btn
            flat
            round
            dense
            color="warning"
            icon="delete"
            @click="destroyLaw(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

  <!-- TODO: Añadir - Editar -->
  <q-dialog v-model="showDialogLW" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "paciente_lawton" -->
              <q-select
                class="col-3"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempLw.law_paciente"
                label="Nombre del paciente"
                :options="IndOptions"
                @filter="filterInd"
                @popup-show="getNomInd"
                option-value="value"
                option-label="label"
                />

              <!-- TODO:  "Uso del teléfono" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempLw.usotelef"
                label="Uso del teléfono"
                :options="UsotOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Ir de compras" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempLw.compras"
                label="Ir de compras"
                :options="ComprasOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Preparar alimentos" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempLw.prepalim"
                label="Preparar alimentos"
                :options="PrepOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Manejo de la casa" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempLw.manejocasa"
                label="Manejo de la casa"
                :options="MancOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Lavar" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempLw.lavar"
                label="Lavar"
                :options="LavarOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Transporte" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempLw.transporte"
                label="Transporte"
                :options="TransOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Manejo financiero" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempLw.manejofin"
                label="Manejo financiero"
                :options="ManfOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Uso de medicamento" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempLw.usomed"
                label="Uso de medicamento"
                :options="UsomOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Fecha" -->
              <q-input
                class="col-2"
                dense
                outlined
                label="Fecha evaluación"
                v-model="tempLw.fecha_value"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de la evaluación',
                ]"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="tempLw.fecha_value"
                        color="green-5"
                        mask="YYYY-MM-DD"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Cerrar"
                            color="green"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditLW"
                @click="updateLaw(tempLw.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddLW"
                @click="createLaw(tempLw)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                color="purple-9"
                label="Salir"
                @click="showDialogLW = false"
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
import { useLawtonStore } from "src/stores/Lawton-Store";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listLaw();
  // }
});

const {
  resetTempLaw,
  listLaw,
  createLaw,
  updateLaw,
  destroyLaw,
} = useLawtonStore();

const { lawton, AddLW, EditLW, showDialogLW, loading, tempLw } =
  storeToRefs(useLawtonStore());

const { listPacientes } = usePacientesStore();

const { pacientes } = storeToRefs(usePacientesStore());

  const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre del paciente",
    field: "nombre",
    sortable: true,
  },

  {
    name: 'usotelef',
    align: 'center',
    label: 'Teléfono',
    field: 'usotelef'
  },
  {
    name: 'compras',
    align: 'center',
    label: 'Ir de compras',
    field: 'compras'
  },
  {
    name: 'prepalim',
    align: 'center',
    label: 'Preparar alimentos',
    field: 'prepalim'
  },
  {
    name: 'manejocasa',
    align: 'center',
    label: 'Manejo de la casa',
    field: 'manejocasa'
  },
  {
    name: 'lavar',
    align: 'center',
    label: 'Lavar',
    field: 'lavar'
  },
  {
    name: 'transporte',
    align: 'center',
    label: 'Transporte',
    field: 'transporte'
  },
  {
    name: 'usomed',
    align: 'center',
    label: 'Uso de medicamentos',
    field: 'usomed'
  },
  {
    name: 'manejofin',
    align: 'center',
    label: 'Manejo financiero',
    field: 'manejofin'
  },
  {
    name: 'fecha_value',
    align: 'center',
    label: 'Fecha evaluación',
    field: 'fecha_value'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialogLW = (row) => {
  AddLW.value = false;
  EditLW.value = true;
  tempLw.value = { ...row };
  showDialogLW.value = true;
};
const openAddDialogLW = () => {
  AddLW.value = true;
  EditLW.value = false;
  resetTempLaw();
  showDialogLW.value = true;
};

const UsotOptions = [
  "Dependiente",
  "Independiente",
];

const ComprasOptions = [
  "Dependiente",
  "Independiente",
];

const PrepOptions = [
  "Dependiente",
  "Independiente",
];

const MancOptions = [
  "Dependiente",
  "Independiente",
];

const ManfOptions = [
  "Dependiente",
  "Independiente",
];

const LavarOptions = [
  "Dependiente",
  "Independiente",
];

const TransOptions = [
  "Dependiente",
  "Independiente",
];

const UsomOptions = [
  "Dependiente",
  "Independiente",
];

const visibleColumns = ref([
  'nombre',
  'usotelef',
  'compras',
  'prepalim',
  'manejocasa',
  'lavar',
  'transporte',
  'manejofin',
  'usomed',
  'fecha_value',
])

// ----------Relacion paciente--------------------
const IndOptions = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomInd = async () => {
  console.log("hi");
  await listPacientes();
  pacientesArray.value = pacientes.value;
  IndOptions.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterInd(val, update) {
  if (val === "") {
    update(() => {
      IndOptions.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    IndOptions.value = pacientesArray.value
      .filter((item) => item.nombre.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
  });
}

const date = ref("");

// TODO: Export To Excel:
async function exportFileLW() {
  const ws = utils.json_to_sheet(lawton.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Lawton");
  writeFileXLSX(wb, "Lawton.xlsx");
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
    background-color: #338a67

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

