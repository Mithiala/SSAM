<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="defectologia"
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
          bg-color="blue-3"
          label="Defectología"
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

      <!-- TODO:  "Método para auditivo" -->
      <template v-slot:body-cell-auditivo="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.auditivo"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para visual" -->
      <template v-slot:body-cell-visual="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.visual"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para ecv" -->
      <template v-slot:body-cell-ecv="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.ecv"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para físico motora" -->
      <template v-slot:body-cell-fisicomotora="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.fisicomotora"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para anciedad" -->
      <template v-slot:body-cell-anciedad="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.anciedad"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para esquizofrenia" -->
      <template v-slot:body-cell-esquizofrenia="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.esquizofrenia"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para fuma" -->
        <template v-slot:body-cell-fuma="props">
          <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.fuma"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para alcoholico" -->
      <template v-slot:body-cell-alcoholico="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.alcoholico"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para parkinson" -->
      <template v-slot:body-cell-parkinson="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.parkinson"
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
            @click="destroyDef(props.row.id)"
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

              <!-- TODO:  "salud_paciente" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempDefect.d_paciente"
                label="Nombre del paciente"
                :options="DefectOption"
                style="width: 250px"
                behavior="menu"
              />

              <!-- TODO: "Defectología auditivo" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempDefect.auditivo"
                label="Defectología auditivo"
              />

              <!-- TODO: "Defectología visual" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-2"
                rigth-label
                dense
                outlined
                v-model="tempDefect.visual"
                label="Defectología visual"
              />

              <!-- TODO: "Secuela por ECV" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-2"
                rigth-label
                dense
                outlined
                v-model="tempDefect.ecv"
                label="Secuela por ECV"
              />

              <!-- TODO: "Discapacidad físico motora" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempDefect.fisicomotora"
                label="Discapacidad físico motora"
              />

              <!-- TODO: "Anciedad" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempDefect.anciedad"
                label="Anciedad"
              />

              <!-- TODO: "Esquizofrenia" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempDefect.esquizofrenia"
                label="Esquizofrenia"
              />

              <!-- TODO: "Fumador" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempDefect.fuma"
                label="Fumador"
              />

              <!-- TODO: "Alcohólico" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempDefect.alcoholico"
                label="Alcohólico"
              />

              <!-- TODO: "Parkinson" -->
              <q-checkbox
                style="max-width: 200px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempDefect.parkinson"
                label="Parkinson"
              />

              <q-space class="col-1" />

              <!-- TODO: "Trastorno mental" -->
              <q-select
                class="col-2"
                outlined
                dense
                v-model="tempDefect.retrazomental"
                label="Trastorno mental"
                :options="MentalOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO: "Trastorno del lenguaje" -->
              <q-select
                class="col-2"
                outlined
                dense
                v-model="tempDefect.trastornolenguaje"
                label="Trastorno del lenguaje"
                :options="LenguajeOptions"
                style="width: 200px"
                behavior="menu"
              />

              <!-- TODO: "Trastorno del pensamiento" -->
              <q-select
                class="col-2"
                outlined
                dense
                v-model="tempDefect.trastornopensamiento"
                label="Trastorno del pensamiento"
                :options="PensaOptions"
                style="width: 200px"
                behavior="menu"
              />

            </div>
            <div class="q-mt-lg row q-gutter-md justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateDef(tempDefect.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createDef(tempDefect)"
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
import { useDefectologiaStore } from "src/stores/Defectologia-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listDef();
  await listPacientes();
  // }
});

const {
  resetTempDef,
  listDef,
  listPacientes,
  createDef,
  updateDef,
  destroyDef,
} = useDefectologiaStore();

const { defectologia, AddDG, EditDG, showDialogDG, loading, tempDefect, tempPaciente } =
  storeToRefs(useDefectologiaStore());

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
    align: "center",
    sortable: true,
    sort: (a, b) => a - b,
  },
  {
    name: "sexo",
    label: "Sexo",
    field: "sexo",
    align: "center",
  },

  {
    name: 'auditivo',
    align: 'center',
    label: 'Defectología auditiva',
    field: 'auditivo',
  },
  {
    name: 'visual',
    align: 'center',
    label: 'Defectología visual',
    field: 'visual',
  },
  {
    name: 'ecv',
    align: 'center',
    label: 'Secuela por ECV',
    field: 'ecv'
  },
  {
    name: 'fisicomotora',
    align: 'center',
    label: 'Discapacidad físico motora',
    field: 'fisicomotora'
  },
  {
    name: 'retrazomental',
    align: 'center',
    label: 'Retrazo mental',
    field: 'retrazomental'
  },
  {
    name: 'trastornolenguaje',
    align: 'center',
    label: 'Trastorno del lenguaje',
    field: 'trastornolenguaje'
  },
  {
    name: 'trastornopensamiento',
    align: 'center',
    label: 'Trastorno del pensamiento',
    field: 'trastornopensamiento'
  },
  {
    name: 'anciedad',
    align: 'center',
    label: 'Anciedad',
    field: 'anciedad'
  },
  {
    name: 'esquizofrenia',
    align: 'center',
    label: 'Esquizofrenia',
    field: 'esquizofrenia'
  },
  {
    name: 'fuma',
    align: 'center',
    label: 'Fumador',
    field: 'fuma'
  },
  {
    name: 'alcoholico',
    align: 'center',
    label: 'Alcohólico',
    field: 'alcoholico'
  },
  {
    name: 'parkinson',
    align: 'center',
    label: 'Parkinson',
    field: 'parkinson'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempDefect.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempDef();
  showDialogDG.value = true;
};

const MentalOptions = [
  "Grave",
  "Leve",
  "Moderado",
  "Normal",
];

const PensaOptions = [
  "Grave",
  "Leve",
  "Moderado",
  "Normal",
];

const LenguajeOptions = [
  "Grave",
  "Leve",
  "Moderado",
  "Normal",
];

const DefectOption = [
  {
    label: "Andrés Cueva Heredia",
    value: "1",
  },
  {
    label: "Francisaca Navia Cuadrado",
    value: "2",
  },
];

const visibleColumns = ref([
  'nombre',
  'edad',
  'sexo',
  'auditivo',
  'visual',
  'ecv',
  'fisicomotora',
  'retrazomental',
  'trastornolenguaje',
  'trastornopensamiento',
  'anciedad',
  'esquizofrenia',
  'fuma',
  'alcoholico',
  'parkinson',
  'actions',
])

const date = ref("");

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(defectologia.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Defectologia");
  writeFileXLSX(wb, "Defectologia.xlsx");
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
