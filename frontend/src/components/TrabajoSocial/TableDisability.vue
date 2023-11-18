<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="discapacidad"
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
          label="Discapacidad"
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

      <!-- TODO:  "Método para motora" -->
      <template v-slot:body-cell-motora="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.motora"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para auditiva" -->
      <template v-slot:body-cell-auditiva="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.auditiva"
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

      <!-- TODO:  "Método para intelectual" -->
      <template v-slot:body-cell-intelectual="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.intelectual"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para sensorial" -->
      <template v-slot:body-cell-sensorial="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.sensorial"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para mixta" -->
      <template v-slot:body-cell-mixta="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.mixta"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para psicopatía" -->
      <template v-slot:body-cell-psicopatia="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.psicopatia"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para incontinencia urinaria" -->
      <template v-slot:body-cell-inconturinaria="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.inconturinaria"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para incontinencia fecal" -->
      <template v-slot:body-cell-incontfecal="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.incontfecal"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para incontinencia mixta" -->
      <template v-slot:body-cell-incontmixta="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.incontmixta"
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
            @click="destroyDiscap(props.row.id)"
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

              <!-- TODO:  "paciente_discapacidad" -->
              <q-select
                class="col-3"
                dense
                outlined
                v-model="tempdiscapacidad.disc_paciente"
                label="Nombre del paciente"
                :options="DiscapOptions"
                style="width: 250px"
                behavior="menu"
              />


              <!-- TODO: "Discapacidad motora" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempdiscapacidad.motora"
                label="Discapacidad motora"
              />

              <!-- TODO: "Discapacidad auditiva" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempdiscapacidad.auditiva"
                label="Discapacidad auditiva"
              />

              <!-- TODO: "Visual" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempdiscapacidad.visual"
                label="Visual"
              />

              <!-- TODO: "Discapacidad intelectual" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempdiscapacidad.intelectual"
                label="Discapacidad intelectual"
              />

              <!-- TODO: "Discapacidad mixta" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempdiscapacidad.mixta"
                label="Discapacidad mixta"
              />

              <!-- TODO: "Psicopatía" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempdiscapacidad.psicopatia"
                label="Psicopatía"
              />

              <!-- TODO: "Incontinencia urinaria" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempdiscapacidad.inconturinaria"
                label="Incontinencia urinaria"
              />

              <!-- TODO: "Incontinencia fecal" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempdiscapacidad.incontfecal"
                label="Incontinencia fecal"
              />

              <!-- TODO: "Incontinencia mixta" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempdiscapacidad.incontmixta"
                label="Incontinencia mixta"
              />
            </div>
            <div class="q-mt-sm row justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateDiscap(tempdiscapacidad.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createDiscap(tempdiscapacidad)"
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
import { useDiscapacidadStore } from "src/stores/Discapacidad-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listDiscap();
  await listPacientes();
  // }
});

const {
  resetTempDiscap,
  listDiscap,
  listPacientes,
  createDiscap,
  updateDiscap,
  destroyDiscap,
} = useDiscapacidadStore();

const { discapacidad, AddDG, EditDG, showDialogDG, loading, tempdiscapacidad, tempPaciente } =
  storeToRefs(useDiscapacidadStore());

  const columns = [
  {
    name: "nombre",
    align: "center",
    label: "Nombre del paciente",
    field: "nombre",
    sortable: true,
  },

  {
    name: 'motora',
    align: 'center',
    label: 'Discapacidad motora',
    field: 'motora',
  },
  {
    name: 'auditiva',
    align: 'center',
    label: 'Discapacidad auditiva',
    field: 'auditiva',
  },
  {
    name: 'visual',
    align: 'center',
    label: 'Visual',
    field: 'visual'
  },
  { name: "intelectual", label: "Discapacidad intelectual", field: "intelectual", align: "center", },
  {
    name: 'sensorial',
    align: 'center',
    label: 'Discapacidad sensorial',
    field: 'sensorial'
  },
  {
    name: 'mixta',
    align: 'center',
    label: 'Discapacidad mixta',
    field: 'mixta'
  },
  {
    name: 'psicopatia',
    align: 'center',
    label: 'Psicopatía',
    field: 'psicopatia'
  },
  {
    name: 'inconturinaria',
    align: 'center',
    label: 'Incontinencia urinaria',
    field: 'inconturinaria'
  },
  {
    name: 'incontfecal',
    align: 'center',
    label: 'Incontinencia fecal',
    field: 'incontfecal'
  },
  {
    name: 'incontmixta',
    align: 'center',
    label: 'Incontinencia mixta',
    field: 'incontmixta'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempdiscapacidad.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempDiscap();
  showDialogDG.value = true;
};

const DiscapOptions = [
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
  'motora',
  'auditiva',
  'visual',
  'intelectual',
  'sensorial',
  'mixta',
  'psicopatia',
  'inconturinaria',
  'incontfecal',
  'incontmixta',
  'actions'
])

const date = ref("")

// TODO: Export To Excel:
async function exportFile() {
  const ws = utils.json_to_sheet(discapacidad.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Discapacidad");
  writeFileXLSX(wb, "Discapacidad.xlsx");
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
