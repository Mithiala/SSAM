<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="pacientes"
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
            class="col-4"
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
            class="col"
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
            class="col"
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
            class="col"
            label="Pacientes"
            v-model="visibleColumns"
            transition-show="scale"
            transition-hide="scale"
            multiple
            standout="bg-teal-10 text-white"
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
            class="col-auto q-ml-md"
            flat
            unelevated
            fab-mini
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
          />
        </div>
      </template>

      <!-- TODO:  "método para recibe visita" -->
      <template v-slot:body-cell-recibevisita="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.recibevisita"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "método para image" -->
      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-avatar size="xl">
            <template v-if="props.row.image">
              <q-img :src="baseurl + props.row.image.url" />
            </template>
          </q-avatar>
        </q-td>
      </template>

      <!-- TODO:  "botón para editar y eliminar" -->
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
            @click="destroyPacientes(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent full-width>
      <q-card class="column full-height">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">
              <div>
                <q-btn
                  v-if="EditDG"
                  class="row col-2"
                  :label="!tempPaciente.image ? 'Agregar' : 'Cambiar'"
                  :icon="!tempPaciente.image ? 'add_a_photo' : 'photo_library'"
                  color="green-8"
                  @click="persistent = true"
                />
              </div>

              <q-dialog
                v-model="persistent"
                persistent
                transition-show="scale"
                transition-hide="scale"
              >
                <q-card
                  class="row bg-white text-white justify-center"
                  style="width: 400px"
                >
                  <q-card-section>
                    <q-avatar square size="15rem">
                      <q-img v-if="tempPaciente.image" :src="imagenURL" />
                      <q-img v-else src="src/assets/Hogargerona.jpg" />
                    </q-avatar>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-file
                      filled
                      bottom-slots
                      v-model="tempPaciente.image"
                      label="Cambiar Fotografía"
                      accept=".jpg, image/*"
                      @update:model-value="generarURL"
                      counter
                    >
                      <template v-slot:prepend>
                        <q-icon name="cloud_upload" @click.stop.prevent />
                      </template>
                      <template v-slot:append>
                        <q-icon
                          name="close"
                          @click.stop.prevent="tempPaciente.image = null"
                          class="cursor-pointer"
                        />
                      </template>

                      <template v-slot:hint> jpg, jpeg, png </template>
                    </q-file>
                  </q-card-section>

                  <q-card-actions
                    class="q-mt-none row q-gutter-xs justify-center"
                  >
                    <q-btn
                      class="col-6"
                      type="submit"
                      label="Guardar"
                      color="light-blue-8"
                      v-close-popup
                      @click="updatePhoto(tempPaciente.id)"
                    />

                    <q-btn
                      class="col-5"
                      color="purple-9"
                      label="Salir"
                      v-close-popup
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>

              <!-- TODO:  "centro" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempPaciente.centro"
                label="Centro al que pertenece"
                :options="CentroOptions"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Nombre" -->
              <q-input
                class="col-3"
                type="text"
                label="Nombre y Apellidos"
                v-model="tempPaciente.nombre"
                outlined
                dense
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese su nombre y apellidos',
                ]"
              />

              <!-- TODO:  "Dirección particular" -->
              <q-input
                class="col-3"
                type="text"
                outlined
                dense
                label="Dirección particular"
                v-model="tempPaciente.direccion_part"
              />

              <!-- TODO:  "Carnet de identidad" -->
              <q-input
                class="col-2"
                outlined
                dense
                v-model="tempPaciente.ci"
                label="Carnet de identidad"
                mask="###########"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length === 11) ||
                    'El carnet debe tener 11 dígitos',
                ]"
                hint="Sólo 11 dígitos"
                @blur="validateCarnetIdentidad()"
              />

              <!-- TODO:  "Fecha de nacimiento" -->
              <q-input
                class="col-2"
                outlined
                dense
                v-model="tempPaciente.fecha_nacimiento"
                label="Fecha de nacimiento"
                readonly
              />

              <!-- TODO:  "Sexo" -->
              <q-input
                class="col-1"
                outlined
                dense
                v-model="tempPaciente.sexo"
                label="Sexo"
                readonly
              />

              <!-- TODO:  "Natural de" -->
              <q-input
                class="col-2"
                outlined
                dense
                type="text"
                label="Natural de:"
                v-model="tempPaciente.natural_de"
              />

              <!-- TODO:  "Estado civil" -->
              <q-select
                class="col-2"
                outlined
                dense
                v-model="tempPaciente.estado_civil"
                label="Estado civil"
                :options="EstadoOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Ocupación" -->
              <q-input
                class="col-2"
                outlined
                dense
                type="text"
                label="Ocupación"
                v-model="tempPaciente.ocupacion"
              />

              <!-- TODO:  "Creencias religiosas" -->
              <q-input
                class="col-2"
                outlined
                dense
                type="text"
                label="Creencias religiosas"
                v-model="tempPaciente.creencias_religiosas"
              />

              <!-- TODO:  "Escolaridad" -->
              <q-select
                class="col-2"
                dense
                outlined
                v-model="tempPaciente.escolaridad"
                label="Escolaridad"
                :options="EscolaridadOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO:  "Hijo de" -->
              <q-input
                class="col-2"
                type="text"
                dense
                outlined
                label="Hijo de:"
                v-model="tempPaciente.hijo_de"
              />

              <!-- TODO:  "# de HC" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="No. Historia Clínica"
                lazy-rules
                v-model="tempPaciente.num_hc"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el número de HC',
                ]"
              />

              <!-- TODO:  "# de HS" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="No. Historia Social"
                lazy-rules
                v-model="tempPaciente.num_hs"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el número de HS',
                ]"
              />

              <!-- TODO:  "# de CMF" -->
              <q-input
                class="col-1"
                dense
                outlined
                type="number"
                label="No. CMF"
                lazy-rules
                v-model="tempPaciente.num_cmf"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el número de CMF',
                ]"
              />

              <!-- TODO:  "Fecha de inscripción" -->
              <q-input
                class="col-2"
                dense
                outlined
                label="Fecha de inscripción"
                v-model="tempPaciente.fecha_inscripcion"
                mask="date"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese la fecha de ingreso',
                ]"
                @input="calcularTiempoEstadia"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="tempPaciente.fecha_inscripcion" color="green-5" mask="YYYY-MM-DD">
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

              <!-- TODO:  "Recibe visita" -->
              <q-checkbox
                style="max-width: 140px"
                class="col-2"
                rigth-label
                dense
                outlined
                v-model="tempPaciente.recibevisita"
                label="¿Recibe visitas?"
              />

              <!-- TODO:  "Clasificación económica" -->
              <q-select
                class="col-2"
                dense
                outlined
                label="Clasificación económica"
                v-model="tempPaciente.clasificacion_economica"
                :options="EconOptions"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "# chequera" -->
              <q-input
                class="col-2"
                dense
                outlined
                type="number"
                label="No. chequera"
                lazy-rules
                v-model="tempPaciente.num_chequera"
              />

              <!-- TODO:  "Vivienda" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempPaciente.vivienda"
                label="Vivienda"
                :options="CasasOptions"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Situación de la vivienda" -->
              <q-select
                class="col-3"
                dense
                outlined
                label="Situación de la vivienda"
                v-model="tempPaciente.situacion_vivienda"
                :options="CasaOptions"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Convivencia" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Convivencia"
                v-model="tempPaciente.convivencia"
              />

              <!-- TODO:  "Tiempo de estadía" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                readonly
                label="Tiempo de estadía"
                v-model="tempPaciente.tiempo_estadia"
              />

              <!-- TODO:  "Reportado por" -->
              <q-input
                class="col-3"
                dense
                outlined
                type="text"
                label="Reportado por:"
                v-model="tempPaciente.reportado_por"
              />

              <!-- TODO:  "Motivo de reporte" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempPaciente.motivo_reporte"
                label="Motivo de reporte"
                :options="MotivoOptions"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO:  "Antecedentes" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                label="Antecedentes"
                v-model="tempPaciente.antecedentes"
              />

              <!-- TODO:  "Problema social" -->
              <q-input
                class="col-5"
                type="textarea"
                dense
                outlined
                label="Problema social"
                v-model="tempPaciente.problema_social"
              />

            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updatePaciente(tempPaciente.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createPacientes(tempPaciente)"
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
import { ref, onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listPacientes();
  calcularTiempoEstadia();

  // }
});

