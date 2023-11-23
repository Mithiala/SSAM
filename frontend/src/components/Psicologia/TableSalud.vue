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
              
              <!-- TODO:  "fecha evaluación" -->
              <q-input
                class="col-2"
                dense
                outlined
                label="Fecha Evaluación"
                v-model="tempSalud.fecha"
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
                        v-model="tempSalud.fecha"
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

              <!-- TODO:  "Orientación Temporal" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempSalud.orientemporal"
                label="Orientación Temporal"
                :options="OTOptions"
                @filter="filterOT"
                @popup-show="getNomOrientacionTemporal"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Orientación Espacial" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempSalud.orientespacial"
                label="Orientación Espacial"
                :options="OEOptions"
                @filter="filterEM"
                @popup-show="getNomOrientacionEspacial"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Fijación" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempSalud.fijacion"
                label="Fijación"
                :options="FijacionOptions"
                @filter="filterFijacion"
                @popup-show="getNomFijacion"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Memoria" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempSalud.memoria"
                label="Memoria"
                :options="MemoriaOptions"
                @filter="filterMemoria"
                @popup-show="getNomMemoria"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Atención y Cálculo" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempSalud.atencalculo"
                label="Atención y Cálculo"
                :options="AtencionOptions"
                @filter="filterAtencion"
                @popup-show="getNomAtencion"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Lenguaje" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempSalud.lenguaje"
                label="Lenguaje"
                :options="LengOptions"
                @filter="filterLeng"
                @popup-show="getNomLeng"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Normal" -->
              <q-select
                class="col-2"
                dense
                options-dense
                outlined
                use-input
                input-debounce="0"
                v-model="tempSalud.normal"
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
                class="col-3 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditSM"
                @click="updateSaludm(tempSalud.id)"
              />
              <q-btn
                class="col-3 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddSM"
                @click="createSaludm(tempSalud)"
              />
              <q-btn
                class="col-3 q-mx-sm"
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
  await listnomfijacionl();
  await listnomorientemporal();
  await listnomorientespacial();
  await listnommemoria();
  await listnomatencalculo();
  await listnomlenguaje();
  await listnomnormal();
  // }
});

const { listnomfijacionl } = useNomenclatorStore();
const { nomfijacion } = storeToRefs(useNomenclatorStore());

const { listnomorientemporal } = useNomenclatorStore();
const { nomorientemporal } = storeToRefs(useNomenclatorStore());

const { listnomorientespacial } = useNomenclatorStore();
const { nomorientespacial } = storeToRefs(useNomenclatorStore());

const { listnommemoria } = useNomenclatorStore();
const { nommemoria } = storeToRefs(useNomenclatorStore());

const { listnomatencalculo } = useNomenclatorStore();
const { nomatencalculo } = storeToRefs(useNomenclatorStore());

const { listnomlenguaje } = useNomenclatorStore();
const { nomlenguaje } = storeToRefs(useNomenclatorStore());

const { listnomnormal } = useNomenclatorStore();
const { nomnormal } = storeToRefs(useNomenclatorStore());

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
    label: 'Fecha Evaluación',
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
    name: 'atencalculo',
    align: 'center',
    label: 'Atención y Cálculo',
    field: 'atencalculo'
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

// ----------Relación paciente--------------------
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
  console.log("getNomOrientacionEspacial");
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

// ----------Fijación--------------------
const FijacionOptions = ref([]);
const nomfijacionArray = ref([nomfijacion.value]);

const getNomFijacion = async () => {
  console.log("getNomFijacion");
  await listnomfijacionl();
  nomfijacionlArray.value = nomfijacion.value;
  FijacionOptions.value = nomfijacion.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterFijacion(val, update) {
  if (val === "") {
    update(() => {
      FijacionOptions.value = nomfijacionArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    FijacionOptions.value = nomfijacionArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}
// ------------------------------

// ----------Memoria--------------------
const MemoriaOptions = ref([]);
const nommemoriaArray = ref([nommemoria.value]);

const getNomMemoria = async () => {
  console.log("getNomMemoria");
  await listnommemoria();
  nommemorialArray.value = nommemoria.value;
  MemoriaOptions.value = nommemoria.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterMemoria(val, update) {
  if (val === "") {
    update(() => {
      MemoriaOptions.value = nommemoriaArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    MemoriaOptions.value = nommemoriaArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}
// ------------------------------

// ----------Atención y Cálculo--------------------
const AtencionOptions = ref([]);
const nomatencalculoArray = ref([nomatencalculo.value]);

const getNomAtencion = async () => {
  console.log("getNomAtencion");
  await listnomatencalculo();
  nomatencalculoArray.value = nomatencalculo.value;
  AtencionOptions.value = nomatencalculo.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterAtencion(val, update) {
  if (val === "") {
    update(() => {
      AtencionOptions.value = nomatencalculoArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    AtencionOptions.value = nomatencalculoArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}
// ------------------------------

// ----------Lenguaje--------------------
const LengOptions = ref([]);
const nomlenguajeArray = ref([nomlenguaje.value]);

const getNomLeng = async () => {
  console.log("getNomLeng");
  await listnomlenguaje();
  nomlenguajeArray.value = nomlenguaje.value;
  LengOptions.value = nomlenguaje.value.map((item) => ({
    value: item.id,
    label: item.evaluacion,
  }));
};

function filterLeng(val, update) {
  if (val === "") {
    update(() => {
      LengOptions.value = nomlenguajeArray.value.map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    LengOptions.value = nomlenguajeArray.value
      .filter((item) => item.evaluacion.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.evaluacion,
      }));
  });
}
// ------------------------------

// ----------Normal--------------------
const NormalOptions = ref([]);
const nomnormalArray = ref([nomnormal.value]);

const getNomNormal = async () => {
  console.log("getNomNormal");
  await listnomnormal();
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
// ------------------------------

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
