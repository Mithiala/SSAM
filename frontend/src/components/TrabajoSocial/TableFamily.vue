<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="composicionfamiliar"
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
          label="Familiares"
          bg-color="teal-3"
          v-model="visibleColumns"
          transition-show="scale"
          transition-hide="scale"
          multiple
          outlined
          dense
          standout="bg-teal-10 text-white"
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

      <!-- TODO:  "Método para image" -->
      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-avatar size="xl">
            <template v-if="props.row.image">
              <q-img :src="baseurl + props.row.image.url" />
            </template>
          </q-avatar>
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
            @click="destroyFamiliares(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form class="">
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "Nombre y Apellidos" -->
              <q-input
                class="col-5"
                outlined
                dense
                type="text"
                label="Nombre y Apellidos"
                v-model="tempFamiliar.nombre"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el nombre del familiar',
                ]"
              />

              <!-- TODO:  "Edad" -->
              <q-input
                class="col-1"
                outlined
                dense
                type="number"
                label="Edad"
                lazy-rules
                v-model="tempFamiliar.edad"
                :rules="[
                  (val) =>
                    (val > 0 && val < 100) || 'Por favor ingrese la edad real',
                ]"
                mask="##"
              />

              <!-- TODO:  "Parentesco" -->
              <q-select
                class="col-2"
                outlined
                dense
                label="Parentesco"
                v-model="tempFamiliar.parentesco"
                :options="ParentOptions"
                style="width: 170px"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el parentesco del familiar',
                ]"
              />

              <!-- TODO:  "Teléfono" -->
              <q-input
                class="col-1"
                outlined
                dense
                v-model="tempFamiliar.telefono"
                label="Teléfono"
              />

              <!-- TODO:  "Dirección particular" -->
              <q-input
                class="col-5"
                outlined
                dense
                type="text"
                v-model="tempFamiliar.direc_part"
                label="Dirección particular"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el la dirección particular del familiar',
                ]"
              />

              <!-- TODO:  "Estado civil" -->
              <q-select
                class="col-3"
                outlined
                dense
                v-model="tempFamiliar.estado_civil"
                label="Estado civil"
                :options="CivilOptions"
                style="width: 170px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el estado civil del familiar',
                ]"
              />

              <!-- TODO:  "Escolaridad" -->
              <q-select
                class="col-3"
                outlined
                dense
                v-model="tempFamiliar.escolaridad"
                label="Escolaridad"
                :options="EscOptions"
                style="width: 150px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el nivel escolar del familiar',
                ]"
              />

              <!-- TODO:  "Ocupación" -->
              <q-input
                class="col-3"
                outlined
                dense
                type="text"
                label="Ocupación"
                v-model="tempFamiliar.ocupacion"
              />

              <!-- TODO:  "Ingreso económico" -->
              <q-input
                class="col-10"
                outlined
                dense
                type="text"
                label="Ingreso económico"
                v-model="tempFamiliar.ingreso_economico"
              />
            </div>

            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateFamiliares(tempFamiliar.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createFamiliares(tempFamiliar)"
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
import { useComposicionFamiliarStore } from "src/stores/ComposicionFamiliar-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listFamiliares();
  await listPacientes();
  // }
});

const {
  resetTempFamiliares,
  listFamiliares,
  listPacientes,
  createFamiliares,
  updateFamiliares,
  destroyFamiliares,
} = useComposicionFamiliarStore();

const { composicionfamiliar, AddDG, EditDG, showDialogDG, loading, tempFamiliar, tempPaciente } =
  storeToRefs(useComposicionFamiliarStore());

  const baseurl = "http://127.0.0.1:8000";

  const columns = [
  {
    name: 'id',
    required: true,
    label: 'Id',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true,
    align: 'center',
  },

  {
    name: "image",
    align: "center",
    label: "Foto",
    field: "image",
  },
  {
    name: "nombre",
    align: "center",
    label: "Nombre del Paciente",
    field: "nombre",
    sortable: true,
  },
  {
    name: "recibevisita",
    label: "Recibe visitas",
    field: "recibevisita",
    align: "center",
  },

  {
    name: 'nombre',
    align: 'center',
    sortable: true,
    label: 'Nombre y Apellidos',
    field: 'nombre',
  },
  {
    name: "edad",
    label: "Edad",
    field: "edad",
    align: 'center',
    sortable: true,
    sort: (a, b) => a - b,
  },
  {
    name: 'parentesco',
    align: 'center',
    label: 'Parentesco',
    field: 'parentesco'
  },
  {
    name: "telefono",
    label: "Teléfono",
    field: "telefono",
    align: 'center',
  },
  {
    name: 'direc_part',
    align: 'center',
    label: 'Dirección particular',
    field: 'direc_part'
  },
  {
    name: 'estado_civil',
    align: 'center',
    label: 'Estado civil',
    field: 'estado_civil'
  },
  {
    name: 'escolaridad',
    align: 'center',
    label: 'Escolaridad',
    field: 'escolaridad'
  },
  {
    name: 'ocupacion',
    align: 'center',
    label: 'Ocupación',
    field: 'ocupacion'
  },
  {
    name: 'ingreso_economico',
    align: 'center',
    label: 'Ingreso económico',
    field: 'ingreso_economico'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempFamiliar.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempFamiliares();
  showDialogDG.value = true;
};

const CivilOptions = [
  "Casado",
  "Soltero",
  "Unión Consensual",
  "Viudo",
  "Divorciado"
];

const EscOptions = [
  "Primaria",
  "Secundaria",
  "Preuniversitaria",
  "Universitaria",
];

const ParentOptions = [
  'Hijos',
  'Esposo(a)',
  'Sobrino(a)',
  'Nietos',
  'Hermanos',
  'Sin Familia',
  'Otros(hijastros)',
]

const visibleColumns = ref([
'id',
'image',
'nombre',
'recibevisita',
'nombre',
'edad',
'parentesco',
'telefono',
'direc_part',
'estado_civil',
'escolaridad',
'ocupacion',
'ingreso_economico',
'actions',
])

const date = ref("");

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
  const ws = utils.json_to_sheet(composicionfamiliar.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "ComposicionFamiliar");
  writeFileXLSX(wb, "ComposicionFamiliar.xlsx");
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
