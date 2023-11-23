<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="indice"
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
            @click="destroyIndices(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent full-width>
      <q-card class="column medium">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">
              <!-- TODO:  "paciente_intercurrencia" -->
              <q-select
                class="col-3"
                dense
                options-dense
                outlined
                use-input
                input-debounce
                v-model="tempIndice.ind_paciente"
                label="Nombre del paciente"
                :options="IndOptions"
                @filter="filterInd"
                @popup-show="getNomInd"
                option-value="value"
                option-label="label"
              />
              <!-- TODO:  "Estado general" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempIndice.estado_general"
                label="Estado General"
                :options="EGOptions"
                @filter="filterEG"
                @popup-show="getNomEstadoGeneral"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Estado mental" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempIndice.estado_mental"
                label="Estado Mental"
                :options="EMOptions"
                @filter="filterEM"
                @popup-show="getNomEstadoMental"
                option-value="value"
                option-label="label"
              />
              <!-- TODO:  "Actividad" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempIndice.actividad"
                label="Actividad"
                :options="ActOptions"
                @filter="filterAct"
                @popup-show="getNomActividad"
                option-value="value"
                option-label="label"
                />

              <!-- TODO:  "Movilidad" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempIndice.movilidad"
                label="Movilidad"
                :options="MovOptions"
                @filter="filterMov"
                @popup-show="getNomMovilidad"
                option-value="value"
                option-label="label"
                />

              <!-- TODO:  "Incontinencia" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempIndice.incontinencia"
                label="Incontinencia"
                :options="IncOptions"
                @filter="filterInc"
                @popup-show="getNomInc"
                option-value="value"
                option-label="label"
                />

              <!-- TODO:  "Fecha" -->
              <q-input
                class="col-2"
                dense
                outlined
                label="Fecha de evaluación"
                v-model="tempIndice.fecha"
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
                        v-model="tempIndice.fecha"
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
                v-if="EditDG"
                @click="updateIndices(tempIndice.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createIndices(tempIndice)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                color="purple-9"
                label="Salir"
                @click="showDialogDG = false"
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
import { useIndiceStore } from "src/stores/Indice-Store";
import { useNomenclatorStore } from "src/stores/Nomenclator-Store";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listIndices();
  await listnomestadomental();
  await listnomestadogeneral();
  await listnomactividad();
  await listnommovilidad();
  await listnomincontinencia();
  // }
});

const { listnomestadomental } = useNomenclatorStore();
const { nomestadomental } = storeToRefs(useNomenclatorStore());

const { listnomestadogeneral } = useNomenclatorStore();
const { nomestadogeneral } = storeToRefs(useNomenclatorStore());

const { listnomactividad } = useNomenclatorStore();
const { nomactividad } = storeToRefs(useNomenclatorStore());

const { listnommovilidad } = useNomenclatorStore();
const { nommovilidad } = storeToRefs(useNomenclatorStore());

const { listnomincontinencia } = useNomenclatorStore();
const { nomincontinencia } = storeToRefs(useNomenclatorStore());

const {
  resetTempIndices,
  listIndices,
  createIndices,
  updateIndices,
  destroyIndices,
} = useIndiceStore();

const {
  indice,
  AddDG,
  EditDG,
  showDialogDG,
  loading,
  tempIndice,
} = storeToRefs(useIndiceStore());

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
    name: "fecha",
    align: "center",
    label: "Fecha de evaluación",
    field: "fecha",
  },
  {
    name: "estado_general",
    align: "center",
    label: "Estado general",
    field: "estado_general",
  },
  {
    name: "estado_mental",
    align: "center",
    label: "Estado mental",
    field: "estado_mental",
  },
  {
    name: "actividad",
    align: "center",
    label: "Actividad",
    field: "actividad",
  },
  {
    name: "movilidad",
    align: "center",
    label: "Movilidad",
    field: "movilidad",
  },
  {
    name: "incontinencia",
    align: "center",
    label: "Incontinencia",
    field: "incontinencia",
  },
  {
    name: "resultado",
    align: "center",
    label: "Resultado",
    field: "resultado",
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
];

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempIndice.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempIndices();
  showDialogDG.value = true;
};

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

// ----------Estado Mental--------------------
const EMOptions = ref([]);
const nomestadomentalArray = ref([nomestadomental.value]);

const getNomEstadoMental = async () => {
  console.log("getNomEstadoMental");
  await listnomestadomental();
  nomestadomentalArray.value = nomestadomental.value;
  EMOptions.value = nomestadomental.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterEM(val, update) {
  if (val === "") {
    update(() => {
      EMOptions.value = nomestadomentalArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    EMOptions.value = nomestadomentalArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}
// ------------------------------

// ----------Estado General--------------------
const EGOptions = ref([]);
const nomestadogeneralArray = ref([nomestadogeneral.value]);

const getNomEstadoGeneral = async () => {
  console.log("getNomEstadoGeneral");
  await listnomestadomental();
  nomestadogeneralArray.value = nomestadogeneral.value;
  EGOptions.value = nomestadogeneral.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterEG(val, update) {
  if (val === "") {
    update(() => {
      EGOptions.value = nomestadogeneralArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    EGOptions.value = nomestadogeneralArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}
// ------------------------------

// ----------Actividad--------------------
const ActOptions = ref([]);
const nomactividadArray = ref([nomactividad.value]);

const getNomActividad = async () => {
  console.log("getNomActividad");
  await listnomactividad();
  nomactividadArray.value = nomactividad.value;
  ActOptions.value = nomactividad.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterAct(val, update) {
  if (val === "") {
    update(() => {
      ActOptions.value = nomactividadArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    ActOptions.value = nomactividadArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}
// ------------------------------

// ----------Movilidad--------------------
const MovOptions = ref([]);
const nommovilidadArray = ref([nommovilidad.value]);

const getNomMovilidad = async () => {
  console.log("getNomMovilidad");
  await listnommovilidad();
  nommovilidadArray.value = nommovilidad.value;
  MovOptions.value = nommovilidad.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterMov(val, update) {
  if (val === "") {
    update(() => {
      MovOptions.value = nommovilidadArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    MovOptions.value = nommovilidadArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}
// ------------------------------

// ----------Incontinencia--------------------
const IncOptions = ref([]);
const nomincontinenciaArray = ref([nomincontinencia.value]);

const getNomInc = async () => {
  console.log("getNomInc");
  await listnommovilidad();
  nomincontinenciaArray.value = nomincontinencia.value;
  IncOptions.value = nomincontinencia.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterInc(val, update) {
  if (val === "") {
    update(() => {
      IncOptions.value = nomincontinenciaArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    IncOptions.value = nomincontinenciaArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}
// ------------------------------

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(indice.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Indice");
  writeFileXLSX(wb, "Indice.xlsx");
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
