<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="trasladoegresobaja"
      :columns="columns"
      row-key="id_etb"
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
          <q-space class="col-3"/>
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
          label="Traslados"
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
            @click="destroyTrasladoEB(props.row.id_etb)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- TODO: Añadir - Editar -->
    <q-dialog v-model="showDialogDG" persistent full-width >
      <q-card class="column full-height">
        <q-card-section>
          <q-form>
            <div class="row justify-around q-gutter-md">

              <!-- TODO: "Motivo de traslado al Policlínico III" -->
              <q-input
                class="col-8"
                type="textarea"
                dense
                outlined
                label="Motivo de traslado al Policlínico III"
                v-model="tempTraslado.motivo_traslado_poli"
              />

              <!-- TODO: "Fecha de traslado al Policlínico III" -->
              <q-input
              class="col-2"
              dense
              outlined
              label="Fecha de traslado"
              v-model="tempTraslado.fecha_traslado_poli"
              mask="date">
              <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tempTraslado.fecha_traslado_poli">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="green" flat />
              </div>
              </q-date>
              </q-popup-proxy>
              </q-icon>
              </template>
              </q-input>

              <!-- TODO: "Motivo de ingreso al Hospital Héroes del Baire" -->
              <q-input
                class="col-7"
                type="textarea"
                dense
                outlined
                label="Motivo de ingreso al Hospital Héroes del Baire"
                v-model="tempTraslado.motivo_ingreso_hosp"
              />

              <!-- TODO: "Fecha de ingreso al Hospital Héroes del Baire" -->
              <q-input
              class="col-2"
              dense
              outlined
              label="Fecha de ingreso"
              v-model="tempTraslado.fecha_ingreso_hosp"
              mask="date">
              <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tempTraslado.fecha_ingreso_hosp">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="green" flat />
              </div>
              </q-date>
              </q-popup-proxy>
              </q-icon>
              </template>
              </q-input>

              <!-- TODO: "Fecha de egreso" -->
              <q-input
              class="col-2"
              dense
              outlined
              label="Fecha de egreso"
              v-model="tempTraslado.fecha_egreso"
              mask="date">
              <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tempTraslado.fecha_egreso">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="green" flat />
              </div>
              </q-date>
              </q-popup-proxy>
              </q-icon>
              </template>
              </q-input>

              <!-- TODO: "Diagnóstico del Hospital Héroes del Baire" -->
              <q-input
                class="col-8"
                type="textarea"
                dense
                outlined
                label="Diagnóstico del Hospital Héroes del Baire"
                v-model="tempTraslado.diagnostico"
              />

              <!-- TODO: "Motivo de ingreso a Psiquiatría" -->
              <q-input
                class="col-7"
                type="textarea"
                dense
                outlined
                label="Motivo de ingreso a Psiquiatría"
                v-model="tempTraslado.motivo_ingreso_psiquiatria"
              />

              <!-- TODO: "Fecha de ingreso" -->
              <q-input
              class="col-2"
              dense
              outlined
              label="Fecha de ingreso"
              v-model="tempTraslado.fecha_ingreso_psiquiatria"
              mask="date">
              <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tempTraslado.fecha_ingreso_psiquiatria">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="green" flat />
              </div>
              </q-date>
              </q-popup-proxy>
              </q-icon>
              </template>
              </q-input>

              <!-- TODO: "Fecha de egreso" -->
              <q-input
              class="col-2"
              dense
              outlined
              label="Fecha de egreso"
              v-model="tempTraslado.fecha_egreso_psiquiatria"
              mask="date">
              <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tempTraslado.fecha_egreso_psiquiatria">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="green" flat />
              </div>
              </q-date>
              </q-popup-proxy>
              </q-icon>
              </template>
              </q-input>

              <!-- TODO: "Diagnóstico de Psiquiatría" -->
              <q-input
                class="col-8"
                type="textarea"
                dense
                outlined
                label="Diagnóstico de Psiquiatría"
                v-model="tempTraslado.diagnostico_psiquiatria"
              />

              <!-- TODO: "Motivo de ingreso a Subagudo" -->
              <q-input
                class="col-8"
                type="textarea"
                dense
                outlined
                label="Motivo de ingreso a Subagudo"
                v-model="tempTraslado.motivo_ingreso_subagudo"
              />

              <!-- TODO: "Fecha de ingreso" -->
              <q-input
              class="col-2"
              dense
              outlined
              label="Fecha de ingreso"
              v-model="tempTraslado.fecha_ingreso_subagudo"
              mask="date">
              <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tempTraslado.fecha_ingreso_subagudo">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="green" flat />
              </div>
              </q-date>
              </q-popup-proxy>
              </q-icon>
              </template>
              </q-input>

              <!-- TODO: "Motivo de baja del Centro" -->
              <q-input
                class="col-8"
                type="textarea"
                dense
                outlined
                label="Motivo de baja del Centro"
                v-model="tempTraslado.motivo_baja"
              />

              <!-- TODO: "Fecha de baja" -->
              <q-input
              class="col-2"
              dense
              outlined
              label="Fecha de baja"
              v-model="tempTraslado.fecha_baja"
              mask="date">
              <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tempTraslado.fecha_baja">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Cerrar" color="green" flat />
              </div>
              </q-date>
              </q-popup-proxy>
              </q-icon>
              </template>
              </q-input>

              <!-- TODO: "Motivo de fallecimiento" -->
              <q-input
                class="col-8"
                type="textarea"
                dense
                outlined
                label="Motivo de fallecimiento"
                v-model="tempTraslado.motivo_fallecido"
              />

              <!-- TODO: "Fecha de fallecimiento" -->
              <q-input
              class="col-2"
              dense
              outlined
              label="Fecha de fallecimiento"
              v-model="tempTraslado.fecha_fallecido"
              mask="date">
              <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="tempTraslado.fecha_fallecido">
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
                @click="updateTrasladoEB(tempTraslado.id_etb)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createTrasladoEB(tempTraslado)"
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
import { useTrasladoegresobajaStore } from "src/stores/Trasladoegresobaja-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listTrasladoEB();
  await listPacientes();
  // }
});

