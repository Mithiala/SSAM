<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      title="Datos generales de pacientes"
      :rows="pacientes"
      :columns="columns"
      row-key="id_pacientes"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="[10, 20, 30]"
      separator="cell"
    >
      <template v-slot:top="props">
        <div
          class="text-center col-md-6 col-sm col-xs-12 q-table__title text-white"
        >
        </div>
        <div class="bhg-blue-4 col-md-3 col-sm-3 col-xs-12">
          <q-input
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
        </div>
        <div class="bhg-yellow-4 col-md-3 col-sm col-xs-12 justify-end row">
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

    <!-- Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent full-width>
      <q-card class="column full-height" style="width: 300px">
        <q-card-section>
          <q-form class="justify-center">
            <div class="row q-col-gutter-sm justify-center">
              <q-input
                class="col-4"
                type="text"
                label="Nombre y Apellidos"
                v-model="tempPaciente.nombre"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Por favor ingrese su nombre y apellidos']"
              />
              <q-input
                filled
                type="number"
                label="Edad"
                lazy-rules
                v-model="tempPaciente.edad"
                :rules="[
                  val => val > 0 && val < 100 || 'Por favor ingrese su edad real'
                ]"
                mask="##"
                />
              <q-input
                class="col-2"
                type="text"
                label="Sexo"
                v-model="tempPaciente.sexo"
              />
              <q-input
                class="col-4"
                type="text"
                label="Dirección particular"
                v-model="tempPaciente.direccion_part"
              />
              <q-input
                  filled
                  v-model="tempPaciente.ci"
                  label="Carnet de identidad"
                  mask="###########"
                  hint="Sólo 11 dígitos"
                />
              <q-input
                class="col-4"
                type="text"
                label="Natural de:"
                v-model="tempPaciente.natural_de"
              />
              <q-select
                filled
                v-model="tempPaciente.estado_civil"
                label="Estado civil"
                :options="EstadoOptions"
                style="width: 250px"
                behavior="menu"
              />
              <q-input
                class="col-2"
                type="text"
                label="Ocupación"
                v-model="tempPaciente.ocupacion"
              />
              <q-input
                class="col-4"
                type="text"
                label="Creencias religiosas"
                v-model="tempPaciente.creencias_religiosas"
              />
              <q-select
                filled
                v-model="tempPaciente.escolaridad"
                label="Escolaridad"
                :options="EscolaridadOptions"
                style="width: 250px"
                behavior="menu"
              />
              <q-input
                class="col-4"
                type="text"
                label="Hijo de:"
                v-model="tempPaciente.hijo_de"
              />
              <q-input
              class="col-2"
              filled
              label="Fecha de nacimiento"
              v-model="tempPaciente.fecha_nacimiento"
              mask="date"
              :rules="['date']">
              <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tempPaciente.fecha_nacimiento">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="green" flat />
              </div>
              </q-date>
              </q-popup-proxy>
              </q-icon>
              </template>
              </q-input>
              
                <q-input
                class="col-2"
                filled
                type="number"
                label="No. Historia Clínica"
                lazy-rules
                v-model="tempPaciente.num_hc"
                :rules="[
                  val => val > 0 && val < 100 || 'Ingrese el número de historia clínica'
                ]"
                />
                <q-input
                class="col-2"
                filled
                type="number"
                label="No. Historia Social"
                lazy-rules
                v-model="tempPaciente.num_hs"
                :rules="[
                  val => val > 0 && val < 100 || 'Ingrese el número de historia social'
                ]"
                />
                <q-input
                class="col-2"
                filled
                type="number"
                label="No. CMF"
                lazy-rules
                v-model="tempPaciente.num_cmf"
                :rules="[
                  val => val > 0 && val < 100 || 'Ingrese el número de CMF'
                ]"
                />
                <q-input
                class="col-2"
              filled
              label="Fecha de inscripción"
              v-model="tempPaciente.fecha_inscripcion"
              mask="date"
              :rules="['date']">
              <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tempPaciente.fecha_inscripcion">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="green" flat />
              </div>
              </q-date>
              </q-popup-proxy>
              </q-icon>
              </template>
              </q-input>
              <q-input
                class="col-12"
                type="text"
                label="Antecedentes"
                v-model="tempPaciente.antecedentes"
              />
              <q-checkbox
              class="col-2"
              left-label
              v-model="tempPaciente.recibevisita"
              label="¿Recibe visitas?"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              />
              <q-input
                class="col-6"
                type="text"
                label="Clasificación económica"
                v-model="tempPaciente.clasificacion_economica"
              />
              <q-input
                class="col-2"
                filled
                type="number"
                label="No. chequera"
                lazy-rules
                v-model="tempPaciente.num_chequera"
                />
                <q-input
                class="col-12"
                type="text"
                label="Situación de la vivienda"
                v-model="tempPaciente.situacion_vivienda"
              />
              <q-input
                class="col-6"
                type="text"
                label="Convivencia"
                v-model="tempPaciente.convivencia"
              />
              <q-input
                class="col-4"
                type="text"
                label="Reportado por:"
                v-model="tempPaciente.reportado_por"
              />
              <q-input
                class="col-12"
                type="text"
                label="Motivo de reporte"
                v-model="tempPaciente.motivo_reporte"
              />
              <q-input
                class="col-12"
                type="text"
                label="Problema social"
                v-model="tempPaciente.problema_social"
              />
            </div>
            <div class="q-mt-lg row q-gutter-xs justify-center">
              <q-btn
                class="col-4"
                type="submit"
                label="Guardar"
                color="positive"
                v-if="EditDG"
                @click="updatePaciente(tempPaciente.id_paciente)"
              />
              <q-btn
                class="col-4"
                type="submit"
                label="Añadir"
                color="positive"
                v-if="AddDG"
                @click="createPacientes(tempPaciente)"
              />
              <q-btn
                class="col-4"
                color="negative"
                label="Cancelar"
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
import { usePacientesStore } from "src/stores/Pacientes-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listPacientes();
  // }
});

