<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="datosenfer"
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
            bg-color="teal-3"
            label="Datos generales"
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
            @click="destroyDatose(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent full-width>
      <q-card class="row full-height">
        <q-card-section class="col items-center q-pb-none">
          <div class="row justify-end">
            <q-btn icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>

        <q-card-section>
          <q-form>
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
                v-model="tempDatos.denf_paciente"
                label="Nombre del paciente"
                :options="EnfermeriaOptions"
                @filter="filterEncuesta"
                @popup-show="getNomPacientes"
                option-value="value"
                option-label="label"
              />

              <!-- TODO:  "Sala" -->
              <q-input
                class="col-1"
                dense
                outlined
                type="text"
                label="Sala"
                v-model="tempDatos.sala"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la Sala al que pertence el paciente',
                ]"
              />

              <!-- TODO:  "No. Cama" -->
              <q-input
                class="col-1"
                dense
                outlined
                type="number"
                label="No. Cama"
                lazy-rules
                v-model="tempDatos.num_cama"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la cama del paciente',
                ]"
              />

              <q-space class="col-1" />

              <!-- TODO:  "Peso" -->
              <q-input
                class="col-1"
                outlined
                dense
                type="text"
                label="Peso"
                v-model="tempDatos.peso"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el peso del paciente',
                ]"
              />

              <!-- TODO:  "Talla" -->
              <q-input
                class="col-1"
                outlined
                dense
                type="text"
                label="Talla"
                v-model="tempDatos.talla"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la talla del paciente',
                ]"
              />

              <!-- TODO:  "Clasificación IMC" -->
              <q-input
                class="col-2"
                outlined
                dense
                readonly
                type="text"
                label="Clasificación IMC"
                v-model="tempDatos.clasif_imc"
              />

              <!-- TODO:  "APP" -->
              <q-input
                class="col-3"
                type="textarea"
                dense
                outlined
                v-model="tempDatos.app"
                label="APP"
              />

              <!-- TODO:  "Patología" -->
              <q-input
                class="col-3"
                type="textarea"
                dense
                outlined
                label="Patología"
                v-model="tempDatos.patologia"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la patología del paciente',
                ]"
              />

              <!-- TODO:  "Operaciones" -->
              <q-input
                class="col-3"
                type="textarea"
                dense
                outlined
                label="Operaciones"
                v-model="tempDatos.operaciones"
              />

              <!-- TODO:  "Fecha estomatologia" -->
              <q-input
                class="col-3"
                dense
                outlined
                label="Fecha"
                v-model="tempDatos.fecha_e"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de consulta',
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
                        v-model="tempDatos.fecha_e"
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

              <!-- TODO:  "Atención estomatológica" -->
              <q-input
                class="col-6"
                type="textarea"
                dense
                outlined
                label="Atención estomatológica"
                v-model="tempDatos.atencion_estomatologia"
              />

              <!-- TODO:  "Fecha auditivo" -->
              <q-input
                class="col-3"
                dense
                outlined
                label="Fecha"
                v-model="tempDatos.fecha_a"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de consulta',
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
                        v-model="tempDatos.fecha_a"
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

              <!-- TODO:  "Programa auditivo" -->
              <q-input
                class="col-6"
                type="textarea"
                dense
                outlined
                label="Programa auditivo"
                v-model="tempDatos.programa_auditivo"
              />

              <!-- TODO:  "Fecha oftalmologia" -->
              <q-input
                class="col-3"
                dense
                outlined
                label="Fecha"
                v-model="tempDatos.fecha_o"
                mask="####-##-##"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de consulta',
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
                        v-model="tempDatos.fecha_o"
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

              <!-- TODO:  "Atención oftalmológica" -->
              <q-input
                class="col-6"
                type="textarea"
                dense
                outlined
                label="Atención oftalmológica"
                v-model="tempDatos.atencion_oftalmologia"
              />

              <!-- TODO:  "Resumen de consultas externas" -->
              <q-input
                class="col-11"
                type="textarea"
                dense
                outlined
                v-model="tempDatos.resumen"
                label="Resumen de consultas externas"
              />

              <!-- TODO:  "Localización de úlceras por presión" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                v-model="tempDatos.ulcerapres"
                label="Localización de úlceras por presión"
              />

              <!-- TODO:  "Síndrome respiratorio" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                label="Síndrome respiratorio"
                v-model="tempDatos.sindrome_respiratorio"
              />

              <!-- TODO:  "Programa TB" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                label="Programa TB"
                v-model="tempDatos.programa_tb"
              />

              <!-- TODO:  "Morbilidad" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                label="Morbilidad"
                v-model="tempDatos.morbilidad"
              />

              <!-- TODO:  "Transfuciones" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                label="Transfuciones"
                v-model="tempDatos.transfuciones"
              />

              <!-- TODO:  "Hábitos tóxicos" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                label="Hábitos tóxicos"
                v-model="tempDatos.habitos_toxicos"
              />

              <!-- TODO:  "Alergia a medicamentos" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                label="Alergia a medicamentos"
                v-model="tempDatos.alergia_medicamentos"
              />

              <!-- TODO:  "Accidentes" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                label="Accidentes"
                v-model="tempDatos.accidentes"
              />

              <!-- TODO:  "Clasificación de validismo" -->
              <q-input
                class="col-8"
                type="text"
                dense
                outlined
                label="Clasificación de validismo"
                v-model="tempDatos.clasificacion_validismo"
              />
            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateDatose(tempDatos.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createDatose(tempDatos)"
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
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDatosenferStore } from "src/stores/Datosenfer-Store";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listDatose();
  // }
});

const {
  resetTempDatose,
  listDatose,
  createDatose,
  updateDatose,
  destroyDatose,
} = useDatosenferStore();

