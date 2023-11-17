<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row flex-center ">
      <h5 class="col-xs-11 col-sm-5 col-md-4 text-center text-weight-medium q-pt-sm q-mb-none ellipsis-2-lines ">
        Evaluación Kats
      </h5>
      </div>
    <div>
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="enfvalue"
      :columns="columns"
      row-key="id_venf"
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
          label="Evaluación Kats"
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
            @click="destroyValues(props.row.id_venf)"
          />
        </q-td>
      </template>
    </q-table>
    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent full-width >
      <q-card class="column medium">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO:  "Bañarse" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.banarse"
                label="Bañarse"
                :options="BaOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Vestirse" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.vestirse"
                label="Vestirse"
                :options="VesOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Ir al servicio" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.servicio"
                label="Ir al servicio"
                :options="SerOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Levantarse" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.levantarse"
                label="Levantarse"
                :options="LevOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Continencia" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.continencia"
                label="Continencia"
                :options="ContOptions"
                style="width: 200px"
                behavior="menu"
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Por favor ingrese el dato',
                ]"
              />

              <!-- TODO:  "Comer" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempValue.comer"
                label="Comer"
                :options="ComerOptions"
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
              label="Fecha"
              v-model="tempValue.fecha_kats"
              mask="date">
              <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tempValue.fecha_kats">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="green" flat />
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
                @click="updateValues(tempValue.id_venf)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createValues(tempValue)"
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
  </div>
</template>

<script setup>
import { PDFDocument, StandardFonts } from "pdf-lib";
import { utils, writeFileXLSX } from "xlsx";
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useEnfvalueStore } from "src/stores/Enfvalue-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listValues();
  await listPacientes();
  // }
});

const {
  resetTempValues,
  listValues,
  listPacientes,
  createValues,
  updateValues,
  destroyValues,
} = useEnfvalueStore();

const { enfvalue, AddDG, EditDG, showDialogDG, loading, tempValue, tempPaciente } =
  storeToRefs(useEnfvalueStore());

  const baseurl = "http://127.0.0.1:3333";

  const columns = [
  {
    name: 'id_venf',
    required: true,
    label: 'Id',
    align: 'left',
    field: row => row.id_venf,
    format: val => `${val}`,
    sortable: true,
    align: "center",
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
    label: "Nombre y Apellidos",
    field: "nombre",
    sortable: true,
  },

  {
    name: 'banarse',
    align: 'center',
    label: 'Bañarse',
    field: 'banarse',
  },
  {
    name: 'vestirse',
    align: 'center',
    label: 'Vestirse',
    field: 'vestirse',
  },
  {
    name: 'servicio',
    align: 'center',
    label: 'Ir al servicio',
    field: 'servicio',
  },
  {
    name: 'levantarse',
    align: 'center',
    label: 'Levantarse',
    field: 'levantarse'
  },
  {
    name: 'continencia',
    align: 'center',
    label: 'Continencia',
    field: 'continencia',
  },
  {
    name: 'comer',
    align: 'center',
    label: 'Comer',
    field: 'comer'
  },
  {
    name: 'fecha_kats',
    align: 'center',
    label: 'Fecha',
    field: 'fecha_kats'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempValue.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempValues();
  showDialogDG.value = true;
};

const BaOptions = [
  "Dependiente",
  "Independiente",
];

const VesOptions = [
  "Dependiente",
  "Independiente",
];

const SerOptions = [
  "Dependiente",
  "Independiente",
];

const LevOptions = [
  "Dependiente",
  "Independiente",
];

const ContOptions = [
  "Dependiente",
  "Independiente",
];

const ComerOptions = [
  "Dependiente",
  "Independiente",
];

const visibleColumns = ref([
  'id_venf',
  'image',
  'nombre',
  'banarse',
  'vestirse',
  'servicio',
  'levantarse',
  'continencia',
  'comer',
  'fecha_kats',
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
  const ws = utils.json_to_sheet(enfvalue.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Enfvalue");
  writeFileXLSX(wb, "Enfvalue.xlsx");
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
