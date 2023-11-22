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
            @click="destroySaludm(props.row.id)"
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
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempSalud.sm_paciente"
                label="Nombre del paciente"
                :options="SaludOptions"
                @filter="filterSalud"
                @popup-show="getNomSalud"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Orientación Temporal" -->
              <q-select
                class="col-3"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempSalud.sm_paciente"
                label="Orientación Temporal"
                :options="OTOptions"
                @filter="filterOT"
                @popup-show="getNomOrientacionTemporal"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Orientación Espacial" -->
              <q-select
                class="col-3"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempSalud.sm_paciente"
                label="Orientación Espacial"
                :options="OEOptions"
                @filter="filterEM"
                @popup-show="getNomOrientacionEspacial"
                option-value="value"
                option-label="label"
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
import { usePacientesStore } from "src/stores/Pacientes-Store";
import { useNomenclatorStore } from "src/stores/Nomenclator-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listSaludm();
  await listnomestadomental();
  await listnomorientemporal();
  await listnomorientespacial();
  // }
});

const { listnomestadomental } = useNomenclatorStore();
const { nomestadomental } = storeToRefs(useNomenclatorStore());

const { listnomorientemporal } = useNomenclatorStore();
const { nomorientemporal } = storeToRefs(useNomenclatorStore());

const { listnomorientespacial } = useNomenclatorStore();
const { nomorientespacial } = storeToRefs(useNomenclatorStore());

const {
  resetTempSaludm,
  listSaludm,
  createSaludm,
  updateSaludm,
  destroySaludm,
} = useSaludStore();

const { salud, AddSM, EditSM, showDialogSM, loading, tempSalud } =
  storeToRefs(useSaludStore());

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
    name: 'fecha',
    align: 'center',
    label: 'Fecha evaluación',
    field: 'fecha',
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
    label: 'Normal',
    field: 'normal'
  },
  {
    name: "resultado",
    align: "center",
    label: "Resultado",
    field: "resultado",
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

const SaludOptions = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomSalud = async () => {
  await listPacientes();
  pacientesArray.value = pacientes.value;
  SaludOptions.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterSalud(val, update) {
  if (val === "") {
    update(() => {
      SaludOptions.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    SaludOptions.value = pacientesArray.value
      .filter((item) => item.nombre.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
  });
}

// ----------Orientación Temporal--------------------
const OTOptions = ref([]);
const nomorientemporalArray = ref([nomorientemporal.value]);

const getNomOrientacionTemporal = async () => {
  console.log("getNomOrientacionTemporal");
  await listnomorientemporal();
  nomorientemporalArray.value = nomorientemporal.value;
  OTOptions.value = nomorientemporal.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterOT(val, update) {
  if (val === "") {
    update(() => {
      OTOptions.value = nomorientemporalArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    OTOptions.value = nomorientemporalArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}
// ------------------------------

// ----------Orientación Espacial--------------------
const OEOptions = ref([]);
const nomorientespacialArray = ref([nomorientespacial.value]);

const getNomOrientacionEspacial = async () => {
  console.log("getNomOrientacionTemporal");
  await listnomorientespacial();
  nomorientespacialArray.value = nomorientespacial.value;
  OEOptions.value = nomorientespacial.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterEM(val, update) {
  if (val === "") {
    update(() => {
      OEOptions.value = nomorientespacialArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    OEOptions.value = nomorientespacialArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}
// ------------------------------

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
  'resultado',
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