const {
  resetTempPacientes,
  listPacientes,
  validateCarnetIdentidad,
  createPacientes,
  updatePaciente,
  updatePhoto,
  destroyPacientes,
} = usePacientesStore();

const { pacientes, tempPaciente, AddDG, EditDG, showDialogDG, loading } =
  storeToRefs(usePacientesStore());

  const pacientesStore = usePacientesStore();

const baseurl = "http://127.0.0.1:8000";

const columns = [
  {
    name: "image",
    align: "center",
    label: "Foto",
    field: "image",
  },
  {
    name: "id",
    required: true,
    label: "Id",
    align: "left",
    align: "center",
    field: (row) => row.id,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "centro",
    align: "center",
    label: "Centro al que pertenece",
    field: "centro",
    sortable: true,
  },
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
  { name: "sexo", align: "center", label: "Sexo", field: "sexo" },
  {
    name: "direccion_part",
    label: "Dirección particular",
    field: "direccion_part",
    align: "center",
  },
  { name: "ci", align: "center", label: "Carnet de identidad", field: "ci" },
  {
    name: "natural_de",
    align: "center",
    label: "Natural de:",
    field: "natural_de",
  },
  {
    name: "estado_civil",
    align: "center",
    label: "Estado civil",
    field: "estado_civil",
  },
  {
    name: "ocupacion",
    align: "center",
    label: "Ocupación",
    field: "ocupacion",
  },
  {
    name: "creencias_religiosas",
    label: "Creencias religiosas",
    field: "creencias_religiosas",
    align: "center",
  },
  {
    name: "escolaridad",
    align: "center",
    label: "Escolaridad",
    field: "escolaridad",
  },
  { name: "hijo_de", align: "center", label: "Hijo de:", field: "hijo_de" },
  {
    name: "fecha_nacimiento",
    label: "Fecha de nacimiento",
    field: "fecha_nacimiento",
    align: "center",
  },
  {
    name: "num_hc",
    align: "center",
    label: "Historia clínica",
    field: "num_hc",
  },
  {
    name: "num_hs",
    align: "center",
    label: "Historia social",
    field: "num_hs",
  },
  { name: "num_cmf", align: "center", label: "CMF", field: "num_cmf" },
  {
    name: "fecha_inscripcion",
    label: "Fecha de inscripción",
    field: "fecha_inscripcion",
    align: "center",
  },
  {
    name: "antecedentes",
    align: "center",
    label: "Antecedentes",
    field: "antecedentes",
  },

  {
    name: "recibevisita",
    label: "Recibe visitas",
    field: "recibevisita",
    align: "center",
  },
  {
    name: "clasificacion_economica",
    label: "Clasificación económica",
    field: "clasificacion_economica",
    align: "center",
  },
  {
    name: "num_chequera",
    label: "Chequera",
    field: "num_chequera",
    align: "center",
  },
  {
    name: "vivienda",
    label: "Vivienda",
    field: "vivienda",
    align: "center",
  },
  {
    name: "situacion_vivienda",
    label: "Situción de la vivienda",
    field: "situacion_vivienda",
    align: "center",
  },
  {
    name: "convivencia",
    align: "center",
    label: "Convivencia",
    field: "convivencia",
  },
  {
    name: "tiempo_estadia",
    label: "Tiempo de estadía",
    field: "tiempo_estadia",
    align: "center",
  },
  {
    name: "reportado_por",
    align: "center",
    label: "Reportado por:",
    field: "reportado_por",
  },
  {
    name: "motivo_reporte",
    label: "Motivo de reporte",
    field: "motivo_reporte",
    align: "center",
  },
  {
    name: "problema_social",
    label: "Problema social",
    field: "problema_social",
    align: "center",
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
];

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempPaciente.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempPacientes();
  showDialogDG.value = true;
};

