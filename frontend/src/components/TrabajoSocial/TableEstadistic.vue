<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="estadistica"
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
          label="Ayudas técnicas"
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

      <!-- TODO:  "Método para prótesis dental" -->
      <template v-slot:body-cell-protesisdental="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.protesisdental"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para prótesis auditiva" -->
      <template v-slot:body-cell-protesisauditiva="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.protesisauditiva"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para anteojos" -->
      <template v-slot:body-cell-anteojos="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.anteojos"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para prótesis ortopédica" -->
      <template v-slot:body-cell-protesisortopedica="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.protesisortopedica"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para silla de ruedas" -->
      <template v-slot:body-cell-sillaruedas="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.sillaruedas"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para bastón" -->
      <template v-slot:body-cell-baston="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.baston"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para andador" -->
      <template v-slot:body-cell-andador="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.andador"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para colchón" -->
      <template v-slot:body-cell-colchon="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.colchon"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para cama plana" -->
      <template v-slot:body-cell-camaplana="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.camaplana"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO:  "Método para cama fowler" -->
      <template v-slot:body-cell-camafowler="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.camafowler"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
      </template>

      <!-- TODO: "Método para image" -->
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
            @click="destroyEstad(props.row.id_estadistic)"
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

              <!-- TODO: "Usa prótesis dental" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempEstadistica.protesisdental"
                label="Usa prótesis dental"
              />

              <!-- TODO: "Usa prótesis auditiva" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempEstadistica.protesisauditiva"
                label="Usa prótesis auditiva"
              />

              <!-- TODO: "Usa anteojos" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempEstadistica.anteojos"
                label="Usa anteojos"
              />

              <!-- TODO: "Usa prótesis ortopédica" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempEstadistica.protesisortopedica"
                label="Usa prótesis ortopédica"
              />

              <!-- TODO: "Usa silla de ruedas" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempEstadistica.sillaruedas"
                label="Usa silla de ruedas"
              />

              <!-- TODO: "Usa bastón" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempEstadistica.baston"
                label="Usa bastón"
              />

              <!-- TODO: "Usa andador" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempEstadistica.andador"
                label="Usa andador"
              />

              <!-- TODO: "Colchón" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempEstadistica.colchon"
                label="Colchón"
              />

              <!-- TODO: "Cama plana" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempEstadistica.camaplana"
                label="Cama plana"
              />

              <!-- TODO: "Cama fowler" -->
              <q-checkbox
                style="max-width: 240px"
                class="col-3"
                rigth-label
                dense
                outlined
                v-model="tempEstadistica.camafowler"
                label="Cama fowler"
              />
            </div>
            <div class="q-mt-lg row q-gutter-md justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateEstad(tempEstadistica.id_estadistic)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createEstad(tempEstadistica)"
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
import { useEstadisticaStore } from "src/stores/Estadistica-Store";

onMounted(async () => {
  // if (isAuthenticated) {
  await listEstad();
  await listPacientes();
  // }
});

const {
  resetTempEstad,
  listEstad,
  listPacientes,
  createEstad,
  updateEstad,
  destroyEstad,
} = useEstadisticaStore();

const { estadistica, AddDG, EditDG, showDialogDG, loading, tempEstadistica, tempPaciente } =
  storeToRefs(useEstadisticaStore());

  const baseurl = "http://127.0.0.1:3333";

  const columns = [
  {
    name: 'id_estadistic',
    required: true,
    label: 'Id',
    align: 'left',
    field: row => row.id_estadistic,
    format: val => `${val}`,
    align: "center",
    sortable: true
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
    name: 'protesisdental',
    align: 'center',
    label: 'Usa prótesis dental',
    field: 'protesisdental',
  },
  {
    name: 'protesisauditiva',
    align: 'center',
    label: 'Usa prótesis auditiva',
    field: 'protesisauditiva',
  },
  {
    name: 'anteojos',
    align: 'center',
    label: 'Usa anteojos',
    field: 'anteojos'
  },
  {
    name: "protesisortopedica",
    label: "Usa prótesis ortopédica",
    field: "protesisortopedica",
    align: "center",
  },
  {
    name: 'sillaruedas',
    align: 'center',
    label: 'Usa silla de ruedas',
    field: 'sillaruedas'
  },
  {
    name: 'baston',
    align: 'center',
    label: 'Usa bastón',
    field: 'baston'
  },
  {
    name: 'andador',
    align: 'center',
    label: 'Usa andador',
    field: 'andador'
  },
  {
    name: 'colchon',
    align: 'center',
    label: 'Colchón',
    field: 'colchon'
  },
  {
    name: 'camaplana',
    align: 'center',
    label: 'Cama plana',
    field: 'camaplana'
  },
  {
    name: 'camafowler',
    align: 'center',
    label: 'Cama fowler',
    field: 'camafowler'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempEstadistica.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempEstad();
  showDialogDG.value = true;
};

const visibleColumns = ref([
  'id_estadistic',
  'image',
  'nombre',
  'protesisdental',
  'protesisauditiva',
  'anteojos',
  'protesisortopedica',
  'sillaruedas',
  'baston',
  'andador',
  'colchon',
  'camaplana',
  'camafowler',
  'actions'
])

const date = ref("")

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
  const ws = utils.json_to_sheet(estadistica.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Estadistica");
  writeFileXLSX(wb, "Estadistica.xlsx");
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
