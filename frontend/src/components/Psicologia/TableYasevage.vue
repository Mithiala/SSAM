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
                class="col-5"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempYasevage.y_paciente"
                label="Nombre del paciente"
                :options="YaseOptions"
                @filter="filterYase"
                @popup-show="getNomYase"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "fecha evaluación" -->
              <q-input
                class="col-4"
                dense
                outlined
                label="Fecha Evaluación"
                v-model="tempYasevage.fecha"
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
                        v-model="tempYasevage.fecha"
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

              <!-- TODO:  "Depresión Severa" -->
              <q-select
                class="col-4"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempYasevage.y_paciente"
                label="Depresión Severa"
                :options="SeveraOptions"
                @filter="filterSevera"
                @popup-show="getNomSevera"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Depresión Moderada" -->
              <q-select
                class="col-5"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempYasevage.y_paciente"
                label="Depresión Moderada"
                :options="ModeradaOptions"
                @filter="filterModerada"
                @popup-show="getNomModerada"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Normal" -->
              <q-select
                class="col-5"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempYasevage.y_paciente"
                label="Normal"
                :options="NormalOptions"
                @filter="filterNormal"
                @popup-show="getNomNormal"
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
import { usePacientesStore } from "src/stores/Pacientes-Store";
import { useNomenclatorStore } from "src/stores/Nomenclator-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listYase();
  await listnomdepsevera();
  await listnomdepmoderada();
  await listnomnormal();
  // }
});

const {
  resetTempYase,
  listYase,
  createYase,
  updateYase,
  destroyYase,
} = useYesavageStore();

const { listnomdepsevera } = useNomenclatorStore();
const { nomdepsevera } = storeToRefs(useNomenclatorStore());

const { listnomdepmoderada } = useNomenclatorStore();
const { nomdepmoderada } = storeToRefs(useNomenclatorStore());

const { listnomnormal } = useNomenclatorStore();
const { nomnormal } = storeToRefs(useNomenclatorStore());

const { yesavage, AddYP, EditYP, showDialogYP, loading, tempYasevage } =
  storeToRefs(useYesavageStore());

const { listPacientes } = usePacientesStore();

const { pacientes } = storeToRefs(usePacientesStore());

  const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre y Apellidos",
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

// ----------Relación paciente--------------------
const YaseOptions = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomYase = async () => {
  await listPacientes();
  pacientesArray.value = pacientes.value;
  YaseOptions.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterYase(val, update) {
  if (val === "") {
    update(() => {
      YaseOptions.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    YaseOptions.value = pacientesArray.value
      .filter((item) => item.nombre.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
  });
}

// ----------Depresión Severa--------------------
const SeveraOptions = ref([]);
const nomdepseveraArray = ref([nomdepsevera.value]);

const getNomSevera = async () => {
  console.log("getNomSevera");
  await listnomdepsevera();
  nomdepseveraArray.value = nomdepsevera.value;
  SeveraOptions.value = nomdepsevera.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterSevera(val, update) {
  if (val === "") {
    update(() => {
      SeveraOptions.value = nomdepseveraArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    SeveraOptions.value = nomdepseveraArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}

// ----------Depresión Moderada--------------------
const ModeradaOptions = ref([]);
const nomdepmoderadaArray = ref([nomdepmoderada.value]);

const getNomModerada = async () => {
  console.log("getNomModerada");
  await listnomdepmoderada();
  nomdepmoderadaArray.value = nomdepmoderada.value;
  ModeradaOptions.value = nomdepmoderada.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterModerada(val, update) {
  if (val === "") {
    update(() => {
      ModeradaOptions.value = nomdepmoderadaArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    ModeradaOptions.value = nomdepmoderadaArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}

// ----------Normal--------------------
const NormalOptions = ref([]);
const nomnormalArray = ref([nomnormal.value]);

const getNomNormal = async () => {
  console.log("getNomNormal");
  await listnomdepmoderada();
  nomnormalArray.value = nomnormal.value;
  NormalOptions.value = nomnormal.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterNormal(val, update) {
  if (val === "") {
    update(() => {
      NormalOptions.value = nomnormalArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    NormalOptions.value = nomnormalArray.value
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