const EstadoOptions = [
  "Casado",
  "Soltero",
  "Unión Consensual",
  "Viudo",
  "Divorciado",
];

const EscolaridadOptions = [
  "Primaria",
  "Secundaria",
  "Preuniversitaria",
  "Universitaria",
];

const MotivoOptions = [
  "Deambulante",
  "Anciano solo",
  "Familia trabaja",
  "Familia anciana o enferma",
];

const EconOptions = [
  "Asistenciado (paga institución)",
  "Sin entrada económica (paga la familia)",
  "Sin entrada económica pendiente a la Asistencia Social",
  "Jubilado con $ 1528.00",
  "Jubilado con $ 1070.00 ingreso antes de la resolución de pago",
  "Tiene hijos",
  "Reciben mesada del exterior de forma estable",
];

const CasaOptions = [
  "Buena",
  "Mala",
  "Regular",
];

const CentroOptions = [
  "Andrés Cueva Heredia",
  "Francisaca Navia Cuadrado",
];

const CasasOptions = [
  "Casa",
  "Cuarto",
  "Propietario",
  "Conviviente deseado",
  "Conviviente no deseado",
  "Carecen de vivienda",
];

const visibleColumns = ref([
  "image",
  "id",
  "centro",
  "nombre",
  "edad",
  "sexo",
  "direccion_part",
  "ci",
  "natural_de",
  "estado_civil",
  "ocupacion",
  "creencias_religiosas",
  "escolaridad",
  "hijo_de",
  "fecha_nacimiento",
  "num_hc",
  "num_hs",
  "num_cmf",
  "fecha_inscripcion",
  "antecedentes",
  "recibevisita",
  "clasificacion_economica",
  "num_chequera",
  "vivienda",
  "situacion_vivienda",
  "convivencia",
  "tiempo_estadia",
  "reportado_por",
  "motivo_reporte",
  "problema_social",
  "actions",
]);