const {
  resetTempPacientes,
  listPacientes,
  createPacientes,
  retrievePaciente,
  updatePaciente,
} = usePacientesStore();

const { pacientes, AddDG, EditDG, showDialogDG, loading, tempPaciente } =
  storeToRefs(usePacientesStore());

const columns = [
  {
    name: "image",
    align: "center",
    label: "Foto",
    field: "image",
  },
  {
    name: "id_pacientes",
    required: true,
    label: "Id",
    align: "left",
    field: (row) => row.id_pacientes,
    format: (val) => `${val}`,
    sortable: true,
    align: "center",
  },
  {
    name: "nombre",
    align: "center",
    label: "Nombre",
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
    name: "direccion_part",
    label: "Dirección particular",
    field: "direccion_part",
    align: "center",
  },
  {
    name: "ci",
    label: "Carnet de identidad",
    field: "ci",
    align: "center",
  },
  {
    name: "natural_de",
    label: "Natural de:",
    field: "natural_de",
    align: "center",
  },
  {
    name: "estado_civil",
    label: "Estado civil",
    field: "estado_civil",
    align: "center",
  },
  {
    name: "ocupacion",
    label: "Ocupación",
    field: "ocupacion",
    align: "center",
  },
  {
    name: "creencias_religiosas",
    label: "Creencias religiosas",
    field: "creencias_religiosas",
    align: "center",
  },
  {
    name: "escolaridad",
    label: "Escolaridad",
    field: "escolaridad",
    align: "center",
  },
  {
    name: "hijo_de",
    label: "Hijo de:",
    field: "hijo_de",
    align: "center",
  },
  {
    name: "fecha_nacimiento",
    label: "Fecha de nacimiento",
    field: "fecha_nacimiento",
    align: "center",
  },
  { name: "telefono", align: "center", label: "Teléfono", field: "telefono" },
  { name: "num_hc", align: "center", label: "Historia clínica", field: "num_hc" },
  { name: "num_hs", align: "center", label: "Historia social", field: "num_hs" },
  { name: "num_cmf", align: "center", label: "CMF", field: "num_cmf" },
  {
    name: "fecha_inscripcion",
    label: "Fecha de inscripción",
    field: "fecha_inscripcion",
    align: "center",
  },
  { name: "antecedentes", align: "center", label: "Antecedentes", field: "antecedentes" },

  { name: "recibevisita", label: "Recibe visitas", field: "recibevisita",align: "center", },
  {
    name: "clasificacion_economica",
    label: "Clasificación económica",
    field: "clasificacion_economica",
    align: "center",
  },
  { name: "num_chequera", label: "Chequera", field: "num_chequera", align: "center", },
  {
    name: "situacion_vivienda",
    label: "Vivienda",
    field: "situacion_vivienda",
    align: "center",
  },
  { name: "convivencia", label: "Convivencia", field: "convivencia", align: "center", },
  {
    name: "tiempo_estadia",
    label: "Tiempo de estadía",
    field: "tiempo_estadia",
    align: "center",
  },
  { name: "reportado_por", label: "Reportado por:", field: "reportado_por", align: "center", },
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

//function generarURL() {
  //if (imagenFile.value = URL.createObjectURL(imagenFile.value)
     // } else
    //{
      //  imagenURL.value = ""
    //}


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
  "Viudo",
  "Divorciado",
];

const EscolaridadOptions = [
  "Primaria",
  "Secundaria",
  "Preuniversitaria",
  "Universitaria",
];

const date = ref("")

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
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #26A69A

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