const {
  datosenfer,
  AddDG,
  EditDG,
  showDialogDG,
  loading,
  tempDatos,
} = storeToRefs(useDatosenferStore());

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
    name: "edad",
    label: "Edad",
    field: "edad",
    sortable: true,
    align: "center",
    sort: (a, b) => a - b,
  },
  {
    name: "sexo",
    label: "Sexo",
    field: "sexo",
    align: "center",
  },

  {
    name: "num_cama",
    align: "center",
    label: "No. Cama",
    field: "num_cama",
  },
  {
    name: "sala",
    align: "center",
    label: "Sala",
    field: "sala",
  },
  {
    name: "peso",
    align: "center",
    label: "Peso",
    field: "peso",
    format: (val) => `${val} kg`,
  },
  {
    name: "talla",
    align: "center",
    label: "Talla",
    field: "talla",
    format: (val) => `${val} m`,

    sortable: true,
  },
  {
    name: "clasif_imc",
    align: "center",
    label: "IMC",
    field: "clasif_imc",
    sortable: true,
  },
  {
    name: "app",
    align: "center",
    label: "APP",
    field: "app",
  },
  {
    name: "patologia",
    align: "center",
    label: "Patologia",
    field: "patologia",
  },
  {
    name: "operaciones",
    align: "center",
    label: "Operaciones",
    field: "operaciones",
  },
  {
    name: "fecha_e",
    align: "center",
    label: "Fecha",
    field: "fecha_e",
  },
  {
    name: "atencion_estomatologia",
    align: "center",
    label: "Atención estomatología",
    field: "atencion_estomatologia",
  },
  {
    name: "fecha_a",
    align: "center",
    label: "Fecha",
    field: "fecha_a",
  },
  {
    name: "programa_auditivo",
    align: "center",
    label: "Programa auditivo",
    field: "programa_auditivo",
  },
  {
    name: "fecha_o",
    align: "center",
    label: "Fecha",
    field: "fecha_o",
  },
  {
    name: "atencion_oftalmologia",
    align: "center",
    label: "Atención oftalmología",
    field: "atencion_oftalmologia",
  },
  {
    name: "resumen",
    align: "center",
    label: "Resumen de consultas externas",
    field: "resumen",
  },
  {
    name: "ulcerapres",
    align: "center",
    label: "Localización de úlceras por presión",
    field: "ulcerapres",
  },
  {
    name: "sindrome_respiratorio",
    align: "center",
    label: "Síndromes respiratorios",
    field: "sindrome_respiratorio",
  },
  {
    name: "programa_tb",
    align: "center",
    label: "Programa TB",
    field: "programa_tb",
  },
  {
    name: "morbilidad",
    align: "center",
    label: "Morbilidad",
    field: "morbilidad",
  },
  {
    name: "transfuciones",
    align: "center",
    label: "Transfuciones",
    field: "transfuciones",
  },
  {
    name: "habitos_toxicos",
    align: "center",
    label: "Habitos tóxicos",
    field: "habitos_toxicos",
  },
  {
    name: "alergia_medicamentos",
    align: "center",
    label: "Alergia Medicamentos",
    field: "alergia_medicamentos",
  },
  {
    name: "accidentes",
    align: "center",
    label: "Accidentes",
    field: "accidentes",
  },
  {
    name: "clasificacion_validismo",
    align: "center",
    label: "Clasificacion de validismo",
    field: "clasificacion_validismo",
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
];

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempDatos.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempDatose();
  showDialogDG.value = true;
};

const visibleColumns = ref([
  "nombre",
  "edad",
  "sexo",
  "peso",
  "clasif_imc",
  "talla",
  "app",
  "patologia",
  "operaciones",
  "fecha_e",
  "atencion_estomatologia",
  "fecha_a",
  "programa_auditivo",
  "fecha_o",
  "atencion_oftalmologia",
  "resumen",
  "ulcerapres",
  "sindrome_respiratorio",
  "programa_tb",
  "morbilidad",
  "transfuciones",
  "habitos_toxicos",
  "alergia_medicamentos",
  "accidentes",
  "clasificacion_validismo",
  "num_cama",
  "sala",
  "actions",
]);

// Función para calcular la clasificación IMC
function calcularClasificacionIMC(peso, talla) {
  const imc = peso / (talla * talla);

  if (imc < 18.5) {
    return "Bajo peso";
  } else if (imc >= 18.5 && imc < 25) {
    return "Normopeso";
  } else {
    return "Obeso";
  }
}

// Observar cambios en peso y talla para actualizar la clasificación IMC
watch(
  [() => tempDatos.value.peso, () => tempDatos.value.talla],
  ([peso, talla]) => {
    if (peso && talla) {
      const clasificacionIMC = calcularClasificacionIMC(peso, talla);
      tempDatos.value.clasif_imc = clasificacionIMC;
    } else {
      tempDatos.value.clasif_imc = "";
    }
  }
);

const EnfermeriaOptions = ref([]);
const pacientesArray = ref(pacientes.value);

const getNomPacientes = async () => {
  console.log("hi");
  await listPacientes();
  pacientesArray.value = pacientes.value;
  EnfermeriaOptions.value = pacientes.value.map((item) => ({
    value: item.id,
    label: item.nombre,
  }));
};

function filterEncuesta(val, update) {
  if (val === "") {
    update(() => {
      EnfermeriaOptions.value = pacientesArray.value.map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    EnfermeriaOptions.value = pacientesArray.value
      .filter((item) => item.nombre.toLowerCase().indexOf(needle) > -1)
      .map((item) => ({
        value: item.id,
        label: item.nombre,
      }));
  });
}

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(datosenfer.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Datosenfer");
  writeFileXLSX(wb, "Datosenfer.xlsx");
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