const {
  resetTempTrasladoEB,
  listTrasladoEB,
  listPacientes,
  createTrasladoEB,
  updateTrasladoEB,
  destroyTrasladoEB,
} = useTrasladoegresobajaStore();

const { trasladoegresobaja, AddDG, EditDG, showDialogDG, loading, tempTraslado, tempPaciente } =
  storeToRefs(useTrasladoegresobajaStore());

  const baseurl = "http://127.0.0.1:3333";

  const columns = [
  {
    name: 'id_etb',
    required: true,
    label: 'Id',
    align: 'left',
    field: row => row.id_etb,
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
    name: 'motivo_traslado_poli',
    align: 'center',
    label: 'Motivo de traslado al Policlínico III',
    field: 'motivo_traslado_poli',
  },
  {
    name: 'fecha_traslado_poli',
    align: 'center',
    label: 'Fecha de traslado al Policlínico III',
    field: 'fecha_traslado_poli',
  },
  {
    name: 'motivo_ingreso_hosp',
    align: 'center',
    label: 'Motivo de ingreso al Hospital Héroes del Baire',
    field: 'motivo_ingreso_hosp'
  },
  {
    name: 'fecha_ingreso_hosp',
    align: 'center',
    label: 'Fecha de ingreso al Hospital Héroes del Baire',
    field: 'fecha_ingreso_hosp',
  },
  {
    name: 'fecha_egreso',
    align: 'center',
    label: 'Fecha de egreso al Centro',
    field: 'fecha_egreso'
  },
  {
    name: 'diagnostico',
    align: 'center',
    label: 'Diagnóstico del Hospital Héroes del Baire',
    field: 'diagnostico'
  },
  {
    name: 'motivo_ingreso_psiquiatria',
    align: 'center',
    label: 'Motivo de ingreso a Psiquiatría',
    field: 'motivo_ingreso_psiquiatria'
  },
  {
    name: 'fecha_ingreso_psiquiatria',
    align: 'center',
    label: 'Fecha de ingreso a Psiquiatría',
    field: 'fecha_ingreso_psiquiatria'
  },
  {
    name: 'fecha_egreso_psiquiatria',
    align: 'center',
    label: 'Fecha de egreso al Centro',
    field: 'fecha_egreso_psiquiatria'
  },
  {
    name: 'diagnostico_psiquiatria',
    align: 'center',
    label: 'Diagnóstico de Psiquiatría',
    field: 'diagnostico_psiquiatria'
  },
  {
    name: 'motivo_ingreso_subagudo',
    align: 'center',
    label: 'Motivo de ingreso a Subagudo',
    field: 'motivo_ingreso_subagudo'
  },
  {
    name: 'fecha_ingreso_subagudo',
    align: 'center',
    label: 'Fecha de ingreso a Subagudo',
    field: 'fecha_ingreso_subagudo'
  },
  {
    name: 'motivo_baja',
    align: 'center',
    label: 'Motivo de baja del Centro',
    field: 'motivo_baja'
  },
  {
    name: 'fecha_baja',
    align: 'center',
    label: 'Fecha de baja del Centro',
    field: 'fecha_baja'
  },
  {
    name: 'motivo_fallecido',
    align: 'center',
    label: 'Motivo de fallecimiento',
    field: 'motivo_fallecido'
  },
  {
    name: 'fecha_fallecido',
    align: 'center',
    label: 'Fecha de fallecimiento',
    field: 'fecha_fallecido'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempTraslado.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempTrasladoEB();
  showDialogDG.value = true;
};

const visibleColumns = ref([
'id_etb',
'image',
'nombre',
'motivo_traslado_poli',
'fecha_traslado_poli',
'motivo_ingreso_hosp',
'fecha_ingreso_hosp',
'fecha_egreso',
'diagnostico',
'motivo_ingreso_psiquiatria',
'fecha_ingreso_psiquiatria',
'fecha_egreso_psiquiatria',
'diagnostico_psiquiatria',
'motivo_ingreso_subagudo',
'fecha_ingreso_subagudo',
'motivo_baja',
'fecha_baja',
'motivo_fallecido',
'fecha_fallecido',
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
  const ws = utils.json_to_sheet(trasladoegresobaja.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Trasladoegresobaja");
  writeFileXLSX(wb, "Trasladoegresobaja.xlsx");
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
