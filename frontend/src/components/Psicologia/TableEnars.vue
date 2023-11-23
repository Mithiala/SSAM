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
                class="col-5"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempEna.en_paciente"
                label="Nombre del paciente"
                :options="EnaOptions"
                @filter="filterEna"
                @popup-show="getNomEna"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "fecha evaluación" -->
              <q-input
                class="col-4"
                dense
                outlined
                label="Fecha Evaluación"
                v-model="tempEna.fecha"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de evaluación',
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
                        v-model="tempEna.fecha"
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

              <!-- TODO:  "Siempre" -->
              <q-select
                class="col-4"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempEna.en_paciente"
                label="Siempre"
                :options="SiempreOptions"
                @filter="filterSiempre"
                @popup-show="getNomSiempre"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Frecuentemente" -->
              <q-select
                class="col-4"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempEna.en_paciente"
                label="Frecuentemente"
                :options="FrecuenteOptions"
                @filter="filterFrecuente"
                @popup-show="getNomFrecuente"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Algunas Veces" -->
              <q-select
                class="col-4"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempEna.en_paciente"
                label="Algunas Veces"
                :options="AlgOptions"
                @filter="filterAlg"
                @popup-show="getNomAlg"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Nunca" -->
              <q-select
                class="col-4"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempEna.en_paciente"
                label="Nunca"
                :options="NuncaOptions"
                @filter="filterNunca"
                @popup-show="getNomNunca"
                option-value="value"
                option-label="label"
              />

            </div>
            <div class="q-mt-lg row q-gutter-md justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditEE"
                @click="updateEnars(tempEna.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddEE"
                @click="createEnars(tempEna)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                color="purple-9"
                label="Salir"
                @click="showDialogEE = false"
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
import { useEnarsStore } from "src/stores/Enars-Store";
import { usePacientesStore } from "src/stores/Pacientes-Store";
import { useNomenclatorStore } from "src/stores/Nomenclator-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listEnars();
  await listnomalgveces();
  await listnomfrecuente();
  await listnomsiempre();
  await listnomnunca();
  // }
});

const {
  resetTempEnars,
  listEnars,
  createEnars,
  updateEnars,
  destroyEnars,
} = useEnarsStore();

const { listnomalgveces } = useNomenclatorStore();
const { nomalgveces } = storeToRefs(useNomenclatorStore());

const { listnomfrecuente } = useNomenclatorStore();
const { nomfrecuente } = storeToRefs(useNomenclatorStore());

const { listnomsiempre } = useNomenclatorStore();
const { nomsiempre } = storeToRefs(useNomenclatorStore());

const { listnomnunca } = useNomenclatorStore();
const { nomnunca } = storeToRefs(useNomenclatorStore());

const { enars, AddEE, EditEE, showDialogEE, loading, tempEna} =
  storeToRefs(useEnarsStore());

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
    label: 'Fecha Evaluación',
    field: 'fecha',
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

// ----------Relación paciente--------------------
const EnaOptions = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomEna = async () => {
  await listPacientes();
  pacientesArray.value = pacientes.value;
  EnaOptions.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterEna(val, update) {
  if (val === "") {
    update(() => {
      EnaOptions.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    EnaOptions.value = pacientesArray.value
      .filter((item) => item.nombre.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
  });
}

// ----------Algunas Veces--------------------
const AlgOptions = ref([]);
const nomalgvecesArray = ref([nomalgveces.value]);

const getNomAlg = async () => {
  console.log("getNomAlg");
  await listnomalgveces();
  nomalgvecesArray.value = nomalgveces.value;
  AlgOptions.value = nomalgveces.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterAlg(val, update) {
  if (val === "") {
    update(() => {
      AlgOptions.value = nomalgvecesArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    AlgOptions.value = nomalgvecesArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}

// ----------Frecuentemente--------------------
const FrecuenteOptions = ref([]);
const nomfrecuenteArray = ref([nomfrecuente.value]);

const getNomFrecuente = async () => {
  console.log("getNomFrecuente");
  await listnomfrecuente();
  nomfrecuenteArray.value = nomfrecuente.value;
  FrecuenteOptions.value = nomfrecuente.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterFrecuente(val, update) {
  if (val === "") {
    update(() => {
      FrecuenteOptions.value = nomfrecuenteArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    FrecuenteOptions.value = nomfrecuenteArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}

// ----------Siempre--------------------
const SiempreOptions = ref([]);
const nomsiempreArray = ref([nomsiempre.value]);

const getNomSiempre = async () => {
  console.log("getNomSiempre");
  await listnomsiempre();
  nomsiempreArray.value = nomsiempre.value;
  SiempreOptions.value = nomsiempre.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterSiempre(val, update) {
  if (val === "") {
    update(() => {
      SiempreOptions.value = nomsiempreArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    SiempreOptions.value = nomsiempreArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}

// ----------Nunca--------------------
const NuncaOptions = ref([]);
const nomnuncaArray = ref([nomnunca.value]);

const getNomNunca = async () => {
  console.log("getNomNunca");
  await listnomnunca();
  nomnuncaArray.value = nomnunca.value;
  NuncaOptions.value = nomnunca.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterNunca(val, update) {
  if (val === "") {
    update(() => {
      NuncaOptions.value = nomnuncaArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    NuncaOptions.value = nomnuncaArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}

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
