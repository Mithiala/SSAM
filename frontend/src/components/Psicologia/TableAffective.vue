<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      flat
      bordered
      color="green"
      :rows="afectiva"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :filter="filter"
      :rows-per-page-options="[10, 20, 30]"
      separator="cell"
    >
      <template v-slot:top="props">
        <div
          class="row col-12">
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

      <!-- TODO:  "Método para depresión" -->
      <template v-slot:body-cell-depresion="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.depresion"
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

      <!-- TODO:  "Método para intento suicida" -->
      <template v-slot:body-cell-intentosuicida="props">
        <q-td :props="props">
          <q-icon
            name="check_circle"
            color="positive"
            size="sm"
            v-if="props.row.intentosuicida"
          />
          <q-icon name="cancel" color="negative" size="sm" v-else />
        </q-td>
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
            @click="destroyAfectiva(props.row.id)"
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

              <!-- TODO: "Depresión" -->
              <q-checkbox
                style="max-width: 150px"
                class="col-2"
                rigth-label
                dense
                outlined
                v-model="tempAfectivo.depresion"
                label="Depresión"
              />

              <!-- TODO: "Anciedad" -->
              <q-checkbox
                style="max-width: 150px"
                class="col-2"
                rigth-label
                dense
                outlined
                v-model="tempAfectivo.anciedad"
                label="Anciedad"
              />

              <!-- TODO: "Intento suicida" -->
              <q-checkbox
                style="max-width: 150px"
                class="col-2"
                rigth-label
                dense
                outlined
                v-model="tempAfectivo.intentosuicida"
                label="Intento suicida"
              />

              <!-- TODO: "Observaciones" -->
              <q-input
                class="col-8"
                outlined
                dense
                type="textarea"
                label="Observaciones"
                v-model="tempAfectivo.observaciones"
              />
            </div>
            <div class="q-mt-lg row q-gutter-md justify-center">
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Actualizar"
                color="light-blue-8"
                v-if="EditDG"
                @click="updateAfectiva(tempAfectivo.id)"
              />
              <q-btn
                class="col-2 q-mx-sm"
                type="submit"
                label="Añadir"
                color="light-blue-8"
                v-if="AddDG"
                @click="createAfectiva(tempAfectivo)"
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
import { useAfectivaStore } from "src/stores/Afectiva-Store"

onMounted(async () => {
  // if (isAuthenticated) {
  await listAfectiva();
  await listPacientes();
  // }
});

const {
  resetTempAfectiva,
  listAfectiva,
  listPacientes,
  createAfectiva,
  updateAfectiva,
  destroyAfectiva,
} = useAfectivaStore();

const { afectiva, AddDG, EditDG, showDialogDG, loading, tempAfectivo, tempPaciente } =
  storeToRefs(useAfectivaStore());

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
    name: 'depresion',
    align: 'center',
    label: 'Depresión',
    field: 'depresion',
  },
  {
    name: 'anciedad',
    align: 'center',
    label: 'Anciedad',
    field: 'anciedad',
  },
  {
    name: 'intentosuicida',
    align: 'center',
    label: 'Intento suicida',
    field: 'intentosuicida'
  },
  {
    name: 'observaciones_a',
    align: 'center',
    label: 'Observaciones',
    field: 'observaciones_a'
  },
  { name: "actions", label: "Acciones", align: "center", autoWidth: true },
]

const filter = ref("");
const persistent = ref(false);

const openEditDialog = (row) => {
  AddDG.value = false;
  EditDG.value = true;
  tempAfectivo.value = { ...row };
  showDialogDG.value = true;
};
const openAddDialog = () => {
  AddDG.value = true;
  EditDG.value = false;
  resetTempAfectiva();
  showDialogDG.value = true;
};

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
  const ws = utils.json_to_sheet(afectiva.value);
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Afectiva");
  writeFileXLSX(wb, "Afectiva.xlsx");
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