const edad = computed(() => {
  return import.meta.env.DEV ? ref(25) : ref(0); // Reemplaza con tu lógica real para obtener la edad
});

const date = ref("");

watch(
  () => tempPaciente.value.fecha_inscripcion,
  () => {
    calcularTiempoEstadia();
  }
);

const calcularTiempoEstadia = () => {
  if (tempPaciente.value.fecha_inscripcion) {
    const fechaInscripcion = new Date(tempPaciente.value.fecha_inscripcion);
    const fechaActual = new Date();

    const tiempoEstadia = fechaActual.getTime() - fechaInscripcion.getTime();
    const diasEstadia = Math.floor(tiempoEstadia / (1000 * 60 * 60 * 24));

    const anioActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1; // Sumamos 1 ya que los meses en JavaScript son zero-based
    const diaActual = fechaActual.getDate();

    const anioInscripcion = fechaInscripcion.getFullYear();
    const mesInscripcion = fechaInscripcion.getMonth() + 1; // Sumamos 1 ya que los meses en JavaScript son zero-based
    const diaInscripcion = fechaInscripcion.getDate();

    const diferenciaAnios = anioActual - anioInscripcion;
    const diferenciaMeses = mesActual - mesInscripcion;
    const diferenciaDias = diaActual - diaInscripcion;

    let anosEstadia = diferenciaAnios;
    let mesesEstadia = diferenciaMeses;
    let diasEstadiaTexto = "";

    if (diferenciaDias < 0) {
      mesesEstadia--;
      const ultimoDiaMesAnterior = new Date(anioActual, mesActual - 1, 0).getDate();
      diasEstadiaTexto = ultimoDiaMesAnterior - Math.abs(diferenciaDias) + " días";
    } else if (diferenciaDias === 0) {
      diasEstadiaTexto = "0 días";
    } else {
      diasEstadiaTexto = diferenciaDias + " días";
    }

    if (mesesEstadia < 0) {
      anosEstadia--;
      mesesEstadia = 12 - Math.abs(diferenciaMeses);
    }

    let tiempoEstadiaTexto = "";
    if (anosEstadia > 0) {
      tiempoEstadiaTexto += `${anosEstadia} año${anosEstadia > 1 ? "s" : ""}`;
    }
    if (mesesEstadia > 0) {
      tiempoEstadiaTexto += `${tiempoEstadiaTexto ? ", " : ""}${mesesEstadia} mes${
        mesesEstadia > 1 ? "es" : ""
      }`;
    }
    if (diasEstadiaTexto) {
      tiempoEstadiaTexto += `${tiempoEstadiaTexto ? ", " : ""}${diasEstadiaTexto}`;
    }

    tempPaciente.value.tiempo_estadia = tiempoEstadiaTexto;
  } else {
    tempPaciente.value.tiempo_estadia = "";
  }
};

const imagenFile = ref(null);
const imagenURL = ref("");
function generarURL() {
  if (tempPaciente.value.image) {
    imagenURL.value = URL.createObjectURL(tempPaciente.value.image);
  } else {
    imagenURL.value = "";
  }
}

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(pacientes.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Pacientes");
  writeFileXLSX(wb, "Pacientes.xlsx");
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
    background-color: #2eb8a1

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
